/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { parse } from "cookie"
import jwt, { JwtPayload } from "jsonwebtoken";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

const loginValidationZodSchema = z.object({

    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') || null;
        // console.log("redirect from server", redirectTo)
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        if (zodValidator(payload, loginValidationZodSchema).success === false) {
            return zodValidator(payload, loginValidationZodSchema)
        }

        const validatedPayload = zodValidator(payload, loginValidationZodSchema).data;

     const res = await serverFetch.post("/auth/login", {
            // method: "POST",
            body: JSON.stringify(validatedPayload),
            // body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const result = await res.json()

        const setCookieHeaders = res.headers.getSetCookie()
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {

                const parsedCookie = parse(cookie)

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie
                }
            })
        } else {
            throw new Error("No Set-Cookie header found")
        }

        console.log({ res, result })
        console.log({ accessTokenObject, refreshTokenObject })

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies")
        }
        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies")
        }

        // const cookieStore = await cookies()
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        },
        )
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 60,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        },
        )
        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");

        }

        const userRole: UserRole = verifiedToken.role;
        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        // new code 11/22
        if (redirectTo && result.data.needPasswordChange) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`/reset-password?redirect=${requestedPath}`);
            } else {
                redirect("/reset-password");
            }
        }

        if (result.data.needPasswordChange) {
            redirect("/reset-password");
        }
        

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

        // return result;

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log("validatation", error)
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` }
    }
}
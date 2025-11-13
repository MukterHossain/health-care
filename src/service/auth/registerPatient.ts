/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

// import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerPatientValidationZodSchema } from "@/zod/auth.validation";

// const registerValidationZodSchema = z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     address: z.string().optional(),
//     email: z.email({ message: "Valid email is required" }),
//     password: z.string().min(6, {
//         error: "Password is required and must be at least 6 characters long",
//     }).max(100, {
//         error: "Password must be at most 100 characters long",
//     }),
//     confirmPassword: z.string().min(6, {
//         error: "Confirm Password is required and must be at least 6 characters long",
//     }),
// }).refine((data: any) => data.password === data.confirmPassword, {
//     error: "Passwords do not match",
//     path: ["confirmPassword"],
// });


export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        // console.log(formData.get("address"));
        // const validationData = {
        //     name: formData.get('name'),
        //     address: formData.get('address'),
        //     email: formData.get('email'),
        //     password: formData.get('password'),
        //     confirmPassword: formData.get('confirmPassword'),
        // }
         console.log(formData.get("address"));
        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        if (zodValidator(payload, registerPatientValidationZodSchema).success === false) {
            return zodValidator(payload, registerPatientValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerPatientValidationZodSchema).data;
        const registerData = {
            password: validatedPayload.password,
            patient: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
            }
        }

        // const validatedFields = registerValidationZodSchema.safeParse(validationData);

        // console.log(validatedFields, "val");

        // if (!validatedFields.success) {
        //     return {
        //         success: false,
        //         errors: validatedFields.error.issues.map(issue => {
        //             return {
        //                 field: issue.path[0],
        //                 message: issue.message,
        //             }
        //         }
        //         )
        //     }
        // }

        // const registerData = {
        //     password: formData.get('password'),
        //     patient: {
        //         name: formData.get('name'),
        //         address: formData.get('address'),
        //         email: formData.get('email'),
        //     }
        // }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

          if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }
        
        // const res = await fetch("http://localhost:5000/api/v1/user/create-patient", {
        const res = await serverFetch.post("/user/create-patient", {
            // method: "POST",
            body: newFormData,
        })
        console.log(res, "res");
        const result = await res.json()
        if(result.success){
            await loginUser(_currentState, formData);
        }
        console.log(result)
        return result;



    } catch (error : any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` }
    }
}
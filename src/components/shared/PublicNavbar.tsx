"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import checkAuthStatus from "@/utility/auth";

const { user } = await checkAuthStatus();
const PublicNavbar =() => {
  const { role } = user || { role: 'guest' };
  const navItems = [
    { href: "consultation", label: "Consultation" },
    { href: "health-plans", label: "Health Plans" },
    { href: "medicine", label: "Medicine" },
    { href: "diagnostics", label: "Diagnostics" },
    { href: "ngos", label: "NGOs" },
  ];
  if (role === 'ADMIN') {
    navItems.push({ href: "/dashboard/admin", label: "Admin Dashboard" });
  }
  return (
    <header className="sticky top-0 z-50 h-16 w-full  flex items-center justify-around bg-background/95 px-4 shadow-md gap-x-4 text-primary">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Health Care</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2">
          {role !== 'guest' ? (
            <Button variant="destructive">Logout</Button>
          ) : (
            <Link href="/login" className="text-lg font-medium">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"> <Menu /> </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 flex flex-col space-y-4">
                <div className="flex justify-center"></div>
                {role!== 'guest' ? (
                    <Button variant="destructive">Logout</Button>
                  ) : (
                    <Link href="/login" className="text-lg font-medium">
                      <Button>Login</Button>
                    </Link>
                  )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default PublicNavbar;
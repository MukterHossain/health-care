import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Custom Not Found!!!</h1>
            <h1>404 Not Found!!!</h1>
            <Button className="my-5"><Link href={"/"}>Home</Link></Button>
        </div>
    );
};

export default NotFound;
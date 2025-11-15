'use client'


import { Plus } from "lucide-react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import SpecialitiesFormDialog from "./SpecialitiesFormDialog";


const SpecialitiesManagemantHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            {/* <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Doctor Management</h1>
                    <p className="text-muted-foreground mt-1">Manage doctors and their specialities</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />Add Doctor</Button>
            </div> */}
            <SpecialitiesFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
            />
            <ManagementPageHeader
                title="Specialties Management"
                description="Manage Specialties information and details"
                action={{
                    label: "Add Specialty",
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default SpecialitiesManagemantHeader;
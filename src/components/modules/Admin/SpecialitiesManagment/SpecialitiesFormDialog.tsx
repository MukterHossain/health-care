'use client';
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSpeciality } from "@/service/admin/specialitiesManagement";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


interface ISpecialitiesFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}
const SpecialitiesFormDialog = ({ open, onClose, onSuccess }: ISpecialitiesFormDialogProps) => {
    const [state, formAction, pending] = useActionState(createSpeciality, null)

    useEffect(() => {
        if (state && state?.success) {
            toast.success(state.message || "Speciality created successfully");
            onSuccess();
            onClose();
        } else if (state && !state.success) {
            toast.error(state.message || "Failed to create speciality");
        }
    }, [state, onClose, onSuccess]);
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Speciality</DialogTitle>
                </DialogHeader>
                {/* Form content goes here */}
                <form action={formAction} className="space-y-4">
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input id="title" name="title" type="text" placeholder="Cardiology" />
                        <InputFieldError field="title" state={state} />
                    </Field>
                    <Field>
                        <FieldLabel>Upload Icon</FieldLabel>
                        <Input id="file" name="file" type="file" accept="image/*" />
                        <InputFieldError field="file" state={state} />
                    </Field>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SpecialitiesFormDialog;
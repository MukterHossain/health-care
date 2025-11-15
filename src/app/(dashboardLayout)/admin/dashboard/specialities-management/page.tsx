import SpecialitiesManagemantHeader from "@/components/modules/Admin/SpecialitiesManagment/SpecialitiesManagemantHeader";
import SpecialitiesTable from "@/components/modules/Admin/SpecialitiesManagment/SpecialitiesTable";
import RefreshButton from "@/components/shared/RefreshButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getSpecialities } from "@/service/admin/specialitiesManagement";
import { Suspense } from "react";

const SpecialitiesManagementPage =async() => {
    const result = await getSpecialities();
    return (
        <div className='space-y-6'>
            <h1>Specialities Management</h1>
            <SpecialitiesManagemantHeader></SpecialitiesManagemantHeader>
            <div className="flex">
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialitiesTable specialities={result.data} />
            </Suspense>
        </div>
    );
};

export default SpecialitiesManagementPage;
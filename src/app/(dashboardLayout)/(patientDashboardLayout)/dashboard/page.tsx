import LogoutButton from "@/components/shared/LogoutButton";
import { getCookie } from "@/service/auth/tokenHandlers";


const PatientDashboardPage = async () => {
    const accessToken = await getCookie("accessToken");
    return (
        <div>
            {accessToken && <LogoutButton></LogoutButton>}
            <h1>Patient Dashboard</h1>
        </div>
    );
};

export default PatientDashboardPage;
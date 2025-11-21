import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";

const MyProfilePage = async () => {
//   const userInfo = await getUserInfo()
  const userInfo = await getUserInfo() as UserInfo; // ‍add UsserInfo
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
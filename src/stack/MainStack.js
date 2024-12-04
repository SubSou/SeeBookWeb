import { Route, Routes } from "react-router-dom";
import { MainPaths } from "../navigation/routes";
import UserInfoList from "../pages/main/UserInfoList";
import CustomerSupport from "../pages/main/CustomerSupport";
import ReportManagement from "./../pages/main/ReportManagement";
import EventManagement from "./../pages/main/EventManagement";
import ReviewManagement from "../pages/main/ReviewManagement";
import { UserInfoProvider } from "../contexts/Main/UserInfoContext";

const MainStack = () => {
  return (
    <Routes>
      <Route
        path={MainPaths.MainUserInfo}
        element={
          <UserInfoProvider>
            <UserInfoList />
          </UserInfoProvider>
        }
      />
      <Route path={MainPaths.MainCustomer} element={<CustomerSupport />} />
      <Route path={MainPaths.MainReport} element={<ReportManagement />} />
      <Route path={MainPaths.MainEvent} element={<EventManagement />} />
      <Route path={MainPaths.MainReview} element={<ReviewManagement />} />
    </Routes>
  );
};

export default MainStack;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../services/localServices";
import AppHeader from "../components/common/layout/header";
import DashboardLayout from "../components/common/layout/dashboard";
import { pagesWithoutHeader, pagesWithoutLayout } from "./config";
import { FloatButton } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import TicketGenerationForm from "../components/ticket/form";

function PrivateRoute({ element: Component, ...rest }) {
  let isLoggedIN = isLoggedIn();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    checkingUser();
  }, []);

  const checkingUser = () => {
    if (isLoggedIN) {
      isLoggedIN = true;
    }
  };

  const showTicketForm = () => {
    setOpen(true);
  };

  return isLoggedIN ? (
    <>
      {pagesWithoutHeader.includes(currentUrl) ? null : <AppHeader />}
      {pagesWithoutLayout.includes(currentUrl) ? (
        <Outlet />
      ) : (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      )}
         <FloatButton
         onClick={showTicketForm}
      shape="circle"
      type="primary"
      style={{
        right: 36,
      }}
      icon={<CustomerServiceOutlined />}
    />
   <TicketGenerationForm open={open} setOpen={setOpen}/>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;

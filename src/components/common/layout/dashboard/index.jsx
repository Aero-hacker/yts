import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import AppSidebar from "../sidebar";
const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout hasSider>
        <AppSidebar />
        <Layout>
          <Content
            style={{
              margin: "24px 10px 0",
              marginTop: 85,
            }}
          >
            <Breadcrumb
              style={{
                marginBottom: "10px",
                marginTop: "0px",
              }}
              items={[
                {
                  href: "",
                  title: (
                    <>
                      <HomeOutlined />
                      <span>Dashboard</span>
                    </>
                  ),
                },
                {
                  title: (
                    <>
                      {/* <ShopOutlined /> */}
                      <span>Inventory</span>
                    </>
                  ),
                },
              ]}
            />
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                height: "83vh",
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;

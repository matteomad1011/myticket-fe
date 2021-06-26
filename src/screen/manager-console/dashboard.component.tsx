import { Breadcrumb, Layout, Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { authService } from "../../service/auth.service";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import "./dashboard.css";
import { Footer } from "antd/lib/layout/layout";
import { BusinessTabs } from "./types";
import { AccountComponent } from "./account/account.component";
import { config } from "../../config/config";
import { EventsComponent } from "./event/events.component";
import {DashboardPage} from './dashboard/dashboardHome.component';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export const DashBoard: FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>(BusinessTabs.DASHBOARD);

  const [collapsed, setCollapsed] = useState(false);
  if (!authService.isLogged() || authService.getRole() != "MANAGER") {
    return <Redirect to="/login" />;
  }

  const renderContent = () => {
    switch (selectedTab) {
      case BusinessTabs.DASHBOARD:
        return <DashboardPage />
      case BusinessTabs.ACCOUNT: {
        return <AccountComponent />;
      }
      case BusinessTabs.EVENTS: {
        return <EventsComponent />;
      }
      default: {
        return <div>Not found</div>;
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <h1>MyTicket</h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[BusinessTabs.DASHBOARD]}
          mode="inline"
          onSelect={({ key }) => setSelectedTab(key)}
        >
          <Menu.Item key={BusinessTabs.DASHBOARD} icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key={BusinessTabs.EVENTS} icon={<CalendarOutlined />}>
            Events
          </Menu.Item>
          <SubMenu title="Settings" icon={<SettingOutlined />}>
            <Menu.Item key={BusinessTabs.ACCOUNT}>Account</Menu.Item>
            <Menu.Item
              key="Logout"
              onClick={() => localStorage.removeItem("token")}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Content style={{ margin: "0 16px" }}>{renderContent()}</Content>
        <Footer style={{ textAlign: "center" }}>
          My Ticket © Created by Matteo Cavallo @antd
        </Footer>
      </Layout>
    </Layout>
  );
};

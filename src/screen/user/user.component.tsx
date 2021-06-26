import {FC, useEffect, useState} from 'react';
import './user.css';
import {Col, Layout, Menu, Row} from 'antd';
import {LaptopOutlined, NotificationOutlined, ShopFilled, UserOutlined} from '@ant-design/icons';
import {UserDetailsComponent} from './userDetails/userDetails.component';
import {OrdersComponent} from './orders/orders.components';
import {authService} from '../../service/auth.service';
import {Redirect} from 'react-router-dom';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


enum TabsType {
    DETAILS = 'DETAILS',
    ORDERS = 'ORDERS'
}

export const UserPage: FC = () => {


    const [selectedTab, setSelectedTab] = useState<string>(TabsType.DETAILS);
    const [tabContent, setTabContent] = useState<JSX.Element>();

    useEffect(() => {

        switch (selectedTab) {
            case TabsType.DETAILS:
                setTabContent(<UserDetailsComponent/>);
                break;
            case TabsType.ORDERS:
                setTabContent(<OrdersComponent/>);
                break;
        }
    }, [selectedTab]);


    if (!authService.isLogged() || authService.getRole() != 'USER') {
        return <Redirect to="/login"/>;
    }

    return (
        <Layout>
            <Sider
            breakpoint={'xs'}
            collapsedWidth={"50"}
            >
                <Menu
                    style={{height:"100%"}}
                    mode="inline"
                    onSelect={({key}) => setSelectedTab(key)}
                    defaultSelectedKeys={['DETAILS']}
                >
                    <Menu.Item key="DETAILS" icon={<UserOutlined/>}>Account</Menu.Item>
                    <Menu.Item key="ORDERS" icon={<ShopFilled/>}>Orders</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                <Content style={{padding: '0 8px', minHeight: 280, justifyContent: "center", display: "flex", width: "100%"}}>
                    {tabContent}
                </Content>
                <Footer style={{textAlign: 'center'}}>Matteo Cavallo @ MyTicket</Footer>
            </Layout>
        </Layout>
    );
};

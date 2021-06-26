import {Badge, Button, Dropdown, Menu, Space} from 'antd';
import Title from "antd/lib/typography/Title";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../../../service/auth.service";
import { UserContext, UserProvider } from "../../../store/store";
import "./navbar.css";

export const Navbar = () => {
  const h = useHistory();
  const { dispatch, state } = useContext(UserContext);

  const [logged, setLogged] = useState(false);

  const goto = (to: string) => {
    h.push(to);
  };

  useEffect(() => {
    if (authService.isLogged()) setLogged(true);
    console.log("Logged");

    console.log(authService.getRole());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setLogged(false);
    goto("/");
  };

  const mobileMenu = () => {

    const menu =  <Menu>
      <Menu.Item onClick={() => goto("/user")}>
        My Account
      </Menu.Item>
      <Menu.Item danger onClick={() => handleLogout()}>
        Logout
      </Menu.Item>
    </Menu>

    return (<Dropdown overlay={menu}>
      <Button >MENU</Button>
    </Dropdown>)
  }

  const userMenu = () => {
    const role = authService.getRole();

    switch (role) {
      case "MANAGER":
        return <Space>
        <Button onClick={() => goto("/manager")}>Manager Page</Button>;
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Space>
      case "USER":
        return <Space size={16}>
          <Badge count={state.cart.items.length}>
          <Button onClick={() => goto("/cart")} type={"primary"}>Cart</Button>
          </Badge>
          {mobileMenu()}
        </Space>
      default:
        return null;
    }
  };

  return (
    <div className="navbar">
      <div>
        <a href="/">
          <h1 className={"logo"}>My Ticket</h1>
        </a>
      </div>
      <div className={"menu"}>
        <Space>
          {!logged ? (
            <>
              <Button type="primary" onClick={() => goto("/login")}>
                Sign in
              </Button>
              <Button onClick={() => goto("/register")}>Sign up</Button>
            </>
          ) : (
            <>
              {userMenu()}
            </>
          )}
        </Space>
      </div>
    </div>
  );
};

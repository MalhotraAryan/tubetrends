
//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Button } from '@mui/material';
import { Typography } from "@mui/material";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiLogIn, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = (props) => {

  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  const user = props.user;
  const username = user === null ? "Guest" : user.FirstName && user.FirstName.length > 0 ? user.FirstName : user.UserName;
  let loginButtonText = user === null ? "Login" : "Logout"
  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  console.log(user);
  const handleLogButton = () => {
    if (user !== null) {
      props.setUser(null);
    }
  }
  return (

    <>

      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Typography variant="h5" component="h3">
              Hello, {username}!
            </Typography>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}><Link to="/home">
                Home
              </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}><Link to="advanced-queries">Queries</Link></MenuItem>
              <MenuItem icon={<FaRegHeart />}><Link to="favorites">Favorites</Link></MenuItem>
              <MenuItem icon={<FaRegHeart />}><Link to="history">History</Link></MenuItem>
              <MenuItem icon={<RiPencilLine />}><Link to="profile">Author</Link></MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={user === null ? <FiLogIn /> : <FiLogOut />}><Link to="/login"><Button onClick={handleLogButton}>{loginButtonText}</Button></Link></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
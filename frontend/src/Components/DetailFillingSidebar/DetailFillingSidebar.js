import React, { useEffect, useState } from "react";
import "./DetailsFillingSideBar.css";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

const DetailFillingSidebar = (props) => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [menuOpen, setMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="mt-[50px]">
      {windowSize.innerWidth > 850 ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            boxShadow: "0px 0px 4px 0px rgb(228, 228, 228)",
            height: "fit-content",
          }}>
          <List disablePadding>
            {/* Personal Info */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                sx={props.tab === 0 ? { borderLeft: "3px solid rgb(0, 128, 255)" } : null}>
                <AccountCircleOutlinedIcon color={props.tab === 0 ? "info" : "disabled"} />
                <ListItemText
                  className="IcoSpace"
                  primary="Personal Info"
                  sx={props.tab === 0 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Work Experience */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                sx={props.tab === 1 ? { borderLeft: "3px solid rgb(0, 128, 255)" } : null}>
                <WorkHistoryRoundedIcon color={props.tab === 1 ? "info" : "disabled"} />
                <ListItemText
                  className="IcoSpace"
                  primary="Work Experience"
                  sx={props.tab === 1 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Education */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                sx={props.tab === 2 ? { borderLeft: "3px solid rgb(0, 128, 255)" } : null}>
                <SchoolRoundedIcon color={props.tab === 2 ? "info" : "disabled"} />
                <ListItemText
                  className="IcoSpace"
                  primary="Education"
                  sx={props.tab === 2 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Key Skills */}
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                sx={props.tab === 3 ? { borderLeft: "3px solid rgb(0, 128, 255)" } : null}>
                <StarsRoundedIcon color={props.tab === 3 ? "info" : "disabled"} />
                <ListItemText
                  className="IcoSpace"
                  primary="Key Skills"
                  sx={props.tab === 3 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      ) : (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}>
            <MenuItem onClick={toggleMenu}>
              <AccountCircleOutlinedIcon color={props.tab === 0 ? "info" : "disabled"} />
              <ListItemText
                className="IcoSpace"
                primary="Personal Info"
                sx={props.tab === 0 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleMenu}>
              <WorkHistoryRoundedIcon color={props.tab === 1 ? "info" : "disabled"} />
              <ListItemText
                className="IcoSpace"
                primary="Work Experience"
                sx={props.tab === 1 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleMenu}>
              <SchoolRoundedIcon color={props.tab === 2 ? "info" : "disabled"} />
              <ListItemText
                className="IcoSpace"
                primary="Education"
                sx={props.tab === 2 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={toggleMenu}>
              <StarsRoundedIcon color={props.tab === 3 ? "info" : "disabled"} />
              <ListItemText
                className="IcoSpace"
                primary="Key Skills"
                sx={props.tab === 3 ? { color: "rgb(0, 128, 255)", paddingLeft: "8px" } : null}
              />
            </MenuItem>
          </Menu>
        </div>
      )}
      {menuOpen && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            boxShadow: "0px 0px 4px 0px rgb(228, 228, 228)",
            height: "fit-content",
          }}
        >
          <List disablePadding>
            {/* Personal Info */}
            <ListItem disablePadding>
              <ListItemButton component="a">
                <AccountCircleOutlinedIcon />
                <ListItemText primary="Personal Info" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Work Experience */}
            <ListItem disablePadding>
              <ListItemButton component="a">
                <WorkHistoryRoundedIcon />
                <ListItemText primary="Work Experience" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Education */}
            <ListItem disablePadding>
              <ListItemButton component="a">
                <SchoolRoundedIcon />
                <ListItemText primary="Education" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {/* Key Skills */}
            <ListItem disablePadding>
              <ListItemButton component="a">
                <StarsRoundedIcon />
                <ListItemText primary="Key Skills" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </div>
  );
};

export default DetailFillingSidebar;

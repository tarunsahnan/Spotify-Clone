import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import menuIcon from "../../assets/images/menuIcon.svg";
import "./styles.css";
import MenuMusicQueue from "./MusicQueue";

//Component that is handeling Responsiveness
//in case of small screens we show menu for user to open queue of songs
export default function Menu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="menu">
            <Button onClick={toggleDrawer(anchor, true)}>
              <img alt="menuIcon" src={menuIcon} />
            </Button>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(8, 6, 2), rgb(0, 0, 0))",
              }}
              sx={{
                width:
                  anchor === "top" || anchor === "bottom" ? "auto" : "100%",
              }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List>
                <MenuMusicQueue />
              </List>
              <Divider />
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}

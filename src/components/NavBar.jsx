import React from "react";
import {AppBar, Toolbar, makeStyles, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

const NavBar = () => {
  const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "35px",
      marginRight: theme.spacing(10),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
      alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Grid>
      <AppBar>
        <Toolbar className={classes.alignItemsAndJustifyContent}>
          <div className={classes.navlinks}>
            <Link to="/dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/change_order_log" className={classes.link}>
              Change Order Logs
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default NavBar;

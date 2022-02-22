import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { Grid, TextField } from "@mui/material";

import classes from "./layout.module.css";
import { postsActions } from "../store/posts";

const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector((state) => state.auth.authenticated);
  const userName = useSelector((state) => state.auth.userName);

  const searchDetails = useSelector((state) => state.posts.searchList);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(postsActions.searchHandler(data.get("search")));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {auth && (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={logoutHandler}
                aria-label="login switch"
              />
            }
            label={auth ? "Logout" : "Login"}
          />
        </FormGroup>
      )}
      <AppBar position="static">
        <Grid container sx={{ p: 2 }}>
          {auth && (
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              xs={6}
            >
              <Box
                component="form"
                className={classes.formGroup}
                onSubmit={searchHandler}
              >
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
                <TextField
                  placeholder="Search"
                  name="search"
                  id="search"
                  variant="outlined"
                  className={classes.search}
                />
              </Box>
              {searchDetails.length > 0 && (
                <Typography
                  variant="overline"
                  sx={{ ml: 1, textDecoration: "underline" }}
                >
                  Found {searchDetails.length} posts
                </Typography>
              )}
            </Grid>
          )}

          {auth && (
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-end"
              xs={6}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography align="center" sx={{ p: 1 }}>
                  {userName}
                </Typography>
              </Menu>
            </Grid>
          )}
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Layout;

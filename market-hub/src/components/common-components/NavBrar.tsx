import React from "react";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  title?: string;
}

function NavBar(props: NavBarProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 575px)");

  const editProfileHandler = () => {
    navigate("/editProfile");
  };

  const changePasswordHandler = () => {
    navigate("/changePassword");
  };

  const logOutHandler = () => {
    localStorage.removeItem("loggedInUser");
    window.history.replaceState({}, "", "/login");
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        padding: "10px 0",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <Typography variant="h3">{props?.title}</Typography>

      <div style={{ marginTop: isMobile ? "10px" : 0 }}>
        <Button
          variant="contained"
          onClick={editProfileHandler}
          sx={{ marginLeft: 2, marginBottom: isMobile ? 1 : 0 }}
        >
          Edit Profile
        </Button>

        <Button
          variant="contained"
          onClick={changePasswordHandler}
          sx={{ marginLeft: 2, marginBottom: isMobile ? 1 : 0 }}
        >
          Change Password
        </Button>

        <Button
          variant="contained"
          onClick={logOutHandler}
          sx={{ marginLeft: 2 }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default NavBar;

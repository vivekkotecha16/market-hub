import { Grid } from "@mui/material";
import React from "react";

const SideImage = () => {
  return (
    <Grid
      item
      xs={false}
      sm={false}
      md={8}
      sx={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1540340061722-9293d5163008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default SideImage;

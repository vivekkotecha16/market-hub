import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SideImage from "../../components/common-components/SideImage/SideImage";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }} item>
      <Grid
        item
        sm={12}
        md={4}
        component={Paper}
        elevation={6}
        square
        justifyContent="center"
        display="flex"
        sx={{
          flex: 1,
        }}
      >
        <SignUpForm />
      </Grid>
      <SideImage />
    </Grid>
  );
}

import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface FormHeaderTupes {
  formName?: string;
}
const FormHeader = (props: FormHeaderTupes) => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {props?.formName ? props.formName : ""}
      </Typography>
    </>
  );
};

export default FormHeader;

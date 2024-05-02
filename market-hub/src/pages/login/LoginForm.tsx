import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import FormHeader from "../../components/common-components/FormHeader/FormHeader";
import React, { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { compareSync } from "bcrypt-ts";
import type { UserWithPassword } from "../../types/User";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const handleSubmit = useCallback(
    (values: LoginFormValues, { setSubmitting, resetForm }: any) => {
      const users: UserWithPassword[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      ) as UserWithPassword[];
      const user: UserWithPassword | undefined = users.find(
        (user) => user.email === values.email
      );

      if (!user) {
        alert(
          "email address not exsists, user another email or first signup using this email"
        );
        resetForm();
        setSubmitting(false);
        return;
      }

      const isMatch = compareSync(values.password, user.password);
      if (!isMatch) {
        alert("Incorrect email address or password.  Please try again.");
        resetForm();
        return;
      }

      const loggedInUser: Partial<UserWithPassword> = {
        ...user,
      };
      delete loggedInUser.password;

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      setSubmitting(false);
      resetForm();
      navigate("/listOfProducts");
    },
    [navigate]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <FormHeader formName="Login" />

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "300px" }}>
            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => setShowPassword((prev: Boolean) => !prev)}
                    >
                      {showPassword ? <RemoveRedEye /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              style={{ marginTop: "16px" }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body1" gutterBottom marginTop={"15px"}>
        OR
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        style={{ marginTop: "16px" }}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default LoginForm;

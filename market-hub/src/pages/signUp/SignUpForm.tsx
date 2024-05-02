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
import { genSaltSync, hashSync } from "bcrypt-ts";
import type { UserWithPassword } from "../../types/User";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Mobile Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("password")], "Password and Confirm Password not match"),
});

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface showPasswordProps {
  password: boolean;
  confirmPassword: boolean;
}
const SignUpForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<showPasswordProps>({
    password: false,
    confirmPassword: false,
  });

  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }),
    []
  );

  const handleSubmit = useCallback(
    (values: SignUpFormValues, { setSubmitting, resetForm }: any) => {
      const existingUsers = JSON.parse(
        localStorage.getItem("users") ?? "[]"
      ) as UserWithPassword[];
      const existingEmail = existingUsers.find(
        (user) => user.email === values.email
      );
      if (existingEmail) {
        alert("Email is already in use. Please use another email address.");
        setSubmitting(false);
        resetForm();
        return;
      }

      const salt = genSaltSync(10);
      const hashPassword = hashSync(values.password, salt);

      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: hashPassword,
      };
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("Signup successfully!");
      setSubmitting(false);
      resetForm();
      navigate("/login");
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
      <FormHeader formName="SignUp" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "300px" }}>
            <Field
              as={TextField}
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="error-message"
            />

            <Field
              as={TextField}
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="error-message"
            />

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
              name="phone"
              label="Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error-message"
            />

            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword.password ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {showPassword.password ? (
                        <RemoveRedEye />
                      ) : (
                        <VisibilityOff />
                      )}
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

            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword.confirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <RemoveRedEye />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ErrorMessage
              name="confirmPassword"
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
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="h5" gutterBottom marginTop={"15px"}>
        OR
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        style={{ marginTop: "16px" }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default SignUpForm;

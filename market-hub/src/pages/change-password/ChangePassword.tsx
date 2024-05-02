import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import NavBar from "../../components/common-components/NavBrar";
import { getLoggedInUser } from "../../helpers/getLoggedInUser";
import { compareSync } from "bcrypt-ts";
import { UserWithPassword } from "../../types/User";
import { genSaltSync, hashSync } from "bcrypt-ts";

interface showPasswordProps {
  currentPassword: boolean;
  newPassWord: boolean;
  confirmNewPassword: boolean;
}

function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<showPasswordProps>({
    currentPassword: false,
    newPassWord: false,
    confirmNewPassword: false,
  });

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmNewPassword: Yup.string()
      .required("Confirm New Password is required")
      .oneOf(
        [Yup.ref("newPassword")],
        "New Password and Confirm Password not match"
      ),
  });

  const handleSubmit = (
    values: { currentPassword: string; newPassword: string },
    { setSubmitting, resetForm }: any
  ) => {
    const loggedInUser = getLoggedInUser();

    const users: UserWithPassword[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as UserWithPassword[];

    const user: UserWithPassword | undefined = users.find(
      (user) => user.email === loggedInUser.email
    );

    if (user) {
      const isMatch = compareSync(values.currentPassword, user.password);

      if (!isMatch) {
        resetForm();
        alert("password is incorrect.");
        setSubmitting(false);
        return;
      }

      const salt = genSaltSync(10);
      const hashPassword = hashSync(values.newPassword, salt);
      const updatedLoggedInUser = {
        ...user,
        password: hashPassword,
      };

      const updatedUsers = users.map((user) => {
        if (user.email === loggedInUser.email) {
          return updatedLoggedInUser;
        }
        return user;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      resetForm();
      alert("Password changed successfully!");
      navigate("/listOfProducts");
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavBar title="Edit Profile" />

      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="currentPassword"
                type={showPassword.currentPassword ? "text" : "password"}
                label="Current Password"
                as={TextField}
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
                            currentPassword: !prev.currentPassword,
                          }))
                        }
                      >
                        {showPassword.currentPassword ? (
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
                name="currentPassword"
                component="div"
                className="error-message"
              />

              <Field
                name="newPassword"
                type={showPassword.newPassWord ? "text" : "password"}
                label="New Password"
                as={TextField}
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
                            newPassWord: !prev.newPassWord,
                          }))
                        }
                      >
                        {showPassword.newPassWord ? (
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
                name="newPassword"
                component="div"
                className="error-message"
              />

              <Field
                name="confirmNewPassword"
                type={showPassword.confirmNewPassword ? "text" : "password"}
                label="Confirm New Password"
                as={TextField}
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
                            confirmNewPassword: !prev.confirmNewPassword,
                          }))
                        }
                      >
                        {showPassword.confirmNewPassword ? (
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
                name="confirmNewPassword"
                component="div"
                className="error-message"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default ChangePassword;

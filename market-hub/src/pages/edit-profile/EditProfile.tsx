import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignUpFormValues } from "../signUp/SignUpForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/common-components/NavBrar";
import { getLoggedInUser } from "../../helpers/getLoggedInUser";

function EditProfile() {
  const navigate = useNavigate();
  const loggedInUser = getLoggedInUser();

  const initialValues = {
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    email: loggedInUser.email,
    phone: loggedInUser.phone,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Mobile Number is required"),
  });

  const handleSubmit = (values: { email: string }, { setSubmitting }: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (loggedInUser.email !== values.email) {
      const isEmailExists = users.some(
        (user: SignUpFormValues) => user.email === values.email
      );
      if (isEmailExists) {
        alert("Email is already in use. Please use another email address.");
        setSubmitting(false);
        return;
      }
    }
    const updatedUsers = users.map((user: SignUpFormValues) => {
      if (user.email === loggedInUser.email) {
        return { ...user, ...values };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("loggedInUser", JSON.stringify(values));
    alert("Profile updated successfully!");
    navigate("/listOfProducts");
    setSubmitting(false);
  };

  return (
    <>
      <NavBar title="Edit Profile" />

      <Box sx={{ maxWidth: 400, margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="firstName"
                type="text"
                label="First Name"
                as={TextField}
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-message"
              />

              <Field
                name="lastName"
                type="text"
                label="Last Name"
                as={TextField}
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-message"
              />

              <Field
                name="email"
                type="email"
                label="Email"
                as={TextField}
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />

              <Field
                name="phone"
                type="text"
                label="Mobile Number"
                as={TextField}
                fullWidth
                margin="normal"
              />
              <ErrorMessage
                name="phone"
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
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default EditProfile;

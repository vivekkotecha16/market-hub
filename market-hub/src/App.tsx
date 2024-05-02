import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/signUp/SignUp";
import ProductListing from "./pages/product-list/ProductListing";
import ProductDetailsPage from "./pages/product-detail-page/ProductDetailsPage";
import EditProfile from "./pages/edit-profile/EditProfile";
import ChangePassword from "./pages/change-password/ChangePassword";
import { ProtectedPage } from "./hoc/ProtectedPage";
import { getLoggedInUser } from "./helpers/getLoggedInUser";

function App() {
  const loggedInUser = getLoggedInUser();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Navigate to="/listOfProducts" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/listOfProducts"
            element={
              <ProtectedPage>
                <ProductListing />
              </ProtectedPage>
            }
          />
          <Route
            path="/listOfProducts/:id"
            element={
              <ProtectedPage>
                <ProductDetailsPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/editProfile"
            element={
              <ProtectedPage>
                <EditProfile />
              </ProtectedPage>
            }
          />
          <Route
            path="/changePassword"
            element={
              <ProtectedPage>
                <ChangePassword />
              </ProtectedPage>
            }
          />
          <Route
            path="*"
            element={
              loggedInUser ? (
                <Navigate to="/listOfProducts" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

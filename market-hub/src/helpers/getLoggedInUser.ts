import type { User } from "../types/User";

const isUserValid = (userData: Partial<User> | null = {}) => {
  if (
    userData &&
    typeof userData.firstName === "string" &&
    typeof userData.lastName === "string" &&
    typeof userData.phone === "string" &&
    typeof userData.email === "string"
  ) {
    return true;
  }

  return false;
};

export const getLoggedInUser = () => {
  const userData = JSON.parse(localStorage.getItem("loggedInUser") ?? "{}");

  if (isUserValid(userData)) {
    return userData;
  }
  return null;
};

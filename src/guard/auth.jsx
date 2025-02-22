// Get the logged-in user from sessionStorage
export const getLoggedInUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

// Logout the user and redirect to the login page
export const logout = () => {
  sessionStorage.removeItem("user");
  window.location.href = "/login";
};

// Guard function to protect routes based on roles
export const guard = (role) => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    window.location.href = "/login";
    return;
  }
  if (role === "admin" && loggedInUser.role !== "admin") {
    logout();
    return;
  }
  if (role === "customer" && loggedInUser.role !== "customer") {
    logout();
    return;
  }
};

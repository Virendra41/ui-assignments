import { toast } from "react-hot-toast";

export const logoutHandler = (callBack) => {
  localStorage.removeItem("task-user-info");
  if (callBack) callBack();
};

export const autoLogoutHandler = () => {
  toast.success("You have been logged out");
  const callBack = () => {
    window.location.href = "/login";
  };
  logoutHandler(callBack);
};

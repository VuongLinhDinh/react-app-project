import { toast } from "react-toastify";

export const notitySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    closeOnClick: true,
    className: "toast-message"
  });
};

export const notityError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    closeOnClick: true,
    className: "toast-message"
  });
};

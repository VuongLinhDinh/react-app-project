import { toast } from "react-toastify";

export const notitySuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 4000,
    closeOnClick: true,
    className: "toast-message"
  });
};

export const notityError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 4000,
    closeOnClick: true,
    className: "toast-message"
  });
};

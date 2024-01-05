import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

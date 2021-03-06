import { toast } from "react-hot-toast/src/core/toast";

export const ToastKit = (loadingText = "ε¦ηδΈ­...") => {
  const toastId = toast.loading(loadingText, {
    icon: "πββοΈ",
  });

  const ErrorToast = (errorText = "γ¨γ©γΌγηΊηγγΎγγ") => {
    return toast.error(errorText, {
      id: toastId,
      icon: "π€¦ββοΈ",
    });
  };

  const SuccessToast = (successText: string, duration = 2000) => {
    return toast.success(successText, {
      duration: duration,
      id: toastId,
      icon: "πββοΈ",
    });
  };

  return { ErrorToast, SuccessToast };
};

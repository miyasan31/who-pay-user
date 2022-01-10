import { toast } from "react-hot-toast/src/core/toast";

export const ToastKit = (loadingText = "処理中...") => {
  const toastId = toast.loading(loadingText, {
    icon: "💁‍♂️",
  });

  const ErrorToast = (errorText = "エラーが発生しました") => {
    return toast.error(errorText, {
      id: toastId,
      icon: "🤦‍♂️",
    });
  };

  const SuccessToast = (successText: string, duration = 1500) => {
    return toast.success(successText, {
      duration: duration,
      id: toastId,
      icon: "🙆‍♂️",
    });
  };

  return { ErrorToast, SuccessToast };
};

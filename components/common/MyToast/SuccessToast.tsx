import { CheckCircle2 } from "lucide-react";
import { toast, ToasterProps, ToastT } from "sonner";

type MyToastProps = ToasterProps & {
  message?: string;
  description?: string;
  variant?: "success" | "info" | "error" | "warning";
};
const SuccessToast = ({
  message = "Toast Sukses",
  description = 'Deskripsi Sukses atau kosongi " "',
  variant = "success",
  ...props
}: MyToastProps) => {
  return toast(message, {
    ...props,
    position: "top-center",
    duration: 2500,
    icon: <CheckCircle2 />,
    richColors: true,
    style: {
      border: "1px solid green",
      gap: "1em",
    },
    description: description,
  });
};

export default SuccessToast;

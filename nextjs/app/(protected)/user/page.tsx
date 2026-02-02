import { redirect } from "next/navigation";

export default function RedirectToUserDashboard() {
  redirect("/user/dashboard");
}

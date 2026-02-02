export interface UserType {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  phone_number: number;
  google_avatar: string | null;
}

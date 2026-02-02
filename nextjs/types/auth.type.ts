import { z } from "zod";
import { UserType } from "./user.type";

const baseAuthSchema = z.object({
  email: z.email(),
});

export const registerSchema = baseAuthSchema
  .extend({
    name: z
      .string()
      .min(1, "Fullname is required")
      .max(255, "Fullname must be less than 255 characters"),
    phone_number: z.coerce.number().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    error: "Password doesn't match",
  });

export type RegisterPayloadType = z.infer<typeof registerSchema>;

export const loginSchema = baseAuthSchema.extend({
  password: z.string().min(1, "Password is required"),
});

export type LoginPayloadType = z.infer<typeof loginSchema>;
export interface LoginResponseType {
  expires_in: number;
  user: UserType;
}

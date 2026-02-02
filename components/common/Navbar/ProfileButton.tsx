"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logoutThunk } from "@/features/auth/redux/thunk/authThunks";
import { useAppDispatch } from "@/stores/store";
import { CheckCircle2, Loader2, LogOut, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { profileLinks } from "./utils/navUtils";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
type ProfileButtonProps = React.ComponentProps<typeof PopoverContent> & {
  displayName?: boolean;
  displayEmail?: boolean;
  popoverClassName?: string;
};
const ProfileButton: React.FC<ProfileButtonProps> = ({
  displayName = false,
  displayEmail = false,
  popoverClassName,
  ...props
}) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    const res = await dispatch(logoutThunk()).unwrap();

    if (res.status === true) {
      setIsLoadingLogout(false);

      toast.success(res.message, {
        duration: 1500,
        position: "top-right",
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
      });
    } else {
      setIsLoadingLogout(false);
      toast.error(res.message, {
        duration: 1500,
        position: "top-right",
        richColors: true,
        icon: <CheckCircle2 />,
        style: {
          gap: "1em",
        },
      });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex origin-center cursor-pointer gap-2 transition-transform duration-300",
          !displayName && !displayEmail && "hover:scale-105 hover:shadow-lg",
          popoverClassName,
        )}
      >
        {isAuthenticated && user && user.google_avatar ? (
          <Image
            src={user.google_avatar}
            alt="user_avatar"
            width={28}
            height={28}
            className="hover:ring-baraka-primary-300 rounded-full ring ring-black"
          />
        ) : (
          <UserCircle className="hover:ring-baraka-primary-300" />
        )}

        {displayName && <p>Hello, {user?.name}</p>}

        {displayEmail && (
          <p className="text-sm group-data-[collapsible=icon]:hidden">
            {user?.email}
          </p>
        )}
      </PopoverTrigger>
      <PopoverContent {...props} className={cn("shadow-md", props.className)}>
        {!displayName && (
          <>
            <p>
              Hello, <b>{user?.name}</b>
            </p>
            <hr />
          </>
        )}

        <div className="mt-5 inline-flex w-full flex-col items-start justify-between gap-2">
          {profileLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "hover:text-baraka-primary-300 inline-flex gap-3",
                pathname === item.href && "text-baraka-primary-300",
              )}
            >
              <item.icon />
              {item.title}
            </Link>
          ))}

          <Button
            onClick={handleLogout}
            variant={"destructive"}
            className="mt-5 cursor-pointer self-end"
          >
            {isLoadingLogout ? (
              <>
                <Loader2 className="animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut />
                Logout
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;

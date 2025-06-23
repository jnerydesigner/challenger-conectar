"use client";

import { IoIosLogOut } from "react-icons/io";

import { Button } from "./ui/button";
import { useLogout } from "@/hooks/use-logout";
import { UserDataCookie } from "@/types/user-data-cookie";
import { AvatarUser } from "./avatar-user";
import { SelectScrollableUser } from "./select-user";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

interface HeaderProps {
  user: UserDataCookie;
  titleNamePage: string;
}

export const Header = ({ user, titleNamePage }: HeaderProps) => {
  const logout = useLogout();
  const handleLogout = async () => {
    logout();
  };
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-xl font-semibold text-gray-800">{titleNamePage}</h1>
        {user.role === "admin" ? (
          <Link
            href="/dashboard"
            className="flex justify-center items-center w-34 h-10 gap-4 hover:bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-102 rounded-md"
          >
            <MdDashboard /> Dashboard
          </Link>
        ) : (
          ""
        )}
        <div className="flex items-center gap-3">
          <AvatarUser user={user} className="w-10 h-10" />
          <SelectScrollableUser user={user} />
          <span className="text-sm text-gray-600">
            <Button
              className="cursor-pointer flex justify-center items-center gap-4"
              onClick={handleLogout}
            >
              <p>Sair</p>
              <IoIosLogOut className="w-6 h-6" />
            </Button>
          </span>
        </div>
      </div>
    </header>
  );
};

import * as React from "react";

import { UserDataCookie } from "@/types/user-data-cookie";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface SelectScrollableUserProps {
  user: UserDataCookie;
}

export function SelectScrollableUser({ user }: SelectScrollableUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {user?.name ?? "Usuário"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href={`/user/update/${user.id}`} className="cursor-pointer">
            Atualizar Seus Dados
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

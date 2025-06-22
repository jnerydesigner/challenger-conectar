"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { UserTypes } from "@/types/user.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { FormUpdateUser } from "./form-update-user";

interface DrawerUpdateUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserTypes | null;
  token: string;
}

export const DrawerUpdateUser = ({
  open,
  user,
  onOpenChange,
  token,
}: DrawerUpdateUserProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar usuário</DialogTitle>
            <DialogDescription>Atualize os dados do usuário.</DialogDescription>
          </DialogHeader>
          <FormUpdateUser
            onOpenChange={onOpenChange}
            user={user}
            token={token}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar usuário</DrawerTitle>
          <DrawerDescription>Atualize os dados do usuário.</DrawerDescription>
        </DrawerHeader>
        <FormUpdateUser onOpenChange={onOpenChange} user={user} token={token} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="ml-4 cursor-pointer">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

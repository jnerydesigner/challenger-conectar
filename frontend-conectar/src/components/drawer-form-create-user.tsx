"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { FormNewUser } from "./form-new-user";

interface DrawerCreateUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DrawerOrDialogCreateUser = ({
  open,
  onOpenChange,
}: DrawerCreateUserProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deseja Adicionar novo usuário</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <FormNewUser onOpenChange={onOpenChange} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="ml-4 cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Deseja Adicionar novo usuário</DrawerTitle>
          <DrawerDescription>
            Esta ação não pode ser desfeita.
          </DrawerDescription>
        </DrawerHeader>
        <FormNewUser onOpenChange={onOpenChange} />
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

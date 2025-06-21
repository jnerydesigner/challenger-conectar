"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { DrawerUpdateUser } from "./drawer-form-update-user";

export const DrawerTriggerUpdateClient = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          Adicionar novo usuário
        </Button>
      </div>

      <DrawerUpdateUser open={open} onOpenChange={setOpen} />
    </>
  );
};

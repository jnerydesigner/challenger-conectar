"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DrawerOrDialogCreateUser } from "@/components/drawer-form-create-user";

export const DrawerTriggerClient = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          Adicionar novo usuário
        </Button>
      </div>

      <DrawerOrDialogCreateUser open={open} onOpenChange={setOpen} />
    </>
  );
};

import { UserTypes } from "@/types/user.types";
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
}

export const DrawerUpdateUser = ({
  open,
  user,
  onOpenChange,
}: DrawerUpdateUserProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar usuário</DrawerTitle>
          <DrawerDescription>Atualize os dados do usuário.</DrawerDescription>
        </DrawerHeader>
        <FormUpdateUser onOpenChange={onOpenChange} user={user} />
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

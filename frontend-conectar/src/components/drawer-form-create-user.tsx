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

export const DrawerCreateUser = ({
  open,
  onOpenChange,
}: DrawerCreateUserProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Deseja Adicionar novo usuário</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <FormNewUser />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="ml-4 cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

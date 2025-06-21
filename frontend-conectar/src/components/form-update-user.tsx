/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Role } from "@/types/role.enum";
import { usersUpdateFetch } from "@/api/user";
import { UserTypes } from "@/types/user.types";

const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail inválido" }),
  role: z.string().optional(),
});

type UpdateFormUser = z.infer<typeof updateUserSchema>;

interface FormUpdateUserProps extends React.ComponentProps<"div"> {
  onOpenChange: (open: boolean) => void;
  user?: UserTypes | null;
}

export function FormUpdateUser({
  className,
  onOpenChange,
  user,
  ...props
}: FormUpdateUserProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async ({ email, name }: UpdateFormUser) => {
      const role = Role.User;
      const userResponse = await usersUpdateFetch<UserTypes>({
        email,
        name,
        role,
        id: user?.id,
      });

      return userResponse;
    },
    onSuccess: (data) => {
      console.log("Criação de Usuário bem sucedida:", data);
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
        exact: false,
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  function onSubmit(data: UpdateFormUser) {
    console.log("Login data:", data);
    const dataComplete = {
      ...data,
      role: Role.User,
    };
    mutation.mutate({
      email: dataComplete.email,
      role: dataComplete.role,
      name: dataComplete.name,
    });
  }

  function onError(errors: any) {
    console.log("❌ Erros de validação:", errors);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="digite seu nome"
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <Button variant="default" className="mt-4 cursor-pointer">
              Atualizar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

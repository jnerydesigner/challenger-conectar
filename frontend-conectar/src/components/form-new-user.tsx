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
import { usersCreateFetch } from "@/api/user";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  role: z.string().optional(),
});

type CreateFormUser = z.infer<typeof createUserSchema>;

export function FormNewUser({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: async ({ email, password, name }: CreateFormUser) => {
      const role = Role.User;
      const user = await usersCreateFetch({ email, password, name, role });

      return user;
    },
    onSuccess: (data) => {
      console.log("Login bem-sucedido:", data);
      queryClient.invalidateQueries({
        queryKey: ["users-data"],
        exact: true,
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormUser>({
    resolver: zodResolver(createUserSchema),
  });

  function onSubmit(data: CreateFormUser) {
    console.log("Login data:", data);
    const dataComplete = {
      ...data,
      role: Role.User,
    };
    mutation.mutate({
      email: dataComplete.email,
      password: dataComplete.password,
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <Button variant="default" className="mt-4 cursor-pointer">
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

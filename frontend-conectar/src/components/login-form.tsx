"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginFetch } from "@/api/login";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginFormData) => {
      const response = await loginFetch(email, password);

      console.log("Login ", response);

      await fetch("/api/set-token", {
        method: "POST",
        body: JSON.stringify({ request: response }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
    onSuccess: (data) => {
      console.log("Login bem-sucedido:", data);
      router.push("/dashboard");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    console.log("Login data:", data);
    mutation.mutate({ email: data.email, password: data.password });
    // aqui você faria o fetch ou axios para autenticar
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Faça Login em sua Conta</CardTitle>
          <CardDescription>
            Entre com Email e Senha em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value="jander.webmaster@gmail.com"
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Recupere sua senha
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value="123456"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  asChild
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`}
                  >
                    Login with Google
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem conta?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Inscreva-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

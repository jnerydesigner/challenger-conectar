"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { usersFetch } from "@/api/user";
import { UserTypes } from "@/types/user.types";
import { Trash2, Pencil } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

export const columns: ColumnDef<UserTypes>[] = [
  {
    accessorKey: "id",
    header: () => <div className="flex justify-center items-center">ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="flex justify-center items-center">Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="flex justify-center items-center">Email</div>,
  },
  {
    id: "actions",
    header: () => <div className="flex justify-center items-center">Ações</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Editar", user.id)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Deletar", user.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      );
    },
  },
];

export default function UsersTable() {
  const { data } = useQuery({
    queryKey: ["users-data"],
    queryFn: () => usersFetch<UserTypes[]>(),
  });

  console.log(data);
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800">Users Table</h1>
      <DataTable columns={columns} data={data ?? []} />
    </>
  );
}

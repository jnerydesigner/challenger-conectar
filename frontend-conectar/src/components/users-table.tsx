/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDeleteFetch, usersFetch } from "@/api/user";
import { PaginationResponseDTO, UserTypes } from "@/types/user.types";
import { Trash2, Pencil } from "lucide-react";

import { CustomColumnDef as ColumnDef } from "@/types/custom-column-def";
import { DataTable } from "./data-table";
import { PaginationUsers } from "./pagination-users";
import { useState } from "react";

import { DynamicHeights } from "@/utils/dinamic-heights";

export const columns: ColumnDef<UserTypes>[] = [
  {
    accessorKey: "id",
    header: () => <div className="flex justify-center items-center">ID</div>,
    meta: {
      className: "w-[5%]",
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="flex justify-center items-center">Name</div>,
    meta: {
      className: "w-[45%]",
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="flex justify-center items-center">Email</div>,
    meta: {
      className: "w-[20%]",
    },
  },
  {
    accessorKey: "role",
    header: () => <div className="flex justify-center items-center">Role</div>,
    meta: {
      className: "w-[15%]",
    },
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
            className="cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      );
    },
    meta: {
      className: "w-[15%]",
    },
  },
];

export default function UsersTable() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limitRegister] = useState(5);

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userDeleteFetch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-data"] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      deleteUserMutation.mutate(id);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users-data", page, limitRegister],
    queryFn: ({ queryKey }) => {
      const [, currentPage, limitRegister] = queryKey;
      return usersFetch<PaginationResponseDTO>(
        currentPage as number,
        limitRegister as number
      );
    },
  });

  const columnsWithDelete = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }: any) => {
            const user = row.original;
            return (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log("Editar", user.id)}
                  className="cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(user.id)}
                  className="cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            );
          },
        }
      : col
  );

  if (isLoading) {
    return <h3>... carregando</h3>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Users Table</h1>
      <div
        className="relative flex flex-col border rounded-md bg-white shadow"
        style={{ height: `${DynamicHeights(limitRegister)}px` }}
      >
        <div className="overflow-y-auto px-4 pt-4 pb-20">
          <DataTable columns={columnsWithDelete} data={data?.users ?? []} />
        </div>
        <div className="absolute bottom-0 w-full bg-white border-t px-4 py-2">
          <PaginationUsers
            page={data?.page ?? 1}
            total={data?.total ?? 0}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}

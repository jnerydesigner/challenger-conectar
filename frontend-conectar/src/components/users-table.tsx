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
import { DialogConfirmDeleteUser } from "./dialog-confirm-delete-user";
import { DrawerUpdateUser } from "./drawer-form-update-user";
import { SelectFilter } from "./select-filter";
import {
  directionOptions,
  fieldOptions,
  roleOptions,
} from "@/utils/filters-object";

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

interface UsersTableProps {
  token: string;
}

export default function UsersTable({ token }: UsersTableProps) {
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [fieldFilter, setFieldFilter] = useState<string>("id");
  const [directionFilter, setDirectionFilter] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limitRegister] = useState(5);

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userDeleteFetch(id, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-data"] });
    },
  });

  const handleUpdateUser = (id: number) => {
    const user = data?.users.find((u) => u.id === id);
    if (user) {
      setSelectedUser(user);
      setDrawerOpen(true);
    }
  };

  const handleDeleteRequest = (id: number) => {
    setSelectedUserId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      deleteUserMutation.mutate(selectedUserId);
      setDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "users-data",
      page,
      limitRegister,
      roleFilter,
      fieldFilter,
      directionFilter,
    ],
    queryFn: ({ queryKey }) => {
      const [, currentPage, limitRegister] = queryKey;
      console.log("Filtro de Role", roleFilter);
      console.log("Filtro de Field", fieldFilter);
      console.log("Filtro de Direção", directionFilter);
      return usersFetch<PaginationResponseDTO>(
        currentPage as number,
        limitRegister as number,
        token as string,
        roleFilter || "",
        fieldFilter || "",
        directionFilter
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
                  onClick={() => handleUpdateUser(user.id)}
                  className="cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteRequest(user.id)}
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
        style={{ height: `${DynamicHeights(limitRegister + 2)}px` }}
      >
        <div className="h-12 mt-2 mb-4 flex justify-end gap-4 px-4">
          <SelectFilter
            options={roleOptions}
            value={roleFilter}
            onChange={(value) => setRoleFilter(value)}
            placeholder="Todas as roles"
          />

          <SelectFilter
            options={fieldOptions}
            value={fieldFilter}
            onChange={(value) => setFieldFilter(value)}
            placeholder="Todos os Campos"
          />

          <SelectFilter
            options={directionOptions}
            value={directionFilter}
            onChange={(value) => setDirectionFilter(value)}
            placeholder="Direção Decrescente"
          />

          <select
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
          >
            <option value="DESC">Direção</option>
            <option value="ASC">Crescente</option>
            <option value="DESC">Decrescente</option>
          </select>
        </div>
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

      <DialogConfirmDeleteUser
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleConfirmDelete}
      />
      <DrawerUpdateUser
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        user={selectedUser}
        token={token}
      />
    </>
  );
}

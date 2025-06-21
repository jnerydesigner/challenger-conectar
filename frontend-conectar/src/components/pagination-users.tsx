import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

type PaginationProps = {
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export const PaginationUsers = ({
  totalPages,
  onPageChange,
  page,
  total,
}: PaginationProps) => {
  console.log(total, page);

  const pages: (number | "start-ellipsis" | "end-ellipsis")[] = [];

  if (page > 3) {
    pages.push(1);
    if (page > 4) pages.push("start-ellipsis");
  }

  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 0 && i <= totalPages) pages.push(i);
  }

  if (page < totalPages - 2) {
    if (page < totalPages - 3) pages.push("end-ellipsis");
    pages.push(totalPages);
  }
  return (
    <Pagination className="flex justify-between items-center gap-4">
      <p>Total de registros {total}</p>
      <PaginationContent>
        <PaginationItem>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(1);
            }}
          >
            Primeira Página
          </Link>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </PaginationItem>
        {pages.map((p, index) => {
          if (typeof p === "string" && p.includes("ellipsis")) {
            return (
              <PaginationItem key={p + index}>
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p as number);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(totalPages);
            }}
          >
            Ultima Pagina
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

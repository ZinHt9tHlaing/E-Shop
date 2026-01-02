import type { Product } from "@/types/productType";
import useProductColumns from "./ProductTableColumns";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProductTableProps {
  data: Product[];
}

const ProductTable = ({ data }: ProductTableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useProductColumns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <div>
        <Table>
          {/* Render table header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGp) => (
              <TableRow key={headerGp.id}>
                {headerGp.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Render table body */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No products.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* pagination */}
        <div className="flex items-center gap-4 justify-end mt-4 text-xs">
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-24 h-5 text-xs">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rows per page</SelectLabel>
                {[5, 10, 20, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    Show {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer active:scale-90 duration-150"
          >
            Prev
          </Button>

          {/* page starts 1 */}
          <span className="text-xs font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer active:scale-90 duration-150"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

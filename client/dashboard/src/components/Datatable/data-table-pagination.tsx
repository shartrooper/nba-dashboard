import { Table } from "@tanstack/react-table"
import { Button } from "../Elements/Button"
import { ArrowLeftIcon, ArrowRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { Listbox } from "@headlessui/react"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden sm:block text-sm font-medium">Rows per page</p>
          <Listbox as="div" className="relative" value={`${table.getState().pagination.pageSize}`}
            onChange={(value: string) => {
              table.setPageSize(Number(value))
            }}
          >
            <Listbox.Button className="
              border border-chalkboard 
              rounded-sm flex items-center 
              justify-center w-12">
              <span>
                {table.getState().pagination.pageSize}
              </span>
              <ChevronUpDownIcon className="w-5 h-5" />
            </Listbox.Button>
            <Listbox.Options className="absolute bg-midnight border border-chalkboard w-12 rounded-sm text-center -top-[7.5rem]">
              {[10, 20, 30, 40, 50].map(pageSize => (
                <Listbox.Option
                  className="cursor-pointer hover:bg-basketball-dim"
                  key={pageSize}
                  value={pageSize}
                >
                  {pageSize}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronDoubleLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  actions?: (row: T) => React.ReactNode;
}

export default function DataTable<T extends Record<string, unknown>>({
  data, columns, searchable = true, searchPlaceholder = "Search…",
  pageSize = 10, className, emptyMessage = "No data found.", actions,
}: DataTableProps<T>) {
  const [search,  setSearch]  = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page,    setPage]    = useState(1);

  const filtered = search
    ? data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase())))
    : data;

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged      = sorted.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  function val(row: T, key: string): unknown {
    return key.split(".").reduce((o: unknown, k) =>
      o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined, row);
  }

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      {/* Search bar */}
      {searchable && (
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              className="erp-input pl-9 py-2 text-sm"
            />
          </div>
          <span className="text-xs text-slate-400 ml-auto shrink-0">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                  className={cn(
                    "px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap",
                    col.headerClassName,
                    col.sortable && "cursor-pointer hover:text-slate-700 select-none"
                  )}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      sortKey === String(col.key)
                        ? sortDir === "asc"
                          ? <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
                          : <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                        : <ChevronsUpDown className="w-3 h-3 text-slate-300" />
                    )}
                  </span>
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-5 py-16 text-center text-sm text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className={cn("px-5 py-3.5 text-sm text-slate-700", col.className)}>
                      {col.render ? col.render(val(row, String(col.key)), row) : String(val(row, String(col.key)) ?? "")}
                    </td>
                  ))}
                  {actions && <td className="px-5 py-3.5 text-right">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)}
                className={cn("w-8 h-8 text-xs font-medium rounded-lg transition-colors",
                  page === n ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100")}>
                {n}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

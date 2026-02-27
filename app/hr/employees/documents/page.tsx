"use client";

import { FileText, Download, Eye, Upload, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

const documents = [
  { id: 1, employee: "Sarah Johnson", empId: "EMP001", docType: "National ID", fileName: "sarah_id.pdf", size: "1.2 MB", uploaded: "2022-01-15", status: "verified", expires: "2028-01-15" },
  { id: 2, employee: "Sarah Johnson", empId: "EMP001", docType: "Employment Contract", fileName: "sarah_contract.pdf", size: "0.8 MB", uploaded: "2022-01-15", status: "verified", expires: null },
  { id: 3, employee: "Mike Chen", empId: "EMP002", docType: "National ID", fileName: "mike_id.pdf", size: "1.0 MB", uploaded: "2021-08-22", status: "verified", expires: "2026-08-22" },
  { id: 4, employee: "Mike Chen", empId: "EMP002", docType: "Educational Certificate", fileName: "mike_degree.pdf", size: "2.1 MB", uploaded: "2021-08-22", status: "verified", expires: null },
  { id: 5, employee: "Emily Davis", empId: "EMP003", docType: "Employment Contract", fileName: "emily_contract.pdf", size: "0.9 MB", uploaded: "2022-03-10", status: "verified", expires: null },
  { id: 6, employee: "James Wilson", empId: "EMP005", docType: "National ID", fileName: "james_id.pdf", size: "1.1 MB", uploaded: "2023-04-18", status: "pending", expires: "2029-04-18" },
  { id: 7, employee: "James Wilson", empId: "EMP005", docType: "Employment Contract", fileName: "james_contract.pdf", size: "0.7 MB", uploaded: "2023-04-18", status: "verified", expires: null },
  { id: 8, employee: "Linda Martinez", empId: "EMP006", docType: "Educational Certificate", fileName: "linda_cert.pdf", size: "3.2 MB", uploaded: "2023-07-20", status: "expired", expires: "2025-07-20" },
];

const statusIcon = {
  verified: CheckCircle2,
  pending: Clock,
  expired: AlertCircle,
};

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader
        title="Employee Documents"
        description="Manage and verify employee documentation"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Upload className="w-4 h-4" /> Upload Document
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Documents", value: documents.length, variant: "primary" as const },
          { label: "Verified", value: documents.filter(d => d.status === "verified").length, variant: "success" as const },
          { label: "Needs Attention", value: documents.filter(d => d.status !== "verified").length, variant: "warning" as const },
        ].map(({ label, value, variant }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <input placeholder="Search documents..." className="w-full max-w-xs px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Employee", "Document Type", "File", "Size", "Uploaded", "Expires", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {documents.map((doc) => {
                const StatusIcon = statusIcon[doc.status as keyof typeof statusIcon];
                return (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800">{doc.employee}</p>
                        <p className="text-xs text-slate-400">{doc.empId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{doc.docType}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs">{doc.fileName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{doc.size}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{doc.uploaded}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{doc.expires ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={doc.status === "verified" ? "success" : doc.status === "pending" ? "warning" : "danger"}
                        dot
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

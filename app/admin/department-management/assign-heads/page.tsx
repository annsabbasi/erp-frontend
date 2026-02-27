"use client";

import { useState } from "react";
import { UserCog, Check, Save } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Badge from "@/components/shared/Badge";

const departments = [
  { id: 1, name: "Human Resources", code: "HR" },
  { id: 2, name: "Finance & Accounting", code: "FIN" },
  { id: 3, name: "Revenue Management", code: "REV" },
  { id: 4, name: "Operations", code: "OPS" },
  { id: 5, name: "Information Technology", code: "IT" },
  { id: 6, name: "Sales & Marketing", code: "SAL" },
];

const users = [
  { id: 1, name: "Sarah Johnson", role: "HR", email: "sarah.johnson@erp.com" },
  { id: 2, name: "Mike Chen", role: "Accountant", email: "mike.chen@erp.com" },
  { id: 3, name: "Emily Davis", role: "Finance Officer", email: "emily.davis@erp.com" },
  { id: 4, name: "Alex Thompson", role: "Revenue Manager", email: "alex.thompson@erp.com" },
  { id: 5, name: "Jennifer Lee", role: "HR", email: "jen.lee@erp.com" },
  { id: 6, name: "David Kim", role: "Revenue Manager", email: "david.kim@erp.com" },
  { id: 7, name: "System Admin", role: "Admin", email: "admin@erp.com" },
  { id: 8, name: "Linda Martinez", role: "Accountant", email: "linda.m@erp.com" },
];

const initialAssignments: Record<number, number | null> = {
  1: 1, 2: 2, 3: 4, 4: null, 5: 7, 6: 5,
};

export default function AssignHeadsPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageHeader
        title="Assign Department Heads"
        description="Assign senior staff as heads of each department"
        actions={
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              saved ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {departments.map((dept) => {
          const assignedUserId = assignments[dept.id];
          const assignedUser = users.find((u) => u.id === assignedUserId);

          return (
            <div key={dept.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <UserCog className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{dept.name}</h3>
                  <Badge variant="secondary">{dept.code}</Badge>
                </div>
              </div>

              {assignedUser && (
                <div className="bg-indigo-50 rounded-lg px-3 py-2.5 mb-3 flex items-center gap-2">
                  <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {assignedUser.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-indigo-800">{assignedUser.name}</p>
                    <p className="text-xs text-indigo-600">{assignedUser.role} · {assignedUser.email}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Select Department Head
                </label>
                <select
                  value={assignedUserId ?? ""}
                  onChange={(e) =>
                    setAssignments({
                      ...assignments,
                      [dept.id]: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">— Unassigned —</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

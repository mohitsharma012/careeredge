"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Ban,
  Filter,
  Plus,
  Shield,
} from "lucide-react";

const employees = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@cv.ai",
    role: "Super Admin",
    status: "active",
    lastLogin: "2024-03-20 10:30 AM",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Support Team",
    email: "support@cv.ai",
    role: "Support Admin",
    status: "active",
    lastLogin: "2024-03-19 03:45 PM",
    permissions: ["users", "subscriptions"],
  },
  {
    id: "3",
    name: "Content Manager",
    email: "content@cv.ai",
    role: "Content Admin",
    status: "inactive",
    lastLogin: "2024-03-18 11:20 AM",
    permissions: ["templates", "content"],
  },
];

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "Support Admin",
  });

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length
        ? []
        : employees.map((employee) => employee.id)
    );
  };

  const handleAddEmployee = async () => {
    // Here you would typically make an API call to add the employee
    console.log("Adding employee:", newEmployee);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Employees</h1>
              <p className="text-gray-600">Manage admin users and their roles</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-custom-medium hover:bg-custom-dark"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="all">All Roles</option>
              <option value="super-admin">Super Admin</option>
              <option value="support-admin">Support Admin</option>
              <option value="content-admin">Content Admin</option>
            </select>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === employees.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleEmployeeSelect(employee.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span>{employee.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                      employee.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {employee.status}
                  </div>
                </TableCell>
                <TableCell>{employee.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {employee.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Ban className="h-4 w-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                placeholder="Enter employee name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                placeholder="Enter employee email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newEmployee.role}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Support Admin">Support Admin</option>
                <option value="Content Admin">Content Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-custom-medium hover:bg-custom-dark"
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
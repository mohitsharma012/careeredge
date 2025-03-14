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
  Crown,
  Filter,
} from "lucide-react";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    joinDate: "2024-03-15",
    lastLogin: "2024-03-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Enterprise",
    status: "active",
    joinDate: "2024-03-14",
    lastLogin: "2024-03-19",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    plan: "Free",
    status: "trial",
    joinDate: "2024-03-13",
    lastLogin: "2024-03-18",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === users.length ? [] : users.map((user) => user.id)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Users</h1>
              <p className="text-gray-600">Manage your users and their access</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-custom-medium hover:bg-custom-dark">
              Add User
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
              placeholder="Search users..."
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
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      user.plan === "Pro"
                        ? "bg-purple-100 text-purple-600"
                        : user.plan === "Enterprise"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Crown className="h-3 w-3" />
                    {user.plan}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                      user.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {user.status}
                  </div>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
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
    </div>
  );
}
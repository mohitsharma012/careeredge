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
  Crown,
  Search,
  Download,
  MoreVertical,
  Edit,
  Mail,
  Ban,
  Filter,
  CreditCard,
  Calendar,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const subscriptions = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
    plan: "Pro",
    status: "active",
    amount: "$12.00",
    startDate: "2024-02-15",
    nextBilling: "2024-03-15",
    paymentMethod: "**** 4242",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    plan: "Enterprise",
    status: "active",
    amount: "$49.00",
    startDate: "2024-02-14",
    nextBilling: "2024-03-14",
    paymentMethod: "**** 5555",
  },
  {
    id: "3",
    user: {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    plan: "Pro",
    status: "cancelled",
    amount: "$12.00",
    startDate: "2024-02-13",
    nextBilling: "2024-03-13",
    paymentMethod: "**** 1234",
  },
];

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscriptionSelect = (subscriptionId: string) => {
    setSelectedSubscriptions((prev) =>
      prev.includes(subscriptionId)
        ? prev.filter((id) => id !== subscriptionId)
        : [...prev, subscriptionId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSubscriptions(
      selectedSubscriptions.length === subscriptions.length
        ? []
        : subscriptions.map((subscription) => subscription.id)
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Subscriptions</h1>
              <p className="text-gray-600">
                Manage user subscriptions and billing
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-custom-medium hover:bg-custom-dark">
              Add Subscription
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
              placeholder="Search subscriptions..."
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
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedSubscriptions.length === subscriptions.length
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedSubscriptions.includes(subscription.id)}
                    onChange={() => handleSubscriptionSelect(subscription.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{subscription.user.name}</div>
                    <div className="text-sm text-gray-500">
                      {subscription.user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      subscription.plan === "Pro"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Crown className="h-3 w-3" />
                    {subscription.plan}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {subscription.status === "active" ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {subscription.status}
                  </div>
                </TableCell>
                <TableCell>{subscription.amount}</TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    {subscription.paymentMethod}
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
                        Edit Plan
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Renew
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" />
                        Change Billing Date
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Email Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Ban className="h-4 w-4 mr-2" />
                        Cancel Subscription
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
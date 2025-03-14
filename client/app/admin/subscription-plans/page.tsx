"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Crown,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  X,
  Star,
  Download,
} from "lucide-react";

interface Feature {
  id: string;
  name: string;
  description: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  features: Feature[];
  status: "active" | "inactive";
  isPopular: boolean;
}

const initialPlans: Plan[] = [
  {
    id: "1",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    interval: "monthly",
    features: [
      { id: "1", name: "2 Resume Templates", description: "Basic templates" },
      { id: "2", name: "Basic AI Suggestions", description: "Limited AI features" },
      { id: "3", name: "Standard Export Formats", description: "PDF export" },
    ],
    status: "active",
    isPopular: false,
  },
  {
    id: "2",
    name: "Pro",
    description: "Most popular for job seekers",
    price: 12,
    interval: "monthly",
    features: [
      { id: "1", name: "All Resume Templates", description: "Access to all templates" },
      { id: "2", name: "Advanced AI Optimization", description: "Full AI features" },
      { id: "3", name: "Multiple Export Formats", description: "PDF, Word, TXT" },
      { id: "4", name: "Priority Support", description: "24/7 support" },
    ],
    status: "active",
    isPopular: true,
  },
];

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: "",
    description: "",
    price: 0,
    interval: "monthly",
    features: [],
    status: "active",
    isPopular: false,
  });

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.description) {
      const plan: Plan = {
        id: Date.now().toString(),
        name: newPlan.name,
        description: newPlan.description,
        price: newPlan.price || 0,
        interval: newPlan.interval || "monthly",
        features: newPlan.features || [],
        status: newPlan.status || "active",
        isPopular: newPlan.isPopular || false,
      };
      setPlans([...plans, plan]);
      setIsAddDialogOpen(false);
      setNewPlan({});
    }
  };

  const handleEditPlan = () => {
    if (selectedPlan) {
      setPlans(plans.map((p) => (p.id === selectedPlan.id ? selectedPlan : p)));
      setIsEditDialogOpen(false);
      setSelectedPlan(null);
    }
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((p) => p.id !== planId));
  };

  const handleToggleStatus = (planId: string) => {
    setPlans(
      plans.map((p) =>
        p.id === planId
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
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
              <h1 className="text-2xl font-bold">Subscription Plans</h1>
              <p className="text-gray-600">Manage your subscription plans and features</p>
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
              Add Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-sm text-gray-500">{plan.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    ${plan.price}/{plan.interval}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {plan.features.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                      plan.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {plan.status}
                  </div>
                </TableCell>
                <TableCell>
                  {plan.isPopular ? (
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <Star className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(plan.id)}>
                        {plan.status === "active" ? (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
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

      {/* Add Plan Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name
              </label>
              <Input
                value={newPlan.name || ""}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                placeholder="Enter plan name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                value={newPlan.description || ""}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                placeholder="Enter plan description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                type="number"
                value={newPlan.price || 0}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: Number(e.target.value) })
                }
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Interval
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={newPlan.interval || "monthly"}
                onChange={(e) =>
                  setNewPlan({
                    ...newPlan,
                    interval: e.target.value as "monthly" | "yearly",
                  })
                }
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPopular"
                checked={newPlan.isPopular || false}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, isPopular: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="isPopular" className="text-sm text-gray-700">
                Mark as Popular Plan
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-custom-medium hover:bg-custom-dark"
              onClick={handleAddPlan}
            >
              Add Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPlan && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <Input
                    value={selectedPlan.name}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={selectedPlan.description}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <Input
                    type="number"
                    value={selectedPlan.price}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Billing Interval
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={selectedPlan.interval}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        interval: e.target.value as "monthly" | "yearly",
                      })
                    }
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editIsPopular"
                    checked={selectedPlan.isPopular}
                    onChange={(e) =>
                      setSelectedPlan({
                        ...selectedPlan,
                        isPopular: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="editIsPopular" className="text-sm text-gray-700">
                    Mark as Popular Plan
                  </label>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-custom-medium hover:bg-custom-dark"
              onClick={handleEditPlan}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
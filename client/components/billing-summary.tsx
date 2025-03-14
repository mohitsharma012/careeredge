"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Receipt,
  CreditCard,
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  ArrowRight,
  Download,
} from "lucide-react";

interface BillingSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planDetails: {
    name: string;
    price: number;
    billingCycle: string;
    startDate: string;
    nextBilling: string;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BillingSummary({
  open,
  onOpenChange,
  planDetails,
  onConfirm,
  onCancel,
}: BillingSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsComplete(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConfirm();
  };

  const calculateTotals = () => {
    if (!planDetails) {
      return { subtotal: 0, discount: 0, tax: 0, total: 0 };
    }
    
    const subtotal = planDetails.price;
    const discount = planDetails.name === "Pro" ? 10 : 0; // Example discount
    const tax = (subtotal - discount) * 0.1; // Example 10% tax
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  };

  const { subtotal, discount, tax, total } = calculateTotals();

  if (!planDetails) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <Receipt className="h-6 w-6 text-custom-medium" />
            <DialogTitle className="text-2xl font-bold">
              Billing Summary
            </DialogTitle>
          </motion.div>
          <DialogDescription>
            Review your subscription details and confirm
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Plan Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{planDetails.name} Plan</span>
              <span className="text-custom-medium font-semibold">
                ${planDetails.price}/mo
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Billing cycle: {planDetails.billingCycle}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Next billing date: {planDetails.nextBilling}</span>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Payment Method</div>
                  <div className="text-sm text-gray-600">
                    Visa ending in 4242
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing || isComplete}
            className="flex-1 bg-custom-medium hover:bg-custom-dark"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : isComplete ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Complete!
              </span>
            ) : (
              <>
                Confirm Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  User,
  Package,
  FileText,
  CreditCard,
  Settings,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const accountSections = [
  {
    name: "Orders",
    icon: Package,
    description: "Track orders, view history, and reorder previous purchases.",
    stat: "0 active orders",
    href: "/account/orders",
  },
  {
    name: "Quotes",
    icon: FileText,
    description: "View pending quotes, request revisions, and convert to orders.",
    stat: "0 pending quotes",
    href: "/account/quotes",
  },
  {
    name: "Quick Reorder",
    icon: ShoppingCart,
    description: "One-click reorder from your purchase history. Save time on recurring orders.",
    stat: "Reorder in 1 click",
    href: "/account/reorder",
  },
  {
    name: "Billing & Payment",
    icon: CreditCard,
    description: "Manage payment methods, net terms, and download invoices.",
    stat: "Net-30 available",
    href: "/account/billing",
  },
  {
    name: "Addresses",
    icon: MapPin,
    description: "Manage shipping and billing addresses for fast checkout.",
    stat: "0 saved addresses",
    href: "/account/addresses",
  },
  {
    name: "Usage & Analytics",
    icon: BarChart3,
    description: "Track spending, popular products, and ordering patterns.",
    stat: "View insights",
    href: "/account/analytics",
  },
  {
    name: "Order History",
    icon: Clock,
    description: "Complete history of all orders, quotes, and RMA requests.",
    stat: "Full history",
    href: "/account/history",
  },
  {
    name: "Settings",
    icon: Settings,
    description: "Update profile, notification preferences, and API access.",
    stat: "Profile & API keys",
    href: "/account/settings",
  },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[#262626] bg-gradient-to-b from-[#0A0A0A] to-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <User className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">My Account</h1>
              <p className="text-neutral-400">Manage your orders, quotes, and company settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Sign In Prompt (shown when not authenticated) */}
        <Card className="mb-8 border-indigo-500/20 bg-indigo-500/5">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Sign in to access your account</h2>
              <p className="text-sm text-neutral-400">
                Track orders, manage quotes, and access net-30 terms.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Create Account</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accountSections.map((section, i) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="h-full group hover:border-indigo-500/50 transition-all cursor-pointer">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                      <section.icon className="w-4.5 h-4.5 text-indigo-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{section.name}</h3>
                  </div>
                  <p className="text-xs text-neutral-500 mb-3">{section.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{section.stat}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

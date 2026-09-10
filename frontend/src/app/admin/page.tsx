"use client";

import { 
  Map, 
  MapPin, 
  DollarSign, 
  Tags, 
  Settings, 
  CalendarCheck
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck, description: "Manage platform reservations" },
  { name: "Countries", href: "/admin/countries", icon: Map, description: "Manage supported countries" },
  { name: "Cities", href: "/admin/cities", icon: MapPin, description: "Manage supported cities" },
  { name: "Currencies", href: "/admin/currencies", icon: DollarSign, description: "Manage supported currencies" },
  { name: "Categories", href: "/admin/categories", icon: Tags, description: "Manage unit categories" },
  { name: "Settings", href: "/admin/settings", icon: Settings, description: "Configure platform settings" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
        <p className="text-zinc-500 mt-2">Welcome to the administration panel. Overall dashboard statistics are not supported by the backend.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="group block p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                <link.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 group-hover:text-primary transition-colors">{link.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{link.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="text-amber-800 font-semibold mb-2">Notice: Unsupported Features</h3>
        <ul className="list-disc list-inside text-amber-700 text-sm space-y-1">
          <li>Dashboard Statistics Overview API is not supported by the backend.</li>
          <li>User Management API is not supported by the backend.</li>
        </ul>
      </div>
    </div>
  );
}

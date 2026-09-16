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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-serif tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted mt-3 font-light text-base max-w-2xl">Welcome to the administration panel. Overall dashboard statistics are not supported by the backend.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="group block p-8 bg-surface rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                <link.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{link.name}</h3>
                <p className="text-sm text-muted font-light mt-1.5">{link.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-[#D9C4A1]/10 border border-[#D9C4A1]/30 rounded-[2rem] p-8">
        <h3 className="text-foreground font-serif text-xl mb-3">Notice: Unsupported Features</h3>
        <ul className="list-disc list-inside text-muted font-light text-base space-y-2">
          <li>Dashboard Statistics Overview API is not supported by the backend.</li>
          <li>User Management API is not supported by the backend.</li>
        </ul>
      </div>
    </div>
  );
}

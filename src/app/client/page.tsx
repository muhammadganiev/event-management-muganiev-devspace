"use client";

import { AppSidebar } from "@/components/client-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import EventCard from "./event-card";
import { usePublicEvents } from "@/hooks/usePublicEvents";
import { useState } from "react";
import EventDetailModal from "./event-detail-modal";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/supabase";

export default function ClientEventsPage() {
  const { events, loading } = usePublicEvents();
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleRegister = (event: Event) => {
    toast({
      title: "Registration Started",
      description: `You're registering for ${event.title}. Click "View Details" for the full registration form.`,
      className: "success-toast",
    });
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
        <EventDetailModal
          event={selectedEvent}
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

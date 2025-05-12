"use client";
import { AppSidebar } from "@/components/app-sidebar";
import DataTable from "@/components/data-table";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEvents } from "@/hooks/UseEvents";

// TODO: Implement route protection (only allow logged-in admins)
// TODO: Replace data with real event data and add CRUD operations

export default function AdminPage() {
  const {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents,
  } = useEvents();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable
                events={events}
                createEvent={createEvent}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
                refreshEvents={refreshEvents}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

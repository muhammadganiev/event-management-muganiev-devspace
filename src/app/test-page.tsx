"use client";

// Import using all the different alias patterns
import { SiteHeader } from "@components";
import { SidebarInset, SidebarProvider } from "@ui";
import { useEvents } from "@hooks";

export default function TestPage() {
  const { events, loading } = useEvents();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Import Test Page</h1>
      <p>If you can see this page, all the imports are working correctly!</p>
      <div className="mt-4">
        <p>Number of events: {loading ? "Loading..." : events.length}</p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, LayoutGrid } from "lucide-react";
import EventTable from "@/app/admin/event-table";
import EventFormDialog from "@/app/admin/event-form-dialog";
import type { Event } from "@/app/admin/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialEvents } from "@/app/admin/data";

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(
    filteredEvents.length / Number.parseInt(rowsPerPage)
  );
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * Number.parseInt(rowsPerPage),
    currentPage * Number.parseInt(rowsPerPage)
  );

  // Create a new event
  const handleCreateEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: (events.length + 1).toString(),
      image: event.image || "/placeholder.svg?height=300&width=400", // Set placeholder if no image
    };
    // Add the new event and sort by date (newest first)
    const updatedEvents = [...events, newEvent].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEvents(updatedEvents);
    setIsCreateDialogOpen(false);
  };

  // Update an existing event
  const handleUpdateEvent = (updatedEvent: Event) => {
    // Ensure the image has a placeholder if not provided
    if (!updatedEvent.image) {
      updatedEvent.image = "/placeholder.svg?height=300&width=400";
    }

    // Update the event and maintain sorting
    const updatedEvents = events
      .map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setEvents(updatedEvents);
    setCurrentEvent(null);
  };

  // Delete an event
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="overflow-x-auto pb-2 sm:pb-0">
              <Tabs defaultValue="outline" className="w-auto">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger
                    value="outline"
                    className="data-[state=active]:bg-secondary text-xs sm:text-sm"
                  >
                    Outline
                  </TabsTrigger>
                  <TabsTrigger
                    value="past-performance"
                    className="data-[state=active]:bg-secondary text-xs sm:text-sm"
                  >
                    Past Performance{" "}
                    <span className="ml-1 rounded-full bg-secondary px-1.5 text-xs">
                      3
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="key-personnel"
                    className="data-[state=active]:bg-secondary text-xs sm:text-sm"
                  >
                    Key Personnel{" "}
                    <span className="ml-1 rounded-full bg-secondary px-1.5 text-xs">
                      2
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="focus-documents"
                    className="data-[state=active]:bg-secondary text-xs sm:text-sm"
                  >
                    Focus Documents
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 sm:h-9 text-xs sm:text-sm"
              >
                <LayoutGrid className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Customize</span> Columns
              </Button>
              <Button
                size="sm"
                className="h-8 sm:h-9 text-xs sm:text-sm"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Add</span> Section
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <EventTable
            events={paginatedEvents}
            onEdit={setCurrentEvent}
            onDelete={handleDeleteEvent}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {filteredEvents.length === 0
              ? "0 of 0 row(s) selected."
              : `0 of ${filteredEvents.length} row(s) selected.`}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm">Rows per page</span>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-xs sm:text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <div className="flex">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">First page</span>
                  <span>«</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-none border-l-0"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous page</span>
                  <span>‹</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-none border-l-0"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <span className="sr-only">Next page</span>
                  <span>›</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none border-l-0"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <span className="sr-only">Last page</span>
                  <span>»</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Event Dialog */}
        <EventFormDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateEvent}
          title="Create New Event"
        />

        {/* Edit Event Dialog */}
        {currentEvent && (
          <EventFormDialog
            open={!!currentEvent}
            onOpenChange={(open) => !open && setCurrentEvent(null)}
            onSubmit={handleUpdateEvent}
            event={currentEvent}
            title="Edit Event"
          />
        )}
      </div>
    </div>
  );
}

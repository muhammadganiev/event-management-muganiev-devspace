"use client";

import { useState } from "react";
import EventCard from "@/app/client/event-card";
import EventDetailModal from "@/app/client/event-detail-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/supabase";
import { usePublicEvents } from "@/hooks/usePublicEvents";

export default function ClientPage() {
  const { toast } = useToast();
  const { events, loading } = usePublicEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = (event: Event) => {
    toast({
      title: "Registration Started",
      description: `You&apos;re registering for ${event.title}. Click &quot;View Details&quot; for the full registration form.`,
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
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
          Upcoming Events
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Browse our upcoming events and join us for exciting experiences.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-6 sm:mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              We couldn&apos;t find any events matching your search.
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        )}
      </div>

      <EventDetailModal
        event={selectedEvent}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
}

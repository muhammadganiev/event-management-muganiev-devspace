"use client";
import { useState, useEffect } from "react";
import { Event } from "@/lib/supabase";
import { useSocket } from "@/components/SocketProvider";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true); // Only for initial load
  const [isUpdating, setIsUpdating] = useState(false); // For background updates
  const [error, setError] = useState<string | null>(null);
  const socket = useSocket();

  const fetchEvents = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    else setIsUpdating(true);
    try {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      if (showLoading) setLoading(false);
      else setIsUpdating(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, "id" | "created_at">) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("Failed to create event");
      const newEvent = await response.json();
      socket?.emit("eventChanged", { type: "add", event: newEvent });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const updateEvent = async (eventData: Event) => {
    try {
      const response = await fetch(`/api/events/${eventData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error("Failed to update event");
      const updatedEvent = await response.json();
      socket?.emit("eventChanged", { type: "update", event: updatedEvent });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      socket?.emit("eventChanged", { type: "delete", eventId: id });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents(true); // Initial load
    if (!socket) return;
    const handler = () => {
      console.log("eventChanged received");
      fetchEvents(false);
    };
    socket.on("eventChanged", handler);
    return () => {
      socket.off("eventChanged", handler);
    };
  }, [socket]);

  return {
    events,
    loading,
    isUpdating,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refreshEvents: fetchEvents,
  };
}

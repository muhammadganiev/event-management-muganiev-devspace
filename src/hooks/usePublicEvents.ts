"use client";
import { useEffect, useState } from "react";
import type { Event } from "@/lib/supabase";
import { useSocket } from "@/components/SocketProvider";

export function usePublicEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const socket = useSocket();

  const fetchEvents = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    else setIsUpdating(true);
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } finally {
      if (showLoading) setLoading(false);
      else setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchEvents(true); // Initial load
    if (!socket) return undefined; // Return undefined for cleanup if no socket

    const handler = () => fetchEvents(false); // Background update
    socket.on("eventChanged", handler);

    // Return a proper cleanup function
    return () => {
      socket.off("eventChanged", handler);
    };
  }, [socket]);

  return { events, loading, isUpdating };
}

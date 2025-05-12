"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import type { Event } from "../../lib/supabase";

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  onViewDetails: (event: Event) => void;
}

export default function EventCard({
  event,
  onRegister,
  onViewDetails,
}: EventCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={event.image || "/placeholder.svg?height=300&width=400"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardHeader className="flex-none">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
          <Badge
            variant="outline"
            className={`flex-shrink-0 ${
              event.status === "completed"
                ? "bg-green-900/30 text-green-300 border-green-700/50"
                : "bg-amber-900/30 text-amber-300 border-amber-700/50"
            }`}
          >
            {event.status === "completed" ? "Completed" : "Upcoming"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-1">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>{event.attendees.toLocaleString()} attendees</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 mt-auto z-10 relative">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onRegister(event)}
        >
          Register
        </Button>
        <Button className="flex-1" onClick={() => onViewDetails(event)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

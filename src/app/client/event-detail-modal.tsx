"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import type { Event } from "../admin/types";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EventDetailModal({
  event,
  open,
  onOpenChange,
}: EventDetailModalProps) {
  const { toast } = useToast();
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!event) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const completeRegistration = () => {
    // In a real app, you would submit this data to your backend
    console.log("Registration data:", { event: event.id, ...registrationForm });

    // Show success message
    toast({
      title: "Registration successful!",
      description: `You&apos;re registering for ${event.title}. Click &quot;View Details&quot; for the full registration form.`,
      variant: "default",
    });

    // Reset form and close registration section
    setRegistrationForm({
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    setIsRegistering(false);
    setShowConfirmDialog(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="line-clamp-1">{event.title}</span>
            <Badge
              variant="outline"
              className={`self-start sm:self-auto ${
                event.status === "completed"
                  ? "bg-green-900/30 text-green-300 border-green-700/50"
                  : "bg-amber-900/30 text-amber-300 border-amber-700/50"
              }`}
            >
              {event.status === "completed" ? "Completed" : "Upcoming"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="relative h-40 sm:h-64 w-full rounded-md overflow-hidden my-4">
          <Image
            src={event.image || "/placeholder.svg?height=300&width=400"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Description
            </h3>
            <div className="max-h-[150px] overflow-y-auto pr-2 border rounded-md p-3 bg-secondary/10 custom-scrollbar">
              <p className="text-muted-foreground text-sm sm:text-base">
                {event.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">
                Date & Time
              </h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                {event.time}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">Location</h3>
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                {event.attendees.toLocaleString()} attendees
              </div>
            </div>
          </div>

          {event.status !== "completed" && (
            <div className="pt-4">
              {!isRegistering ? (
                <Button
                  onClick={() => setIsRegistering(true)}
                  className="w-full"
                >
                  Register for this Event
                </Button>
              ) : (
                <div className="border rounded-lg p-3 sm:p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Registration Form
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsRegistering(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={registrationForm.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={registrationForm.notes}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Complete Registration
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to register for &quot;{event.title}&quot;?
                By confirming, you agree to attend this event.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={completeRegistration}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm Registration
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}

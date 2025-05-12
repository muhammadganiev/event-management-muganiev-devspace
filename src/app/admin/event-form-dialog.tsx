"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import type { Event } from "./types";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: Omit<Event, "id" | "created_at"> | Event) => Promise<void>;
  event?: Event;
  title: string;
}

export default function EventFormDialog({
  open,
  onOpenChange,
  onSubmit,
  event,
  title,
}: EventFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Event>>(
    event || {
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      attendees: 0,
      status: "upcoming",
      sectionType: "Narrative",
      target: 0,
      limit: 0,
      reviewer: "Unassigned",
      image: "",
    }
  );

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "attendees" || name === "target" || name === "limit"
          ? Number.parseInt(value) || 0
          : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this demo, we'll create a local object URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: imageUrl,
      });
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (event) {
        await onSubmit({ ...(formData as Event), id: event.id });
      } else {
        await onSubmit(formData as Omit<Event, "id" | "created_at">);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="attendees">Expected Attendees</Label>
              <Input
                id="attendees"
                name="attendees"
                type="number"
                min="0"
                value={formData.attendees}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="sectionType">Section Type</Label>
              <Select
                value={formData.sectionType}
                onValueChange={(value) =>
                  handleSelectChange("sectionType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cover page">Cover page</SelectItem>
                  <SelectItem value="Table of contents">
                    Table of contents
                  </SelectItem>
                  <SelectItem value="Executive summary">
                    Executive summary
                  </SelectItem>
                  <SelectItem value="Technical approach">
                    Technical approach
                  </SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Technical content">
                    Technical content
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                name="target"
                type="number"
                min="0"
                value={formData.target}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                name="limit"
                type="number"
                min="0"
                value={formData.limit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">In Process</SelectItem>
                  <SelectItem value="completed">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select
                value={formData.reviewer}
                onValueChange={(value) => handleSelectChange("reviewer", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label>Event Image</Label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-md border border-border">
                {formData.image ? (
                  <>
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Event image"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-5 w-5"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs sm:text-sm">
                    No image
                  </div>
                )}
              </div>
              <div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Label htmlFor="image" className="cursor-pointer">
                  <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </div>
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Recommended size: 400x300px
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              {submitting
                ? "Submitting..."
                : title.includes("Edit")
                ? "Save Changes"
                : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

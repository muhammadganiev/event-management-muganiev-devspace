"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, MoreVertical, GripVertical } from "lucide-react";
import type { Event } from "./types";
import { useState } from "react";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export default function EventTable({
  events,
  onEdit,
  onDelete,
}: EventTableProps) {
  console.log(events);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <Badge variant="outline" className="status-done whitespace-nowrap">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Done
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="status-in-process whitespace-nowrap">
        <Clock className="mr-1 h-3 w-3" /> In Process
      </Badge>
    );
  };

  return (
    <>
      <div className="rounded-md border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40px] p-0 text-center">
                  <Checkbox className="ml-3" />
                </TableHead>
                <TableHead>Header</TableHead>
                <TableHead className="hidden md:table-cell">
                  Section Type
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right hidden sm:table-cell">
                  Target
                </TableHead>
                <TableHead className="text-right hidden sm:table-cell">
                  Limit
                </TableHead>
                <TableHead className="hidden lg:table-cell">Reviewer</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No events found. Create a new event to get started.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                  <TableRow key={event.id} className="group">
                    <TableCell className="p-0 text-center">
                      <div className="flex items-center">
                        <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Checkbox className="ml-1" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {event.image && (
                          <div className="relative h-10 w-10 overflow-hidden rounded-md hidden sm:block">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="line-clamp-1">{event.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">
                            {event.description.length > 60
                              ? event.description.slice(0, 60) + "…"
                              : event.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className="bg-secondary/50 hover:bg-secondary/50"
                      >
                        {event.sectionType}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(event.status)}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {event.target}
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {event.limit}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {event.reviewer}
                    </TableCell>
                    <TableCell className="p-0 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(event)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEventToDelete(event.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DeleteConfirmDialog
        open={!!eventToDelete}
        onOpenChange={(open) => !open && setEventToDelete(null)}
        onConfirm={() => {
          if (eventToDelete) {
            onDelete(eventToDelete);
            setEventToDelete(null);
          }
        }}
      />
    </>
  );
}

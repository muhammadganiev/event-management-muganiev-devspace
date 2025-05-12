// src/app/api/events/[id]/route.ts
// API route for updating and deleting events by ID using Next.js App Router
// Docs: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Always render this route dynamically (no caching)
export const dynamic = "force-dynamic";

/**
 * Update an event by ID
 * Handles PUT requests to /api/events/[id]
 * @param request - NextRequest object
 * @param params - Route params containing the event ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("events")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT /api/events/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

/**
 * Delete an event by ID
 * Handles DELETE requests to /api/events/[id]
 * @param request - NextRequest object
 * @param params - Route params containing the event ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}

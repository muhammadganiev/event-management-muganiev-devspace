import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Always render this route dynamically (no caching)
export const dynamic = "force-dynamic"

/**
 * Update an event by ID
 * Handles PUT requests to /api/events/[id]
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15, params is a Promise that needs to be awaited
    const resolvedParams = await params
    const id = resolvedParams.id

    const body = await request.json()

    const { data, error } = await supabase.from("events").update(body).eq("id", id).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("PUT /api/events/[id] error:", error)
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 })
  }
}

/**
 * Delete an event by ID
 * Handles DELETE requests to /api/events/[id]
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15, params is a Promise that needs to be awaited
    const resolvedParams = await params
    const id = resolvedParams.id

    const { error } = await supabase.from("events").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error)
    return NextResponse.json({ message: "Failed to delete event" }, { status: 500 })
  }
}

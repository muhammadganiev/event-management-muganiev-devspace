import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      date,
      time,
      location,
      image,
      status,
      attendees,
      sectionType,
      target,
      limit,
      reviewer,
      created_by,
    } = body;

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          date,
          time,
          location,
          image,
          status,
          attendees,
          sectionType,
          target,
          limit,
          reviewer,
          created_by,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}

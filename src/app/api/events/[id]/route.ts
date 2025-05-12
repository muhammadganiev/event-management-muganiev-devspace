// src/pages/api/events/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const body = req.body;
      const { data, error } = await supabase
        .from("events")
        .update(body)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Failed to update event" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      res.status(200).json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed to delete event" });
    }
  }
}
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Event = {
  id: string;
  created_at: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  status: "upcoming" | "completed" | "cancelled";
  sectionType: string;
  target: number;
  limit: number;
  reviewer: string;
  image?: string;
  created_by?: string;
};

export type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  status: "upcoming" | "completed" | "cancelled"
  sectionType: string
  target: number
  limit: number
  reviewer: string
  image?: string // Optional image URL
}

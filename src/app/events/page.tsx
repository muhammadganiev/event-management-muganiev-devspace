import { AppSidebar } from "@/components/client-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ExpandableCardGrid,
  EventCard,
} from "@/components/expandable-card-demo-grid";

const events: EventCard[] = [
  {
    title: "Tech Conference 2024",
    description: "A gathering of tech enthusiasts and professionals.",
    date: "2024-10-10",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    ctaText: "Register",
    ctaLink: "#",
    content: (
      <p>
        Join us for a day of insightful talks, networking, and the latest in
        technology trends. Keynote speakers from top tech companies and hands-on
        workshops included.
      </p>
    ),
  },
  {
    title: "Startup Pitch Night",
    description: "Pitch your startup idea to investors.",
    date: "2024-10-15",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    ctaText: "Apply",
    ctaLink: "#",
    content: (
      <p>
        Present your startup to a panel of investors and industry experts. Get
        feedback, funding opportunities, and connect with other founders.
      </p>
    ),
  },
  {
    title: "AI & Machine Learning Bootcamp",
    description: "Hands-on bootcamp for aspiring AI engineers.",
    date: "2024-10-20",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    ctaText: "Join Now",
    ctaLink: "#",
    content: (
      <p>
        Dive deep into AI and machine learning with practical sessions,
        real-world projects, and mentorship from experienced engineers.
      </p>
    ),
  },
  {
    title: "Design Sprint Workshop",
    description: "Collaborative workshop for rapid product design.",
    date: "2024-10-25",
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    ctaText: "Sign Up",
    ctaLink: "#",
    content: (
      <p>
        Work with top designers and product managers to solve real-world
        problems in a fast-paced, hands-on environment.
      </p>
    ),
  },
  {
    title: "Cloud Computing Summit",
    description: "Explore the future of cloud technologies.",
    date: "2024-11-01",
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    ctaText: "Attend",
    ctaLink: "#",
    content: (
      <p>
        Learn about the latest in cloud infrastructure, security, and DevOps
        from industry leaders and practitioners.
      </p>
    ),
  },
  {
    title: "Women in Tech Meetup",
    description: "Networking event for women in technology.",
    date: "2024-11-05",
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    ctaText: "RSVP",
    ctaLink: "#",
    content: (
      <p>
        Connect, share experiences, and empower each other in a supportive
        community of women technologists.
      </p>
    ),
  },
  {
    title: "Frontend Masters Conference",
    description: "Conference for frontend developers and designers.",
    date: "2024-11-10",
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    ctaText: "Get Ticket",
    ctaLink: "#",
    content: (
      <p>
        Deep dive into the latest frontend frameworks, tools, and best practices
        with hands-on sessions and expert talks.
      </p>
    ),
  },
  {
    title: "Hackathon 2024",
    description: "24-hour coding competition for all skill levels.",
    date: "2024-11-15",
    src: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=600&q=80",
    ctaText: "Compete",
    ctaLink: "#",
    content: (
      <p>
        Team up, build something amazing, and win prizes in this high-energy
        hackathon open to everyone.
      </p>
    ),
  },
  {
    title: "Product Management Essentials",
    description: "Master the basics of product management.",
    date: "2024-11-20",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    ctaText: "Enroll",
    ctaLink: "#",
    content: (
      <p>
        Learn the key skills and tools needed to succeed as a product manager in
        today's tech industry.
      </p>
    ),
  },
  {
    title: "Cybersecurity Awareness Day",
    description: "Stay safe online with expert tips and workshops.",
    date: "2024-11-25",
    src: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&q=80",
    ctaText: "Register",
    ctaLink: "#",
    content: (
      <p>
        Join cybersecurity professionals for a day of learning about the latest
        threats and how to protect yourself and your organization.
      </p>
    ),
  },
  {
    title: "Remote Work Best Practices",
    description: "Tips and tools for effective remote work.",
    date: "2024-12-01",
    src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    ctaText: "Join Webinar",
    ctaLink: "#",
    content: (
      <p>
        Discover how to stay productive, connected, and healthy while working
        from home or anywhere in the world.
      </p>
    ),
  },
  {
    title: "Mobile App Development Bootcamp",
    description: "Build your first mobile app from scratch.",
    date: "2024-12-05",
    src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    ctaText: "Start Now",
    ctaLink: "#",
    content: (
      <p>
        Get hands-on experience building mobile apps for iOS and Android with
        expert guidance and real-world projects.
      </p>
    ),
  },
  {
    title: "Data Science for Everyone",
    description: "An introduction to data science concepts and tools.",
    date: "2024-12-10",
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    ctaText: "Learn More",
    ctaLink: "#",
    content: (
      <p>
        Explore the basics of data science, including data analysis,
        visualization, and machine learning.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <ExpandableCardGrid cards={events} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

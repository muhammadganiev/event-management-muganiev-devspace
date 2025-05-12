"use client";
import "./globals.css";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SocketProvider } from "@/components/SocketProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <SocketProvider>
          <div className="relative w-full">
            {pathname === "/" && (
              <Navbar className="fixed inset-x-0 top-0 z-40 w-full">
                {/* Desktop Navigation */}
                <NavBody>
                  <NavbarLogo />
                  <NavItems items={navItems} />
                  <div className="flex items-center gap-4">
                    <NavbarButton variant="primary" href="/login">
                      Login
                    </NavbarButton>
                  </div>
                </NavBody>
                {/* Mobile Navigation */}
                <MobileNav>
                  <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                      isOpen={isMobileMenuOpen}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                  </MobileNavHeader>
                  <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                  >
                    {navItems.map((item, idx) => (
                      <a
                        key={`mobile-link-${idx}`}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="relative text-neutral-600 dark:text-neutral-300"
                      >
                        <span className="block">{item.name}</span>
                      </a>
                    ))}
                    <div className="flex w-full flex-col gap-4">
                      <NavbarButton
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                      >
                        Login
                      </NavbarButton>
                    </div>
                  </MobileNavMenu>
                </MobileNav>
              </Navbar>
            )}
          </div>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}

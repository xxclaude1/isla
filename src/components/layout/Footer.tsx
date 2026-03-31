"use client";

import Link from "next/link";

const footerLinks = {
  clubs: [
    { href: "/clubs/pacha", label: "Pacha" },
    { href: "/clubs/amnesia", label: "Amnesia" },
    { href: "/clubs/hi-ibiza", label: "Hï Ibiza" },
    { href: "/clubs/ushuaia", label: "Ushuaïa" },
    { href: "/clubs/dc10", label: "DC-10" },
    { href: "/clubs/unvrs", label: "UNVRS" },
  ],
  explore: [
    { href: "/events", label: "All Events" },
    { href: "/tonight", label: "Tonight" },
    { href: "/tomorrowland", label: "Tomorrowland Ibiza" },
    { href: "/vip", label: "VIP & Tables" },
  ],
  company: [
    { href: "/about", label: "About ISLA" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border mt-auto">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Get early access
          </h3>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Be first to know when tickets drop. No spam, just the nights that
            matter.
          </p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink transition-colors"
            />
            <button
              type="submit"
              className="gradient-sunset px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(238,9,121,0.3)]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Links Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <Link href="/" className="font-display text-xl font-bold">
            ISLA
          </Link>
          <p className="text-text-muted text-sm mt-3 leading-relaxed">
            The definitive way to experience Ibiza nightlife.
          </p>
        </div>

        {/* Clubs */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
            Clubs
          </h4>
          <ul className="space-y-2">
            {footerLinks.clubs.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
            Explore
          </h4>
          <ul className="space-y-2">
            {footerLinks.explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
            Company
          </h4>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 ISLA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-muted flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-status-available animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 md:h-0" />
    </footer>
  );
}

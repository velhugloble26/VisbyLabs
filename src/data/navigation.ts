export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
];

export const footerExplore: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Performance Marketing", href: "/performance-marketing" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
];

export const footerCompany: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

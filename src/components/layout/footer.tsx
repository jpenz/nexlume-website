import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Products: [
    { name: "Cable Assemblies", href: "/products?category=cable-assemblies" },
    { name: "Connectors", href: "/products?category=connectors-adapters" },
    { name: "Transceivers", href: "/products?category=transceivers" },
    { name: "MPO/MTP", href: "/products?category=mpo-mtp" },
    { name: "All Products", href: "/products" },
  ],
  Solutions: [
    { name: "Data Centers", href: "/solutions#data-centers" },
    { name: "5G / Telecom", href: "/solutions#5g" },
    { name: "FTTH / Broadband", href: "/solutions#ftth" },
    { name: "Enterprise", href: "/solutions#enterprise" },
  ],
  Tools: [
    { name: "Cable Configurator", href: "/configurator" },
    { name: "Upload Plans", href: "/upload-plans" },
    { name: "Compatibility Tools", href: "/resources#compatibility" },
    { name: "Technical Guides", href: "/resources" },
  ],
  Company: [
    { name: "About Nexlume", href: "/company" },
    { name: "Manufacturing", href: "/company#manufacturing" },
    { name: "Quality & Certs", href: "/company#certifications" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Nexlume</span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Precision fiber optic solutions for data centers, 5G networks, and broadband deployments.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Nexlume. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, GraduationCap } from 'lucide-react';

const navigation = {
  solutions: [
    { name: 'AI Agents', href: '/agents' },
    { name: 'WhatsApp Integration', href: '/whatsapp' },
    { name: 'How It Works', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/support' },
    { name: 'Blog', href: '/blog' },
    { name: 'API Reference', href: '/api' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Data Protection', href: '/security' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-md" id='footer'>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-8 xl:col-span-2 animate-fadeIn">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 mb-4 w-fit">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2B6CB0]/30 to-[#63B3ED]/30 rounded-full blur-md"></div>
                  <div className="relative bg-background/80 backdrop-blur-sm p-1.5 rounded-full border border-border/50 shadow-sm">
                    <GraduationCap className="h-6 w-6 text-[#2B6CB0]" />
                  </div>
                </div>
                <span className="font-bold text-xl tracking-tight text-[#2B6CB0]">Smart Agent</span>
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                Empowering businesses with intelligent automation 
                and AI solutions to streamline operations and boost growth.
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="hover:-translate-y-1 transition-transform duration-300">
                <Link
                  href="https://twitter.com"
                  className="block p-2 rounded-full bg-gradient-to-r from-[#2B6CB0]/10 to-[#63B3ED]/10 hover:from-[#2B6CB0]/20 hover:to-[#63B3ED]/20 transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5 text-[#2B6CB0]" />
                </Link>
              </div>
              <div className="hover:-translate-y-1 transition-transform duration-300">
                <Link
                  href="https://github.com"
                  className="block p-2 rounded-full bg-gradient-to-r from-[#2B6CB0]/10 to-[#63B3ED]/10 hover:from-[#2B6CB0]/20 hover:to-[#63B3ED]/20 transition-colors duration-300"
                >
                  <Github className="h-5 w-5 text-[#2B6CB0]" />
                </Link>
              </div>
              <div className="hover:-translate-y-1 transition-transform duration-300">
                <Link
                  href="https://linkedin.com"
                  className="block p-2 rounded-full bg-gradient-to-r from-[#2B6CB0]/10 to-[#63B3ED]/10 hover:from-[#2B6CB0]/20 hover:to-[#63B3ED]/20 transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5 text-[#2B6CB0]" />
                </Link>
              </div>
              <div className="hover:-translate-y-1 transition-transform duration-300">
                <Link
                  href="mailto:contact@example.com"
                  className="block p-2 rounded-full bg-gradient-to-r from-[#2B6CB0]/10 to-[#63B3ED]/10 hover:from-[#2B6CB0]/20 hover:to-[#63B3ED]/20 transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 text-[#2B6CB0]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0 animate-fadeIn transition-all delay-300">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] bg-clip-text text-transparent">Solutions</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name} className="hover:translate-x-1 transition-transform duration-300">
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-[#2B6CB0] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] bg-clip-text text-transparent">Company</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name} className="hover:translate-x-1 transition-transform duration-300">
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-[#2B6CB0] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] bg-clip-text text-transparent">Resources</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name} className="hover:translate-x-1 transition-transform duration-300">
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-[#2B6CB0] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-[#2B6CB0] to-[#63B3ED] bg-clip-text text-transparent">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name} className="hover:translate-x-1 transition-transform duration-300">
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-[#2B6CB0] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-border/30 pt-8 animate-fadeIn transition-all delay-500">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Smart Agent. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <p className="text-sm text-muted-foreground">
                Crafted with
              </p>
              <span className="inline-block text-[#2B6CB0]">innovation</span>
              <p className="text-sm text-muted-foreground">
                to power business automation and AI-driven success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

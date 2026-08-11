'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Dumbbell, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube, Linkedin, Sparkles, ArrowRight, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, Grid, Stack, Flex, Section } from './Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const siteConfig = {
  name: 'Nexus Athletics',
  description: 'AI-Powered Premium Gym & Fitness Ecosystem',
  url: 'https://nexusathletics.com',
  contact: {
    email: 'hello@nexusathletics.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fitness Boulevard, San Francisco, CA 94102',
  },
  social: {
    instagram: 'https://instagram.com/nexusathletics',
    twitter: 'https://twitter.com/nexusathletics',
    facebook: 'https://facebook.com/nexusathletics',
    youtube: 'https://youtube.com/nexusathletics',
    linkedin: 'https://linkedin.com/company/nexusathletics',
  },
};

const footerLinks = {
  programs: [
    { name: 'Strength Training', href: '/services/strength' },
    { name: 'Weight Loss', href: '/services/weight-loss' },
    { name: 'Muscle Building', href: '/services/muscle-building' },
    { name: 'Functional Training', href: '/services/functional' },
    { name: 'HIIT Classes', href: '/services/hiit' },
    { name: 'Mobility & Recovery', href: '/services/mobility' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Trainers', href: '/trainers' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Membership Help', href: '/memberships#help' },
    { name: 'Booking Support', href: '/booking-help' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: siteConfig.social.instagram },
  { name: 'Twitter', icon: Twitter, href: siteConfig.social.twitter },
  { name: 'Facebook', icon: Facebook, href: siteConfig.social.facebook },
  { name: 'YouTube', icon: Youtube, href: siteConfig.social.youtube },
  { name: 'LinkedIn', icon: Linkedin, href: siteConfig.social.linkedin },
];

export function Footer() {
  return (
    <footer className="bg-nexus-950 border-t border-border" role="contentinfo">
      <Section size="xl" className="pb-0">
        <Grid cols={4} gap="xl" className="mb-16">
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-nexus-50 font-display text-heading-lg mb-6"
              aria-label="Nexus Athletics Home"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper">
                <Dumbbell className="h-7 w-7 text-nexus-950" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-nexus-950 text-xs font-bold text-accent-gold">
                  AI
                </span>
              </span>
              <span>NEXUS</span>
            </Link>
            <p className="text-body-md text-nexus-400 mb-6 max-w-xs">
              An intelligent fitness ecosystem built around your goals, powered by elite trainers, advanced training programs, and AI.
            </p>
            <Flex gap="sm" className="mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 border border-border text-nexus-400 hover:text-accent-gold hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </Flex>
            <Badge variant="gold" dot size="sm">
              AI-Powered Fitness
            </Badge>
          </div>

          <nav aria-label="Programs">
            <h3 className="font-display text-heading-sm text-nexus-50 mb-4">Training Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body-md text-nexus-400 hover:text-accent-gold transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="font-display text-heading-sm text-nexus-50 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-body-md text-nexus-400 hover:text-accent-gold transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-heading-sm text-nexus-50 mb-4">Contact & Location</h3>
            <address className="not-italic space-y-4 text-nexus-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-body-md">{siteConfig.contact.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-gold flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-body-md hover:text-accent-gold transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-gold flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-body-md hover:text-accent-gold transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-body-md">Mon–Fri: 5:00 AM – 11:00 PM</p>
                  <p className="text-body-md">Sat–Sun: 7:00 AM – 9:00 PM</p>
                </div>
              </div>
            </address>
          </div>
        </Grid>

        <div className="pt-8 border-t border-border">
          <Flex justify="between" align="center" className="flex-col md:flex-row gap-4">
            <p className="text-body-sm text-nexus-500">
              © {new Date().getFullYear()} Nexus Athletics. All rights reserved.
            </p>
            <Flex gap="md" className="flex-wrap justify-center">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-body-sm text-nexus-500 hover:text-nexus-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </Flex>
          </Flex>
        </div>
      </Section>

      <NewsletterSection />
    </footer>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data?.error?.message ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setErrorMessage('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="bg-nexus-900 border-t border-border py-16" aria-labelledby="newsletter-heading">
      <Container>
        <Flex justify="between" align="center" className="flex-col md:flex-row gap-8 text-center md:text-left">
          <div>
            <h2 id="newsletter-heading" className="font-display text-heading-lg text-nexus-50 mb-2">
              Stay at Peak Performance
            </h2>
            <p className="text-body-lg text-nexus-400 max-w-md mx-auto md:mx-0">
              Get weekly training insights, nutrition tips, and AI-powered fitness strategies delivered to your inbox.
            </p>
          </div>
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-accent-gold text-body-md font-medium" role="status">
              <Check className="w-5 h-5" aria-hidden="true" />
              You&apos;re subscribed!
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto md:mx-0" onSubmit={handleSubmit} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-surface-100 border border-border px-4 py-3.5 text-body-md text-nexus-100 placeholder:text-nexus-500 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 focus:outline-none"
                autoComplete="email"
              />
              <Button type="submit" variant="primary" className="whitespace-nowrap" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          )}
        </Flex>
        {errorMessage && (
          <p role="alert" className="mt-3 text-body-sm text-red-400 text-center md:text-right">
            {errorMessage}
          </p>
        )}
      </Container>
    </section>
  );
}
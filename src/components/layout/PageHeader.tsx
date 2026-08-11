import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Section, Stack } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbLabel?: string;
}

/**
 * Consistent hero banner for standalone (non-homepage) pages, e.g.
 * /about, /contact, /services, /privacy, etc.
 */
export function PageHeader({ eyebrow, title, description, breadcrumbLabel }: PageHeaderProps) {
  return (
    <Section size="lg" className="bg-nexus-950 border-b border-border pt-32 md:pt-40">
      <Stack gap="md" className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-body-sm text-nexus-500">
            <li>
              <Link href="/" className="hover:text-accent-gold transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-nexus-300" aria-current="page">
              {breadcrumbLabel ?? title}
            </li>
          </ol>
        </nav>

        {eyebrow && (
          <Badge variant="gold" size="md" dot>
            {eyebrow}
          </Badge>
        )}

        <h1 className="font-display text-display-md text-nexus-50 tracking-tight text-balance">
          {title}
        </h1>

        {description && (
          <p className="text-body-lg text-nexus-400 max-w-2xl text-balance leading-relaxed">
            {description}
          </p>
        )}
      </Stack>
    </Section>
  );
}

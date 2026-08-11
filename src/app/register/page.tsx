'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Section, Container, Stack } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const perks = [
  '24/7 access to every Nexus Athletics facility',
  'AI-powered workout programming from day one',
  '30-day satisfaction guarantee, no questions asked',
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data?.error?.message ?? 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="min-h-screen pt-32 pb-24">
      <Section size="lg" className="bg-nexus-950">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <Stack gap="lg" className="lg:pt-8">
            <Badge variant="gold" size="md" dot>
              Start Your Journey
            </Badge>
            <h1 className="font-display text-display-md text-nexus-50 tracking-tight text-balance">
              Create your account
            </h1>
            <p className="text-body-lg text-nexus-400 leading-relaxed">
              Join 247+ members training smarter with Nexus Athletics. Set up your account now — you can choose a membership tier afterward.
            </p>
            <ul className="space-y-3" role="list">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-body-md text-nexus-300">
                  <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
            <p className="text-body-sm text-nexus-500">
              Already have an account?{' '}
              <Link href="/login" className="text-accent-gold hover:text-accent-gold-light transition-colors">
                Log in
              </Link>
            </p>
          </Stack>

          <Card>
            <CardHeader>
              <CardTitle size="md">Sign up</CardTitle>
              <CardDescription>It takes less than a minute.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Stack gap="md">
                  <Input
                    label="Full name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Jordan Blake"
                  />
                  <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                  />
                  <Input
                    label="Phone (optional)"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="At least 8 characters"
                    hint="Minimum 8 characters."
                  />

                  {error && (
                    <p role="alert" className="text-body-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-micro text-nexus-500 text-center">
                    By creating an account you agree to our{' '}
                    <Link href="/terms" className="hover:text-accent-gold transition-colors">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="hover:text-accent-gold transition-colors">Privacy Policy</Link>.
                  </p>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </main>
  );
}

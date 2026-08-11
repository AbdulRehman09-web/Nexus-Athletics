'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Section, Stack } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data?.error?.message ?? 'Invalid email or password.');
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
    <main id="main-content" className="min-h-screen pt-32 pb-24 flex items-center">
      <Section size="lg" className="bg-nexus-950">
        <div className="max-w-md mx-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle size="md">Welcome back</CardTitle>
              <CardDescription>Log in to manage your membership and bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Stack gap="md">
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
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={handleChange('password')}
                    placeholder="Your password"
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
                        Logging in...
                      </>
                    ) : (
                      <>
                        Log In
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <p className="text-body-sm text-nexus-500 text-center">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-accent-gold hover:text-accent-gold-light transition-colors">
                      Sign up
                    </Link>
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

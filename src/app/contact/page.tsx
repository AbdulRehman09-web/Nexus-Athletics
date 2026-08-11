'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Section, Container, Stack, Grid } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const topicOptions = [
  { value: 'membership', label: 'Membership questions' },
  { value: 'personal-training', label: 'Personal training' },
  { value: 'tour', label: 'Book a facility tour' },
  { value: 'general', label: 'General inquiry' },
  { value: 'other', label: 'Something else' },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const isTourRequest = searchParams.get('tour') === 'true';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: isTourRequest ? 'tour' : 'general',
    message: isTourRequest ? "I'd like to book a facility tour. " : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data?.error?.message ?? 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage(data.data.message);
      setForm({ name: '', email: '', phone: '', topic: 'general', message: '' });
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <CheckCircle2 className="w-12 h-12 text-accent-gold mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-heading-lg text-nexus-50 mb-2">Message sent</h2>
          <p className="text-body-md text-nexus-400 max-w-sm mx-auto">{successMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap="md">
            <Grid cols={2} gap="md">
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
            </Grid>
            <Grid cols={2} gap="md">
              <Input
                label="Phone (optional)"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+1 (555) 123-4567"
              />
              <Select
                label="What's this about?"
                options={topicOptions}
                value={form.topic}
                onChange={handleChange('topic')}
              />
            </Grid>
            <Textarea
              label="Message"
              required
              minLength={10}
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Tell us a bit about what you're looking for..."
            />

            {error && (
              <p role="alert" className="text-body-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" aria-hidden="true" />
                </>
              )}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen pb-24">
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's talk"
        description="Questions about membership, training, or facilities? Send us a message and we'll get back to you within one business day."
      />
      <Section size="lg" className="bg-nexus-950">
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="h-96" />}>
              <ContactForm />
            </Suspense>
          </div>

          <Stack gap="md">
            <Card>
              <CardContent>
                <Stack gap="lg">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-body-sm font-medium text-nexus-200 mb-1">Address</p>
                      <p className="text-body-md text-nexus-400">123 Fitness Boulevard, San Francisco, CA 94102</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-body-sm font-medium text-nexus-200 mb-1">Phone</p>
                      <a href="tel:+15551234567" className="text-body-md text-nexus-400 hover:text-accent-gold transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-body-sm font-medium text-nexus-200 mb-1">Email</p>
                      <a href="mailto:hello@nexusathletics.com" className="text-body-md text-nexus-400 hover:text-accent-gold transition-colors">
                        hello@nexusathletics.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-body-sm font-medium text-nexus-200 mb-1">Hours</p>
                      <p className="text-body-md text-nexus-400">Mon–Fri: 5:00 AM – 11:00 PM</p>
                      <p className="text-body-md text-nexus-400">Sat–Sun: 7:00 AM – 9:00 PM</p>
                    </div>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </div>
      </Section>
    </main>
  );
}

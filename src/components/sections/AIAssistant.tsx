'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, X, Mic, MicOff, Loader2, Check, MessageSquare, Zap, Brain, Target, Users, Shield, ChevronDown } from 'lucide-react';
import { Section, Container, Stack, Flex } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface SuggestedPrompt {
  id: string;
  text: string;
  category: string;
}

const suggestedPrompts: SuggestedPrompt[] = [
  { id: '1', text: 'What membership should I choose for strength training?', category: 'Memberships' },
  { id: '2', text: 'Which trainer specializes in Olympic lifting?', category: 'Trainers' },
  { id: '3', text: 'What are your opening hours?', category: 'General' },
  { id: '4', text: 'Do you offer personal training?', category: 'Services' },
  { id: '5', text: 'How much is the Elite membership?', category: 'Pricing' },
  { id: '6', text: 'Which trainer is best for weight loss?', category: 'Trainers' },
  { id: '7', text: 'Where is the gym located?', category: 'Location' },
  { id: '8', text: 'Do you have HIIT classes?', category: 'Classes' },
];

const knowledgeBase = {
  memberships: {
    basic: { price: 29, yearly: 290, features: ['Gym access', 'Cardio area', 'Locker access'] },
    pro: { price: 59, yearly: 590, features: ['Everything in Basic', 'Group classes', 'Fitness assessment', 'Training programs', 'AI programming'] },
    elite: { price: 99, yearly: 990, features: ['Everything in Pro', 'Personal training', 'Nutrition guidance', 'Priority booking', 'AI fitness insights', 'DEXA scans'] },
  },
  trainers: [
    { name: 'Alex Carter', specializations: ['Strength & Conditioning', 'Hypertrophy', 'Athletic Performance'], title: 'Head Strength Coach' },
    { name: 'Sarah Chen', specializations: ['Weight Loss', 'Hypertrophy', 'Nutrition Coaching'], title: 'Body Composition Specialist' },
    { name: 'Marcus Johnson', specializations: ['Functional Movement', 'Mobility', 'Rehabilitation'], title: 'Functional Movement Director' },
    { name: 'Elena Rodriguez', specializations: ['Olympic Lifting', 'Strength', 'Athletic Performance'], title: 'Olympic Lifting Coach' },
    { name: 'David Park', specializations: ['Endurance', 'Cardio', 'Athletic Performance'], title: 'Endurance & Conditioning Coach' },
    { name: 'Jessica Williams', specializations: ['Youth Development', 'Strength', 'Functional Movement'], title: 'Youth Development Coach' },
  ],
  hours: {
    weekdays: '5:00 AM - 11:00 PM',
    weekends: '7:00 AM - 9:00 PM',
  },
  location: '123 Fitness Boulevard, San Francisco, CA 94102',
  contact: { phone: '+1 (555) 123-4567', email: 'hello@nexusathletics.com' },
  services: [
    'Personal Training', 'Strength Training', 'Weight Loss', 'Muscle Building',
    'Functional Training', 'Cardio & Conditioning', 'HIIT Classes',
    'Group Fitness', 'Mobility & Recovery', 'Nutrition Guidance',
    'Athlete Performance', 'Advanced Recovery'
  ],
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const streamResponse = useCallback(async (userMessage: string) => {
    const messageId = addMessage('assistant', '');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(userMessage);
      
      // Simulate streaming
      let streamedContent = '';
      for (const chunk of response.split(' ')) {
        streamedContent += chunk + ' ';
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: streamedContent, isStreaming: true } : msg
        ));
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: response, isStreaming: false } : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact our front desk directly.', isStreaming: false } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const handleSend = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const message = inputValue.trim();
    if (!message || isLoading) return;

    setInputValue('');
    setShowSuggestions(false);
    addMessage('user', message);
    await streamResponse(message);
  }, [inputValue, isLoading, addMessage, streamResponse]);

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const lower = userMessage.toLowerCase();

    // Membership queries
    if (lower.includes('membership') || lower.includes('price') || lower.includes('cost') || lower.includes('plan')) {
      if (lower.includes('basic')) {
        return `Our **BASIC** membership is $29/month ($290/year) and includes:
• 24/7 gym access
• Strength floor & cardio equipment
• Locker room & towel service
• WiFi & charging stations

It does not include group classes, personal training, recovery center, or AI programming. Would you like me to explain the Pro or Elite tiers?`;
      }
      if (lower.includes('pro')) {
        return `Our **PRO** membership is $59/month ($590/year) — our most popular tier. Includes:
• Everything in Basic
• Unlimited group classes (HIIT, strength, mobility, yoga)
• Monthly fitness assessment
• AI workout programming
• Recovery center access (sauna, cold plunge, Normatec)
• Mind-body studio classes
• Nutrition framework access
• Progress tracking app
• Member events + 2 guest passes/month

Want to compare with Elite?`;
      }
      if (lower.includes('elite')) {
        return `Our **ELITE** membership is $99/month ($990/year) — best value for serious trainees. Includes:
• Everything in Pro
• **Weekly 1:1 personal training** (4 sessions/month)
• Custom nutrition coaching
• Quarterly DEXA scans
• Force plate testing & VBT access
• Priority class booking
• Unlimited guest passes
• Unlimited recovery modalities
• Direct coach communication
• Custom periodization & competition prep

This is the complete performance package. Interested in starting?`;
      }
      return `We offer three membership tiers:

**BASIC** — $29/mo ($290/yr)
Essential gym access for self-directed trainees.

**PRO** — $59/mo ($590/yr) ⭐ *Most Popular*
Complete training ecosystem with classes, AI programming, and recovery.

**ELITE** — $99/mo ($990/yr) *Best Value*
Ultimate performance package with weekly personal training, nutrition coaching, DEXA scans, and more.

All tiers: no contracts, cancel anytime, 30-day money-back guarantee. Which tier interests you most?`;
    }

    // Trainer queries
    if (lower.includes('trainer') || lower.includes('coach') || lower.includes('who')) {
      if (lower.includes('strength') || lower.includes('powerlifting') || lower.includes('hypertrophy')) {
        return `For strength training, **Alex Carter** (Head Strength Coach) is our specialist. 14 years experience, CSCS, USAW Level 2. He develops elite athletes using conjugate periodization and velocity-based training. Also **Elena Rodriguez** for Olympic lifting technique.`;
      }
      if (lower.includes('weight loss') || lower.includes('fat loss') || lower.includes('body comp')) {
        return `For weight loss and body recomposition, **Sarah Chen** is our specialist. 10 years, 500+ transformations. Combines metabolic testing, DEXA-guided nutrition, and hypertrophy-specific training. Published researcher in exercise metabolism.`;
      }
      if (lower.includes('mobility') || lower.includes('rehab') || lower.includes('injury') || lower.includes('movement')) {
        return `For mobility, rehab, and movement quality, **Marcus Johnson** (DPT, CSCS) bridges rehab and performance. Expert in SFMA, DNS, PRI, and return-to-sport protocols. "Move well first, then move often."`;
      }
      if (lower.includes('endurance') || lower.includes('running') || lower.includes('triathlon') || lower.includes('cardio')) {
        return `For endurance, **David Park** — former pro triathlete, USAT Level 2. Expert in polarized training, lactate threshold, and multisport periodization. Coaches Ironman qualifiers and marathoners.`;
      }
      if (lower.includes('youth') || lower.includes('kid') || lower.includes('teen')) {
        return `For youth development (ages 10-18), **Jessica Williams** specializes in Long-Term Athletic Development (LTAD). Builds physical literacy, injury resilience, and love for training. CSCS, YFS certified.`;
      }
      return `Our coaching team (150+ combined years experience):

• **Alex Carter** — Head Strength Coach (Strength, Hypertrophy, Athletic Performance)
• **Sarah Chen** — Body Composition Specialist (Weight Loss, Nutrition, Hypertrophy)
• **Marcus Johnson** — Functional Movement Director (Mobility, Rehab, Movement Quality)
• **Elena Rodriguez** — Olympic Lifting Coach (Olympic Lifting, Power Development)
• **David Park** — Endurance Coach (Triathlon, Running, Polarized Training)
• **Jessica Williams** — Youth Development Coach (LTAD, Physical Literacy)

Who are you looking to work with?`;
    }

    // Hours/Location
    if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) {
      return `**Hours of Operation:**
• Monday–Friday: 5:00 AM – 11:00 PM
• Saturday–Sunday: 7:00 AM – 9:00 PM
• Holiday hours may vary (posted in app)

The facility is staffed during all open hours. 24/7 access for Pro and Elite members via keyless entry.`;
    }

    if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
      return `**Location:**
📍 123 Fitness Boulevard, San Francisco, CA 94102

**Contact:**
📞 +1 (555) 123-4567
📧 hello@nexusathletics.com

**Parking:** Dedicated lot (50 spaces) + street parking. EV charging available.
**Transit:** 2 blocks from Montgomery BART, multiple Muni lines.

Would you like directions or to schedule a tour?`;
    }

    // Services/Classes
    if (lower.includes('service') || lower.includes('program') || lower.includes('class') || lower.includes('hiit')) {
      if (lower.includes('hiit')) {
        return `**HIIT Classes:** 45-min sessions, max 12 participants. Science-backed work:rest ratios, live heart rate zones on display, leaderboards, post-session recovery scoring. Runs 6x/week (Mon/Wed/Fri 6am & 6pm, Tue/Thu 7am, Sat 9am). Included in Pro & Elite.`;
      }
      return `**Training Services (12 total):**
• Personal Training (1:1 coaching)
• Strength Training (Periodized programs)
• Weight Loss & Body Recomposition
• Muscle Building / Hypertrophy
• Functional Training
• Cardio & Conditioning (Zone-based)
• HIIT Classes (Live HR tracking)
• Group Fitness Classes (15+ weekly)
• Mobility & Recovery
• Nutrition Guidance
• Athlete Performance (Sport-specific)
• Advanced Recovery (Normatec, Sauna, Cold Plunge, PEMF, Red Light)

Which service interests you?`;
    }

    // Contact/Booking
    if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment') || lower.includes('tour')) {
      return `You can book:
• **Free consultation/tour:** /contact?tour=true
• **Personal training:** /trainers/[name] → "Book Session"
• **Classes:** /classes → Select & book
• **Assessments:** Included in Pro/Elite, or $99 à la carte

Or call +1 (555) 123-4567. Our front desk is staffed during all open hours.`;
    }

    // Default fallback
    return `I'm your Nexus AI fitness assistant. I can help with:

🏋️ **Memberships** — Pricing, features, comparisons
👨‍🏫 **Trainers** — Specializations, availability, booking
🕐 **Hours & Location** — Schedule, address, parking
📋 **Services & Classes** — Programs, HIIT, personal training
📞 **Booking** — Tours, sessions, assessments

What would you like to know?`;
  };

  return (
    <>
      <Section id="ai-assistant" size="xl" className="bg-gradient-to-b from-nexus-950 via-nexus-950 to-nexus-900">
        <Stack gap="xl" className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="gold" size="lg" dot>
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              AI Fitness Assistant
            </Badge>
            <h2 className="mt-6 font-display text-display-lg text-nexus-50 tracking-tight text-balance">
              Your Intelligent
              <br />
              <span className="text-gradient-gold">Fitness Coach</span>
            </h2>
            <p className="mt-4 text-body-lg text-nexus-400 max-w-2xl mx-auto">
              Instant answers about memberships, trainers, programs, scheduling, and more. Powered by our complete gym knowledge base — no hallucinations, just facts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Instant Answers', desc: 'No wait times. Get accurate info on memberships, trainers, schedules, and pricing in seconds.' },
              { icon: Shield, title: 'Verified Knowledge', desc: 'Responses sourced only from our official gym database — no made-up information.' },
              { icon: Zap, title: '24/7 Availability', desc: 'Your fitness questions answered anytime, even when the front desk is closed.' },
            ].map((item, i) => (
              <Card key={i} className="card-interactive text-center p-6 group">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl mx-auto mb-4 bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 text-accent-gold group-hover:bg-gradient-to-br group-hover:from-accent-gold group-hover:to-accent-copper group-hover:text-nexus-950 transition-all duration-500">
                  <item.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-display text-heading-sm text-nexus-50 mb-2">{item.title}</h3>
                <p className="text-body-sm text-nexus-400">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" onClick={() => setIsOpen(true)}>
              <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
              Try AI Assistant Now
            </Button>
          </div>
        </Stack>
      </Section>

      <ChatModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isLoading={isLoading}
        showSuggestions={showSuggestions}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        handleSuggestionClick={handleSuggestionClick}
        suggestedPrompts={suggestedPrompts}
        messagesEndRef={messagesEndRef}
        chatContainerRef={chatContainerRef}
      />
    </>
  );
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  showSuggestions: boolean;
  handleSend: (e?: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSuggestionClick: (prompt: string) => void;
  suggestedPrompts: SuggestedPrompt[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  // Split on **bold** first, then *italic* within the remaining plain segments.
  const nodes: React.ReactNode[] = [];
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);

  boldParts.forEach((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-nexus-50">
          {part.slice(2, -2)}
        </strong>
      );
      return;
    }
    const italicParts = part.split(/(\*[^*]+\*)/g);
    italicParts.forEach((sub, j) => {
      if (/^\*[^*]+\*$/.test(sub)) {
        nodes.push(
          <em key={`${keyPrefix}-i-${i}-${j}`} className="italic text-nexus-300">
            {sub.slice(1, -1)}
          </em>
        );
      } else if (sub) {
        nodes.push(<span key={`${keyPrefix}-t-${i}-${j}`}>{sub}</span>);
      }
    });
  });

  return nodes;
}

/**
 * Lightweight renderer for the assistant's markdown-lite responses:
 * supports **bold**, *italic*, "• " bullet lists, and paragraph breaks
 * (blank lines) — without pulling in a full markdown dependency.
 */
function FormattedMessage({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) return null;

        const isBulletList = lines.every((l) => l.startsWith('• ') || l.startsWith('- '));

        if (isBulletList) {
          return (
            <ul key={blockIndex} className="space-y-1.5" role="list">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="flex items-start gap-2 text-body-md">
                  <span className="w-1 h-1 rounded-full bg-accent-gold flex-shrink-0 mt-2.5" aria-hidden="true" />
                  <span>{renderInline(line.replace(/^[•-]\s*/, ''), `${blockIndex}-${lineIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={blockIndex} className="text-body-md leading-relaxed">
            {lines.map((line, lineIndex) => (
              <span key={lineIndex}>
                {renderInline(line, `${blockIndex}-${lineIndex}`)}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function ChatModal({
  isOpen,
  onClose,
  messages,
  inputValue,
  setInputValue,
  isLoading,
  showSuggestions,
  handleSend,
  handleKeyDown,
  handleSuggestionClick,
  suggestedPrompts,
  messagesEndRef,
  chatContainerRef,
}: ChatModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="max-w-2xl h-[90vh] max-h-[90vh] flex flex-col"
      bodyClassName="flex-1 min-h-0 flex flex-col overflow-hidden p-0"
      showClose={false}
    >
      <div className="flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <Flex align="center" gap="3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper">
              <Sparkles className="w-5 h-5 text-nexus-950" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-heading-sm text-nexus-50">Nexus AI Assistant</h3>
              <p className="text-micro text-nexus-500">Online • Ready to help</p>
            </div>
          </Flex>
          <Flex align="center" gap="2">
            <Badge variant="gold" size="sm">v2.4</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close chat"
              className="text-nexus-400 hover:text-nexus-100"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Flex>
        </div>

        <div ref={chatContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
          {showSuggestions && messages.length === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-surface-100 border border-border rounded-xl">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold/20 text-accent-gold flex-shrink-0">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-medium text-nexus-100">Hi! I'm your Nexus AI fitness assistant.</p>
                  <p className="text-body-sm text-nexus-400">Ask me about memberships, trainers, programs, classes, facilities, or anything else about the gym.</p>
                </div>
              </div>
              <div>
                <p className="text-micro text-nexus-500 uppercase tracking-wider mb-3">Suggested questions</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.slice(0, 4).map((prompt) => (
                    <button
                      key={prompt.id}
                      onClick={() => handleSuggestionClick(prompt.text)}
                      className="px-3 py-2 bg-surface-100 border border-border rounded-xl text-body-sm text-nexus-300 hover:text-nexus-100 hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all text-left w-full md:w-auto"
                    >
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn('max-w-[80%]', message.role === 'user' ? 'order-2' : 'order-1')}>
                {message.role === 'assistant' && (
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gold/20 text-accent-gold flex-shrink-0 mb-2">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-accent-gold text-nexus-950 rounded-br-md'
                      : 'bg-surface-100 border border-border text-nexus-100 rounded-bl-md'
                  )}
                >
                  {message.content ? (
                    <FormattedMessage content={message.content} />
                  ) : (
                    <span className="inline-block w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse" aria-hidden="true" />
                  )}
                  {message.isStreaming && message.content && (
                    <span className="inline-block w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse ml-1" aria-hidden="true" />
                  )}
                </div>
                <p className="text-micro text-nexus-600 mt-1 px-1">{message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              </div>
              {message.role === 'user' && (
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-nexus-700 text-nexus-300 flex-shrink-0 mb-2">
                  <span className="text-xs font-medium">You</span>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-border flex-shrink-0">
          <Flex align="center" gap="2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={messages.length === 0 ? "Ask me anything about Nexus..." : "Type your question..."}
              disabled={isLoading}
              className="flex-1"
              aria-label="Chat input"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!inputValue.trim() || isLoading}
              loading={isLoading}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Flex>
          <p className="text-micro text-nexus-500 mt-2 text-center">
            AI responses are based on official gym data. For medical advice, consult a healthcare professional.
          </p>
        </form>
      </div>
    </Modal>
  );
}
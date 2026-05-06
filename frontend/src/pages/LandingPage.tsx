import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  Inbox,
  Mail,
  Menu,
  MessageSquareText,
  Minus,
  PlayCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Tags,
  X,
  Zap,
} from "lucide-react";
import {
  FaFacebookMessenger,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Logo } from "../components/Logo";
import { Badge, ChannelBadge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { Channel } from "../data/mockData";
import { cn } from "../lib/utils";

const features = [
  {
    title: "Unified inbox",
    description: "Gmail and Instagram conversations in one shared queue.",
    icon: Inbox,
    tone: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "AI reply drafts",
    description: "Draft responses from recent context and business knowledge.",
    icon: Sparkles,
    tone: "bg-violet-50 text-violet-700",
  },
  {
    title: "Intent detection",
    description: "See what each customer needs before opening the thread.",
    icon: Tags,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    title: "Human approval",
    description: "Keep a person in control before any reply is sent.",
    icon: ShieldCheck,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Business knowledge base",
    description: "Ground draft replies in policies, pricing, and product facts.",
    icon: BookOpen,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    title: "Channel-aware replies",
    description: "Keep email detailed and Instagram replies concise.",
    icon: MessageSquareText,
    tone: "bg-rose-50 text-rose-700",
  },
];

type StepKind = "connect" | "inbox" | "ai" | "approve";

const steps: Array<{
  title: string;
  description: string;
  kind: StepKind;
}> = [
  {
    title: "Connect Gmail or Instagram",
    description:
      "Bring your customer channels into Relay with a simple connection flow.",
    kind: "connect",
  },
  {
    title: "Messages arrive in Relay",
    description:
      "Every new customer conversation lands in one shared, prioritized queue.",
    kind: "inbox",
  },
  {
    title: "AI analyzes and drafts",
    description:
      "Relay detects intent, urgency, and writes a response grounded in your business context.",
    kind: "ai",
  },
  {
    title: "Approve and send",
    description:
      "Your team reviews the draft, edits if needed, and sends it back to the original channel.",
    kind: "approve",
  },
];

const previewMessages: Array<{
  channel: Channel;
  customer: string;
  message: string;
  intent: string;
  badge: "success" | "warning";
}> = [
  {
    channel: "instagram",
    customer: "Maya Collins",
    message: "Do you still have the walnut studio desk in stock?",
    intent: "Product availability",
    badge: "success",
  },
  {
    channel: "email",
    customer: "James Carter",
    message: "Can you send the updated onboarding timeline?",
    intent: "Project update",
    badge: "warning",
  },
];

const pricingPlans = [
  {
    name: "Free tier",
    price: "$0",
    description: "For small teams getting one email inbox organized.",
    features: [
      "Connect one email inbox",
      "Unified customer message queue",
      "Manual review and sending",
      "Basic conversation status tracking",
    ],
    limitations: ["No AI summaries", "Email only"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Paid",
    price: "$4.99",
    description: "For teams that want AI support across every source.",
    features: [
      "Everything in Free",
      "AI summaries and intent detection",
      "AI reply drafting",
      "Connect more than one source",
      "Gmail and Instagram support",
    ],
    limitations: [],
    cta: "Upgrade",
    featured: true,
  },
];

const faqs = [
  {
    question: "Can I connect real Gmail or Instagram accounts today?",
    answer:
      "Yes. Relay is designed to connect Gmail and Instagram so your team can review conversations, approve AI drafts, and reply from one workspace.",
  },
  {
    question: "Does Relay send AI replies automatically?",
    answer:
      "No. Relay drafts suggested replies, but a human approves before anything is sent back to the customer.",
  },
  {
    question: "What does the paid plan add?",
    answer:
      "The paid plan adds AI usage, including summaries, intent detection, reply drafts, and support for connecting more than one source.",
  },
  {
    question: "Can my team use Relay for both email and social messages?",
    answer:
      "Yes. The paid plan is designed for teams managing customer conversations across Gmail, Instagram, and future sources.",
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const Icon = isOpen ? Minus : Plus;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white text-left shadow-sm shadow-zinc-200/60 transition duration-200 hover:border-zinc-300"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-zinc-50"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="flex items-start gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-zinc-300"
                />
                <span className="text-base font-semibold leading-7 text-zinc-950">
                  {faq.question}
                </span>
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-200 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pl-10">
                  <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepIcon({ kind }: { kind: StepKind }) {
  const iconMap = {
    connect: Mail,
    inbox: Inbox,
    ai: Sparkles,
    approve: ShieldCheck,
  };
  const Icon = iconMap[kind];

  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  );
}

type OrbitItemProps = {
  angle: number;
  radius: string;
  className?: string;
  children: ReactNode;
};

function OrbitItem({
  angle,
  radius,
  className,
  children,
}: OrbitItemProps) {
  const style = {
    "--orbit-angle": `${angle}deg`,
    "--orbit-angle-inverse": `${-angle}deg`,
    "--orbit-radius": radius,
  } as CSSProperties & Record<string, string>;

  return (
    <div className="relay-orbit-item" style={style}>
      <span className="relay-orbit-label">
        <span
          className={`relay-orbit-label-inner inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm ${className ?? ""}`}
        >
          {children}
        </span>
      </span>
    </div>
  );
}

function HeroOrbitVisual() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[540px] overflow-hidden sm:h-[500px]">
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,237,213,0.78)_0%,rgba(236,254,255,0.42)_36%,transparent_66%)] sm:h-[410px] sm:w-[410px]" />

      <div className="relay-orbit-path relay-orbit-path-outer" />
      <div className="relay-orbit-path relay-orbit-path-middle" />
      <div className="relay-orbit-path relay-orbit-path-inner" />

      <OrbitItem
        angle={-135}
        radius="clamp(150px, 19vw, 215px)"
      >
        <FaInstagram className="h-5 w-5 text-[#E4405F]" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={-45}
        radius="clamp(150px, 19vw, 215px)"
      >
        <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={45}
        radius="clamp(150px, 19vw, 215px)"
      >
        <FaFacebookMessenger
          className="h-5 w-5 text-[#0866FF]"
          aria-hidden="true"
        />
      </OrbitItem>
      <OrbitItem
        angle={135}
        radius="clamp(150px, 19vw, 215px)"
      >
        <SiGmail className="h-5 w-5 text-[#EA4335]" aria-hidden="true" />
      </OrbitItem>

      <OrbitItem
        angle={-90}
        radius="clamp(108px, 14vw, 155px)"
      >
        <FaTiktok className="h-4 w-4 text-zinc-950" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={0}
        radius="clamp(108px, 14vw, 155px)"
      >
        <FaInstagram className="h-4 w-4 text-[#E4405F]" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={90}
        radius="clamp(108px, 14vw, 155px)"
      >
        <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={180}
        radius="clamp(108px, 14vw, 155px)"
      >
        <SiGmail className="h-4 w-4 text-[#EA4335]" aria-hidden="true" />
      </OrbitItem>

      <OrbitItem
        angle={-135}
        radius="clamp(68px, 8.6vw, 95px)"
      >
        <FaFacebookMessenger
          className="h-5 w-5 text-[#0866FF]"
          aria-hidden="true"
        />
      </OrbitItem>
      <OrbitItem
        angle={-45}
        radius="clamp(68px, 8.6vw, 95px)"
      >
        <FaTiktok className="h-5 w-5 text-zinc-950" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={45}
        radius="clamp(68px, 8.6vw, 95px)"
      >
        <FaInstagram className="h-5 w-5 text-[#E4405F]" aria-hidden="true" />
      </OrbitItem>
      <OrbitItem
        angle={135}
        radius="clamp(68px, 8.6vw, 95px)"
      >
        <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
      </OrbitItem>

      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 shadow-xl shadow-cyan-100/80" />
    </div>
  );
}

function WaveDivider({ position }: { position: "top" | "bottom" }) {
  return (
    <svg
      className={`pointer-events-none absolute left-0 h-16 w-full text-white sm:h-20 ${
        position === "top" ? "top-0" : "bottom-0 rotate-180"
      }`}
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 0h1440v42c-92 18-187 26-286 12-102-15-171-49-281-46-122 3-181 47-301 52-127 5-188-38-311-45C158 9 74 29 0 53V0Z"
      />
    </svg>
  );
}

export function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="bg-zinc-50 text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
            <a className="transition hover:text-zinc-950" href="#features">
              Features
            </a>
            <a className="transition hover:text-zinc-950" href="#how-it-works">
              How it Works
            </a>
            <a className="transition hover:text-zinc-950" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-zinc-950" href="#faq">
              FAQ
            </a>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink to="/login?mode=login" variant="ghost" size="sm">
              Login
            </ButtonLink>
            <ButtonLink to="/login?mode=signup" size="sm">
              Sign Up
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-cyan-950/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[70vw] max-w-sm border-l border-zinc-200 bg-white px-5 py-5 shadow-2xl shadow-zinc-900/20 transition-transform duration-300 ease-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-950"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-8 space-y-1" aria-label="Mobile navigation links">
          {[
            ["Features", "#features"],
            ["How it Works", "#how-it-works"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={label}
              className="block rounded-lg px-3 py-3 text-base font-medium text-zinc-700 transition hover:bg-cyan-50 hover:text-cyan-700"
              href={href}
              onClick={closeMobileMenu}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-8 grid gap-3">
          <ButtonLink
            to="/login?mode=signup"
            className="w-full"
            onClick={closeMobileMenu}
          >
            Sign Up
          </ButtonLink>
          <ButtonLink
            to="/login?mode=login"
            variant="outline"
            className="w-full"
            onClick={closeMobileMenu}
          >
            Login
          </ButtonLink>
        </div>
      </aside>

      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="text-center lg:text-left">
              <Badge variant="info">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                AI customer operations
              </Badge>
              <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] text-zinc-950 sm:text-6xl lg:mx-0">
                One AI inbox for every customer conversation.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 lg:mx-0">
                Connect Gmail and Instagram, let AI organize messages, draft
                replies, and help your team respond faster.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink to="/login?mode=signup" size="lg">
                  Get Started
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink to="/dashboard/inbox" variant="outline" size="lg">
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  View Demo
                </ButtonLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroOrbitVisual />
            </div>

            {/*
            <Card className="relay-preview-panel overflow-hidden border-cyan-100 shadow-xl shadow-cyan-100/70">
              <div className="relative z-10 flex items-center justify-between border-b border-cyan-100 bg-white/90 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">
                    Priority inbox
                  </p>
                  <p className="text-xs text-zinc-500">2 drafts ready</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700">
                    <Camera className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="relative z-10 space-y-3 p-4">
                {previewMessages.map((message) => (
                  <div
                    key={message.customer}
                    className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-sm shadow-cyan-100/50 backdrop-blur"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <ChannelBadge channel={message.channel} />
                      <Badge variant={message.badge}>Draft Ready</Badge>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-zinc-950">
                      {message.customer}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {message.message}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
                      {message.intent}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative z-10 border-t border-cyan-100 bg-white/90 px-5 py-4 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-zinc-700">
                    Suggested next action
                  </span>
                  <Badge variant="success">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Approve reply
                  </Badge>
                </div>
              </div>
            </Card>
            */}
          </div>
        </section>

        <section
          id="features"
          className="relative overflow-hidden bg-zinc-50 py-24 sm:py-28"
        >
          <WaveDivider position="top" />
          <WaveDivider position="bottom" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl">
                Built for teams that answer customers all day.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="p-6 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${feature.tone}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-zinc-950">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl">
                From message to approved reply in one flow.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  {index < steps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-10 z-10 hidden h-5 w-5 text-zinc-300 lg:block"
                      aria-hidden="true"
                    />
                  )}
                  <Card className="h-full p-6 text-left transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
                    <StepIcon kind={step.kind} />
                    <h3 className="mt-6 text-base font-semibold leading-6 text-zinc-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      {step.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="relative overflow-hidden bg-zinc-50 py-24 sm:py-28"
        >
          <WaveDivider position="top" />
          <WaveDivider position="bottom" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Pricing
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl">
                Start free, upgrade when AI joins the queue.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Choose the plan that matches how many channels your team wants
                to manage inside Relay.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-white p-1 shadow-sm shadow-zinc-200/70">
                  <button
                    type="button"
                    className={cn(
                      "h-9 w-32 rounded-md px-5 text-sm font-medium transition",
                      billingCycle === "monthly"
                        ? "bg-zinc-950 text-white shadow-sm"
                        : "text-zinc-600 hover:text-zinc-950",
                    )}
                    onClick={() => setBillingCycle("monthly")}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "h-9 w-32 rounded-md px-5 text-sm font-medium transition",
                      billingCycle === "yearly"
                        ? "bg-zinc-950 text-white shadow-sm"
                        : "text-zinc-600 hover:text-zinc-950",
                    )}
                    onClick={() => setBillingCycle("yearly")}
                  >
                    Yearly
                  </button>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Save 30% yearly
                </span>
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-2">
              {pricingPlans.map((plan) => {
                const isPaidPlan = plan.name === "Paid";
                const showYearly = isPaidPlan && billingCycle === "yearly";
                const price = showYearly ? "$3.49" : plan.price;

                return (
                  <Card
                    key={plan.name}
                    className={`relative p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
                      plan.featured
                        ? "border-zinc-950 shadow-lg shadow-zinc-200"
                        : ""
                    }`}
                  >
                    {plan.featured && (
                      <Badge className="absolute right-5 top-5" variant="info">
                        Popular
                      </Badge>
                    )}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-zinc-950">
                        {plan.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mt-8 flex items-end justify-center gap-2">
                      <span className="text-4xl font-semibold text-zinc-950">
                        {price}
                      </span>
                      <span className="pb-1 text-sm font-medium text-zinc-500">
                        /month
                      </span>
                    </div>
                    <p className="mt-2 min-h-6 text-center text-sm text-zinc-500">
                      {showYearly ? (
                        <>
                          <span className="line-through">$4.99/month</span>
                          <span className="ml-2 text-emerald-700">
                            billed yearly at $41.92
                          </span>
                        </>
                      ) : isPaidPlan ? (
                        "Billed monthly"
                      ) : (
                        "Free forever"
                      )}
                    </p>

                    <ButtonLink
                      to="/login?mode=signup"
                      className="mt-6 w-full"
                      variant={plan.featured ? "primary" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>

                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex gap-3 text-sm leading-6 text-zinc-700"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <div
                          key={limitation}
                          className="flex gap-3 text-sm leading-6 text-zinc-500"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl">
                Answers before you connect a channel.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Relay is designed to keep teams fast without removing human
                judgment from customer replies.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        <section className="bg-zinc-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="relay-cta-panel flex flex-col items-start justify-between gap-6 border-cyan-100 p-6 text-left shadow-lg shadow-cyan-100/60 sm:flex-row sm:items-center">
              <div className="sm:flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  Ready when you are
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                  Bring customer messages into one AI-assisted workspace.
                </h2>
              </div>
              <ButtonLink to="/login?mode=signup">
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
              Relay helps teams manage email and social customer conversations
              from one reviewed, AI-assisted inbox.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">Product</h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <a className="block transition hover:text-zinc-950" href="#features">
                  Features
                </a>
                <a className="block transition hover:text-zinc-950" href="#how-it-works">
                  How it Works
                </a>
                <a className="block transition hover:text-zinc-950" href="#pricing">
                  Pricing
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">Workspace</h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <a className="block transition hover:text-zinc-950" href="/dashboard/inbox">
                  Inbox
                </a>
                <a className="block transition hover:text-zinc-950" href="/dashboard/integrations">
                  Integrations
                </a>
                <a className="block transition hover:text-zinc-950" href="/login">
                  Login
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">Company</h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <a className="block transition hover:text-zinc-950" href="#faq">
                  FAQ
                </a>
                <a className="block transition hover:text-zinc-950" href="mailto:hello@relay.local">
                  Contact
                </a>
                <a className="block transition hover:text-zinc-950" href="/">
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>&copy; 2026 Relay. All rights reserved.</p>
            <div className="flex gap-5">
              <a className="transition hover:text-zinc-950" href="/">
                Privacy
              </a>
              <a className="transition hover:text-zinc-950" href="/">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

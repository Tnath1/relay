import { ArrowRight, CheckCircle2, Clock3, Inbox, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, ChannelBadge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { conversations } from "../data/mockData";

const stats = [
  { label: "Open conversations", value: "24", icon: Inbox },
  { label: "Drafts ready", value: "12", icon: Sparkles },
  { label: "Avg response time", value: "8m", icon: Clock3 },
];

export function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Dashboard
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
            Today&apos;s customer queue
          </h2>
        </div>
        <ButtonLink to="/dashboard/inbox">
          Open Inbox
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-600">
                  {stat.label}
                </span>
                <Icon className="h-4 w-4 text-cyan-600" aria-hidden="true" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-zinc-950">
                {stat.value}
              </p>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div>
            <h3 className="font-semibold text-zinc-950">AI-ready replies</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Recent conversations with suggested next responses.
            </p>
          </div>
          <Badge variant="success">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Active
          </Badge>
        </div>
        <div className="divide-y divide-zinc-200">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/dashboard/inbox/${conversation.id}`}
              className="grid gap-3 px-5 py-4 transition hover:bg-zinc-50 md:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <ChannelBadge channel={conversation.channel} />
                  <span className="text-sm font-semibold text-zinc-950">
                    {conversation.customer}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  {conversation.lastMessage}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="info">{conversation.intent}</Badge>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

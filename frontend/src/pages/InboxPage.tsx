import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, type BadgeVariant, ChannelBadge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { conversations, type Conversation } from "../data/mockData";

const priorityVariant: Record<Conversation["priority"], BadgeVariant> = {
  High: "danger",
  Medium: "warning",
};

const statusVariant: Record<Conversation["status"], BadgeVariant> = {
  "Draft Ready": "success",
  "Needs Review": "warning",
};

export function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Inbox
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
            Review customer conversations.
          </h2>
        </div>
        <Badge variant="info">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {conversations.length} AI drafts
        </Badge>
      </div>

      <div className="grid gap-4">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            to={`/dashboard/inbox/${conversation.id}`}
            className="group block"
          >
            <Card className="p-5 transition group-hover:-translate-y-0.5 group-hover:border-cyan-200 group-hover:shadow-md">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ChannelBadge channel={conversation.channel} />
                    <Badge variant={statusVariant[conversation.status]}>
                      {conversation.status}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950">
                      {conversation.customer}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {conversation.contact}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                    {conversation.lastMessage}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <Badge variant="info">{conversation.intent}</Badge>
                  <Badge variant={priorityVariant[conversation.priority]}>
                    {conversation.priority} priority
                  </Badge>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition group-hover:border-cyan-200 group-hover:text-cyan-700">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Pencil,
  Send,
  Sparkles,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Badge, type BadgeVariant, ChannelBadge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";
import { conversations, type Conversation } from "../data/mockData";

const priorityVariant: Record<Conversation["priority"], BadgeVariant> = {
  High: "danger",
  Medium: "warning",
};

const statusVariant: Record<Conversation["status"], BadgeVariant> = {
  "Draft Ready": "success",
  "Needs Review": "warning",
};

export function ConversationDetailPage() {
  const { id } = useParams();
  const conversation = conversations.find((item) => item.id === id);

  if (!conversation) {
    return <Navigate to="/dashboard/inbox" replace />;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/dashboard/inbox"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to inbox
      </Link>

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ChannelBadge channel={conversation.channel} />
            <Badge variant={statusVariant[conversation.status]}>
              {conversation.status}
            </Badge>
            <Badge variant={priorityVariant[conversation.priority]}>
              {conversation.priority} priority
            </Badge>
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-zinc-950">
            {conversation.customer}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">{conversation.contact}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>
            <Send className="h-4 w-4" aria-hidden="true" />
            Approve &amp; Send
          </Button>
          <Button variant="outline">
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit Draft
          </Button>
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Escalate
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <div className="border-b border-zinc-200 px-5 py-4">
            <h3 className="font-semibold text-zinc-950">
              Conversation thread
            </h3>
          </div>
          <div className="space-y-4 bg-zinc-50 p-5">
            {conversation.thread.map((message, index) => (
              <div
                key={`${message.author}-${message.time}-${index}`}
                className={cn(
                  "flex",
                  message.role === "customer" ? "justify-start" : "justify-end",
                )}
              >
                <div
                  className={cn(
                    "max-w-2xl rounded-lg border px-4 py-3 shadow-sm",
                    message.role === "customer"
                      ? "border-zinc-200 bg-white"
                      : "border-cyan-200 bg-cyan-50",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                    <span>{message.author}</span>
                    <span>{message.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    {message.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-600" aria-hidden="true" />
              <h3 className="font-semibold text-zinc-950">AI summary</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {conversation.summary}
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              <h3 className="font-semibold text-zinc-950">
                AI suggested reply
              </h3>
            </div>
            <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
              {conversation.suggestedReply}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

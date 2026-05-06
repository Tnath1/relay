import { Camera, Mail, Plug, ShieldCheck } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const integrations = [
  {
    name: "Gmail",
    description: "Bring customer email threads into Relay for review and reply.",
    icon: Mail,
    tone: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    name: "Instagram",
    description: "Manage Instagram DMs beside email without changing channels.",
    icon: Camera,
    tone: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
  },
];

export function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Integrations
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
          Connect your customer channels.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Start with Gmail or Instagram, then review every message from the same
          team inbox.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {integrations.map((integration) => {
          const Icon = integration.icon;

          return (
            <Card
              key={integration.name}
              className="p-6 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-lg border ${integration.tone}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-950">
                        {integration.name}
                      </h3>
                      <Badge variant="neutral">Not connected</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  <Plug className="h-4 w-4" aria-hidden="true" />
                  Connect
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Human approval stays enabled for all outbound replies.
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

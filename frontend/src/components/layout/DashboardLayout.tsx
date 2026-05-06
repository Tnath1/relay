import {
  BarChart3,
  BookOpen,
  Inbox,
  Plug,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "../Logo";
import { cn } from "../../lib/utils";

const navItems = [
  { label: "Inbox", to: "/dashboard/inbox", icon: Inbox },
  { label: "Integrations", to: "/dashboard/integrations", icon: Plug },
  { label: "Knowledge Base", icon: BookOpen },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

function DashboardNav({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      className={cn(
        mobile ? "flex gap-2 overflow-x-auto px-4 pb-3" : "space-y-1",
      )}
      aria-label="Dashboard navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        if (!item.to) {
          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800",
                mobile && "shrink-0 border border-zinc-200 bg-white",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </button>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                mobile && "shrink-0 border",
                isActive
                  ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                !mobile && "flex w-full border-0 bg-transparent",
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-zinc-200 bg-white px-4 py-5 lg:flex">
        <Logo to="/dashboard" />
        <div className="mt-8">
          <DashboardNav />
        </div>
        <div className="mt-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
            <Sparkles className="h-4 w-4 text-cyan-600" aria-hidden="true" />
            AI queue
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            2 drafts are ready for review across connected channels.
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Logo to="/dashboard" className="lg:hidden" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Workspace
                </p>
                <h1 className="text-base font-semibold text-zinc-950 sm:text-lg">
                  Northline Studio
                </h1>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
              AR
            </div>
          </div>
          <div className="lg:hidden">
            <DashboardNav mobile />
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

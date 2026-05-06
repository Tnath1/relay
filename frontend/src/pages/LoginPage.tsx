import { ArrowLeft, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Button, ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

function GoogleLogo() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <radialGradient id="instagramMark" cx="30%" cy="108%" r="120%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="32%" stopColor="#FA7E1E" />
          <stop offset="55%" stopColor="#D62976" />
          <stop offset="78%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>
      <rect width="40" height="40" x="4" y="4" rx="12" fill="url(#instagramMark)" />
      <path
        fill="#fff"
        d="M24 16.8a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 0 0-14.4Zm0 11.8a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2Z"
      />
      <path
        fill="#fff"
        d="M32 16.5a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M15.8 11h16.4A4.8 4.8 0 0 1 37 15.8v16.4a4.8 4.8 0 0 1-4.8 4.8H15.8a4.8 4.8 0 0 1-4.8-4.8V15.8a4.8 4.8 0 0 1 4.8-4.8Zm0 2.8a2 2 0 0 0-2 2v16.4a2 2 0 0 0 2 2h16.4a2 2 0 0 0 2-2V15.8a2 2 0 0 0-2-2H15.8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const actionLabel = isSignup ? "Create Account" : "Sign In";
  const socialAction = isSignup ? "Sign up" : "Sign in";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 text-zinc-950">
      <div className="w-full max-w-xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>

        <Card className="p-6 sm:p-10">
          <Logo />
          <div className="mt-8">
            <h1 className="text-2xl font-semibold text-zinc-950">
              {isSignup ? "Create your Relay account" : "Sign in to Relay"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {isSignup
                ? "Start organizing customer conversations from one shared inbox."
                : "Review drafts, connect channels, and manage your customer inbox."}
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <Button variant="outline" type="button" className="w-full">
              <GoogleLogo />
              {socialAction} with Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <InstagramLogo />
              {socialAction} with Instagram
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
              or
            </span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            {isSignup && (
              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  Full name
                </span>
                <span className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
                  <UserRound
                    className="h-4 w-4 text-zinc-400"
                    aria-hidden="true"
                  />
                  <input
                    className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    type="text"
                    placeholder="Maya Collins"
                  />
                </span>
              </label>
            )}

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Email</span>
              <span className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
                <Mail className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                <input
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  type="email"
                  placeholder="you@company.com"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-zinc-700">
                Password
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 transition focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
                <LockKeyhole
                  className="h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
                <input
                  className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  type="password"
                  placeholder="Password"
                />
              </span>
            </label>

            <Button className="w-full" type="submit">
              {actionLabel}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-600">
            {isSignup ? "Already have an account?" : "New to Relay?"}{" "}
            <Link
              to={isSignup ? "/login?mode=login" : "/login?mode=signup"}
              className="font-medium text-zinc-950 transition hover:text-cyan-700"
            >
              {isSignup ? "Login" : "Create an account"}
            </Link>
          </p>

          <ButtonLink
            to="/dashboard/inbox"
            variant="outline"
            className="mt-5 w-full"
          >
            Open Demo Workspace
          </ButtonLink>
        </Card>
      </div>
    </main>
  );
}

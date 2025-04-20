import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import type { Route } from "./+types/root";
import Navbar from "components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function meta({}: Route.MetaArgs) {
  return [
    { title: " SuperHeroes" },
    { name: "description", content: "React Router!" },
  ];
}
const queryClient = new QueryClient();
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <main className="px-4">{children}</main>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

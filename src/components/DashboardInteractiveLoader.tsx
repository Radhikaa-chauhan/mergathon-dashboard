"use client";

import dynamic from "next/dynamic";

const DashboardInteractive = dynamic(() => import("./DashboardInteractive"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "32px 0", textAlign: "center", color: "var(--text-tertiary)" }}>
      Loading dashboard details...
    </div>
  ),
});

export default function DashboardInteractiveLoader() {
  return <DashboardInteractive />;
}
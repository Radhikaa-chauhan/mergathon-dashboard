import { getMergathonData } from "../lib/getMergathonData";
import DashboardInteractiveLoader from "../components/DashboardInteractiveLoader";
import CountdownTimer from "../components/CountdownTimer";

export default async function Home() {
  const data = await getMergathonData();
  const eventName = data.eventName || "CircuitVerse Mergathon";
  const organization = data.organization || "CircuitVerse";

  return (
    <div>
      <section className="hero-header">
        <div className="event-badge-outline">
          <span className="logo-dot" />
          <span>{eventName}</span>
        </div>

        <h1 className="big-brand-title">{organization}</h1>

        <p className="hero-subtitle-text">
          Track merged pull requests, closed issues, and team rankings for the {eventName.toLowerCase()}.
        </p>

        <div className="badge-row" style={{ marginBottom: 0 }}>
          <span className="outlined-badge">{data.stats.totalContributors} contributors</span>
          <span className="outlined-badge">{data.teams.length} teams</span>
          <span className="outlined-badge">Updated {new Date(data.lastUpdated).toLocaleString()}</span>
        </div>

        <div style={{ marginTop: "18px" }}>
          <CountdownTimer targetDate={data.eventEndDate} />
        </div>
      </section>

      <DashboardInteractiveLoader />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Contributor } from "../types";
import { Search, ChevronUp, ChevronDown, Award } from "lucide-react";

interface LeaderboardTableProps {
  contributors: Contributor[];
  showSearchAndFilters?: boolean;
  limit?: number;
}

type SortField = "rank" | "username" | "prsMerged" | "prsReviewed" | "issuesClosed" | "score";
type SortOrder = "asc" | "desc";

export default function LeaderboardTable({
  contributors,
  showSearchAndFilters = true,
  limit,
}: LeaderboardTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Handle Sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // 1. Filter data
  const filtered = contributors.filter((c) => {
    const matchesSearch = c.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === "All" || c.team === teamFilter;
    return matchesSearch && matchesTeam;
  });

  // 2. Map contributors to include their original absolute rank based on score sorted descending
  // This makes sure rank remains correct even when filtered or sorted differently!
  const withOriginalRank = contributors
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((c, index) => ({ ...c, originalRank: index + 1 }));

  // Filter the ranked list
  const filteredRanked = withOriginalRank.filter((c) => {
    const matchesSearch = c.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === "All" || c.team === teamFilter;
    return matchesSearch && matchesTeam;
  });

  // 3. Sort data
  const sorted = filteredRanked.sort((a, b) => {
    let aVal: any = a[sortField === "rank" ? "originalRank" : sortField];
    let bVal: any = b[sortField === "rank" ? "originalRank" : sortField];

    if (typeof aVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
  });

  // 4. Limit data if prop provided
  const displayed = limit ? sorted.slice(0, limit) : sorted;

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "default";
  };

  const getActivityBadgeClass = (level: "High" | "Medium" | "Low") => {
    return level.toLowerCase();
  };

  return (
    <div>
      {showSearchAndFilters && (
        <div 
          style={{ 
            display: "flex", 
            gap: "16px", 
            marginBottom: "20px", 
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          {/* Search bar */}
          <div 
            style={{ 
              position: "relative", 
              flex: 1, 
              minWidth: "240px" 
            }}
          >
            <Search 
              size={18} 
              style={{ 
                position: "absolute", 
                left: "12px", 
                top: "50%", 
                transform: "translateY(-50%)", 
                color: "var(--text-tertiary)" 
              }} 
            />
            <input
              type="text"
              placeholder="Search contributor username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px",
                paddingLeft: "40px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-primary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-blue)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-primary)"}
            />
          </div>

          {/* Team Filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "Team Alpha", "Team Beta"].map((team) => (
              <button
                key={team}
                onClick={() => setTeamFilter(team)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-md)",
                  border: teamFilter === team ? "1px solid var(--accent-blue)" : "1px solid var(--border-primary)",
                  backgroundColor: teamFilter === team ? "var(--bg-tertiary)" : "var(--bg-secondary)",
                  color: teamFilter === team ? "var(--accent-blue)" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="leaderboard-container leaderboard-desktop" style={{ width: "100%", overflowX: "auto" }}>
        <table className="leaderboard-table" style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead>
            <tr>
              <th onClick={() => handleSort("rank")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "80px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  Rank {getSortIcon("rank")}
                </span>
              </th>
              <th onClick={() => handleSort("username")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "160px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  Contributor {getSortIcon("username")}
                </span>
              </th>
              <th onClick={() => handleSort("prsMerged")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "110px", textAlign: "center" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  Merged PRs {getSortIcon("prsMerged")}
                </span>
              </th>
              <th onClick={() => handleSort("prsReviewed")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "90px", textAlign: "center" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  Reviews {getSortIcon("prsReviewed")}
                </span>
              </th>
              <th onClick={() => handleSort("issuesClosed")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "110px", textAlign: "center" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  Issues Fixed {getSortIcon("issuesClosed")}
                </span>
              </th>
              <th onClick={() => handleSort("score")} style={{ cursor: "pointer", padding: "16px 12px", minWidth: "90px", textAlign: "right" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                  Score {getSortIcon("score")}
                </span>
              </th>
              <th style={{ padding: "16px 12px", minWidth: "110px", textAlign: "right" }}>Activity</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length > 0 ? (
              displayed.map((c) => (
                <tr key={c.username}>
                  <td style={{ padding: "12px" }}>
                    <span className={`rank-badge ${getRankBadgeClass(c.originalRank)}`}>
                      {c.originalRank}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <Link href={`/contributors/${c.username}`} style={{ textDecoration: "none" }}>
                      <div className="user-cell" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img 
                          src={c.avatarUrl} 
                          alt={c.username} 
                          className="user-avatar"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            background: "rgba(255, 255, 255, 0.02)",
                            flexShrink: 0
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`;
                          }}
                        />
                        <div style={{ minWidth: 0, overflow: "hidden" }}>
                          <div className="user-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.username}</div>
                          <div className="user-team" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.team}</div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: 500, padding: "12px" }}>{c.prsMerged}</td>
                  <td style={{ textAlign: "center", fontWeight: 500, padding: "12px" }}>{c.prsReviewed}</td>
                  <td style={{ textAlign: "center", fontWeight: 500, padding: "12px" }}>{c.issuesClosed}</td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent-blue)", padding: "12px" }}>
                    {c.score}
                  </td>
                  <td style={{ textAlign: "right", padding: "12px" }}>
                    <span className={`activity-badge ${getActivityBadgeClass(c.activityLevel)}`}>
                      {c.activityLevel}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-tertiary)" }}>
                  No contributors found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="leaderboard-mobile">
        {displayed.length > 0 ? (
          displayed.map((c) => (
            <Link href={`/contributors/${c.username}`} key={c.username} style={{ textDecoration: "none" }}>
              <div className="leaderboard-card">
                <div className="card-header">
                  <div className="card-user-info">
                    <span className={`rank-badge ${getRankBadgeClass(c.originalRank)}`}>
                      {c.originalRank}
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: 0 }}>
                      <div className="user-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.username}</div>
                      <div className="user-team" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.team}</div>
                    </div>
                  </div>
                  <img 
                    src={c.avatarUrl} 
                    alt={c.username} 
                    className="user-avatar"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.02)",
                      flexShrink: 0
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`;
                    }}
                  />
                </div>
                <div className="card-stats">
                  <div className="card-stat">
                    <span className="card-stat-label">Merged PRs</span>
                    <span className="card-stat-value">{c.prsMerged}</span>
                  </div>
                  <div className="card-stat">
                    <span className="card-stat-label">Reviews</span>
                    <span className="card-stat-value">{c.prsReviewed}</span>
                  </div>
                  <div className="card-stat">
                    <span className="card-stat-label">Issues</span>
                    <span className="card-stat-value">{c.issuesClosed}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <span style={{ fontWeight: 700, color: "var(--accent-blue)", fontSize: "16px" }}>Score: {c.score}</span>
                  <span className={`activity-badge ${getActivityBadgeClass(c.activityLevel)}`}>
                    {c.activityLevel}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-tertiary)" }}>
            No contributors found matching the filters.
          </div>
        )}
      </div>
    </div>
  );
}

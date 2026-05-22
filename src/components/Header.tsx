"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="header-capsule">
        {/* Brand logo section */}
        <div className="logo-section">
          <span className="logo-dot" />
          <span className="logo-text">CircuitVerse</span>
        </div>

        {/* Nav pill links - Desktop only */}
        <nav className="nav-tabs nav-desktop">
          <Link 
            href="/" 
            className={`nav-tab ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/leaderboard" 
            className={`nav-tab ${pathname === "/leaderboard" ? "active" : ""}`}
          >
            Leaderboard
          </Link>
          <Link 
            href="/teams" 
            className={`nav-tab ${pathname === "/teams" ? "active" : ""}`}
          >
            Analytics
          </Link>
          <Link 
            href="/admin" 
            className={`nav-tab ${pathname === "/admin" ? "active" : ""}`}
          >
            Admin
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="header-status">
          <span className="time-badge">this minute</span>
          <button 
            className="header-btn" 
            onClick={() => window.location.reload()}
            title="Refresh Data"
          >
            R
          </button>
          <a 
            href="https://github.com/CircuitVerse/CircuitVerse" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="header-btn"
            title="GitHub Repository"
          >
            GH
          </a>
          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Toggle Menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          <Link 
            href="/" 
            className={`nav-tab-mobile ${pathname === "/" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/leaderboard" 
            className={`nav-tab-mobile ${pathname === "/leaderboard" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <Link 
            href="/teams" 
            className={`nav-tab-mobile ${pathname === "/teams" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Analytics
          </Link>
          <Link 
            href="/admin" 
            className={`nav-tab-mobile ${pathname === "/admin" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Admin
          </Link>
        </nav>
      )}
    </>
  );
}


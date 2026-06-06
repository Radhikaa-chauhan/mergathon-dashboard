# ⚡ CircuitVerse Mergathon Dashboard

A premium real-time analytics dashboard designed to track contributor activity and foster healthy competition during the CircuitVerse Mergathon event. This dashboard provides live insights into merged pull requests, closed issues, code reviews, and team leaderboards with an elegant glassmorphic design.

## 🎯 Project Overview

The Mergathon Dashboard is a full-stack Next.js application that aggregates GitHub data and presents it through an interactive, real-time interface. It automatically tracks contributor metrics across the CircuitVerse ecosystem and displays them in an engaging leaderboard and analytics dashboard.

**Key Use Cases:**
- 📊 Real-time leaderboard tracking for event participants
- 📈 Comprehensive analytics on team and individual contributor performance
- 🎮 Gamified competition with score calculations and rankings
- 🔄 Automated GitHub data aggregation with scheduled workflows
- 👥 Smart team balancing and management tools for organizers

---

## ✨ Key Features

### 📊 Dashboard Overview
- **KPI Cards**: Display key metrics at a glance including total activities, active contributors, and code activity breakdowns
- **Real-time Updates**: Automatic data refresh showing current leaderboard standings and statistics

### 📈 Interactive Visualizations
- **Glowing Activity Sparklines**: Wavy, animated charts showing real-time activity trends
- **Distribution Donut Charts**: Visual breakdown of PRs vs Issues vs Reviews across the event
- **Historical Trend Analysis**: Side-by-side comparison charts on the Analytics page for tracking team performance over time

### 👥 Team & Contributor Management
- **Animated Avatar Stacks**: Dynamically fetched developer profiles displayed in visually stunning, overlapping stacks
- **Responsive Leaderboard**: Clean, sortable table showing contributor rankings with medal badges (🥇 Gold, 🥈 Silver, 🥉 Bronze)
- **Contributor Profiles**: Individual contributor pages showing detailed contribution breakdown

### 🛠️ Admin & Configuration Tools
- **Smart Team Builder** (`/admin`): Intuitive interface for registering participants and organizing teams
- **Auto-Balancer Algorithm**: Snake-Draft algorithm that automatically groups contributors by score to create balanced teams
- **Live YAML Configuration**: Export team configurations in ready-to-deploy YAML format

### 🔄 Automated Data Pipeline
- **Cron-Driven GitHub Aggregator**: GitHub Actions workflow that automatically pulls live PRs, Issues, and Reviews on a schedule
- **No Manual Rebuilds Needed**: Dashboard updates autonomously without requiring website rebuilds
- **Fallback Mock Data**: Development-friendly mock data system when GitHub tokens aren't available

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript (88.2% of codebase) |
| **Styling** | Premium Vanilla CSS + Glassmorphism (11.6%) |
| **UI Components** | Lucide React (icons), Recharts (data visualization) |
| **Build Tools** | Node `tsx` for high-performance script execution |
| **Deployment** | Static site export (Netlify, GitHub Pages, etc.) |

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher (or alternative package managers: `yarn`, `pnpm`)
- **Git**: For cloning the repository

### 1. Clone the Repository

```bash
git clone https://github.com/Radhikaa-chauhan/mergathon-dashboard.git
cd mergathon-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

This project works out-of-the-box without GitHub credentials! However, for live GitHub data aggregation:

Create a `.env.local` file in the project root:
```env
# GitHub Personal Access Token (optional)
# Create one at: https://github.com/settings/tokens
GITHUB_TOKEN=ghp_your_personal_access_token_here
```

**Why it's optional:**
- Without a token, the system generates highly realistic mock contribution data
- Perfect for development, testing, and demonstrations
- With a token, the dashboard fetches live GitHub activity

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard in action.

---

## 📊 Data Management

### Understanding the Data Pipeline

The dashboard reads contributor data from `/public/data/mergathon-data.json`, which is generated and updated through the data pipeline:

```
config.yaml → ETL Script → mergathon-data.json → Dashboard Display
     ↑                           ↓
  (Team Config)          (GitHub Actions)
                         (Scheduled Updates)
```

### Registering Teams & Participants

Edit the `config.yaml` file in the project root to register teams and participants:

```yaml
event:
  name: "CircuitVerse Mergathon 2025"
  startDate: "2025-05-22"
  endDate: "2025-05-25"

teams:
  - name: "Team Alpha"
    color: "#3b82f6"
    members:
      - "github-username-1"
      - "github-username-2"
  
  - name: "Team Beta"
    color: "#ec4899"
    members:
      - "github-username-3"
      - "github-username-4"
```

### Regenerating the Leaderboard

After updating `config.yaml` or when you want to fetch the latest GitHub activity:

```bash
npm run generate:leaderboard
```

This command:
1. Reads team configurations from `config.yaml`
2. Fetches live data from GitHub (if token is available)
3. Calculates scores based on contribution metrics
4. Generates the updated `mergathon-data.json` file
5. Dashboard automatically reflects the new data on refresh

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. Find or Create an Issue

- Check the **Issues** tab for tasks labeled:
  - `good-first-issue` - Great for newcomers
  - `bug` - Issues to fix
  - `feature-request` - New features to implement
- Leave a comment requesting assignment before starting work

### 2. Create a Feature Branch

Use descriptive branch names following this convention:

```bash
# For features
git checkout -b feature/descriptive-feature-name

# For bug fixes
git checkout -b bugfix/short-description-of-fix

# For documentation
git checkout -b docs/update-readme
```

### 3. Code Quality Guidelines

**Styling:**
- Maintain all styles in `src/app/globals.css`
- Use CSS custom properties (variables) from `:root` to maintain the premium dark theme
- Follow the design system tokens: `--border-primary`, `--bg-card`, `--text-primary`, etc.
- Avoid ad-hoc inline styles

**Code Quality:**
- Run the linter before committing:
  ```bash
  npm run lint
  ```
- Write clear, descriptive commit messages
- Keep components modular and reusable

### 4. Submit a Pull Request

1. Commit your changes with descriptive messages:
   ```bash
   git add .
   git commit -m "feat: add real-time score updates to leaderboard"
   ```

2. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request against `main` with:
   - Clear description of changes
   - Explanation of testing (e.g., "Tested on mobile and desktop viewports")
   - Screenshots or GIF for UI changes
   - Reference to related issues

---

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

### Output Structure

The project uses `output: 'export'` configuration, generating a fully static site:
- Build output: `out/` folder
- All pages pre-rendered and optimized
- No server-side rendering required
- Ready for static hosting

### Deployment Options

Deploy the `out/` folder to:
- **Netlify** - Drag & drop or use CLI
- **GitHub Pages** - Automatic deployment via Actions
- **Vercel** - Auto-deploy from git
- **Any Static Host** - AWS S3, Cloudflare Pages, etc.

---

## 🔧 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm run lint` | Run code quality checks |
| `npm run generate:leaderboard` | Regenerate contributor data and leaderboard |
| `npm run start` | Start production server (after build) |

---

## 📁 Project Structure

```
mergathon-dashboard/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Dashboard homepage
│   │   ├── admin/        # Team builder & admin tools
│   │   └── globals.css   # Global styles & design system
│   ├── components/       # Reusable React components
│   └── lib/              # Utility functions & helpers
├── public/
│   ├── data/
│   │   └── mergathon-data.json  # Generated leaderboard data
│   └── assets/           # Images, icons, etc.
├── config.yaml           # Team & event configuration
└── package.json          # Dependencies & scripts
```

---

## 🎨 Design System

The dashboard uses a premium glassmorphic design with carefully curated CSS variables. All customization should respect these design tokens:

- **Colors**: Dark theme with accent colors (blue, pink, purple)
- **Spacing**: Consistent padding and margins
- **Typography**: Clean, readable font hierarchy
- **Effects**: Subtle glows, gradients, and transparency effects

Modify `src/app/globals.css` to customize the theme globally.

---

## 🐛 Troubleshooting

### Issue: Dashboard shows mock data instead of real GitHub data
**Solution:** 
1. Ensure `GITHUB_TOKEN` is set in `.env.local`
2. Run `npm run generate:leaderboard` to fetch live data
3. Restart the development server

### Issue: Build fails with TypeScript errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Issue: Changes not reflecting on localhost:3000
**Solution:**
1. Make sure development server is running (`npm run dev`)
2. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors

---

## 📞 Support & Questions

- 📧 Reach out via GitHub Issues
- 💬 Leave comments on relevant discussions
- 🐛 Report bugs with detailed reproduction steps
- 💡 Suggest features with clear use cases

---

## 📄 License

This project is part of the CircuitVerse ecosystem. Please refer to the LICENSE file for details.

---

## ✅ Checklist for Contributors

Before submitting your PR, verify:
- [ ] Code follows the style guide and design system
- [ ] All changes are tested locally (`npm run dev`)
- [ ] Linter passes (`npm run lint`)
- [ ] Commit messages are descriptive
- [ ] PR description explains the changes
- [ ] Screenshots included for UI changes
- [ ] No breaking changes to existing features

---

**Happy contributing! 🚀**

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

const GITHUB_USERNAME = "Skullcandyyy";

export default function GitHubStats() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState({ stars: 0, repos: 0, forks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);

        if (reposRes.ok && userRes.ok) {
          const reposData: Repo[] = await reposRes.json();
          const userData = await userRes.json();

          setRepos(reposData);
          setStats({
            stars: reposData.reduce((acc, r) => acc + r.stargazers_count, 0),
            repos: userData.public_repos,
            forks: reposData.reduce((acc, r) => acc + r.forks_count, 0),
          });
        }
      } catch {
        // silently fail — will show empty state
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section id="github" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">GitHub Activity</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Repos", value: stats.repos },
              { label: "Stars", value: stats.stars },
              { label: "Forks", value: stats.forks },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold gradient-text">
                  {loading ? "-" : s.value}
                </div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <img
            src={`https://ghchart.rshah.org/6366f1/${GITHUB_USERNAME}`}
            alt="GitHub contribution chart"
            className="w-full rounded-xl mb-10"
            style={{ filter: "brightness(0.9)" }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="glass rounded-xl p-4 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-muted">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium text-white truncate">
                    {repo.name}
                  </span>
                </div>
                <p className="text-xs text-muted line-clamp-2 mb-3">
                  {repo.description || "No description"}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary-light" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors"
            >
              View all repositories →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

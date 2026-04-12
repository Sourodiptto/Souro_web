"use client";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero / Identity */}
      <section className="py-12">
        <h1 className="text-5xl font-bold mb-6">
          I study how decisions shape systems, and how systems quietly shape people.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          This is where I think in public, build ideas into products, and track how my understanding evolves.
        </p>
      </section>

      {/* Entry Points - Direction */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="space-y-8">
          <div className="group cursor-pointer">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Work</h2>
            <p className="text-gray-600 dark:text-gray-400">
              What I've built and explored. Products, projects, and the patterns behind them.
            </p>
          </div>
          
          <div className="group cursor-pointer">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Now</h2>
            <p className="text-gray-600 dark:text-gray-400">
              What currently has my attention. Real-time glimpses into what I'm thinking about and building.
            </p>
          </div>
          
          <div className="group cursor-pointer">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Ideas</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Patterns, essays, and thinking. Longer-form explorations of how systems work.
            </p>
          </div>
          
          <div className="group cursor-pointer">
            <h2 className="text-lg font-semibold mb-2 group-hover:translate-x-1 transition-transform">→ Lab</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Where I test and validate new directions. Ideas before they become products.
            </p>
          </div>
        </div>
      </section>

      {/* Currently Focused */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 className="text-2xl font-bold mb-6">Currently focused on</h2>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <span className="text-gray-400 shrink-0">•</span>
            <span className="text-gray-700 dark:text-gray-300">How incentives distort good products over time</span>
          </li>
          <li className="flex gap-4">
            <span className="text-gray-400 shrink-0">•</span>
            <span className="text-gray-700 dark:text-gray-300">Building a system to compound thinking, not just store it</span>
          </li>
          <li className="flex gap-4">
            <span className="text-gray-400 shrink-0">•</span>
            <span className="text-gray-700 dark:text-gray-300">Identifying patterns between technology, markets, and human behavior</span>
          </li>
        </ul>
      </section>

      {/* Observation */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">A recurring observation</h3>
        <blockquote className="text-2xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed italic">
          "Most people optimize for growth. Few understand what their system is actually optimizing for."
        </blockquote>
        <p className="text-gray-600 dark:text-gray-400 mt-6">This feels like it should be obvious. It usually isn't.</p>
      </section>

      {/* Invitation */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
          I use this space to test ideas before they become products.
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          If you think deeply about systems, decisions, or the future — <span className="font-semibold">step into the Lab.</span>
        </p>
      </section>

      {/* Signature */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800 pt-12">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Not a portfolio. Not a blog.<br />
          A system for thinking, building, and becoming.
        </p>
      </section>
    </div>
  );
}
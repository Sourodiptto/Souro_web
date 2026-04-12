export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 text-sm" style={{ borderColor: "var(--accent-light)", color: "var(--accent)" }}>
      <div className="max-w-[65ch] mx-auto px-6">
        <div className="flex justify-between items-center">
          <p>© 2026 Souro</p>

          <div className="space-x-6">
            <a href="https://www.linkedin.com/in/sourodipttomondal/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-300">LinkedIn</a>
            <a href="https://github.com/Sourodiptto" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-300">GitHub</a>
            <a href="mailto:msourodiptto@gmail.com" className="hover:opacity-70 transition-opacity duration-300">Email</a>
          </div>
        </div>

        <p className="text-xs mt-4" style={{ color: "var(--accent-light)" }}>Documenting the journey of thinking, building, and becoming.</p>
      </div>
    </footer>
  );
}
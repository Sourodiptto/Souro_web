export default function Footer() {
  return (
    <footer className="border-t border-amber-200/30 mt-20 py-8 text-sm text-gray-600 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <p>© 2026 Souro</p>

          <div className="space-x-6">
            <a href="https://www.linkedin.com/in/sourodipttomondal/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900 transition-colors">LinkedIn</a>
            <a href="https://github.com/Sourodiptto" target="_blank" rel="noopener noreferrer" className="hover:text-amber-900 transition-colors">GitHub</a>
            <a href="mailto:msourodiptto@gmail.com" className="hover:text-amber-900 transition-colors">Email</a>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">Documenting the journey of thinking, building, and becoming.</p>
      </div>
    </footer>
  );
}
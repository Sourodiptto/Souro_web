export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-8 text-sm text-gray-500 dark:text-gray-400">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <p>© 2026 Souro</p>

          <div className="space-x-6">
            <a href="https://www.linkedin.com/in/sourodipttomondal/" target="_blank" rel="noopener noreferrer" className="hover:underline dark:hover:text-gray-300">LinkedIn</a>
            <a href="https://github.com/Sourodiptto" target="_blank" rel="noopener noreferrer" className="hover:underline dark:hover:text-gray-300">GitHub</a>
            <a href="mailto:msourodiptto@gmail.com" className="hover:underline dark:hover:text-gray-300">Email</a>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">Documenting the journey of thinking, building, and becoming.</p>
      </div>
    </footer>
  );
}
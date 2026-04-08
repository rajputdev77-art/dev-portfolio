export default function Footer() {
  return (
    <footer className="border-t border-ink/5 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <p>&copy; {new Date().getFullYear()} Dev Rajput</p>
        <div className="flex gap-6">
          <a
            href="mailto:rajputdev77@gmail.com"
            className="hover:text-teal-primary transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/devrajput07/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

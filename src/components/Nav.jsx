import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#gap', label: 'The gap' },
  { href: '#platform', label: 'How it works' },
  { href: '#languages', label: 'Languages' },
  { href: '#pilot', label: 'Pilot' },
];

export function StarMark({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 2l3.5 7 7.5 1-5.5 5.5 1.5 7.5-7-3.5-7 3.5 1.5-7.5L5 10l7.5-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-ink/10">
      <nav className="max-w-page mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <a href="#top" className="flex items-center gap-2.5 text-ink">
          <StarMark className="w-6 h-6 text-maroon" />
          <span className="font-display text-xl font-semibold tracking-tight">Raaha</span>
          <span
            dir="rtl"
            lang="ar"
            className="font-naskh text-lg text-ink-soft hidden sm:inline"
          >
            راحة
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft hover:text-maroon transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pilot"
            className="rounded-full bg-maroon hover:bg-maroon-deep text-ivory text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            Book a pilot call
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-ivory px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pilot"
            onClick={() => setOpen(false)}
            className="rounded-full bg-maroon text-ivory text-sm font-semibold px-5 py-3 text-center"
          >
            Book a pilot call
          </a>
        </div>
      )}
    </header>
  );
}

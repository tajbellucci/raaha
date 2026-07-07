import { ArrowRight } from 'lucide-react';
import { StarMark } from './Nav.jsx';

const CONTACT =
  'mailto:pactofficialorg@gmail.com?subject=Raaha%20pilot%20conversation&body=Company%3A%0ARole%3A%0AEmployees%3A%0AWhat%20prompted%20this%3A';

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center" data-reveal>
        <StarMark className="w-8 h-8 text-gold mx-auto" />
        <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-6 leading-[1.08]">
          Give your workforce a voice it will <em className="text-gold">actually use.</em>
        </h2>
        <p className="text-ivory/70 text-lg mt-5 max-w-xl mx-auto">
          Three design-partner slots this quarter. One 30-minute call to see the product speak
          your workforce&rsquo;s languages.
        </p>
        <a
          href={CONTACT}
          className="inline-flex items-center gap-2 rounded-full bg-maroon hover:bg-maroon-deep text-ivory font-semibold px-8 py-4 mt-9 transition-colors"
        >
          Book the pilot call <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      <div className="border-t border-ivory/15">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ivory/60">
          <p className="flex items-center gap-2">
            <span className="font-display text-ivory">Raaha</span>
            <span dir="rtl" lang="ar" className="font-naskh">راحة</span>
            <span>· wellbeing navigation OS</span>
          </p>
          <p>
            Built in Doha · <span dir="rtl" lang="ar" className="font-naskh">بُني في الدوحة</span> · © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

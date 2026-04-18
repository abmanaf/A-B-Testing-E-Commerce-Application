import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { WEBSITE_NAME } from '@/config/site-config';
import { ROUTES } from '@/config/routes';
import { FOOTER_LINKS, SOCIALS } from '@/components/shared/index';

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-2 font-bold text-zinc-900 text-lg tracking-tight w-fit"
            >
              <ShoppingBag className="size-5 text-amber-500" />
              {WEBSITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs">
              Discover thousands of curated products at prices you'll love.
              Delivered fast, returned easy.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition-colors hover:border-zinc-300 hover:text-zinc-700"
                >
                  <Icon className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {category}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-base text-zinc-400">
            <span>Made with</span>
            <span className="text-amber-500">♥</span>
            <span>for better shopping experiences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

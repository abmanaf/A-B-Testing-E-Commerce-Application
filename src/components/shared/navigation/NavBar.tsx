'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Menu, X, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { WEBSITE_NAME } from '@/config/site-config';
import { ROUTES } from '@/config/routes';
import { NAV_ITEMS } from '@/components/shared/index';
import { useCart } from '@/components/context/CartContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 font-bold text-zinc-900 text-lg tracking-tight"
        >
          <ShoppingBag className="size-5 text-amber-500" />
          {WEBSITE_NAME}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/cart"
            className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ShoppingCart className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-white">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost" size="sm" className="text-zinc-600">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                size="sm"
                className="bg-zinc-900 text-white hover:bg-zinc-700"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative p-2 text-zinc-600">
            <ShoppingCart className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-white">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>

          <Show when="signed-in">
            <UserButton />
          </Show>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9">
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 px-0">
              <SheetHeader className="px-6 pb-4 border-b border-zinc-100">
                <SheetTitle className="flex items-center gap-2 text-left font-bold text-zinc-900">
                  <ShoppingBag className="size-4 text-amber-500" />
                  {WEBSITE_NAME}
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col px-6 py-4 gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 px-6 pt-4 border-t border-zinc-100">
                <Show when="signed-out">
                  <SignInButton>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-700">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </Show>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

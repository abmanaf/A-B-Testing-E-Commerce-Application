import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-zinc-100 p-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="size-8 text-amber-600" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Coming Soon
          </h1>

          <p className="text-zinc-500 mb-6">
            We&apos;re working hard to bring you the best support experience. 
            Our contact form will be available shortly!
          </p>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="size-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <Link href="/products" className="block">
              <Button variant="ghost" className="w-full text-zinc-500">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mt-6">
          Have urgent inquiries? Email us at abdulmanafaliu35@gmail.com
        </p>
      </div>
    </div>
  );
}
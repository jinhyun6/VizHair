import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-primary">
              <span className="text-lg font-bold">HairstyleAI</span>
            </div>
            <p className="mt-4 max-w-xs text-muted-foreground">
              Transform your look with AI-powered hairstyle generation. See yourself in any style instantly.
            </p>
          </div>

          <div>
            <p className="font-medium text-foreground">Product</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground transition hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground transition hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground transition hover:text-foreground">
                  Try Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-foreground">Company</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-foreground">Legal</p>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground transition hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-muted-foreground transition hover:text-foreground">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; 2024 HairstyleAI. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 sm:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296C4.165 14.824 3.662 13.536 3.662 12c0-1.297.49-2.448 1.296-3.316C5.826 7.716 7.114 7.213 8.651 7.213c1.536 0 2.824.503 3.692 1.471.868.868 1.371 2.156 1.371 3.693s-.503 2.825-1.371 3.693c-.868.868-2.156 1.371-3.693 1.371-.203 0-.406-.013-.608-.052z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
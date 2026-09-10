export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-zinc-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">StayScape</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Investors
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Hosting</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  List your home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Host resources
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Community forum
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Safety information
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-primary">
                  Cancellation options
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} StayScape, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted hover:text-primary">Terms</a>
            <a href="#" className="text-sm text-muted hover:text-primary">Privacy</a>
            <a href="#" className="text-sm text-muted hover:text-primary">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

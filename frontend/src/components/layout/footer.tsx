import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-zinc-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">StayScape</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-primary">
                  Explore stays
                </Link>
              </li>
              <li>
                <Link href="/trips" className="text-sm text-muted hover:text-primary">
                  My Trips
                </Link>
              </li>
              <li>
                <Link href="/favourites" className="text-sm text-muted hover:text-primary">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Hosting</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/listings/new" className="text-sm text-muted hover:text-primary">
                  List your home
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-sm text-muted hover:text-primary">
                  Manage listings
                </Link>
              </li>
              <li>
                <Link href="/host/bookings" className="text-sm text-muted hover:text-primary">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} StayScape, Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-muted">Terms</span>
            <span className="text-sm text-muted">Privacy</span>
            <span className="text-sm text-muted">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

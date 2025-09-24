import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header currentPath={location.pathname} />
      <main className="flex-1 transition-all duration-500 ease-in-out">
        <div key={location.pathname} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

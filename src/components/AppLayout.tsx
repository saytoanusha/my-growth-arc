import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 min-h-screen pb-24 md:pb-8">
        {children}
      </main>
      {/* Bottom nav only on mobile */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;

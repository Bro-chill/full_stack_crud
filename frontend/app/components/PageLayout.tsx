import Navbar from "./Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

export default function PageLayout({ children, title, actions }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-[#00ffff] neon-text tracking-wider uppercase">
            [[ {title} ]]
          </h1>
          {actions}
        </div>
        {children}
      </div>
    </main>
  );
}

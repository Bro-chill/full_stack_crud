import { House, User, FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "react-router";

const navbarItems = [
  { name: "HOME", href: "/", icon: House },
  { name: "USERS", href: "/user", icon: User },
  { name: "POSTS", href: "/post", icon: FileText },
  { name: "STATS", href: "/dashboard", icon: LayoutDashboard },
];

const Navbar = () => {
  const location = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <nav className="bg-[#1a1f3a] border-b-2 border-[#00ffff] shadow-lg shadow-cyan-500/20">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00ffff] blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <span className="relative text-2xl font-bold text-[#00ffff] neon-text tracking-wider">
                [[ DB_MANAGER ]]
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navbarItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-2 font-bold tracking-wider transition-all duration-300 retro-button border-2 relative group ${isActive ? 'bg-[#00ffff] text-[#0a0e27] border-[#00ffff] shadow-lg shadow-cyan-500/50' : 'bg-transparent text-[#00ffff] border-[#2d3561] hover:border-[#00ffff] hover:shadow-lg hover:shadow-cyan-500/30'}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button type="button" className="hidden md:block px-4 py-2 font-bold tracking-wider bg-[#ff00ff] text-[#0a0e27] border-2 border-[#ff00ff] shadow-lg shadow-pink-500/50 hover:shadow-pink-500/75 transition-all retro-button">
              &gt; SIGN_UP
            </button>
            <button onClick={toggleNavbar} type="button" className="md:hidden p-2 text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0e27] transition-all">
              {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {navbarOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t-2 border-[#2d3561] pt-4">
            {navbarItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={toggleNavbar}
                  className={`block px-4 py-3 font-bold tracking-wider transition-all border-2 ${isActive ? 'bg-[#00ffff] text-[#0a0e27] border-[#00ffff]' : 'bg-[#1a1f3a] text-[#00ffff] border-[#2d3561] hover:border-[#00ffff]'}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </span>
                </Link>
              );
            })}
            <button type="button" className="w-full px-4 py-3 font-bold tracking-wider bg-[#ff00ff] text-[#0a0e27] border-2 border-[#ff00ff]">
              &gt; SIGN_UP
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Wallet,
  X,
  Award,
  NewspaperIcon,
  User,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Building2,
  BookOpen,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isLoading && !user && location.pathname !== "/login" && location.pathname !== "/register") {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Portfolio", path: "/portfolio", icon: PieChart },
    { name: "Transactions", path: "/transactions", icon: Wallet },
    {
      name: "Invest",
      icon: Building2,
      items: [
    { name: "Stock Market", path: "/market", icon: BarChart3 },
        { name: "Watchlist", path: "/watchlist", icon: Star },
    { name: "Mutual Funds", path: "/mutual-funds", icon: Briefcase },
      ]
    },
    {
      name: "Resources",
      icon: BookOpen,
      items: [
    { name: "News", path: "/news", icon: NewspaperIcon },
    { name: "Learn", path: "/learn", icon: GraduationCap },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary-900 to-primary-700 backdrop-blur-sm border-b border-primary-600">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white transition-all duration-300 group-hover:text-white/90">StellarTrade</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.items ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:scale-105",
                    item.items.some(subItem => location.pathname.startsWith(subItem.path))
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  )}>
                    <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-primary-200 animate-in slide-in-from-top-2">
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.path} asChild>
                        <Link
                          to={subItem.path}
                          className={cn(
                            "flex items-center space-x-2 transition-all duration-300 hover:bg-primary-50 hover:scale-105",
                            location.pathname === subItem.path && "text-primary-600"
                          )}
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-all duration-300 hover:scale-105",
                  location.pathname === item.path
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                )}
              >
                  <item.icon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                <span>{item.name}</span>
              </Link>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user && (
              <div className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 group">
                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                      <User className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="text-sm font-medium text-white transition-all duration-300 group-hover:text-white/90">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-white transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-sm border border-primary-200 animate-in slide-in-from-top-2">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary-50 hover:scale-105">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/leaderboard" className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary-50 hover:scale-105">
                        <Award className="h-4 w-4" />
                        <span>Leaderboard</span>
                  </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary-50 hover:scale-105">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                  </Link>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={logout} className="text-destructive transition-all duration-300 hover:bg-red-50 hover:scale-105">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300 hover:rotate-90" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-16">
          <div className="container flex flex-col h-full py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.items ? (
                  <div key={item.name} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3 px-2 py-3 rounded-md">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
                    <div className="pl-8 space-y-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "flex items-center space-x-3 px-2 py-3 rounded-md",
                            location.pathname === subItem.path
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <subItem.icon className="h-5 w-5" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-2 py-3 rounded-md",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
                )
              ))}
              <Separator className="my-2" />
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-muted text-left w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} StellarTrade. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

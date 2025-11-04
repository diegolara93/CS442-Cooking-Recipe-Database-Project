import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  onSignInClick?: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">FlavorDB</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors text-left">
            Recipes
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Categories
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button size="sm" className="hidden md:flex" onClick={onSignInClick}>
            Sign In
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
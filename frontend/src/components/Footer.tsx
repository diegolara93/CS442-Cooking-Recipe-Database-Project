import { Separator } from "./ui/separator";
import { ChefHat } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl">FlavorDB</span>
            </div>
            <p className="text-muted-foreground">
              Your ultimate destination for delicious recipes, cooking inspiration, and culinary adventures.
            </p>
          </div>

          {/* Recipes */}
          <div className="space-y-4">
            <h3>Recipes</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="hover:text-foreground cursor-pointer transition-colors">Breakfast</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Lunch</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Dinner</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Desserts</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Snacks</div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3>Categories</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="hover:text-foreground cursor-pointer transition-colors">Italian</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Asian</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Mexican</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Healthy</div>
              <div className="hover:text-foreground cursor-pointer transition-colors">Quick & Easy</div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        {/* Copyright */}
        <div className="text-center text-muted-foreground">
          <p>© 2025 FlavorDB</p>
        </div>
      </div>
    </footer>
  );
}
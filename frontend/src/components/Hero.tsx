import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChefHat } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730597363352-0a8fe6eb5d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbiUyMHV0ZW5zaWxzfGVufDF8fHx8MTc1ODY0NjMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cooking kitchen setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <ChefHat className="h-12 w-12 mr-3" />
          <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
            Discover Amazing Recipes
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
          Cook with
          <span className="block text-orange-400">Confidence</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">
          Discover thousands of delicious recipes, step-by-step tutorials, and cooking tips from professional chefs around the world.
        </p>

        <div className="flex items-center justify-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Explore Recipes
          </Button>
        </div>
      </div>
    </section>
  );
}
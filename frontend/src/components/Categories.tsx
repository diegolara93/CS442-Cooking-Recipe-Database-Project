import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Asian Cuisine",
    description: "Explore the rich flavors of Asia",
    image: "https://images.unsplash.com/photo-1638324396179-61035bc1e645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGN1aXNpbmUlMjBzdGlyJTIwZnJ5fGVufDF8fHx8MTc1ODY1Mjk4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 1200
  },
  {
    id: 2,
    name: "Baking & Bread",
    description: "From artisan breads to sweet treats",
    image: "https://images.unsplash.com/photo-1710857389315-2648c72c6ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMGJyZWFkJTIwYmFraW5nfGVufDF8fHx8MTc1ODY1Mjk4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 890
  },
  {
    id: 3,
    name: "Italian Classics",
    description: "Authentic recipes from Italy",
    image: "https://images.unsplash.com/photo-1711539137930-3fa2ae6cec60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzU4NjIxMDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 765
  },
  {
    id: 4,
    name: "Healthy & Fresh",
    description: "Nutritious meals for every day",
    image: "https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NTg1NjkyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 1050
  },
  {
    id: 5,
    name: "Desserts & Sweets",
    description: "Indulgent treats and confections",
    image: "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NTg1OTI1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 650
  },
  {
    id: 6,
    name: "Quick & Easy",
    description: "30-minute meals for busy lives",
    image: "https://images.unsplash.com/photo-1730597363352-0a8fe6eb5d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbiUyMHV0ZW5zaWxzfGVufDF8fHx8MTc1ODY0NjMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    recipeCount: 920
  }
];

export function Categories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect recipe for any occasion, dietary preference, or cooking skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.recipeCount} recipes</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-primary group-hover:text-orange-500 transition-colors">
                  <span className="mr-2">Explore recipes</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            Browse additional recipes
          </Button>
        </div>
      </div>
    </section>
  );
}
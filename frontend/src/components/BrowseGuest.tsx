import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Navigation } from "./Navigation";
import { Search, Clock, Users, Heart, ChefHat } from "lucide-react";
import { mockRecipes, cuisineTypes, dietaryFilters, timeFilters, Recipe } from "../data/recipes";

interface BrowseGuestProps {
  onBack: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onRecipeClick: (recipeId: string) => void;
}

export function BrowseGuest({ onBack, onSignIn, onSignUp, onRecipeClick }: BrowseGuestProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");

  const filterRecipes = (recipes: Recipe[]) => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCuisine = selectedCuisine === "All" || recipe.cuisine === selectedCuisine;
      
      const matchesDiet = selectedDiet === "All" || recipe.dietaryTags.includes(selectedDiet);
      
      const totalTime = recipe.prepTime + recipe.cookTime;
      const matchesTime = selectedTime === "All" || 
                         (selectedTime === "Under 30 min" && totalTime < 30) ||
                         (selectedTime === "30-60 min" && totalTime >= 30 && totalTime <= 60) ||
                         (selectedTime === "1-2 hours" && totalTime > 60 && totalTime <= 120) ||
                         (selectedTime === "2+ hours" && totalTime > 120);

      return matchesSearch && matchesCuisine && matchesDiet && matchesTime;
    });
  };

  const filteredRecipes = filterRecipes(mockRecipes);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Guest Notice */}
        <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Browsing as Guest</p>
                <p className="text-sm text-orange-600">Sign in to bookmark recipes, upvote, and leave comments</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={onBack}>
                Back to Home
              </Button>
              <Button variant="outline" onClick={onSignIn}>
                Sign In
              </Button>
              <Button onClick={onSignUp} className="bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Browse Recipes</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cuisine</label>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Diet</label>
              <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select diet" />
                </SelectTrigger>
                <SelectContent>
                  {dietaryFilters.map(diet => (
                    <SelectItem key={diet} value={diet}>{diet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeFilters.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onRecipeClick(recipe.id)}
            >
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                    <span>{recipe.bookmarkCount}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">by {recipe.author}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime + recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">{recipe.cuisine}</Badge>
                  {recipe.dietaryTags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No recipes found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("All");
                setSelectedDiet("All");
                setSelectedTime("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Navigation } from "./Navigation";
import { 
  Clock, 
  Users, 
  Star, 
  Edit,
  Trash2,
  Heart,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { mockRecipes, Recipe } from "../data/recipes";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface MyProfileProps {
  user: User;
  onHome: () => void;
  onCreateRecipe: () => void;
  onRecipeClick: (recipeId: string) => void;
  onSignOut: () => void;
}

export function MyProfile({ user, onHome, onCreateRecipe, onRecipeClick, onSignOut }: MyProfileProps) {
  // Mock data - in real app, these would come from API
  const [bookmarkedRecipes] = useState<Recipe[]>(mockRecipes.slice(0, 2));
  const [myRecipes] = useState<Recipe[]>(mockRecipes.filter(r => r.authorId === user.id));

  const handleEditRecipe = (recipeId: string) => {
    // In real app, would navigate to edit recipe page
    console.log("Edit recipe:", recipeId);
    alert("Edit recipe functionality would be implemented here");
  };

  const handleDeleteRecipe = (recipeId: string) => {
    // In real app, would show confirmation dialog and delete
    if (confirm("Are you sure you want to delete this recipe?")) {
      console.log("Delete recipe:", recipeId);
      alert("Recipe deleted (mock)");
    }
  };

  const RecipeCard = ({ recipe, showActions = false }: { recipe: Recipe; showActions?: boolean }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover"
          onClick={() => onRecipeClick(recipe.id)}
        />
        {showActions && (
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button 
              size="sm" 
              variant="secondary" 
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleEditRecipe(recipe.id);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRecipe(recipe.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3" onClick={() => onRecipeClick(recipe.id)}>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            <span>{recipe.bookmarkCount}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">by {recipe.author}</p>
      </CardHeader>

      <CardContent className="pt-0" onClick={() => onRecipeClick(recipe.id)}>
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
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>{recipe.upvotes}</span>
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user}
        currentPage="profile"
        onHome={onHome}
        onProfile={() => {}}
        onCreateRecipe={onCreateRecipe}
        onSignOut={onSignOut}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.displayName}'s Profile</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{myRecipes.length} Recipes Created</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{bookmarkedRecipes.length} Bookmarked</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={onCreateRecipe}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Create New Recipe
              </Button>
            </div>
          </div>

          {/* Recipe Collections */}
          <Tabs defaultValue="bookmarked" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="bookmarked" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Bookmarked Recipes ({bookmarkedRecipes.length})</span>
              </TabsTrigger>
              <TabsTrigger value="created" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>My Created Recipes ({myRecipes.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookmarked">
              {bookmarkedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarked recipes yet</h3>
                  <p className="text-gray-500 mb-4">
                    Start bookmarking recipes you love to see them here
                  </p>
                  <Button onClick={onHome} variant="outline">
                    Browse Recipes
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="created">
              {myRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes created yet</h3>
                  <p className="text-gray-500 mb-4">
                    Share your favorite recipes with the community
                  </p>
                  <Button onClick={onCreateRecipe} className="bg-orange-500 hover:bg-orange-600">
                    Create Your First Recipe
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Navigation } from "./Navigation";
import {
  Clock,
  Users,
  BookOpen,
  Heart,
} from "lucide-react";
import type { ApiRecipe, UiRecipe } from "@/src/types/recipe";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface MyProfileProps {
  user: User;
  onBrowse: () => void;
  onCreateRecipe: () => void;
  onRecipeClick: (recipeId: string) => void;
  onSignOut: () => void;
}

const TAG_LABELS: Record<string, string> = {
  VEGAN: "Vegan",
  VEGETARIAN: "Vegetarian",
  GLUTEN_FREE: "Gluten Free",
  DAIRY_FREE: "Dairy Free",
  KETO: "Keto",
  PALEO: "Paleo",
  LOW_CARB: "Low Carb",
  HIGH_PROTEIN: "High Protein",
  QUICK_EASY: "Quick & Easy",
  DESSERT: "Dessert",
  APPETIZER: "Appetizer",
};

const prettyTag = (tag: string) =>
    TAG_LABELS[tag] ??
    tag
        .toLowerCase()
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

const normalizeRecipe = (r: ApiRecipe): UiRecipe => {
  const author =
      typeof r.ownerUsername === "string"
          ? r.ownerUsername
          : r?.ownerUsername?.name ?? "Unknown";

  return {
    id: String(r.recipeID),
    title: r.title,
    description: r.description ?? "",
    imageUrl: r.imageUrl ?? "/placeholder.png",
    dietaryTags: r.tags ?? [],
    prepTime: r.prepTime ?? 0,
    cookTime: r.cookTime ?? 0,
    servings: r.servings ?? 1,
    upvotes: r.upvotes ?? 0,
    bookmarkCount: 0,
    difficulty: r.difficulty ?? 1,
    author,
    ingredients: r.ingredients ?? [],
    instructions: r.steps
      ? r.steps.split("\n").filter((s) => s.trim() !== "")
      : [],
    comments: [],
    commentCount: 0,
  };
};

export function MyProfile({
  user,
  onBrowse,
  onCreateRecipe,
  onRecipeClick,
}: MyProfileProps) {
  const [activeTab, setActiveTab] = useState<"created" | "favorited">("created");

  const [createdRecipes, setCreatedRecipes] = useState<UiRecipe[]>([]);
  const [loadingCreated, setLoadingCreated] = useState(true);

  const [favoritedRecipes, setFavoritedRecipes] = useState<UiRecipe[]>([]);
  const [loadingFavorited, setLoadingFavorited] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); 

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

  // Created Recipes
  useEffect(() => {
    async function loadCreated() {
      try {
        const res = await fetch(
            `${API_BASE}/api/recipes/u/${user.displayName}`,
            {
              credentials: "include",
            }
        );

        if (!res.ok) {
          console.error("Failed to fetch user recipes", res.status);
          return;
        }

        const data: ApiRecipe[] = await res.json();
        setCreatedRecipes(data.map(normalizeRecipe));
      } catch (err) {
        console.error("Error fetching user recipes:", err);
      } finally {
          setLoadingCreated(false);
        }
      }
      loadCreated();
    }, [user.displayName, API_BASE]);

  useEffect(() => {
    if (activeTab === "favorited" && !favoritesLoaded) {
      async function loadFavorites() {
        setLoadingFavorited(true);
        try {
          const res = await fetch(
            `${API_BASE}/api/user/u/${user.displayName}/upvoted`,
            { credentials: "include" }
          );

          if (!res.ok) {
            console.error("Failed to fetch favorited recipes", res.status);
            return;
          }

          const data: ApiRecipe[] = await res.json();
          setFavoritedRecipes(data.map(normalizeRecipe));
          setFavoritesLoaded(true);
        } catch (err) {
          console.error("Error fetching favorited recipes:", err);
        } finally {
          setLoadingFavorited(false);
        }
      }
      loadFavorites();
    }
  }, [activeTab, user.displayName, favoritesLoaded, API_BASE]);

  const RecipeCard = ({
      recipe,
    }: {
    recipe: UiRecipe;
    showActions?: boolean;
  }) => (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
          <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
              onClick={() => onRecipeClick(recipe.id)}
          />
        </div>

        <CardHeader className="pb-3" onClick={() => onRecipeClick(recipe.id)}>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg line-clamp-2">
              {recipe.title}
            </CardTitle>
          </div>
          <p className="text-sm text-gray-600">by {recipe.author}</p>
        </CardHeader>

        <CardContent className="pt-0" onClick={() => onRecipeClick(recipe.id)}>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {recipe.description}
          </p>

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
            {recipe.dietaryTags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {prettyTag(tag)}
                </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
  );

  // Helper to determine what to render
  const currentList = activeTab === "created" ? createdRecipes : favoritedRecipes;
  const currentLoading = activeTab === "created" ? loadingCreated : loadingFavorited;
  const emptyMessage = activeTab === "created" ? "No recipes created yet" : "No recipes favorited yet";
  const emptySubMessage = activeTab === "created"
    ? "Share your favorite recipes with the community."
    : "Browse recipes and upvote them to save them here.";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="profile" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {user.displayName}'s Profile
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{createdRecipes.length} Recipes Created</span>
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

          {/* Recipes Section with Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Tab Navigation */}
            <div className="flex space-x-6 border-b mb-6">
              <button
                onClick={() => setActiveTab("created")}
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "created"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                My Recipes
              </button>
              <button
                onClick={() => setActiveTab("favorited")}
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "favorited"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Favorited
              </button>
            </div>

            {/* Content Area */}
            {currentLoading ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Loading recipes...</p>
              </div>
            ) : currentList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentList.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                {activeTab === "created" ? (
                  <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                ) : (
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                )}
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {emptyMessage}
                </h3>
                <p className="text-gray-500 mb-4">{emptySubMessage}</p>
                {activeTab === "created" ? (
                  <Button
                    onClick={onCreateRecipe}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Create Your First Recipe
                  </Button>
                ) : (
                  <Button onClick={onBrowse} variant="default" className="bg-orange-500 hover:bg-orange-600">
                    Browse Recipes
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
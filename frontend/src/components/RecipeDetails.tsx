"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import {
  Clock,
  Users,
  Heart,
  ChefHat,
  MessageCircle,
  Send,
} from "lucide-react";
import { ApiRecipe, type UiComment, UiRecipe } from "../types/recipe";
import { useSession } from "../context/CsrfContext";
import { useApi } from "@/src/lib/apiClient";
import { toast } from "react-toastify";

interface RecipeDetailsProps {
  recipeAPI: ApiRecipe;
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
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

const getAuthor = (r: ApiRecipe): string => {
  const fromOwner =
      r.owner?.username && r.owner.username.trim().length > 0
          ? r.owner.username
          : undefined;

  const fromAuthorField =
      r.author && r.author.trim().length > 0 ? r.author : undefined;

  const fromOwnerUsername =
      typeof r.ownerUsername === "string"
          ? r.ownerUsername
          : r.ownerUsername?.name;

  return fromOwner || fromAuthorField || fromOwnerUsername || "Unknown";
};

const normalizeRecipe = (r: ApiRecipe): UiRecipe => {
  const comments: UiComment[] = (r.comments ?? []).map((c) => ({
    id: String(c.id ?? c.commentID),
    content: c.text ?? c.content ?? "",
    author: c.commenterUsername ?? r.owner?.username ?? "Unknown",
  }));

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
    author: getAuthor(r),
    ingredients: r.ingredients ?? [],
    comments,
    commentCount: comments.length,
    instructions: r.steps
        ? r.steps.split("\n").filter((s) => s.trim() !== "")
        : [],
    difficulty: r.difficulty ?? 1,
  };
};

export function RecipeDetails({ recipeAPI }: RecipeDetailsProps) {
  const { user } = useSession();
  const { apiFetch } = useApi();
  const recipe = normalizeRecipe(recipeAPI);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(recipe.comments);
  const [commentCount, setCommentCount] = useState(recipe.commentCount);

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(recipe.upvotes);

  useEffect(() => {
    if (!user) return;

    async function checkUpvoteStatus() {
      try {
        const res = await apiFetch(`/api/recipes/r/${recipe.id}/upvoted`);
        if (res.ok) {
          const status = await res.json();
          setIsUpvoted(status);
        }
      } catch (err) {
        console.error("Error checking upvote status", err);
      }
    }

    checkUpvoteStatus();
  }, [user, recipe.id, apiFetch]);

  const handleToggleUpvote = async () => {
    if (!user) return;

    try {
      const res = await apiFetch(`/api/recipes/r/${recipe.id}/upvote`, {
        method: "POST",
      });

      if (!res.ok) {
        toast.error("Failed to update favorite status");
        return;
      }

      const data = await res.json();
      setUpvoteCount(data.upvotes);
      setIsUpvoted(data.upvoted);
      
      if(data.upvoted) {
          toast.success("Added to favorites!");
      } else {
          toast.info("Removed from favorites.");
      }

    } catch (err) {
      console.error("Error toggling upvote:", err);
      toast.error("Something went wrong.");
    }
  };

  const refreshComments = async () => {
    try {
      const res = await apiFetch(`/api/recipes/r/byId/${recipe.id}`);
      if (!res.ok) {
        console.error("Failed to refresh comments", res.status);
        toast.error("Failed to refresh comments, please try again!")
        return;
      }

      const freshApi = (await res.json()) as ApiRecipe;
      const fresh = normalizeRecipe(freshApi);

      setComments(fresh.comments);
      setCommentCount(fresh.commentCount);
    } catch (err) {
      console.error("Error refreshing comments:", err);
      toast.error("Error refreshing comments.");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      const params = new URLSearchParams({ text: newComment });

      const res = await apiFetch(
          `/api/recipes/r/${recipe.id}/comment?${params.toString()}`,
          {
            method: "POST",
          }
      );

      if (!res.ok) {
        console.error("Failed to post comment", res.status);
        toast.error("Failed to post comment, please try again!");
        return;
      }

      await refreshComments();
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      console.error("Error posting comment:", err);
      toast.error("Error posting comment.");
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Recipe Header */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="aspect-video bg-gray-200 relative">
                <img
                    src={recipe.imageUrl!}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <ChefHat className="h-4 w-4" />
                        <span>by {recipe.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button (Only visible if signed in) */}
                  {user && (
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleToggleUpvote}
                        className="rounded-full hover:bg-red-50"
                        title={isUpvoted ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          className={`h-8 w-8 transition-colors duration-200 ${
                            isUpvoted
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                      <span className="text-xs text-gray-500 font-medium mt-1">
                        {upvoteCount}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{recipe.description}</p>
                {/* Recipe Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <div className="text-sm font-medium">Prep Time</div>
                    <div className="text-gray-600">{recipe.prepTime} min</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <div className="text-sm font-medium">Cook Time</div>
                    <div className="text-gray-600">{recipe.cookTime} min</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <div className="text-sm font-medium">Servings</div>
                    <div className="text-gray-600">{recipe.servings}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <ChefHat className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <div className="text-sm font-medium">Difficulty</div>
                    <div className="text-gray-600">{recipe.difficulty}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {recipe.dietaryTags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {prettyTag(tag)}
                      </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                        >
                          <span>{ingredient}</span>
                        </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                          <span className="text-gray-700 leading-relaxed">
                        {instruction}
                      </span>
                        </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Comments ({commentCount})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                      <div className="flex space-x-3">
                        <Input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={!newComment.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                ) : (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-600 mb-2">
                        Sign in to leave a comment
                      </p>
                    </div>
                )}

                <div className="space-y-4">
                  {comments.map((comment) => (
                      <div
                          key={comment.id}
                          className="border-b border-gray-100 pb-4 last:border-0"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{comment.author}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                  ))}

                  {comments.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No comments yet. Be the first to comment!
                      </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
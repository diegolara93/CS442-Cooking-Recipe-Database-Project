import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Navigation } from "./Navigation";
import { 
  Clock, 
  Users, 
  Star, 
  Heart, 
  TrendingUp, 
  ChefHat,
  MessageCircle,
  Send
} from "lucide-react";
import { mockRecipes, Recipe } from "../data/recipes";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface RecipeDetailsProps {
  recipeId: string;
  user?: User;
  onHome: () => void;
  onProfile?: () => void;
  onCreateRecipe?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
}

export function RecipeDetails({ 
  recipeId, 
  user, 
  onHome, 
  onProfile, 
  onCreateRecipe,
  onSignIn,
  onSignUp,
  onSignOut 
}: RecipeDetailsProps) {
  const [newComment, setNewComment] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  const recipe = mockRecipes.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          user={user}
          onHome={onHome}
          onProfile={onProfile}
          onCreateRecipe={onCreateRecipe}
          onSignIn={onSignIn}
          onSignUp={onSignUp}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
            <Button onClick={onHome}>Back to Browse</Button>
          </div>
        </div>
      </div>
    );
  }

  // Initialize state with recipe data
  useState(() => {
    setUpvoteCount(recipe.upvotes);
  });

  const handleUpvote = () => {
    if (!user) return;
    
    if (isUpvoted) {
      setUpvoteCount(prev => prev - 1);
      setIsUpvoted(false);
    } else {
      setUpvoteCount(prev => prev + 1);
      setIsUpvoted(true);
    }
  };

  const handleBookmark = () => {
    if (!user) return;
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;
    
    // In a real app, this would submit to an API
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        user={user}
        onHome={onHome}
        onProfile={onProfile}
        onCreateRecipe={onCreateRecipe}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
        onSignOut={onSignOut}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              {user && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant={isBookmarked ? "default" : "secondary"}
                    onClick={handleBookmark}
                    className="bg-white/90 hover:bg-white text-gray-800"
                  >
                    <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isUpvoted ? "default" : "secondary"}
                    onClick={handleUpvote}
                    className="bg-white/90 hover:bg-white text-gray-800"
                  >
                    <TrendingUp className={`h-4 w-4 ${isUpvoted ? 'text-orange-500' : ''}`} />
                    <span className="ml-1">{upvoteCount}</span>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <ChefHat className="h-4 w-4" />
                      <span>by {recipe.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                      <span>{recipe.bookmarkCount} bookmarks</span>
                    </div>
                  </div>
                </div>
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
                <Badge className="bg-orange-100 text-orange-800">{recipe.cuisine}</Badge>
                {recipe.dietaryTags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
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
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span>{ingredient.name}</span>
                      <span className="text-gray-600 font-medium">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
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
                      <span className="text-gray-700 leading-relaxed">{instruction}</span>
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
                <span>Comments ({recipe.comments.length})</span>
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
                  <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
                  <Button onClick={onSignIn} variant="outline">Sign In</Button>
                </div>
              )}

              <div className="space-y-4">
                {recipe.comments.map(comment => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
                
                {recipe.comments.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
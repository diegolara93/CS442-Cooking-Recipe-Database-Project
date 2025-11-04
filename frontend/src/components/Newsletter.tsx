import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Mail, ChefHat } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-primary-foreground text-primary border-0">
          <CardContent className="p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-orange-500 rounded-full p-3 mr-4">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <Mail className="h-8 w-8 text-orange-500" />
            </div>
            
            <h2 className="text-4xl mb-4">Never Miss a Recipe</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get weekly recipe inspiration, cooking tips, and exclusive content delivered straight to your inbox. Join over 50,000 home cooks!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl mb-2">Weekly Recipes</div>
                <div className="text-muted-foreground">New recipes every week</div>
              </div>
              <div>
                <div className="text-2xl mb-2">Cooking Tips</div>
                <div className="text-muted-foreground">Expert advice & techniques</div>
              </div>
              <div>
                <div className="text-2xl mb-2">Exclusive Content</div>
                <div className="text-muted-foreground">Subscriber-only recipes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
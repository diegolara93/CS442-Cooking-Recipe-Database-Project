import { HomeBrowse } from "@/src/components/HomeBrowse";
import { headers } from "next/headers";

type ApiRecipe = {
  recipeID: number;
  title: string;
  description?: string | null;
  prepTime?: number | null;
  cookTime?: number | null;
  servings?: number | null;
  difficulty?: number | null;
  upvotes?: number | null;
  steps?: string | null;
  recipeOwner?: { name?: string } | string | null;
  imageUrl?: string | null;
  tag?: string | null; // e.g. "QUICK_EASY"
  ingredients?: unknown[];
};

  export default async function Page() {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/recipes`, { cache: "no-store" });
    const recipes: ApiRecipe[] = res.ok ? await res.json() : [];

    return <HomeBrowse recipes={recipes} user={null} />;
}

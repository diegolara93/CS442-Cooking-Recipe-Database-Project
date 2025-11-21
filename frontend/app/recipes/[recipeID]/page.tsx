export default async function Page({ params }: { params: { recipeID: number } }) {
    const { recipeID } = params;

    return <p>Recipe ID: {recipeID}</p>;
}

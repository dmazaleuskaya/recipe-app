import Link from "next/link";
import { client as sanityClient, urlForImage } from "../../sanity/lib";

const recipesQuery = `*[_type == "recipe"]{
  _id,
    name,
    ingredient,
    chef,
    instructions,
    slug,
    mainImage
}`;

type Recipe = {
  _id: string;
  name: string;
  mainImage: string;
  slug: {
    current: string;
  };
};

export default function Recipes({ recipes = [] }: { recipes: Recipe[] }) {
  return (
    <>
      <h1>Welcome to Dasha's kitchen</h1>
      <ul className="recipes-list">
        {recipes.map((recipe, index) => (
          <li className="recipes-card" key={recipe._id}>
            <Link href={`/recipes/${recipe.slug.current}`}>
              <div>
                <img alt={recipe.name} src={urlForImage(recipe.mainImage).url()} />
                <span>{recipe.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);

  return {
    props: {
      recipes,
    },
  };
}

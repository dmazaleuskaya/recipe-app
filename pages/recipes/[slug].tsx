import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { client as sanityClient, urlForImage } from "../../sanity/lib";
import { useRouter } from "next/router";

const recipeQuery = `*[_type == 'recipe' && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
        _key,
        unit, 
        wholeNumber,
        fraction,
        ingredient->{
            name
        }
    },
    instructions,
    likes
}`;

type Recipe = {
  _id: string;
  name: string;
  mainImage: string;
};

export default function Recipe({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const [likes, setLikes] = useState(recipe?.likes);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const addLike = async () => {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((error) => console.log(error));

    const data = await res.json();

    setLikes(data.likes);
  };

  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>
      <button className="recipe_likeButton" type="button" onClick={addLike}>
        {likes} ❤️
      </button>
      <main className="recipe_content">
        <img alt={recipe.name} src={urlForImage(recipe.mainImage).url()} />
        <div className="recipe_breakdown">
          <ul className="recipe_ingredients">
            {recipe.ingredient.map((ingredient) => {
              return (
                <li key={ingredient._key} className="recipe_ingredient">
                  {ingredient.wholeNumber} {ingredient.fraction}{" "}
                  {ingredient.unit}
                  <br />
                  {ingredient.ingredient.name}
                </li>
              );
            })}
          </ul>
          <div className="recipe_instructions">
            <PortableText value={recipe.instructions} />
          </div>
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == 'recipe' && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });

  return {
    props: { recipe },
  };
}

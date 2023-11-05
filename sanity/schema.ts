import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: "Chef",
      title: "Chef",
      type: "document",
      fields: [
        {
          name: "name",
          title: "Chef's name",
          type: "string",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "bio",
          title: "Bio",
          type: "array",
          of: [
            {
              title: "Block",
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              lists: [],
            },
          ],
        },
      ],
    },
    {
      name: "ingredient",
      title: "Ingredient",
      type: "document",
      fields: [
        { name: "name", title: "Ingredient name", type: "string" },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        },
        { name: "notes", title: "Notes", type: "text" },
      ],
    },
    {
      name: "recipe",
      title: "Recipe",
      type: "document",
      fields: [
        { name: "name", title: "Recipe name", type: "string" },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
          },
        },
        {
          name: "chef",
          title: "Chef",
          type: "reference",
          to: { type: "Chef" },
        },
        {
          name: "mainImage",
          title: "Recipe main image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "ingredient",
          title: "Ingredient",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "ingredient",
                  title: "Ingredient",
                  type: "reference",
                  to: [{ type: "ingredient" }],
                },
                {
                  name: "wholeNumber",
                  title: "Whole Number",
                  type: "number",
                },
                {
                  name: "fraction",
                  title: "Fraction",
                  type: "string",
                  options: {
                    list: ["1/2", "1/3", "2/3", "1/4", "2/4", "3/4"],
                  },
                },
                {
                  name: "unit",
                  title: "unit",
                  type: "string",
                  options: {
                    list: ["grams", "cup", "Tbsp.", "tsp."],
                  },
                },
              ],
              preview: {
                select: {
                  title: "ingredient.name",
                  name: "ingredient.name",
                  media: "ingredient.image",
                  wholeNumber: "wholeNumber",
                  fraction: "fraction",
                  unit: "unit",
                },
                prepare({
                  title,
                  subtitle,
                  media,
                  wholeNumber = "(No whole number set)",
                  fraction = "(No fraction set)",
                  unit = "(No unit set)",
                }: {
                  title: string;
                  subtitle: string;
                  media: string;
                  wholeNumber: number | string;
                  fraction: string;
                  unit: string;
                }) {
                  return {
                    title,
                    subtitle: `${wholeNumber} ${fraction} ${unit}`,
                    media,
                  };
                },
              },
            },
          ],
        },
        {
          name: "instructions",
          title: "Instructions",
          type: "array",
          of: [{ type: "block" }],
        },
        { name: "likes", title: "Likes", type: "number" },
      ],
      initialValue: {
        likes: 0,
      },
    },
  ],
};

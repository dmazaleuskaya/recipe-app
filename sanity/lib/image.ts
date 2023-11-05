import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { sanityConfig } from "./config";

const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};

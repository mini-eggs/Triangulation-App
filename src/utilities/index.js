import * as Cube from "./cube";
export { Cube };

import * as Imgur from "./imgur";
export { Imgur };

export function fixImages(images) {
  return images.map(image => {
    const fixed = image.split(".");
    return `${fixed
      .slice(0, fixed.length - 1)
      .join(".")}m.${fixed[fixed.length - 1]}`;
  });
}

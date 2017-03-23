const BASE = "https://restroomrate.herokuapp.com";
// const BASE = "http://localhost:8000";
export const SOCKET = `${BASE}/`;

import * as Cube from "./cube";
export { Cube };

export function fixImages(images) {
  return images.map(image => {
    const fixed = image.split(".");
    return `${fixed
      .slice(0, fixed.length - 1)
      .join(".")}m.${fixed[fixed.length - 1]}`;
  });
}

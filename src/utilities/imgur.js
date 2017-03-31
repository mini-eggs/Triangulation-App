import { IMGUR_CLIENT_ID } from "../keys/";
const url = "https://api.imgur.com/3/image";

export function uploadPhoto(base64) {
  return new Promise(async (resolve, reject) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Client-ID " + IMGUR_CLIENT_ID
    };

    const post = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        image: base64.replace("data:image/png;base64,", "")
      })
    };

    try {
      const res = await fetch(url, post);
      const json = await res.json();
      const image = json.data.link.replace("http://", "https://");
      resolve(image);
    } catch (err) {
      reject(err);
    }
  });
}

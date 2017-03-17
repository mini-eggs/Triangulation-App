const BASE = "https://restroomrate.herokuapp.com";
// const BASE = "http://localhost:8000"
export const SOCKET = `${BASE}/`;

// const uploadImage = image => {
//   return new Promise( async (resolve, reject) => {
//     const url = "https://api.imgur.com/3/image";
//     const headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Client-ID " + "9efa54b83693d58"
//     };
//     const options = {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify({ image: image })
//     };
//     try {
//       const response = await fetch(url, options);
//       const imageData = await response.json();
//       const link = imageData.data.link;
//       resolve(link.replace("http://", "https://"));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

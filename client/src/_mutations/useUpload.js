import { useMutation } from "react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function useUpload(albumCode) {
  function mutate(file, config = {}) {
    return new Promise((resolve, reject) => {
      const key = uuidv4();
      // Get signed url
      axios
        .post("/api/v1/signed-urls", { key })
        .then((response) => {
          const { signedUrl } = response.data;
          // Upload to aws s3
          axios
            .put(signedUrl, file, config)
            .then((response) => {
              console.log(response);
              // Add key to photo to album in mongo
              axios
                .put(`/api/v1/albums/${albumCode}/photos`, { key })
                .then((response) => {
                  console.log(response);
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  const config = {};

  return useMutation(mutate, config);
}
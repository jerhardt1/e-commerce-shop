import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.reponse && error.response.status >= 400 && error.reponse.status < 500;

  if (!expectedError) console.log("Unexpected error occured");

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

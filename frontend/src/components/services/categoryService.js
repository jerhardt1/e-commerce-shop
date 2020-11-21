import http from "./httpService";
import config from "../../config.json";

const apiEndpoint = config.apiUrl;

export const getCategories = () => {
  const categories = http.get(apiEndpoint + "/productTypes");

  return categories;
};

export const getTags = () => {
  const tags = http.get(apiEndpoint + "/tags");
  return tags;
};

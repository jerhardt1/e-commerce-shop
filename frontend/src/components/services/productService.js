import httpservice from "./httpService";
import config from "../../config.json";

const apiEndpoint = config.apiUrl + "/products";

function productURL(id) {
  return `${apiEndpoint}/${id}`;
}

export const getProducts = () => {
  const products = httpservice.get(apiEndpoint);
  return products;
};

export const getProduct = (id) => {
  const product = httpservice.get(productURL(id));
  return product;
};

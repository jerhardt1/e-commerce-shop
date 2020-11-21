import httpservice from "./httpService";
import config from "../../config.json";

const apiEndpoint = config.apiUrl + "/promotions";

function promotionURL(id) {
  return `${apiEndpoint}/${id}`;
}

export const getPromotions = () => {
  const promotions = httpservice.get(apiEndpoint);
  return promotions;
};

export const getPromotion = (id) => {
  const promotion = httpservice.get(promotionURL(id));
  return promotion;
};

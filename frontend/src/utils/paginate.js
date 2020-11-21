import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize; // ex: currentPage 2 * pageSize 5 = 10
  return _(items).slice(startIndex).take(pageSize).value(); // crop array from index 10 and take next 5 items to return
}

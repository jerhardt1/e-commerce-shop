export function update(key = "name", value = []) {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(value));
}

export function set(key = "name", value = []) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key = "name") {
  localStorage.removeItem(key);
}

export function get(key = "name") {
  return JSON.parse(localStorage.getItem(key));
}

export function insert(key = "name", item = {}) {
  let values = get(key);

  if (values) {
    values.push(item);
    set(key, values);
  } else {
    values = [item];
  }
}

export function getAmount(key = "name") {
  const values = get(key);
  let total = 0;

  if (values) {
    values.forEach(() => (total += 1));
  }

  return total;
}

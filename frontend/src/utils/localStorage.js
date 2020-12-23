export function update(identifier = "name", content = []) {
  localStorage.removeItem(identifier);
  localStorage.setItem(identifier, JSON.stringify(content));
}

export function set(identifier = "name", content = []) {
  localStorage.setItem(identifier, JSON.stringify(content));
}

export function remove(identifier = "name") {
  localStorage.removeItem(identifier);
}

export function get(identifier = "name") {
  return JSON.parse(localStorage.getItem(identifier));
}

export function addToLocalStorage(key:string, value:string) {
  localStorage.setItem(key, value);
}
export function getFromLocalStorage(key:string) {
  return localStorage.getItem(key);
}

/**
 * Clears the local storage, and logs out the user
 */
export function logOut() {
  localStorage.clear();
  alert("Logged out! Sending you home");
  window.location.href = "../index.html";
}

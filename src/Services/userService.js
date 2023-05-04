import http from "./httpService";
//import the route
const url = "http://localhost:4000/"
/**
 * Posts the login data
 *
 * @param {Object} data The login information
 * @return {Object} A JWT token
 */
export function login(data) {
  return http.post(`${url}/login`, data);
}

/** TODO: unimplemented
 * Posts the login data
 *
 * @return {Object} A JWT token
 */
export function logout() {
  return http.post(`${url}/logout`);
}

/**
 * Creates a user account
 *
 * @param {Object} data The information to create an account
 * @return {Object} The created account
 */
export function createAccount(data) {
  return http.post(`${url}/createAccount`, data);
}
import axios from "axios";

const API_KEY = `AIzaSyDZYAKqLG7HH9uPB3pDObLgEHsXQipJbog`;
/**
 * Authenticates the user using the specified mode, email, and password.
 * @param {string} mode - The authentication mode (e.g., "signInWithPassword", "signUp").
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the authentication data.
 *                             The object will have properties like "token", "success", "error", etc.
 */
export const authenticate = async (mode, email, password) => {
  try {
    const { data } = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });
    return { ...data, token: data.idToken, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, success: false };
  }
};

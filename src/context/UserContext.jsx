import { createContext, useContext, useState, useEffect } from "react";

/**
 * Context API for managing user data.
 *
 * @typedef {Object} UserContextState
 * @property {object} user - The current user object.
 * @property {string} token - The authentication token.
 * @property {function} setUser - Sets the user state.
 * @property {function} setToken - Sets the token state.
 *
 * @constant
 * @type {React.Context<UserContextState>}
 */
export const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

/**
 * Hook for accessing the UserContext state.
 *
 * @return {UserContextState} The current state of the UserContext.
 */
export const useUserContext = () => useContext(UserContext);

/**
 * Provider for the UserContext.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {ReactElement} The rendered UserContext.Provider component.
 */
export const UserProvider = ({ children }) => {
  /**
   * Retrieves data from localStorage and attempts to parse it as JSON.
   * If unable to parse, logs an error and returns null.
   *
   * @param {string} key The localStorage key to retrieve data from.
   * @return {object|string|null} The parsed data, or null if unable to parse.
   */
  const getLocalStorageItem = (key) => {
    const storedData = localStorage.getItem(key);
    try {
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error(`Error parsing data from localStorage key: ${key}`, error);
      return null;
    }
  };

  const [user, setUser] = useState(getLocalStorageItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    // Sync the user and token with localStorage whenever they change
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  console.log("Current user:", user);
  console.log("Current token:", token);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

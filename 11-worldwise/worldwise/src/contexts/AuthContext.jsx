import { useContext, createContext, useReducer } from "react";

const FAKE_USER = {
  name: "Igal",
  email: "igal.nikolaev@gmail.com",
  password: "Aa123456",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthonticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthonticated: true };
    case "logout":
      return { ...state, user: null, isAuthonticated: false };
    default:
      throw new Error("Action Not Recognized");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthonticated }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthonticated, login, logout }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("context use outside of AuthProvider");

  return context;
}

export { AuthProvider, useAuth };

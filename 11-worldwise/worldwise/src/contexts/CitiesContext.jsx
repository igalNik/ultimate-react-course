import { useReducer } from "react";
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const CITIES_ACTION_TYPES = {
  LOADING: "loading",
  CITIES_LOADED: "cities/loaded",
  CITIES_CREATE: "cities/create",
  CITIES_DELETE: "cities/delete",
};

const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoad: false, error: action.payload };
    default:
      throw new Error("action not recognized");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ isLoading, cities, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchCities() {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(`${BASE_URL}/cities`);

          if (!res.ok) throw new Error("Somthing went wrong");

          const data = await res.json();

          dispatch({ type: "cities/loaded", payload: data });
        } catch (err) {
          dispatch({ type: "rejected", payload: "there is an error to loading data" });
        }
      }
      fetchCities();
    },
    ["cities"]
  );

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Somthing went wrong");

      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is an error to loading data" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(`${BASE_URL}/cities`, fetchOptions);

      if (!res.ok) throw new Error("Somthing went wrong");

      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is an error to creating a city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const fetchOptions = {
        method: "DELETE",
      };

      const res = await fetch(`${BASE_URL}/cities/${id}`, fetchOptions);

      if (!res.ok) throw new Error("Somthing went wrong");

      dispatch({ type: "cities/delete", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is an error to delete city" });
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) throw new Error("CitiesContext used outside of CitiesProvider");

  return context;
}
export { CitiesProvider, useCities };

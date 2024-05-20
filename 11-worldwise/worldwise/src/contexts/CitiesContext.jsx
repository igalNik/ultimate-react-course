import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) throw new Error("Somthing went wrong");

        const data = await res.json();

        setCities(data);
        console.log(data);
      } catch (err) {
        alert("there is an error to loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, "cities");

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Somthing went wrong");

      const data = await res.json();

      setCurrentCity(data);
    } catch (err) {
      alert("there is an error to loading data");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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

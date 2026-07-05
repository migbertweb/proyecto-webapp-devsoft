"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { City } from "@prisma/client";

interface CityContextType {
  cities: City[];
  currentCity: City | null;
  setCurrentCity: (city: City) => void;
  showSelector: boolean;
  setShowSelector: (v: boolean) => void;
}

const CityContext = createContext<CityContextType>({
  cities: [],
  currentCity: null,
  setCurrentCity: () => {},
  showSelector: false,
  setShowSelector: () => {},
});

export function useCity() {
  return useContext(CityContext);
}

export function CityProvider({
  cities,
  initialCityId,
  children,
}: {
  cities: City[];
  initialCityId: string | null;
  children: React.ReactNode;
}) {
  const [currentCity, setCurrentCityState] = useState<City | null>(null);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    if (initialCityId) {
      const found = cities.find((c) => c.id === initialCityId);
      if (found) {
        setCurrentCityState(found);
        localStorage.setItem("current-city-id", found.id);
        return;
      }
    }

    const stored = localStorage.getItem("current-city-id");
    if (stored) {
      const found = cities.find((c) => c.id === stored);
      if (found) {
        setCurrentCityState(found);
        return;
      }
    }

    if (cities.length > 0) {
      setShowSelector(true);
    }
  }, [cities, initialCityId]);

  const setCurrentCity = useCallback(
    async (city: City) => {
      setCurrentCityState(city);
      localStorage.setItem("current-city-id", city.id);
      setShowSelector(false);
      await fetch("/api/city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityId: city.id }),
      });
    },
    []
  );

  return (
    <CityContext.Provider
      value={{ cities, currentCity, setCurrentCity, showSelector, setShowSelector }}
    >
      {children}
    </CityContext.Provider>
  );
}
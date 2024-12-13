import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "./axiosInstance";
import { useRouter } from "next/navigation";
import { Event } from "../../server/lib/definitions.ts";

interface Filters {
  userID: number | null;
  title: string | "";
  location: string | "";
  date: Date | "";
  categoryID: number | null;
}

interface SearchContextType {
  filters: Filters;
  filteredEvents: Array<object>;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  updateEvents: (events: Event[]) => void;
}

const SearchContext = createContext<SearchContextType>({
  filters: {
    userID: null,
    title: "",
    location: "",
    date: "",
    categoryID: null,
  },
  filteredEvents: [],
  setFilters: () => {},
  updateEvents: () => {},
});

// Context Provider Component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    userID: null,
    title: "",
    location: "",
    date: "",
    categoryID: null,
  }); // Ensure the initial state matches the Filters interface

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const updateEvents = (newEvents: Event[]) => {
    setFilteredEvents(newEvents);
  };

  return (
    <SearchContext.Provider
      value={{ filters, filteredEvents, setFilters, updateEvents }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

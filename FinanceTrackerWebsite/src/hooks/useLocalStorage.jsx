import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Initialize state

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      // No saved data
      if (!item) {
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error("LocalStorage read error:", error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("LocalStorage save error:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

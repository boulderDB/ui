import { useCallback, useState } from "react";

export const defaultFilters = [
  {
    id: "ascent",
    value: "todo",
  },
];

export default function useBoulderFilters(initialFilters) {
  const [filters, setFilters] = useState(initialFilters);

  const applyFilter = useCallback(
    (id, value) => {
      // if passed value is empty, clear the filter
      if (!value) {
        setFilters([
          ...filters.filter((activeFilter) => activeFilter.id !== id),
        ]);

        return;
      }

      // clone array, filter out current filters on given id to suppress duplicate filtering
      const currentFilters = [...filters].filter(
        (currentFilter) => currentFilter.id !== id
      );

      currentFilters.push({
        id,
        value,
      });

      setFilters(currentFilters);
    },
    [filters]
  );

  return {
    filters,
    applyFilter,
    setFilters,
  };
}

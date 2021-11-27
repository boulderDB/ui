import FilterTag from "./filterTag";
import styles from "./globalFilter.module.css";
import TextField from "../textField/textField";

export default function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  filters,
  setFilters,
}) {
  return (
    <TextField
      className={styles.root}
      placeholder="Search"
      value={globalFilter}
      onClear={() => setGlobalFilter("")}
      onChange={(event) => {
        setGlobalFilter(event.target.value);
      }}
      onKeyDown={(event) => {
        if (event.key === "Backspace") {
          filters.pop();
          setFilters([...filters]);
        }
      }}
    >
      {filters.map((filter, index) => (
        <FilterTag
          key={index}
          id={filter.id}
          value={filter.value}
          onClick={() =>
            setFilters([
              ...filters.filter(
                (activeFilter) => activeFilter.id !== filter.id
              ),
            ])
          }
        />
      ))}
    </TextField>
  );
}
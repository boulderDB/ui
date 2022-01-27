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
    <div className={styles.root}>
      <TextField
        className={styles.input}
        placeholder="Search"
        value={globalFilter}
        onChange={(event) => {
          setGlobalFilter(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Backspace" && globalFilter.length === 0) {
            filters.pop();
            setFilters([...filters]);
          }
        }}
      >
        {filters?.map((filter, index) => (
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
    </div>
  );
}

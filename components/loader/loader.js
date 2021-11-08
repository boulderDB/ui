import styles from "./loader.module.css";

function Loader() {
  return (
    <span className={styles.root}>
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
    </span>
  );
}

export default Loader;

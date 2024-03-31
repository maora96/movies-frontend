import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { getToken, getUserRole } from "../../api";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h1>Movies</h1>
      {getToken() && (
        <nav className={styles.nav}>
          <a href="/movies">Filmes</a>
          {getUserRole() === "ADMIN" && (
            <a href="/add-movie">Cadastrar filme</a>
          )}
          <span
            className={styles.logout}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </span>
        </nav>
      )}
    </header>
  );
}

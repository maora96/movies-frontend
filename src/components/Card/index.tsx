import { useNavigate } from "react-router-dom";
import { Movie } from "../../types";
import styles from "./styles.module.scss";
interface ICard {
  movie: Movie;
}

export function Card({ movie }: ICard) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={movie.coverUrl} alt="movie poster" />
      <div className={styles.content}>
        <h3>{movie.title}</h3>
        <p>{movie.summary}</p>

        <button
          className={styles.button}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}

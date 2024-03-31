import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../api";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import { Movie, MovieFilters } from "../../types";
import { getMany } from "../../api/movie";
import { Card } from "../../components/Card";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  title: string;
  director: string;
  genres: string;
  actors: string;
};

export function Movies() {
  const [filters, setFilters] = useState({});
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, []);

  const getMoviesMutation = useMutation(
    async (request: MovieFilters) => getMany(request),
    {
      onSuccess: (data) => {
        setMovies(data);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    getMoviesMutation.mutate(filters);
  }, [filters]);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const request = {
      ...(data.actors && { actors: data.actors?.split(", ") }),
      ...(data.genres && { genres: data.genres?.split(", ") }),
      ...(data.title && { title: data.title }),
      ...(data.director && { director: data.director }),
    };

    setFilters(request);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles["movies-container"]}>
        <h2 className={styles.h2}>Filmes</h2>

        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.filter}>
              <label htmlFor="title">Título</label>

              <input placeholder={"Título"} {...register("title")} />
            </div>
            <div className={styles.filter}>
              <label htmlFor="director">Diretor</label>
              <input placeholder={"Diretor"} {...register("director")} />
            </div>
            <div className={styles.filter}>
              <label htmlFor="genres">Gêneros</label>
              <input
                placeholder={"Gêneros (divida por vírgula)"}
                {...register("genres")}
              />
            </div>

            <div className={styles.filter}>
              <label htmlFor="actors">Atores</label>
              <input
                placeholder={"Atores (divida por vírgula)"}
                {...register("actors")}
              />
            </div>

            <button type="submit" className={styles.button}>
              Filtrar
            </button>
          </form>
        </div>

        <div className={styles.movies}>
          {movies &&
            movies.map((movie: Movie) => <Card movie={movie} key={movie.id} />)}
        </div>
      </div>
    </div>
  );
}

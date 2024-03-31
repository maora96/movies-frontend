import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../../api";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import { VoteInBook } from "../../types";
import { vote } from "../../api/movie";
import { useGetSingleMovie } from "../../hooks/movie";
import { SubmitHandler, useForm } from "react-hook-form";

export function SingleMovie() {
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<VoteInBook>();

  const voteMutation = useMutation(
    async (request: VoteInBook) => vote(request),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {},
    }
  );

  const { data, refetch } = useGetSingleMovie(id ?? "");

  const onSubmit: SubmitHandler<any> = (data) => {
    voteMutation.mutate({ ...data, id });
  };

  return (
    <div className={styles.container}>
      <Header />

      {data && (
        <div className={styles["movies-container"]}>
          <div className={styles.movie}>
            <img src={data.coverUrl} alt="movie poster" />
            <div className={styles.content}>
              <h3>
                {data.title}{" "}
                <span>
                  Rating: <span>{data.rating}/4</span>
                </span>
              </h3>
              <p>{data.summary}</p>
              <p>
                <span>Dirigido por:</span> {data.director}
              </p>
              <p>
                <span>Estrelando:</span>
                {data.actors?.map((actor: string) => (
                  <div className={styles.actor}>{actor}</div>
                ))}
              </p>
              <div className={styles.genres}>
                {data.genres?.map((genre: string) => (
                  <div>{genre}</div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="number"
                  min="0"
                  max="4"
                  placeholder={"Rating"}
                  {...register("rating", { required: true })}
                />

                <button type="submit" className={styles.button}>
                  Votar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../../api";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import { CreateMovie } from "../../types";
import { create } from "../../api/movie";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  title: string;
  summary: string;
  coverUrl: string;
  director: string;
  genres: string;
  actors: string;
};

export function AddMovie() {
  const navigate = useNavigate();
  const notifyError = () => toast.error("Erro na criação de filme.");
  const notifySuccess = () => toast.success("Filme criado com sucesso!");
  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<FormValues>();

  const addMovieMutation = useMutation(
    async (request: CreateMovie) => create(request),
    {
      onSuccess: () => {
        notifySuccess();
        navigate("/movies");
      },
      onError: () => {
        notifyError();
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const request = {
      ...data,
      actors: data.actors?.split(", "),
      genres: data.genres?.split(", "),
    };
    addMovieMutation.mutate(request);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles["movies-container"]}>
        <div className={styles["form-container"]}>
          <h2 className={styles.h2}>Cadastrar filme</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Título</label>

            <input
              placeholder={"Título"}
              {...register("title", { required: true })}
            />
            <label htmlFor="summary">Sinopse</label>
            <input
              placeholder={"Sinopse"}
              {...register("summary", { required: true })}
            />
            <label htmlFor="coverUrl">Url do Poster</label>
            <input
              placeholder={"Url do Poster"}
              {...register("coverUrl", { required: true })}
            />
            <label htmlFor="director">Diretor</label>
            <input
              placeholder={"Diretor"}
              {...register("director", { required: true })}
            />
            <label htmlFor="genres">Gêneros</label>
            <input
              placeholder={"Gêneros (divida por vírgula)"}
              {...register("genres", { required: true })}
            />

            <label htmlFor="actors">Atores</label>
            <input
              placeholder={"Atores (divida por vírgula)"}
              {...register("actors", { required: true })}
            />

            <input type="submit" className={styles.button} />
          </form>
        </div>
      </div>
    </div>
  );
}

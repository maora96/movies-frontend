import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signIn } from "../../api/auth";
import { SignIn } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const notifyError = () => toast.error("Erro no login.");

  const {
    register,
    handleSubmit,

    formState: {},
  } = useForm<FormValues>();

  const loginMutation = useMutation(
    async (request: SignIn) => signIn(request),
    {
      onSuccess: (data) => {
        const token = data.data.access_token;
        localStorage.setItem("token", JSON.stringify(token));

        const user = {
          email: data.data.email,
          id: data.data.id,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/movies");
      },
      onError: () => {
        notifyError();
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles["form-container"]}>
        <h2 className={styles.h2}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>

          <input
            placeholder={"E-mail"}
            {...register("email", { required: true })}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder={"Senha"}
            {...register("password", { required: true })}
          />

          <input type="submit" className={styles.button} />
        </form>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signIn } from "../../api/auth";
import { SignIn } from "../../types";
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

  const onFinish = (values: FormValues) => {
    loginMutation.mutate(values);
  };

  return <Header />;
}
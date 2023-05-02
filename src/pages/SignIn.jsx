import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import TextInput from "../components/Input/TextInput";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const regexUsername = /^[a-zA-Z\d]+$/;
  const regexPassword = /^[a-zA-Z\d]{8,15}$/;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      username.length !== 0 &&
      password.length !== 0 &&
      regexUsername.test(username) &&
      regexPassword.test(password)
    ) {
      setButtonDisabled(false);
    } else if (username.length === 0 || password.length === 0) {
      setButtonDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading("En recherche...", { autoClose: 3000 });

    fetch(`${process.env.REACT_APP_API}/users`)
      .then((res) => res.json())
      .then((user) => {
        toast.update(toastId, {
          render: `Bienvenue ${user.username} !`,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        if (user.username === username && user.password === password) {
          navigate("/task");
        } else {
          toast.update(toastId, {
            render: "Nom d'utilisateur ou mot de passe invalide.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Une erreur est survenue...",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-72 rounded-xl bg-dark-300 px-8 py-10 shadow-center shadow-indigo-400 md:w-1/3">
        <h2 className="mb-5 text-xl uppercase text-white-500 md:w-3/5 md:text-3xl">
          me connecter
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full flex-col items-center justify-between"
        >
          <TextInput
            label="Nom d'utilisateur"
            pattern={regexUsername}
            value={username}
            setValue={setUsername}
            buttonDisabled={setButtonDisabled}
          />
          <TextInput
            type="password"
            label="Mot de passe"
            pattern={regexPassword}
            isPassword
            value={password}
            setValue={setPassword}
            buttonDisabled={setButtonDisabled}
          />
          <Button
            text="Connexion"
            type="submit"
            disabled={buttonDisabled}
            className="my-5"
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;

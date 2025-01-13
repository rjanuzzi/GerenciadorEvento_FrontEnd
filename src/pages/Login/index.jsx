import styles from "./login.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Label } from "../../components/Label/Label";
import { Input } from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      email,
      senha,
    };
    await signIn(credentials, rememberMe);
    navigate("/home");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <Label label="E-mail" tagInput="email" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label label="Senha" tagInput="senha" />
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className={styles.rememberMeContainer}>
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="rememberMe" className={styles.label}>
              Lembre-se de mim
            </label>
          </div>
          <button type="submit" className={styles.button}>
            <i className="fas fa-sign-in-alt"></i> Entrar
          </button>
          <button
            type="button"
            className={styles.registerButton}
            onClick={() => navigate("/cadastro")}
          >
            <i className="fas fa-user-plus"></i> Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

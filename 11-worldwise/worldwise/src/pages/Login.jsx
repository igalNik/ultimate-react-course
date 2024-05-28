import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("igal.nikolaev@gmail.com");
  const [password, setPassword] = useState("Aa123456");
  // const { user, isAuthonticated, login, logout } = useAuth();
  const { isAuthonticated, login } = useAuth();

  useEffect(
    function () {
      if (isAuthonticated) navigate("/app", { replace: true });
    },
    [isAuthonticated, navigate]
  );
  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={handleLogin} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

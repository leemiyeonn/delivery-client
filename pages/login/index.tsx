import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/auth/Login.module.css";
import { useAuth } from "../../contexts/auth/AuthContext";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 이전 에러 메시지 초기화
    try {
      await login(username, password);
      // 로그인 성공 시 홈 페이지로 리디렉션
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        // 구체적인 에러 메시지가 있다면 그것을 사용
        setError(error.message || "로그인에 실패했습니다. 다시 시도해 주세요.");
      } else {
        setError(
          "로그인에 실패했습니다. 사용자 이름과 비밀번호를 확인하고 다시 시도해 주세요."
        );
      }
      console.error("로그인 실패", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Log In</h1>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.inputWrapper}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
          <div className={styles.signupText}>
            <p>
              Do not have an account?{" "}
              <Link href="/signup" className={styles.signupLink}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

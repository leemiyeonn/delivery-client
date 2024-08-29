import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/login/Login.module.css";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 여기에 로그인 로직을 추가하세요.
      // 성공적으로 로그인하면 /profile 페이지로 리디렉션합니다.
      router.push("/profile");
    } catch (error) {
      setError(
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인하고 다시 시도해 주세요."
      );
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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
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
              계정이 없으신가요?{" "}
              <Link href="/signup" className={styles.signupLink}>
                가입하기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

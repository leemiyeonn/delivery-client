import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/auth/SignUp.module.css";

const SIGNUP_API_URL = "http://localhost:8080/api/v1/auth/signUp";

const Signup: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");
  const [region, setRegion] = useState("지역"); // Set default region
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(SIGNUP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          nickname,
          address,
          request,
          role: "ADMIN",
          regionName: region, // Send the selected region
        }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during signup.");
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <div className={styles.inputWrapper}>
            <label htmlFor="nickname" className={styles.label}>
              Nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.input}
              placeholder="Enter your nickname"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="address" className={styles.label}>
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.input}
              placeholder="Enter your address"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="request" className={styles.label}>
              Request
            </label>
            <input
              id="request"
              type="text"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className={styles.input}
              placeholder="Enter your request"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="region" className={styles.label}>
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.input}
            >
              <option value="지역">지역</option>
              <option value="서비스 지역 추가 예정" disabled>
                서비스 지역 추가 예정
              </option>
              <option value="서비스 지역 추가 예정" disabled>
                서비스 지역 추가 예정
              </option>
              {/* Add more regions as needed */}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>

          <p className={styles.signupText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

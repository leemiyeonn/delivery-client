import React, { useState, FormEvent } from "react";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // login 함수를 직접 호출하여 인증 처리
      await login(username, password);

      // 로그인 성공 시 프로필 페이지로 리디렉션
      router.push("/");
    } catch (error) {
      setError(
        "로그인에 실패했습니다. 아이디과 비밀번호를 확인하고 다시 시도해 주세요."
      );
      console.error("로그인 실패", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

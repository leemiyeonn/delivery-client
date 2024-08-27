import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mt-24 mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Log In</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg border border-gray-200 shadow-md"
        >
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
          >
            Log In
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
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

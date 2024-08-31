import path from "path";
import fs from "fs";
import { User } from "../../types/users/User";

const usersFilePath = path.join(process.cwd(), "public", "data", "users.json");

// 모든 사용자 데이터를 불러오는 함수
export const getUsersData = (): User[] => {
  const usersFileContents = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(usersFileContents) as User[];
};

// 특정 사용자 데이터를 ID로 불러오는 함수
export const getUserData = (id: string): User | undefined => {
  const users = getUsersData();
  return users.find((user) => user.id === id);
};

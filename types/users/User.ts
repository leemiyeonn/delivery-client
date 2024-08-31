import { Role } from "./Role";

export interface User extends BaseModel {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  role: Role;
}

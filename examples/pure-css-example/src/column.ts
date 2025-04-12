import { ColumnType } from "columnia";
import { User } from "./type";

export const columns: ColumnType<User>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "이름" },
  { key: "email", label: "이메일" },
  { key: "role", label: "역할" },
  { key: "department", label: "부서" },
  { key: "joinDate", label: "입사일" },
];

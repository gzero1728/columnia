import { Table } from "./components/Table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { key: "id" as const, label: "ID", width: 100 },
  { key: "name" as const, label: "Name", width: 200 },
  { key: "email" as const, label: "Email", width: 300 },
  { key: "role" as const, label: "Role", width: 150 },
];

const data: User[] = [
  { id: 1, name: "김코딩", email: "kim@coding.kr", role: "개발자" },
  { id: 2, name: "박해커", email: "park@hacker.kr", role: "관리자" },
  { id: 3, name: "이버그", email: "lee@debug.kr", role: "테스터" },
  { id: 4, name: "최기획", email: "choi@plan.kr", role: "기획자" },
  { id: 5, name: "정디자", email: "jung@design.kr", role: "디자이너" },
  { id: 6, name: "강서버", email: "kang@server.kr", role: "운영자" },
  { id: 7, name: "한프론트", email: "han@front.kr", role: "프론트엔드" },
  { id: 8, name: "오백엔드", email: "oh@back.kr", role: "백엔드" },
];

function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Columnia Table Demo</h1>
      <div className="border rounded-lg p-4">
        <Table
          data={data}
          columns={columns}
          storageKey="demo-table-settings"
          theme={{
            primary: "#0ea5e9",
            secondary: "#64748b",
            background: "#ffffff",
            text: "#1f2937",
            border: "#e5e7eb",
          }}
        />
      </div>
    </div>
  );
}

export default App;

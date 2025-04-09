import {
  Table,
  Column,
  RenderControllerProps,
  RenderContentProps,
} from "columnia";
import "./styles.css";

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

const columns: Column<User>[] = [
  { key: "id", label: "ID", width: 80 },
  { key: "name", label: "이름", width: 150 },
  { key: "email", label: "이메일", width: 250 },
  { key: "role", label: "역할", width: 120 },
  { key: "department", label: "부서", width: 150 },
  { key: "joinDate", label: "입사일", width: 120 },
];

const data: User[] = [
  {
    id: 1,
    name: "김코코",
    email: "kim@coding.kr",
    role: "개발자",
    department: "개발팀",
    joinDate: "2020-01-15",
  },
  {
    id: 2,
    name: "박해커",
    email: "aaaa@hacker.kr",
    role: "관리자",
    department: "운영팀",
    joinDate: "2019-05-20",
  },
  {
    id: 3,
    name: "이버그",
    email: "lee@debug.kr",
    role: "테스터",
    department: "QA팀",
    joinDate: "2021-03-10",
  },
  {
    id: 4,
    name: "최기획",
    email: "choi@plan.kr",
    role: "기획자",
    department: "기획팀",
    joinDate: "2020-11-05",
  },
  {
    id: 5,
    name: "정디자",
    email: "jung@design.kr",
    role: "디자이너",
    department: "디자인팀",
    joinDate: "2021-07-22",
  },
];

const App = () => {
  const renderController = ({
    columns,
    selectedColumns,
    onColumnToggle,
    onReset,
  }: RenderControllerProps<User>) => (
    <div className="table-controller">
      <div className="column-filters">
        {columns.map((column) => (
          <label
            key={String(column.key)}
            className={`column-filter ${
              selectedColumns.has(column.key) ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedColumns.has(column.key)}
              onChange={() => onColumnToggle(column.key)}
            />
            {column.label}
          </label>
        ))}
      </div>
      <button className="reset-button" onClick={onReset}>
        초기화
      </button>
    </div>
  );

  const renderContent = ({
    data,
    columns,
    SortableHeader,
  }: RenderContentProps<User>) => (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <SortableHeader key={String(column.key)} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)}>{String(row[column.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="table-container">
      <h1>Columnia Pure CSS Example</h1>
      <Table<User>
        data={data}
        columns={columns}
        storageKey="pure-css-example"
        renderController={renderController}
        renderContent={renderContent}
      />
    </div>
  );
};

export default App;

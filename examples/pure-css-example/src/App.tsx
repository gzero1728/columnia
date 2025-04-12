import {
  Table,
  RenderControllerProps,
  RenderContentProps,
  TableHeader,
} from "columnia";
import "./styles.css";
import { User } from "./type";
import { data } from "./data";
import { columns } from "./column";

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

  const renderContent = ({ data, columns }: RenderContentProps<User>) => (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader key={String(column.key)} column={column} />
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

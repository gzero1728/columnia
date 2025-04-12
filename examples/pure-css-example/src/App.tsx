import { useTable } from "columnia";

import { User } from "./type";
import { data } from "./data";
import { columns } from "./column";
import { ColumnType } from "columnia";
import "./styles.css";

const TableContent = () => {
  const { visibleColumns, selectedColumns, onToggleColumn, onResetColumns } =
    useTable<User>({ columns, storageKey: "pure-css-example" });

  return (
    <div className="table-container">
      <h1>Columnia Pure CSS Example</h1>
      <div className="table-controller">
        <div className="column-filters">
          {columns.map((column: ColumnType<User>) => (
            <label
              key={String(column.key)}
              className={`column-filter ${
                selectedColumns.has(column.key) ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedColumns.has(column.key)}
                onChange={() => onToggleColumn(column.key)}
              />
              {column.label}
            </label>
          ))}
        </div>
        <button className="reset-button" onClick={onResetColumns}>
          초기화
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {visibleColumns.map((column: ColumnType<User>) => (
                <th key={String(column.key)}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {visibleColumns.map((column: ColumnType<User>) => (
                  <td key={String(column.key)}>{String(row[column.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  return <TableContent />;
};

export default App;

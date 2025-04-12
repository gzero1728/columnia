import { useTable, type ColumnType } from "columnia";

import { User } from "./type";
import { data } from "./data";
import { columns } from "./column";
import "./styles.css";

const TableContent = () => {
  const { visibleColumns, isSelected, onToggleColumn, onResetColumns } =
    useTable<User>({ columns, storageKey: "pure-css-example" });

  return (
    <div className="container">
      <h1>Columnia Pure CSS Example</h1>
      <div className="controller">
        <div className="column-filters">
          {columns.map((column: ColumnType<User>) => (
            <label
              key={String(column.key)}
              className={`column-filter ${
                isSelected(column.key) ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected(column.key)}
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
      <div className="wrapper">
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

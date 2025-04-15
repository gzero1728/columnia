# Columnia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React hook for managing table columns in React applications.
It provides column selection/deselection functionality and settings persistence, while leaving UI implementation to the user.

## Key Features

- 📊 Column Management
  - Column selection/deselection
  - Save/load selected column settings (localStorage)

## Installation

```bash
npm install columnia
# or
yarn add columnia
```

## Usage

### Basic Usage

```tsx
import { useTable } from "columnia";

interface User {
  name: string;
  age: number;
  email: string;
}

function TableComponent() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  const { visibleColumns, isSelected, onToggleColumn, onResetColumns } =
    useTable<User>({
      columns,
      storageKey: "my-table-columns", // Key for localStorage
    });

  return (
    <div>
      {/* Column Selection UI */}
      <div>
        {columns.map((column) => (
          <label key={column.key}>
            <input
              type="checkbox"
              checked={isSelected(column.key)}
              onChange={() => onToggleColumn(column.key)}
            />
            {column.label}
          </label>
        ))}
        <button onClick={onResetColumns}>Reset</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {visibleColumns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### API

#### useTable

```typescript
const {
  visibleColumns, // Currently visible columns
  isSelected, // Function to check if a column is selected
  onToggleColumn, // Function to toggle column selection
  onResetColumns, // Function to reset column selection to default
} = useTable<T>({
  columns: Column < T > [], // Array of column definitions
  storageKey: string, // localStorage key (optional)
});
```

#### Column Type

```typescript
interface Column<T> {
  key: keyof T; // Column key (key of data object)
  label: string; // Column display name
}
```

### Features

- Generic Type Support: Explicitly specify the type of table data
- Automatic Persistence: Column selection state is automatically saved to localStorage
- Reset Functionality: Reset all columns to their initial state with `onResetColumns`

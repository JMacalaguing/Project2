// src/Components/TableB.tsx
import React from "react";

const TableB: React.FC = () => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Column B1</th>
          <th className="px-4 py-2 border">Column B2</th>
          <th className="px-4 py-2 border">Column B3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border">Data B1</td>
          <td className="px-4 py-2 border">Data B2</td>
          <td className="px-4 py-2 border">Data B3</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableB;

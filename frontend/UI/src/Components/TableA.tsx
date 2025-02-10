import React, { useState } from "react";
import EditableField from "./EditableField";

const TableA: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [agency, setAgency] = useState("");
  const [operatingUnit, setOperatingUnit] = useState("");

  return (
    <main className="w-full overflow-x-auto mt-10">
      {/* Table Wrapper - Forces full width */}
      <div className="w-[4000px] max-w-none"> 
        <div className="grid gap-0 grid-cols-3 text-center border border-black">
          {/* Labels + Editable Fields */}
          <div className="border border-black text-left p-4 w-full min-w-[1000px]">
            <EditableField label="Department:" value={department} onChange={setDepartment} />
            <EditableField label="Agency:" value={agency} onChange={setAgency} />
            <EditableField label="Operating Unit:" value={operatingUnit} onChange={setOperatingUnit} />
          </div>

          {/* Empty Middle Cell */}
          <div className="border border-black w-full min-w-[1000px]"></div>

          {/* Empty Right Cell */}
          <div className="border border-black w-full min-w-[1000px]"></div>
        </div>
      </div>
    </main>
  );
};

export default TableA;

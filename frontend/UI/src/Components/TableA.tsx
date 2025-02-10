import React, { useState } from "react";
import EditableField from "./EditableField";

const TableA: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [agency, setAgency] = useState("");
  const [operatingUnit, setOperatingUnit] = useState("");

  return (
    <main className="w-full overflow-x-auto  mt-2">
      {/* Table Wrapper - Forces full width */}
      <div className="w-[4000px] max-w-none"> 
        <div className="grid gap-0 grid-cols-3 text-center border border-black">
          {/* Labels + Editable Fields */}
          <div className="border border-black text-left pl-1 w-full min-w-[1000px] mt-[-10px] h-37">
            <EditableField label="Department:" value={department} onChange={setDepartment} />
            <EditableField label="Agency:" value={agency} onChange={setAgency} />
            <EditableField label="Operating Unit:" value={operatingUnit} onChange={setOperatingUnit} />
          </div>

          {/* Empty Middle Cell */}
          <div className="border border-black w-full min-w-[1000px] text-left ">
            <div className="ml-20 text-[12px] font-bold">    
                <div>PPROPRIATION SOURCE (Please check)</div>
                  <div className="flex item-center">
                    <input type="checkbox" id="new-approriation" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="new-approriation">New Approriation (Regular Agency Badget)</label>
                  </div> 
                <div className="flex item-center">
                    <input type="checkbox" id="auto-appropriations"  className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="auto-approriation">Automatic Appropriations</label>
                  </div>
                <div className="flex item-center">
                    <input type="checkbox" id="continuing-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="auto-approriation">Continuing Appropriations</label>
                  </div>
                <div className="flex item-center">
                    <input type="checkbox" id="other-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="other-approriation">Others(New Appropriations Transfers from  SPFs; Supplemental)</label>
                  </div>
             </div>
          </div>

          {/* Empty Right Cell */}
          <div className="border border-black w-full min-w-[1000px] text-left">
          <div className="ml-20 text-[12px] font-bold">    
                <div className="ml-1">YEAR(Please check):</div>
                  <div className="flex item-center">
                    <input type="checkbox" id="2023-actual" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="2023-actual">2023-Actual Obligation</label>
                  </div> 
                <div className="flex item-center">
                    <input type="checkbox" id="2024-Current"  className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="2024-Current">2024-Current Progress</label>
                  </div>
                <div className="flex item-center">
                    <input type="checkbox" id="continuing-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="auto-approriation">2025-Total Proposal Program</label>
                  </div>
                <div className="flex item-center ml-20">
                    <input type="checkbox" id="TIER1" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="TIER1">TIER1</label>
                  </div>
                <div className="flex item-center ml-20">
                    <input type="checkbox" id="TIER2" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="TIER2">TIER2</label>
                  </div>
             </div>
          </div>
        </div>
        <div className="w-full h-6 border-3 border-black border-t-0"></div>
        <div className="overflow-auto shadow-lg rounded-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black border-t-0 " rowSpan={2}>
                    COST STRUCTURES<br />
                    PROGRAM<br />
                    Activity<br />
                    Project
                  </th>
                  <th className="border border-black border-t-0 " rowSpan={2}>UACS<br/>
                  Code(s)</th>
                  <th className="border border-black border-t-0 " colSpan={3}>
                    SALARIES AND WAGES
                  </th>
                  <th className="border border-black border-t-0 " colSpan={16}>
                    OTHER COMPENSATION
                  </th>
                  <th className="border border-black border-t-0 " colSpan={5}>
                    PERSONAL BENEFITS CONTRIBUTIONS
                  </th>
                  <th className="border border-black border-t-0 " rowSpan={2}>
                    PERMISSION BENEFITS
                  </th>
                  <th className="border border-black border-t-0 " colSpan={4}>
                    OTHER PERSONAL BENEFITS
                  </th>
                  <th className="border border-black border-t-0 " rowSpan={2}>
                    TOTAL
                  </th>
                </tr>
                <tr>
                  <th className="border border-black border-t-0 ">Basic<br/>Salary-<br/>Civilian</th>
                  <th className="border border-black border-t-0 ">Salaries &<br/>Wages-<br/>Casual/<br/>Contractual</th>
                  <th className="border border-black border-t-0 ">Salaries &<br/>Wages-<br/>Substitute<br/>Teachers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </main>
  );
};

export default TableA;

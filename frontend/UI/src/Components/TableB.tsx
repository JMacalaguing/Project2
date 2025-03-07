import React, { useState } from "react";
import EditableField from "./EditableField";
import { useTable } from "../Context/TableContext";


const TableB: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [agency, setAgency] = useState("");
  const [operatingUnit, setOperatingUnit] = useState("");
  const [budgetOfficer, setBudgetOfficer] = useState("");
  const [planningOfficer, setPlanningOfficer] = useState("");
  const [chiefAcc, setChiefAcc] = useState("");
  const [headoff, setHeadOff] = useState("");
  const [Date, setDate] = useState("");


  const { tableRef } = useTable();

  const renderTableCells = (count: number) => {
    return Array(count).fill(null).map((_, index) => (
      <td key={index} className="border border-black border-t-0 border-b-0 "></td>
    ));
  };

  const [tableData, setTableData] = useState<{ [key: string]: string[] }>({
    "gen_ad_support_activity1_CO": Array(18).fill(""),
    "gen_ad_support_activity1_RO1_": Array(18).fill(""),
    "gen_ad_support_activity1_RO2_": Array(18).fill(""),
    
    "total_AI_": Array(18).fill(""),

    "su_to_support_activity1_CO": Array(18).fill(""),
    "su_to_support_activity1_RO1_": Array(18).fill(""),
    "su_to_support_activity1_RO2_": Array(18).fill(""),

    "su_to_support_project1_CO": Array(18).fill(""),
    "su_to_support_project1_RO1_": Array(18).fill(""),
    "su_to_support_project1_RO2_":Array(18).fill(""),
    "total_AII_": Array(18).fill(""),

    "org_sub_prog_act1_CO":Array(18).fill(""),
    "org_sub_prog_act1_RO1_":Array(18).fill(""),
    "org_sub_prog_act1_RO2_":Array(18).fill(""),

    "org_sub_prog_pro1_CO":Array(18).fill(""),
    "org_sub_prog_pro1_RO1_":Array(18).fill(""),
    "org_sub_prog_pro1_RO2_":Array(18).fill(""),

    "org_sub_prog_n_act1_CO": Array(18).fill(""),
    "org_sub_prog_n_act1_RO1_": Array(18).fill(""),
    "org_sub_prog_n_act1_RO2_": Array(18).fill(""),
    
    "org_sub_prog_n_pro1_CO": Array(18).fill(""),
    "org_sub_prog_n_pro1_RO1_": Array(18).fill(""),
    "org_sub_prog_n_pro1_RO2_": Array(18).fill(""),

    "total_AIII_": Array(18).fill(""),

    "grand_total": Array(18).fill(""),
    
  });
  
  const handleCellChange2 = (rowLabel: string, index: number, value: string) => {
    setTableData((prevData) => ({
      ...prevData,
      [rowLabel]: prevData[rowLabel].map((cellValue, i) => 
        i === index ? value : cellValue
      )
    }));
  };  

  const renderBlank =()=>{
    return              <tr className="h-5 border border-t-0 border-b-0">                  
    {Array(19).fill(null).map((_, index) => (
        <td key={index} className="border border-black border-t-0 border-b-0"></td>
      ))}</tr>
  }

  return (
    <main className="w-full  mt-2">
      {/* Table Wrapper - Forces full width */}
      <div ref={tableRef} data-title="B" className="w-[4000px] max-w-none"> 
        <div className="grid gap-0 grid-cols-3 text-center border border-black">
            {/* Labels + Editable Fields */}
            <div className="border border-black text-left pl-1 w-full min-w-[1000px] ">
              {/* Operating Unit */}
              <div className="h-10 flex items-center">
                <span className="font-medium">Department:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setDepartment(e.target.innerText)}
                  className="form-cell2"
                >
                  {department}
                </span>
              </div>
              {/* Agency */}
              <div className="h-10 flex items-center">
                <span className="font-medium">Agency:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setAgency(e.target.innerText)}
                  className="form-cell2"
                >
                  {agency}
                </span>
              </div>
              {/* Operating Unit */}
              <div className="h-10 flex items-center">
                <span className="font-medium">Operating Unit:</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setOperatingUnit(e.target.innerText)}
                  className="form-cell2"
                >
                  {operatingUnit}
                </span>
              </div>
          </div>
          {/* Empty Middle Cell */}
          <div className="border border-black w-full min-w-[1000px] text-left p-4">
            <div className="ml-20 text-[12px] font-bold">    
                <div className="mb-2">PPROPRIATION SOURCE (Please check)</div>
                  <div className="flex item-center">
                    <input type="checkbox" id="new-approriation" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="new-approriation" className="mt-[-6px]">New Approriation (Regular Agency Badget)</label>
                  </div> 
                <div className="flex item-center">
                    <input type="checkbox" id="auto-appropriations"  className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="auto-approriation" className="mt-[-6px]">Automatic Appropriations</label>
                  </div>
                <div className="flex item-center">
                    <input type="checkbox" id="continuing-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="auto-approriation" className="mt-[-6px]">Continuing Appropriations</label>
                  </div>
                <div className="flex item-center">
                    <input type="checkbox" id="other-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="other-approriation" className="mt-[-6px]">Others(New Appropriations Transfers from  SPFs; Supplemental)</label>
                  </div>
             </div>
          </div>

          {/* Empty Right Cell */}
          <div className="border border-black w-full min-w-[1000px] text-left p-4">
          <div className="ml-20 text-[12px] font-bold">    
                <div className="ml-1 mb-2">YEAR(Please check):</div>
                  <div className="flex item-center">
                    <input type="checkbox" id="2023-actual" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="2023-actual" className="mt-[-6px]">2023-Actual Obligation</label>
                  </div> 
                <div className="flex item-center">
                    <input type="checkbox" id="2024-Current"  className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="2024-Current" className="mt-[-6px]">2024-Current Progress</label>
                  </div>
                <div className="flex item-center mb-2">
                    <input type="checkbox" id="continuing-appropriations" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg"/>
                    <label htmlFor="auto-approriation" className="mt-[-6px]">2025-Total Proposal Program</label>
                  </div>
                <div className="flex item-center ml-20">
                    <input type="checkbox" id="TIER1" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="TIER1" className="mt-[-6px]">TIER1</label>
                  </div>
                <div className="flex item-center ml-20">
                    <input type="checkbox" id="TIER2" className="w-20 h-5 appearance-none border border-black bg-white mr-1 flex items-center justify-center checked:bg-white checked:before:content-['✔'] checked:before:text-white checked:before:text-lg "/>
                    <label htmlFor="TIER2" className="mt-[-6px]">TIER2</label>
                  </div>
             </div>
          </div>
        </div>
        <div className="w-full h-6 border-3 border-black border-t-0"></div>
        <div className="overflow-auto shadow-lg rounded-lg">
            <table className="min-w-full border-collapse">
              <thead>
              <tr className="h-20"> 
                <th className="border border-black border-t-0" rowSpan={2}>
                  COST STRUCTURES<br />
                  PROGRAM<br />
                  Activity<br />
                  Project
                </th>
                <th className="border border-black border-t-0 p-2" rowSpan={2}>
                  UACS<br/> Code(s)
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                  TRAVELING
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                  TRAINING <br/> AND <br/>SCHOLARSHIP
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                  SUPPLIES <br/>AND <br/>MATERIALS
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 UTILITY
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 COMMUNICATION
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 AWARDS/<br/>REWARDS<br/>AND PRIZES
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 SURVEY,<br/> RESEARCH,<br/> EXPLORATION AND <br/> DEVELOPMENT
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 DEMOLITION/<br/> RELOCATION AND<br/> DESILTING <br/>DREDGING
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 GENERATION<br/>TRANSMISSION<br/>AND <br/>DISTRIBUTION 
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 CONFIDENTIAL,<br/> INTELLIGENCE AND <br/>EXTRAORDINARY 
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                PROFESSIONAL <br/>SERVICES
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 GENERAL <br/>SERVICES
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 REPAIRS AND<br/>MAINTENANCE
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 FINANCIAL<br/> ASSISTANCE/S<br/>UBSIDY
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 TAXES,<br/> INSURANCE<br/> PREMIUMS AND <br/>OTHER FEES
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}>
                 OTHER <br/>MAINTENANCE AND <br/>OPERATING<br/> EXPENSES
                </th>
                <th className="border border-black border-t-0 p-2" rowSpan={1}>
                TOTAL
                </th>
              </tr>
                <tr className="h-10">
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 "></th>
                  <th className="border border-black border-t-0 border-r-0"></th>
                </tr>
                <tr>
                 {Array(19).fill(null).map((_, index)  => (
                    <th key={index} className="border border-black border-t-0 p-2">
                      ({index + 1})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              <tr className="border border-black border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0 text-left">
                  <strong className="ml-2">A. COST STRUCTURE</strong>
                  <div className="ml-6 font-semibold">I. General Administration and Support</div>
                  <div className="ml-10 text-sm">a. Activity 1</div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0">
                    <EditableField
                      value={tableData["gen_ad_support_activity1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("gen_ad_support_activity1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["gen_ad_support_activity1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("gen_ad_support_activity1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0">
                    <EditableField
                      value={tableData["gen_ad_support_activity1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("gen_ad_support_activity1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-10 text-sm">TOTAL A.I</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["total_AI_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("total_AI_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              {renderBlank()}
              <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-6 font-semibold">II. Support to Operators</div>
                  <div className="ml-10 text-sm">a. Activity 1</div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_activity1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_activity1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">R0 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_activity1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_activity1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">R0 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_activity1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_activity1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              {renderBlank()}
                <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-10 text-sm">b. Project 1</div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_project1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_project1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_project1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_project1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["su_to_support_project1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("su_to_support_project1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-10 text-sm">TOTAL A.II</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["total_AII_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("total_AII_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              {renderBlank()}
              <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-6 font-semibold">III. Operators</div>
                  <div className="ml-12 text-sm">Organizanitional Outcome 1</div>
                  <div className="ml-20 text-sm">PROGRAM 1</div>
                  <div className="ml-27 text-sm">SUB-PROGRAM 1</div>
                  <div className="ml-10 text-sm">a. Activity 1</div>
                  <div></div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_act1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_act1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_act1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_act1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_act1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_act1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-10 text-sm">b. Project 1</div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_pro1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_pro1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_pro1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_pro1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_pro1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_pro1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              {renderBlank()}
              <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-12 text-sm">Organizanitional Outcome n</div>
                  <div className="ml-20 text-sm">PROGRAM n</div>
                  <div className="ml-27 text-sm">SUB-PROGRAM n</div>
                  <div className="ml-10 text-sm">a. Activity n</div>
                  <div></div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_act1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_act1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_act1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_act1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_act1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_act1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr className="border border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0">
                  <div className="ml-10 text-sm">b. Project n</div>
                </td>
                {renderTableCells(18)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_pro1_CO"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_pro1_CO", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 1</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_pro1_RO1_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_pro1_RO1_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">RO 2</div> 
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["org_sub_prog_n_pro1_RO2_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("org_sub_prog_n_pro1_RO2_", index, value)}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border border-t-0 border-b-0 ">
                  <div className="ml-10 text-sm">TOTAL A.III</div>
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["total_AIII_"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("total_AIII_", index, value)}
                    />
                  </td>
                ))}
              </tr>
                {renderBlank()}
                {renderBlank()}
              <tr>
                <td className="border border-t-0 border-b-0 ">
                  <div className=" text-sm justify-items-start">Grand Total</div>
                </td>
                {Array(18).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
                    <EditableField
                      value={tableData["grand_total"][index] || ""}
                      label=""
                      onChange={(value) => handleCellChange2("grand_total", index, value)}
                    />
                  </td>
                ))}
              </tr>
              </tbody>
              <tfoot>
              <tr className="border h-30">
                  <td className="border text-[12px]"colSpan={7}>
                    <div className="font-bold ml-2 text-[14px]">PREPARED BY:</div>
                    <div className="flex justify-center space-x-20">
                      <div className="flex flex-col items-center">
                      <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setBudgetOfficer(e.target.innerText)}
                          className="footer-cell"
                        >
                          {budgetOfficer}
                        </span>
                        <div className="line-input font-bold border-t border-black">BUDGET OFFICER</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                      <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setPlanningOfficer(e.target.innerText)}
                          className="footer-cell"
                        >
                          {planningOfficer}
                        </span>
                        <div className="line-input font-bold border-t border-black">PLANNIG OFFICER</div>
                      </div>
                    </div>
                    </td>
                  <td className="border text-[12px]"colSpan={8}>
                  <div className="font-bold ml-2 text-[14px]">CERTIFIED CORRECT</div>
                    <div className="flex justify-center space-x-20">
                      <div className="flex flex-col items-center">
                      <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setChiefAcc(e.target.innerText)}
                          className="footer-cell"
                        >
                          {chiefAcc}
                        </span>
                        <div className="line-input font-bold border-t border-black">CHIEF ACCOUNTANT</div>
                      </div>
                      </div>
                  </td>
                  <td className="border text-[12px]"colSpan={9}>                  
                   <div className="font-bold ml-2 text-[14px]">APPROVED</div>
                    <div className="flex justify-center space-x-20">
                      <div className="flex flex-col items-center">
                      <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setHeadOff(e.target.innerText)}
                          className="footer-cell"
                        >
                          {headoff}
                        </span>
                        <div className="line-input font-bold border-t border-black">HEAD OF OFFICE/AGENCY</div>
                      </div>
                      </div>
                    </td>
                  <td className="border text-[12px]"colSpan={11}>                  
                   <div className="font-bold ml-2 text-[14px]">DATE</div>
                    <div className="flex justify-items-start ml-50">
                      <div className="flex flex-col items-start">
                      <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setDate(e.target.innerText)}
                          className="footer-cell"
                        >
                          {Date}
                        </span>
                        <div className="line-input font-bold border-t border-black">DAY/MONTH/YEAR</div>
                      </div>
                      </div>
                    </td>
                </tr>
              </tfoot>
            </table>
          </div>
      </div>
    </main>
  );
};

export default TableB;

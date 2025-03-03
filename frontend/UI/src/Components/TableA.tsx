import React, { useState } from "react";
import EditableField from "./EditableField";
import { useTable } from "../Context/TableContext";


const TableA: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [agency, setAgency] = useState("");
  const [operatingUnit, setOperatingUnit] = useState("");


  const { tableRef } = useTable();

  const renderTableCells = (count: number) => {
    return Array(count).fill(null).map((_, index) => (
      <td key={index} className="border border-black border-t-0 border-b-0"></td>
    ));
  };

  const [tableData, setTableData] = useState<{ [key: string]: string[] }>({
    "gen_ad_support_activity1_CO": Array(34).fill(""),
    "gen_ad_support_activity1_RO1_": Array(34).fill(""),
    "gen_ad_support_activity1_RO2_": Array(34).fill(""),
    
    "total_AI_": Array(34).fill(""),

    "su_to_support_activity1_CO": Array(34).fill(""),
    "su_to_support_activity1_RO1_": Array(34).fill(""),
    "su_to_support_activity1_RO2_": Array(34).fill(""),

    "su_to_support_project1_CO": Array(34).fill(""),
    "su_to_support_project1_RO1_": Array(34).fill(""),
    "su_to_support_project1_RO2_":Array(34).fill(""),
    "total_AII_": Array(34).fill(""),

    "org_sub_prog_act1_CO":Array(34).fill(""),
    "org_sub_prog_act1_RO1_":Array(34).fill(""),
    "org_sub_prog_act1_RO2_":Array(34).fill(""),

    "org_sub_prog_pro1_CO":Array(34).fill(""),
    "org_sub_prog_pro1_RO1_":Array(34).fill(""),
    "org_sub_prog_pro1_RO2_":Array(34).fill(""),

    "org_sub_prog_n_act1_CO": Array(34).fill(""),
    "org_sub_prog_n_act1_RO1_": Array(34).fill(""),
    "org_sub_prog_n_act1_RO2_": Array(34).fill(""),
    
    "org_sub_prog_n_pro1_CO": Array(34).fill(""),
    "org_sub_prog_n_pro1_RO1_": Array(34).fill(""),
    "org_sub_prog_n_pro1_RO2_": Array(34).fill(""),

    "total_AIII_": Array(34).fill(""),

    "grand_total": Array(34).fill(""),
    
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
    {Array(35).fill(null).map((_, index) => (
        <td key={index} className="border border-black border-t-0 border-b-0"></td>
      ))}</tr>
  }



  
  return (
    <main className="w-full  mt-2">
      {/* Table Wrapper - Forces full width */}
      <div ref={tableRef} data-title="A" className="w-[4000px] max-w-none"> 
        <div className="grid gap-0 grid-cols-3 text-center border border-black">
          {/* Labels + Editable Fields */}
          <div className="border border-black text-left pl-1 w-full min-w-[1000px] ">
            <EditableField label="Department:" value={department} onChange={setDepartment} />
            <EditableField label="Agency:" value={agency} onChange={setAgency} />
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
              <tr > 
                <th className="border border-black border-t-0" rowSpan={2}>
                  COST STRUCTURES<br />
                  PROGRAM<br />
                  Activity<br />
                  Project
                </th>
                <th className="border border-black border-t-0" rowSpan={2}>
                  UACS<br/> Code(s)
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={3}>
                  SALARIES AND WAGES
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={18}>
                  OTHER COMPENSATION
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={5}>
                  PERSONAL BENEFITS CONTRIBUTIONS
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}></th>
                <th className="border border-black border-t-0 text-left p-2" colSpan={4}>
                  OTHER PERSONAL BENEFITS
                </th>
                <th className="border border-black border-t-0 p-2" colSpan={1}></th>
                <th className="border border-black border-t-0 text-center p-2" rowSpan={2}>
                  TOTAL
                </th>
              </tr>

                <tr>
                  <th className="border border-black border-t-0 ">Basic<br/>Salary-<br/>Civilian</th>
                  <th className="border border-black border-t-0 ">Salaries &<br/>Wages-<br/>Casual/<br/>Contractual</th>
                  <th className="border border-black border-t-0 ">Salaries &<br/>Wages-<br/>Substitute<br/>Teachers</th>
                  <th className="border border-black border-t-0 p-2">Personal<br/>Economic<br/>Relief<br/>Allowance<br/>(PERA)</th>
                  <th className="border border-black border-t-0 ">Representation<br/>Allowance<br/>(RA)</th>
                  <th className="border border-black border-t-0 ">Transportation<br/>Allowance<br/>(TA)</th>
                  <th className="border border-black border-t-0 ">Clothing/<br/>Uniform<br/>Allowance</th>
                  <th className="border border-black border-t-0 ">Subsistence<br/>Allowance<br/>(SA)</th>
                  <th className="border border-black border-t-0 ">Laundry<br/>Allowance<br/>(LA)</th>
                  <th className="border border-black border-t-0 ">Quaters<br/>Allowance<br/>(QA)</th>
                  <th className="border border-black border-t-0 ">Productivity<br/>Enhancement<br/>Incentive<br/>(PEI)</th>
                  <th className="border border-black border-t-0 ">Overseas<br/>Allowance<br/>(QA)</th>
                  <th className="border border-black border-t-0 ">Honoraria</th>
                  <th className="border border-black border-t-0 ">Hazard <br/>Pay<br/>(HP)</th>
                  <th className="border border-black border-t-0 ">Longevity<br/>Pay<br/>(LP)</th>
                  <th className="border border-black border-t-0 ">Overtime<br/>And Night<br/>Pay</th>
                  <th className="border border-black border-t-0 ">Night Shift <br/>Differential<br/>Pay</th>
                  <th className="border border-black border-t-0 ">Year<br/>End<br/>Bunos</th>
                  <th className="border border-black border-t-0 ">Cash<br/>Gift</th>
                  <th className="border border-black border-t-0 ">Mid<br/>Year<br/>Bunos</th>
                  <th className="border border-black border-t-0 ">Other<br/>Bunoses<br/>and<br/>Allowances</th>
                  <th className="border border-black border-t-0 ">Retirement<br/>and life<br/>Issurance<br/>Premiums<br/>(RLIP)</th>
                  <th className="border border-black border-t-0 ">Pag-ibig<br/>Contributions</th>
                  <th className="border border-black border-t-0 ">PhilHealth<br/>Contributions</th>
                  <th className="border border-black border-t-0 ">Employees<br/>Compensation<br/>Insurance<br/>Premiums<br/>(ECIP)</th>
                  <th className="border border-black border-t-0 ">Provident/<br/>Welfare<br/>Fund<br/>Constributions</th>
                  <th className="border border-black border-t-0 ">Pension<br/>Benefits</th>
                  <th className="border border-black border-t-0 ">Retirement<br/>Gratuity</th>
                  <th className="border border-black border-t-0 ">Terminal<br/>Leaves<br/>Benefits</th>
                  <th className="border border-black border-t-0 ">Lump-<br/>sums</th>
                  <th className="border border-black border-t-0 ">Loyalty<br/>Award</th>
                  <th className="border border-black border-t-0 ">Other<br/>Pernsonal<br/>Benefits</th>
                </tr>
                <tr>
                 {Array(35).fill(null).map((_, index)  => (
                    <th key={index} className="border border-black border-t-0 p-2">
                      ({index + 1})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              <tr className="border border-black border-t-0 border-b-0">
                <td className="border border-black border-t-0 border-b-0 text-left ">
                  <strong className="ml-2">A. COST STRUCTURE</strong>
                  <div className="ml-6 font-semibold">I. General Administration and Support</div>
                  <div className="ml-10 text-sm">a. Activity 1</div>
                </td>
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
                  <td key={index} className="border border-black border-t-0 border-b-0 ">
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {renderTableCells(34)}
              </tr>
              <tr>
                <td className="border border-black border-t-0 border-b-0 ">
                  <div className="ml-17 text-sm">CO</div> 
                </td>
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                {Array(34).fill(null).map((_, index) => (
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
                        <input
                          id="budget-officer"
                          type="text"
                          placeholder=""
                          className="w-80 border-b border-black focus:outline-none text-center"
                        />
                        <div className="mt-1 font-bold">BUDGET OFFICER</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <input
                          id="planning-officer"
                          type="text"
                          placeholder=""
                          className="w-80 border-b border-black focus:outline-none text-center h-6"
                        />
                        <div className="mt-1 font-bold">PLANNIG OFFICER</div>
                      </div>
                    </div>
                    </td>
                  <td className="border text-[12px]"colSpan={8}>
                  <div className="font-bold ml-2 text-[14px]">CERTIFIED CORRECT</div>
                    <div className="flex justify-center space-x-20">
                      <div className="flex flex-col items-center">
                        <input
                          id="chief-accountant"
                          type="text"
                          placeholder=""
                          className="w-80 border-b border-black focus:outline-none text-center"
                        />
                        <div className="mt-1 font-bold">CHIEF ACCOUNTANT</div>
                      </div>
                      </div>
                  </td>
                  <td className="border text-[12px]"colSpan={9}>                  
                   <div className="font-bold ml-2 text-[14px]">APPROVED</div>
                    <div className="flex justify-center space-x-20">
                      <div className="flex flex-col items-center">
                        <input
                          id="head-of-office"
                          type="text"
                          placeholder=""
                          className="w-80 border-b border-black focus:outline-none text-center"
                        />
                        <div className="mt-1 font-bold">HEAD OF OFFICE/AGENCY</div>
                      </div>
                      </div>
                    </td>
                  <td className="border text-[12px]"colSpan={11}>                  
                   <div className="font-bold ml-2 text-[14px]">DATE</div>
                    <div className="flex justify-items-start ml-50">
                      <div className="flex flex-col items-start">
                        <input
                          id="date"
                          type="text"
                          placeholder=""
                          className="w-50 border-b border-black focus:outline-none text-center"
                        />
                        <div className="mt-1 font-bold">DAY/MONTH/YEAR</div>
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

export default TableA;

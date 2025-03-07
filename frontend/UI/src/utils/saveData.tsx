export const saveData = async () => {
  // Extract contentEditable values
  const departmentElement = document.querySelector(".department-cell");
  const agencyElement = document.querySelector(".agency-cell");
  const operatingUnitElement = document.querySelector(".operating-unit-cell");

  const departmentName = (departmentElement as HTMLElement)?.innerText.trim() || "";
  const agencyName = (agencyElement as HTMLElement)?.innerText.trim() || "";
  const operatingUnitName = (operatingUnitElement as HTMLElement)?.innerText.trim() || "";

  // Extract checked checkboxes (Appropriation Types)
  const appropriationSources = [
    { id: "new-approriation", name: "New Appropriation (Regular Agency Budget)" },
    { id: "auto-appropriations", name: "Automatic Appropriations" },
    { id: "continuing-appropriations", name: "Continuing Appropriations" },
    { id: "other-appropriations", name: "Others (New Appropriations Transfers from SPFs; Supplemental)" }
  ].filter(source => (document.getElementById(source.id) as HTMLInputElement)?.checked)
   .map(source => source.name);

  // Extract checked checkboxes (Budget Years)
  const selectedYears = [
    { id: "2023-actual", name: "2023-Actual Obligation" },
    { id: "2024-Current", name: "2024-Current Progress" },
    { id: "2025-total-proposal", name: "2025-Total Proposal Program" },
    { id: "TIER1", name: "TIER1" },
    { id: "TIER2", name: "TIER2" }
  ].filter(year => (document.getElementById(year.id) as HTMLInputElement)?.checked)
   .map(year => year.name);



  // Prepare the data object
  const requestData = {
    departments: departmentName ? [{ name: departmentName }] : [],
    agencies: agencyName ? [{ name: agencyName, department: departmentName }] : [],
    operating_units: operatingUnitName ? [{ name: operatingUnitName, agency: agencyName }] : [],
    appropriation_types: appropriationSources,
    budget_years: selectedYears, // Added Budget Years
  };

  console.log("Extracted Departments:", requestData.departments);
  console.log("Extracted Agencies:", requestData.agencies);
  console.log("Extracted Operating Units:", requestData.operating_units);
  console.log("Extracted Appropriation Types:", requestData.appropriation_types);
  console.log("Extracted Budget Years:", requestData.budget_years);


  if (!departmentName && !agencyName && !operatingUnitName && 
      appropriationSources.length === 0 && selectedYears.length === 0) {
    alert("No data extracted! Please check the fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/save-data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      console.log("Response:", await response.json());
      alert("Data saved successfully!");
    } else {
      console.error("Failed to save data:", await response.json());
      alert("Failed to save data.");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("An error occurred while saving.");
  }
};

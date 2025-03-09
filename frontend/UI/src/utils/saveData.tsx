export const saveData = async () => {
  try {
    // Extract contentEditable values
    const departmentElement = document.querySelector(".department-cell");
    const agencyElement = document.querySelector(".agency-cell");
    const operatingUnitElement = document.querySelector(".operating-unit-cell");

    const departmentName = (departmentElement as HTMLElement)?.innerText.trim() || "";
    const agencyName = (agencyElement as HTMLElement)?.innerText.trim() || "";
    const operatingUnitName = (operatingUnitElement as HTMLElement)?.innerText.trim() || "";

    // Extract checked checkboxes
    const appropriationSources = [
      { id: "new-approriation", name: "New Appropriation (Regular Agency Budget)" },
      { id: "auto-appropriations", name: "Automatic Appropriations" },
      { id: "continuing-appropriations", name: "Continuing Appropriations" },
      { id: "other-appropriations", name: "Others (New Appropriations Transfers from SPFs; Supplemental)" }
    ].filter(source => (document.getElementById(source.id) as HTMLInputElement)?.checked)
      .map(source => source.name);

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
      budget_years: selectedYears,
    };

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
      alert("Data updated successfully!");
    } else {
      console.error("Failed to update data:", await response.json());
      alert("Failed to update data.");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    alert("An error occurred while updating.");
  }
};

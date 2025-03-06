export const saveData = async () => {
  const departmentElements = document.querySelectorAll(".department-cell");
  const agencyElements = document.querySelectorAll(".agency-cell");
  const operatingUnitElements = document.querySelectorAll(".operating-unit-cell");

  const departmentData: { name: string }[] = [];
  const agencyData: { name: string; department: string }[] = [];
  const operatingUnitData: { name: string; agency: string }[] = [];

  departmentElements.forEach((element) => {
    const departmentName = (element as HTMLElement).innerText.trim();
    if (departmentName) {
      departmentData.push({ name: departmentName });
    }
  });

  agencyElements.forEach((element) => {
    const agencyName = (element as HTMLElement).innerText.trim();
    const departmentName = element.getAttribute("data-department") || "";
    if (agencyName && departmentName) {
      agencyData.push({ name: agencyName, department: departmentName });
    }
  });

  operatingUnitElements.forEach((element) => {
    const operatingUnitName = (element as HTMLElement).innerText.trim();
    const agencyName = element.getAttribute("data-agency") || "";
    if (operatingUnitName && agencyName) {
      operatingUnitData.push({ name: operatingUnitName, agency: agencyName });
    }
  });

  const requestData = {
    departments: departmentData,
    agencies: agencyData,
    operating_units: operatingUnitData,
  };

  // 🚀 Debugging: Log extracted data
  console.log("Extracted Departments:", departmentData);
  console.log("Extracted Agencies:", agencyData);
  console.log("Extracted Operating Units:", operatingUnitData);

  if (departmentData.length === 0 && agencyData.length === 0 && operatingUnitData.length === 0) {
    alert("No data extracted! Please check the table.");
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

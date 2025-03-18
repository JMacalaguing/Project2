import axios from "axios";

export const UpdateForm = async () => {
  try {
    // Extract form ID from URL
    const pathSegments = window.location.pathname.split("/");
    let formId = pathSegments.find((segment) => /^\d+$/.test(segment)); // Find numeric segment

    if (!formId && window.history.state?.usr?.formId) {
      formId = window.history.state.usr.formId;
    }

    if (!formId) {
      throw new Error("Form ID not found in URL or state");
    }

    console.log("Updating form with ID:", formId);

    // Function to extract ONLY the innerText
    const getTextContent = (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement;
      return element ? element.innerText.trim() : "";
    };

    // Fetch original form data for comparison
    const getFormResponse = await fetch(`http://localhost:8000/api/get-form/${formId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    if (!getFormResponse.ok) {
      throw new Error("Failed to retrieve original form data");
    }

    

    // Extract current UI values
    let departmentName = getTextContent(".department-cell");
    let agencyName = getTextContent(".agency-cell");
    let operatingUnitName = getTextContent(".operating-unit-cell");
    let currentFormName = getTextContent(".current-form-name") || "Default Form Name";



    // Extract checked checkboxes
    const getCheckedValues = (items: { id: string; name: string }[]) => {
      return items
        .filter((item) => (document.getElementById(item.id) as HTMLInputElement)?.checked)
        .map((item) => item.name);
    };

    const appropriationSources = getCheckedValues([
      { id: "new-approriation", name: "New Appropriation (Regular Agency Budget)" },
      { id: "auto-appropriations", name: "Automatic Appropriations" },
      { id: "continuing-appropriations", name: "Continuing Appropriations" },
      { id: "other-appropriations", name: "Others(New Appropriations Transfers from SPFs; Supplemental)" },
    ]);

    const selectedYears = getCheckedValues([
      { id: "2023-actual", name: "2023-Actual Obligation" },
      { id: "2024-Current", name: "2024-Current Progress" },
      { id: "2025-total-proposal", name: "2025-Total Proposal Program" },
      { id: "TIER1", name: "TIER1" },
      { id: "TIER2", name: "TIER2" },
    ]);

    console.log("Sending update data:", {
      department: departmentName,
      agency: agencyName,
      operating_unit: operatingUnitName,
      appropriation_source: appropriationSources,
      year: selectedYears,
    });

    // Prepare the data object
    const requestData = {
      form_id: formId,
      form_name: currentFormName,
      department: departmentName,
      agency: agencyName,
      operating_unit: operatingUnitName,
      appropriation_source: appropriationSources,
      year: selectedYears,
    };

    // Send API request with axios
    const response = await axios.put(`http://localhost:8000/api/update-data/${formId}/`, requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    console.log("Response:", response.data);

    // Update UI with the server response data
    if (response.data) {
      try {
        if (response.data.agency) {
          const agencyEl = document.querySelector(".agency-cell") as HTMLElement;
          if (agencyEl) agencyEl.innerText = response.data.agency;
        }
        if (response.data.operating_unit) {
          const opUnitEl = document.querySelector(".operating-unit-cell") as HTMLElement;
          if (opUnitEl) opUnitEl.innerText = response.data.operating_unit;
        }
        if (response.data.department) {
          const deptEl = document.querySelector(".department-cell") as HTMLElement;
          if (deptEl) deptEl.innerText = response.data.department;
        }
      } catch (err) {
        console.error("Error updating UI with response data:", err);
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

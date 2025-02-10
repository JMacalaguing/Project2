import React from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="h-10 flex items-center">
      <span className="font-medium">{label}</span>
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.target.innerText)}
        className="ml-2 p-1 rounded cursor-text border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {value}
      </span>
    </div>
  );
};

export default EditableField;

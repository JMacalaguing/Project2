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
        className="form-cell"
      >
        {value}
      </span>
    </div>
  );
};

export default EditableField;

import React from "react";

export default function FormGroup({id,label,children}) {
    return (
        <div className="mb-3">
            <label htmlFor={id}>{label}:</label>
            {children}
        </div>
    );
}
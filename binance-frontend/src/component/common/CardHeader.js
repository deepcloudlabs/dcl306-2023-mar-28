import React from "react";

export default  function CardHeader({title,children}) {
    return (
        <div className="card-header">
            <h1 className="card-title">{title}</h1>
            {children}
        </div>
    );
}
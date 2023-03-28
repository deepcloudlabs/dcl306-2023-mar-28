import React from "react";

export default function Badge({id, bgColor, value}) {
    return (
        <div id={id}
             className={"badge ".concat(bgColor)}>
            {value}</div>
    );
}
import React from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

export default function Container({title, children}) {
    return(
        <div className="container">
            <p></p>
            <Card>
                <CardHeader title={title}/>
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        </div>
    );
}
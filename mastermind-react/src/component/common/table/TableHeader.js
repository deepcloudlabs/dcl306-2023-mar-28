export default function TableHeader({columns}){
    return(
        <thead>
            <tr>
                {
                    columns.split(",").map( column =>
                       <th key={column}>{column}</th>
                    )
                }
            </tr>
        </thead>
    );
}
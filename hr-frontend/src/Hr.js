import Container from "./component/common/Container";
import FormGroup from "./component/common/FormGroup";
import {useDepartments, useEmployee, useEmployees, useHrDispatcher} from "./provider/HrProvider";
import Button from "./component/common/Button";
import Table from "./component/common/table/Table";
import TableHeader from "./component/common/table/TableHeader";
import TableBody from "./component/common/table/TableBody";

function Hr() {
    const employee = useEmployee();
    const employees = useEmployees();
    const departments = useDepartments();
    const hrDispatcher = useHrDispatcher();

    function handleInputFileChange(event) {
        const fileName = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            hrDispatcher({type: "PHOTO_CHANGED", value: e.target.result})
        }
        fileReader.readAsDataURL(fileName);
    }

    function handleChange(event) {
        hrDispatcher({type: "VALUE_CHANGED", event});
    }

    //region click methods
    function hireEmployee(event) {
        fetch("http://localhost:4001/employees",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res=>res.json())
          .then(response => hrDispatcher({type: "EMPLOYEE_HIRED", response}));
    }
    function fireEmployee(event,emp) {
        let identityNo = employee.identityNo;
        if (emp)
            identityNo = emp.identityNo;
        fetch(`http://localhost:4001/employees/${identityNo}`,{
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(res=>res.json())
            .then(emp => hrDispatcher({type: "EMPLOYEE_FIRED", data: emp}));
    }
    function retrieveEmployee(event) {
            fetch(`http://localhost:4001/employees/${employee.identityNo}`,{
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }).then(res=>res.json())
                .then(emp => hrDispatcher({type: "EMPLOYEE_RETRIEVED", data: emp}));
    }
    function retrieveAllEmployees(event) {
        fetch(`http://localhost:4001/employees`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(res=>res.json())
            .then(employees => hrDispatcher({type: "EMPLOYEES_RETRIEVED", employees}));
    }
    function updateEmployee(event) {
        fetch("http://localhost:4001/employees",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(employee)
        }).then(res=>res.json())
            .then(response => hrDispatcher({type: "EMPLOYEE_UPDATED", response}));
    }
    //endregion

    function copyEmployee(employee) {
        hrDispatcher({type: "COPY_EMPLOYEE", employee})
    }

    return (
        <>
        <Container title="Employee">
            <FormGroup id="identityNo" label="Identity No">
                <input type="text"
                       className="form-control"
                       id="identityNo"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       name="identityNo"
                       value={employee.identityNo}></input>
                <button className="btn btn-info"
                        onClick={retrieveEmployee}>Retrieve</button>
                <button className="btn btn-danger"
                        onClick={fireEmployee}>Fire Employee</button>
            </FormGroup>
            <FormGroup id="fullname" label="Full Name">
                <input type="text"
                       className="form-control"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       id="fullname"
                       name="fullname"
                       value={employee.fullname}></input>
            </FormGroup>
            <FormGroup id="salary" label="Salary">
                <input type="text"
                       className="form-control"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       id="salary"
                       name="salary"
                       value={employee.salary}></input>
            </FormGroup>
            <FormGroup id="iban" label="IBAN">
                <input type="text"
                       className="form-control"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       id="iban"
                       name="iban"
                       value={employee.iban}></input>
            </FormGroup>
            <FormGroup id="birthYear" label="Birth Year">
                <input type="text"
                       className="form-control"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       id="birthYear"
                       name="birthYear"
                       value={employee.birthYear}></input>
            </FormGroup>
            <FormGroup id="fulltime" label="FullTime?">
                <div className="form-check">
                    <input type="checkbox"
                           className="form-check-input"
                           onChange={event => hrDispatcher({type: "FULLTIME_CHANGED", event})}
                           id="fulltime"
                           name="fulltime"
                           checked={employee.fulltime}></input>
                </div>
            </FormGroup>
            <FormGroup id="department" label="Department">
                <select id="department"
                        name="department"
                        className="form-select"
                        onChange={handleChange}
                        value={employee.department}>
                            {
                                departments.map(department =>
                                    <option key={department} label={department} value={department}>{department}</option>
                                )
                            }
                </select>
            </FormGroup>
            <FormGroup id="photo" label="Photo">
                <br />
                <img src={employee.photo} alt=""></img>
                <label>
                    <input type="file"
                           onChange={handleInputFileChange}
                           style={{"display": "none"}}></input>
                    <span className="btn btn-success">File</span>
                </label>
            </FormGroup>
            <FormGroup label="Operations">
                <button className="btn btn-success"
                        onClick={hireEmployee}>Hire Employee</button>

                <button className="btn btn-warning"
                        onClick={updateEmployee}>Update Employee</button>
                <button className="btn btn-info"
                        onClick={retrieveAllEmployees}>Retrieve All Employees</button>
            </FormGroup>
        </Container>
        <Container title="Employees">
            <Table id="employees">
                <TableHeader columns="No,Photo,Identity No,Full Name,Salary,IBAN,Birth Year,Department,Full-time?,Operations"/>
                <TableBody>
                    {
                        employees.map((emp,idx)=>
                           <tr key={emp.identityNo} onClick={(event) => copyEmployee(emp)}>
                               <td>{idx+1}</td>
                               <td><img src={emp.photo} alt=""/> </td>
                               <td>{emp.identityNo}</td>
                               <td>{emp.fullname}</td>
                               <td>{emp.salary}</td>
                               <td>{emp.iban}</td>
                               <td>{emp.birthYear}</td>
                               <td>{emp.department}</td>
                               <td>{emp.fulltime ? 'FULL-TIME' : 'PART-TIME'}</td>
                               <td><button onClick={(event) => fireEmployee(event,emp)}
                                           className="btn btn-danger">Fire Employee</button> </td>
                           </tr>
                        )
                    }
                </TableBody>
            </Table>
        </Container>
        </>
            );
}

export default Hr;

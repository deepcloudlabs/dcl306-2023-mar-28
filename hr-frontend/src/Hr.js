import Container from "./component/common/Container";
import FormGroup from "./component/common/FormGroup";
import {useDepartments, useEmployee, useHrDispatcher} from "./provider/HrProvider";

function Hr() {
    const employee = useEmployee();
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

    return (
        <Container title="Employee">
            <FormGroup id="identityNo" label="Identity No">
                <input type="text"
                       className="form-control"
                       id="identityNo"
                       onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
                       name="identityNo"
                       value={employee.identityNo}></input>
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
                        onChange={event => hrDispatcher({type: "VALUE_CHANGED", event})}
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
                <img src={employee.photo}></img>
                <label>
                    <input type="file"
                           onChange={handleInputFileChange}
                           style={{"display": "none"}}></input>
                    <span className="btn btn-success">File</span>
                </label>
            </FormGroup>
        </Container>
    );
}

export default Hr;

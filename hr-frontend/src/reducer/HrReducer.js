import Employee from "../model/Employee";
// has no side effect
export default function HrReducer(hr, action) {
    // Deep cloning: JSON.parse(JSON.stringify(employee))
    const employee = new Employee({...hr.employee});
    const departments = [...hr.departments];
    let employees = [...hr.employees];
    switch (action.type) {
        case "VALUE_CHANGED":
            employee[action.event.target.name] = action.event.target.value;
            break;
        case "PHOTO_CHANGED":
            employee.photo = action.value;
            break;
        case "FULLTIME_CHANGED":
            employee[action.event.target.name] = !employee[action.event.target.name];
            break;
        case "EMPLOYEE_HIRED":
            alert("Employee is hired!");
            break;
        case "EMPLOYEE_UPDATED":
            alert("Employee is updated!");
            break;
        case "EMPLOYEE_RETRIEVED":
            employee.update(action.data);
            break;
        case "EMPLOYEES_RETRIEVED":
            employees.splice(0);
            for (let emp of action.employees)
                employees.push(emp);
            break;
        case "EMPLOYEE_FIRED":
            employee.update(action.data);
            let identityNo = action.data.identityNo;
            employees = employees.filter(emp => emp.identityNo !== identityNo);
            break;
        case "COPY_EMPLOYEE":
            employee.update(action.employee);
            break;
        default:
            throw new Error("Unknown action type");
    }
    return {employee, departments, employees};
}
export default function HrReducer(hr, action) {
    const employee = {...hr.employee};
    const departments = [...hr.departments];
    const employees = [...hr.employees];
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
    }
    return {employee, departments, employees};
}
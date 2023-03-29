import {createContext, useContext, useReducer} from "react";
import Hr from "../Hr";
import HrReducer from "../reducer/HrReducer";
import Employee from "../model/Employee";

const HrContext = createContext(null);

export function useEmployee() {
    const {hr} = useContext(HrContext);
    return hr.employee;
}

export function useDepartments() {
    const {hr} = useContext(HrContext);
    return hr.departments;
}

export function useHrDispatcher() {
    const {hrDispatcher} = useContext(HrContext);
    return hrDispatcher;
}

export function useEmployees() {
    const {hr} = useContext(HrContext);
    return hr.employees;
}

export function HrProvider() {
    const employee = new Employee({});
    const employees = [];
    const departments = ["IT", "Sales", "Finance", "HR"];
    const [hr, hrDispatcher] = useReducer(HrReducer, {employee, employees,departments});
    return (
        <HrContext.Provider value={{hr, hrDispatcher,departments}}>
            <Hr/>
        </HrContext.Provider>
    )
}
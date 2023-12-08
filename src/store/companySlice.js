import { createSlice } from '@reduxjs/toolkit';
import { companiesData } from '../data/companies'

const initialState = {
    companies: companiesData,
};

const IDS = {
    company: initialState.companies.length,
    employee: initialState.companies.reduce((sum, company) => sum + company.employees.length, 0),
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompanies: (state, action) => {
            state.companies.push(...action.payload);
        },
        
        addCompany: (state, action) => {
            IDS.company++;
            state.companies.unshift({...action.payload, id: IDS.company});
        },

        removeCompany: (state, action) => {
            const idsToRemove = action.payload;
            state.companies = state.companies.filter(company => !idsToRemove.includes(company.id));
        },

        toggleCompanySelection: (state, action) => {
            const id = action.payload;
            const company = state.companies.find(company => company.id === id);
            if (company) {
                company.selected = !company.selected;
            }
        },

        toggleAllCompaniesSelection: (state, action) => {
            const selected = action.payload;
            state.companies.forEach((company) => {
                company.selected = selected;
            });
        },

        editCompanyName: (state, action) => {
            const { companyId, newName } = action.payload;
            const company = state.companies.find((c) => c.id === companyId);
            if (company) {
              company.name = newName;
            }
        },
      
        editCompanyAddress: (state, action) => {
            const { companyId, newAddress } = action.payload;
            const company = state.companies.find((c) => c.id === companyId);
            if (company) {
                company.address = newAddress;
            }
        },

        addEmployee: (state, action) => {
            const { companyId, employee } = action.payload;
            const company = state.companies.find(company => company.id === companyId);
            if (company) {
                company.employeeCount++;
                company.employees.unshift({...employee, id: IDS.employee});
                IDS.employee++;
            }
        },

        removeEmployee: (state, action) => {
            const { companyId, employeeIds } = action.payload;
            const company = state.companies.find(company => company.id === companyId);
            if (company) {
                company.employees = company.employees.filter(employee => !employeeIds.includes(employee.id));
                company.employeeCount = company.employees.length;
            }
        },

        toggleEmployeeSelection: (state, action) => {
            const { companyId, employeeId } = action.payload;
            const company = state.companies.find(company => company.id === companyId);
            if (company) {
                const employee = company.employees.find(employee => employee.id === employeeId);
                if (employee) {
                    employee.selected = !employee.selected;
                }
            }
        },

        toggleAllEmployeesSelection: (state, action) => {
            const { companyId, selected } = action.payload;
            const company = state.companies.find(company => company.id === companyId);
            company.employees.forEach((employee) => {
                employee.selected = selected;
            });
        },
      
        editEmployeeFirstName: (state, action) => {
            const { companyId, employeeId, newFirstName } = action.payload;
            const company = state.companies.find((c) => c.id === companyId);
            if (company) {
                const employee = company.employees.find((e) => e.id === employeeId);
                if (employee) {
                    employee.firstName = newFirstName;
                }
            }
        },
    
        editEmployeeLastName: (state, action) => {
            const { companyId, employeeId, newLastName } = action.payload;
            const company = state.companies.find((c) => c.id === companyId);
            if (company) {
                const employee = company.employees.find((e) => e.id === employeeId);
                if (employee) {
                    employee.lastName = newLastName;
                }
            }
        },
      
        editEmployeePosition: (state, action) => {
            const { companyId, employeeId, newPosition } = action.payload;
            const company = state.companies.find((c) => c.id === companyId);
            if (company) {
                const employee = company.employees.find((e) => e.id === employeeId);
                if (employee) {
                    employee.position = newPosition;
                }
            }
        },
    },
});
      
export const {
    addCompanies,
    addCompany,
    removeCompany,
    toggleCompanySelection,
    toggleAllCompaniesSelection,
    editCompanyName,
    editCompanyAddress,
    addEmployee,
    removeEmployee,
    toggleEmployeeSelection,
    toggleAllEmployeesSelection,
    editEmployeeFirstName,
    editEmployeeLastName,
    editEmployeePosition,
} = companySlice.actions;

//Получить компании
export const selectCompanies = state => state.company.companies;

//Получить количество выбранных компаний
export const selectSelectedCompaniesCount = (state) => {
    return state.company.companies.filter((company) => company.selected).length;
};

//Получить сотрудников выбранной компании
export const selectSelectedCompanyEmployees = (state) => {
    const selectedCompany = state.company.companies.find((company) => company.selected);
    return selectedCompany ? selectedCompany.employees : [];
};

//ПОлучить количество выбранных сотрудников
export const selectSelectedEmployeesCount = (state) => {
    const selectedCompany = state.company.companies.find((company) => company.selected);
    const selectedEmployees = selectedCompany?.employees.filter((employee) => employee.selected);
    return selectedEmployees ? selectedEmployees.length : 0;
};

export default companySlice.reducer;
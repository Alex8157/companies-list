import { useDispatch, useSelector } from 'react-redux';
import {
    selectSelectedCompaniesCount, 
    selectSelectedCompanyEmployees, 
    toggleEmployeeSelection,
    addEmployee,
    removeEmployee,
    editEmployeeFirstName,
    editEmployeeLastName,
    editEmployeePosition,
    toggleAllEmployeesSelection,
    selectSelectedEmployeesCount,
} from '../store/companySlice';
import styles from '../styles/table.module.css';

function EmployeeTable() {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.company.companies);
    const selectedCompaniesCount = useSelector(selectSelectedCompaniesCount);
    const selectedCompanyEmployees = useSelector(selectSelectedCompanyEmployees);
    const selectedEmployeesCount = useSelector(selectSelectedEmployeesCount);

    // Обработчики событий
    const getSelectedCompanyId = () => {
        return companies.filter((company) => company.selected)[0].id;
    }

    const handleCheckboxChange = (id) => {
        dispatch(toggleEmployeeSelection({companyId: getSelectedCompanyId(), employeeId: id}));
    };

    const handleAddEmployee = () => {
        dispatch(addEmployee({ companyId: getSelectedCompanyId(), employee: {firstName: '', lastName: '', position: '', selected: false }}));
    };

    const handleRemoveEmployee = (id) => {
        const selectedCompany = companies
            .filter((company) => company.selected);
        
        const selectedEmployeeIds = selectedCompany[0].employees
            .filter((employee) => employee.selected)
            .map((employee) => employee.id);
        dispatch(removeEmployee({companyId: getSelectedCompanyId(), employeeIds: selectedEmployeeIds}));
    };

    const handleFirstNameChange = (id, newFirstName) => {
        dispatch(editEmployeeFirstName({ companyId: getSelectedCompanyId(), employeeId: id, newFirstName}));
    };

    const handleLastNameChange = (id, newLastName) => {
        dispatch(editEmployeeLastName({ companyId: getSelectedCompanyId(), employeeId: id, newLastName}));
    };

    const handlePositionChange = (id, newPosition) => {
        dispatch(editEmployeePosition({ companyId: getSelectedCompanyId(), employeeId: id, newPosition}));
    };

    const handleToggleAllEmployees = (event) => {
        dispatch(toggleAllEmployeesSelection({ companyId: getSelectedCompanyId(), selected: event.target.checked}));
    };

    return (
        <>
            {selectedCompaniesCount === 1 &&
                <article className={styles.employees}>
                    <header className={styles.header}>
                        <label><h3>Таблица сотрудников</h3></label>
                        <div className={styles.buttons}>
                            <button className={styles.button} onClick={handleAddEmployee}>Добавить</button>
                            <button className={styles.button} onClick={handleRemoveEmployee}>Удалить</button>
                        </div>
                    </header>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectedEmployeesCount === selectedCompanyEmployees.length} onChange={handleToggleAllEmployees} className={styles.checkbox}/>
                                </th>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Должность</th>
                            </tr>
                        </thead>

                        <tbody>
                        {selectedCompanyEmployees.map((employee) => (
                            <tr key={employee.id} className={employee.selected ? styles.selected : ''}>
                                <td>
                                    <input type="checkbox" checked={employee.selected} onChange={() => {handleCheckboxChange(employee.id)}} className={styles.checkbox}/>
                                </td>
                                <td>
                                    <input value={employee.lastName} onChange={(e) => handleLastNameChange(employee.id, e.target.value)}/>
                                </td>
                                <td>
                                    <input value={employee.firstName} onChange={(e) => handleFirstNameChange(employee.id, e.target.value)}/>
                                </td>
                                <td>
                                    <input value={employee.position} onChange={(e) => handlePositionChange(employee.id, e.target.value)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div></div>
                </article>
            }
        </>
    );
}

export default EmployeeTable;

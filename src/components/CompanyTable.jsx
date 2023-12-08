import { useDispatch, useSelector } from 'react-redux';
import {
    addCompany,
    removeCompany,
    toggleCompanySelection,
    toggleAllCompaniesSelection,
    selectSelectedCompaniesCount,
    editCompanyName,
    editCompanyAddress,
} from '../store/companySlice';
import styles from '../styles/table.module.css';

const CompanyTable = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.company.companies);
    const selectedCompaniesCount = useSelector(selectSelectedCompaniesCount);    

    // Обработчики событий
    const handleCheckboxChange = (id) => {
        dispatch(toggleCompanySelection(id));
    };

    const handleCompanyNameChange = (id, newName) => {
        dispatch(editCompanyName({ companyId: id, newName }));
    };

    const handleCompanyAddressChange = (id, newAddress) => {
        dispatch(editCompanyAddress({ companyId: id, newAddress }));
    };

    const handleAddCompany = () => {
        const newCompany = {
            name: '',
            employeeCount: 0,
            address: '',
            selected: false,
            employees: [],
        };
        dispatch(addCompany(newCompany));
    };
  
    const handleRemoveCompany = () => {
        const selectedCompanyIds = companies
            .filter((company) => company.selected)
            .map((company) => company.id);
        dispatch(removeCompany(selectedCompanyIds));
    };

    const handleToggleAllCompanies = (event) => {
        dispatch(toggleAllCompaniesSelection(event.target.checked));
    };

    return (
        <article>
            <header className={styles.header}>
                <label><h3>Таблица компаний</h3></label>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleAddCompany}>Добавить</button>
                    <button className={styles.button} onClick={handleRemoveCompany}>Удалить</button>
                </div>
            </header>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" checked={selectedCompaniesCount === companies.length} onChange={handleToggleAllCompanies} className={styles.checkbox}/>
                        </th>
                        <th>Название компании</th>
                        <th>Кол-во сотрудников</th>
                        <th>Адрес</th>
                    </tr>
                </thead>

                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id} className={company.selected ? styles.selected : ''}>
                            <td>
                                <input type="checkbox" checked={company.selected} onChange={() => handleCheckboxChange(company.id)} className={styles.checkbox}/>
                            </td>
                            <td>
                                <input value={company.name} onChange={(e) => handleCompanyNameChange(company.id, e.target.value)}/>
                            </td>
                            <td>{company.employeeCount}</td>
                            <td>
                                <input value={company.address} onChange={(e) => handleCompanyAddressChange(company.id, e.target.value)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
};

export default CompanyTable;

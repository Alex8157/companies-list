import React from 'react';
import CompanyTable from './CompanyTable';
import EmployeeTable from './EmployeeTable';
import { useDispatch } from 'react-redux';
import { addCompanies } from '../store/companySlice';
import { getNewCompanies } from '../data/companies'
import styles from '../styles/app.module.css';

function App() {
  const dispatch = useDispatch();
  const containerRef = React.useRef();

  // Обработчик scroll
  const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
          // Здесь псевдозагрузка новых данных с сервера
          const newCompanies = getNewCompanies();
          dispatch(addCompanies(newCompanies));
      }
  };

  // Подписка на событие scroll
  React.useEffect(() => {
      const container = containerRef.current;
      container.addEventListener('scroll', handleScroll);
      // Отписка от события при размонтировании
      return () => {
          container.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <main className={styles.app} ref={containerRef}>
      <CompanyTable />
      <EmployeeTable />
    </main>
  );
}

export default App;

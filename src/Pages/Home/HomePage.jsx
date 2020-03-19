import React from 'react';
import NavBar from '../../components/NavBar';
import TimeTable from '../../components/TimeTable';
import StaffModal from '../../components/StaffModal';
import DateOfWeek from '../../components/DateOfWeek';
import { Main } from '../../AppStyles';

const HomePage = () => {
  return (
    <Main>
      <NavBar/>
      <div className='container'>
        <div className="statusBar">
          <StaffModal/>
          <DateOfWeek/>
        </div>
        <TimeTable/>
      </div>
      
    </Main>
  );
};

export default HomePage;
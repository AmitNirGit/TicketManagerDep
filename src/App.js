import React, { useState } from 'react';
import TicketContainer from './components/TicketContainer';
import './App.css';
import ControlPanel from './components/ControlPanel';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const searchHandler = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const [selectedRadioValue, setSelectedRadioValue] = useState('All');
  const handleRadioChange = (event) => {
    setSelectedRadioValue(event.target.value);
  };

  return (
    <div className='app-wrapper'>
      <h1 className='header'>Ticket Manager</h1>
      <ControlPanel
        searchHandler={searchHandler}
        selectedRadioValue={selectedRadioValue}
        handleRadioChange={handleRadioChange}
      />
      <TicketContainer
        searchValue={searchValue}
        selectedRadioValue={selectedRadioValue}
      />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css'
import Calculator from './publicPages/Calculator';
import OperationManager from './publicPages/OperationManager';
import Help from './publicPages/Help';

function App() {
  const [activeTab, setActiveTab] = useState({id: 1, name: 'Calculator'});

  const tabs = [{id: 1, name: 'Calculator'},{id: 2, name: 'Manage operations'},{id: 3, name: 'Help'}];

  const styles = {
    menu: {
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: '#999',
      padding: '1px',
    },
    tab: {
      flex: 1,
      textAlign: 'center',
      color: 'white',
      border: '1px solid black',
      cursor: 'pointer',
      padding: '10px 0',
      transition: 'background-color 0.3s',
    },
    activeTab: {
      flex: 1,
      textAlign: 'center',
      color: 'black',
      border: '1px solid black',
      backgroundColor: '#fff',
      cursor: 'pointer',
      padding: '10px 0',
    },
    content: {
      marginTop: '20px',
      textAlign: 'center',
    },
  };

  const renderContent = () => {
    switch(activeTab.id)
    {
      case 1: return <Calculator/>;
      case 2: return <OperationManager/>;
      case 3: return <Help/>;
    }
    return "";
  }

  return (
    <div>
      <div style={styles.menu}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={activeTab.id === tab.id ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App

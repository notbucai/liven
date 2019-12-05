import React from 'react';
import './App.scss';
import { routers, renderRoutes } from './router';

const App: React.FC = () => {
  return (
    <div className="App">
      {renderRoutes(routers)}
    </div>
  );
}

export default App;

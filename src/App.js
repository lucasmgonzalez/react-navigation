import React from 'react';

import Navigation from './components/Navigation';

const App = ({navData}) => {
  return (
    <div className="App">
      <Navigation nav={navData}/>
    </div>
  );
}

export default App;

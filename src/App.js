import React from 'react';
import './App.css';
import background from "./bg.jpg";
import Header from './Header'
import Footer from './Footer'


function App() {
  return (
    <div className="App" >
      <Header />
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '86vh', backgroundColor: '#212529' }}>

      </div>
        <Footer />
    </div>
  );
}

export default App;

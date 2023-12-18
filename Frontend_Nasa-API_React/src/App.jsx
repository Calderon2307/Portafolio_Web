import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './assets/components/header/Header';
import LoadingOverlay from './assets/components/loading/Loading';
import Cards from './assets/components/cards/Cards';
import Date from './assets/components/pickers/date/Date'
import Range from './assets/components/pickers/range/Range'
import Random from './assets/components/pickers/random/Random'
import './App.css'


function App() {
  const [apods, setApods] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const updateApods = (newApods) => {
    setApods(newApods);
  };

  const addElementToApods = (newApods) => {
    setApods(oldApods => [...oldApods, ...newApods]);
  };

  const handleIsLoading = (status) => {
    setIsLoading(status);
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Range updateApods={updateApods} handleIsLoading={handleIsLoading} />} />
          <Route path="/date" element={<Date updateApods={updateApods} handleIsLoading={handleIsLoading} />} />
          <Route path="/random" element={<Random updateApods={updateApods} handleIsLoading={handleIsLoading} addElementToApods={addElementToApods} />} />
        </Routes>
        <Cards apods={apods} />
        {isLoading && <LoadingOverlay />}
      </BrowserRouter>
    </>
  )
}

export default App

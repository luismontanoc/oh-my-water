import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedZone, setSelectedZone] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentZone, setCurrentZone] = useState('');
  const [nextMonth, setNextMonth] = useState('');
  const [nextDayName, setNextDayName] = useState('');
  const [nextDay, setNextDay] = useState('');
  const [nextYear, setNextYear] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const zone = getDaysBetweenDates(today) % 9 + 1;
    setCurrentZone(zone);
  }, []);

  function getDaysBetweenDates(endDate) {
    const start = new Date(new Date(2024, 9, 17));
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  }

  const handleChange = (event) => {
    const zoneNumber = parseInt(event.target.value);
    setSelectedZone(event.target.value);

    if (zoneNumber) {
      var daysUntilNextTurn = (9 - (currentZone - 1) + (zoneNumber-1)) % 9
      if(daysUntilNextTurn == 0)
      {
        daysUntilNextTurn = 9
      }
      const today = new Date()
      const nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());;
      nextDate.setDate(nextDate.getDate() + daysUntilNextTurn);
      setDisplayDate(nextDate.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      
      var month = nextDate.toLocaleDateString('es-CO', { month: 'long'})
      setNextMonth(month.charAt(0).toUpperCase() + month.slice(1))
      setNextDayName(nextDate.toLocaleDateString('es-CO', { weekday: 'long'}))
      setNextDay(nextDate.toLocaleDateString('es-CO', { day: 'numeric'}))
      setNextYear(nextDate.toLocaleDateString('es-CO', { year: 'numeric'}))
    } else {
      setDisplayDate('');
    }
  };

  return (
    <div className="App">
      <h1 class="p-3 text-white">Racionamiento de Agua</h1>

      <div className="row mt-4">
        <div className="col-md-6 mt-4">
          <div className="card">
            <div class="card-header">
              <h2>Turno Actual</h2>
            </div>
            <div className="card-body">
              <h4 className="card-text">Hoy {currentDate} le toca al Turno {currentZone}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="card">
          <div class="card-header">
            <h2>Próxima Fecha de mi Zona</h2>
          </div>
            <div className="card-body">
              <select className="form-select" value={selectedZone} onChange={handleChange}>
                <option value="">Elige una Zona</option>
                {[...Array(9)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Zona {index + 1}
                  </option>
                ))}
              </select>
              {displayDate && 
                <div class="card mt-4 bg-dark mx-auto" style={{width: 9 + 'rem'}}>
                  <div class="card-header bg-secondary text-white">
                    <h6>{nextMonth}</h6>
                  </div>
                    <div class="card-body text-white">
                    <h7 class="day-name">{nextDayName}</h7>
                    <h1 class="date-number">{nextDay}</h1>
                    <h7 class="year">{nextYear}</h7>
                  </div>
                  <div class="card-footer bg-primary"></div>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

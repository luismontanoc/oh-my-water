import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedZone, setSelectedZone] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentZone, setCurrentZone] = useState('');

  const startDate = new Date(2024, 9, 17); // 17 de octubre de 2024
  const colombiaLocale = 'es-CO';
  const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString(colombiaLocale, dateFormatOptions));

    const zone = getDaysBetweenDates(startDate, today) % 9 + 1;
    setCurrentZone(zone);
  }, []);

  function getDaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  }

  const handleChange = (event) => {
    const zoneNumber = parseInt(event.target.value);
    setSelectedZone(event.target.value);

    if (zoneNumber) {
      const daysUntilNextTurn = (currentZone % 9) + 1;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + (daysUntilNextTurn + zoneNumber - 1));
      setDisplayDate(nextDate.toLocaleDateString(colombiaLocale, dateFormatOptions));
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
              {displayDate && <h4 className="mt-3">La fecha del próximo racionamiento es {displayDate}</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

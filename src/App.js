import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedZone, setSelectedZone] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentZone, setCurrentZone] = useState('');
  const [nextTurn, setNextTurn] = useState('');
  const [nextMonth, setNextMonth] = useState('');
  const [nextDayName, setNextDayName] = useState('');
  const [nextDay, setNextDay] = useState('');
  const [nextYear, setNextYear] = useState('');
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const zone = getDaysBetweenDates(today) % 9 + 1;
    setCurrentZone(zone + "");

    updateZone(1, 1);
    setNextTurn(zone)
  }, []);

  function getDaysBetweenDates(endDate) {
    const start = new Date(new Date(2024, 9, 17));
    const day = endDate.getDate();
    const month = endDate.getMonth(); // Los meses van de 0 a 11
    const year = endDate.getFullYear();

    // Crear un nuevo objeto Date con solo el día, mes y año
    const cleanedDate = new Date(year, month, day);
    return Math.floor((cleanedDate - start) / (1000 * 60 * 60 * 24));
  }

  const handleChange = (event) => {
    updateZone(event.target.value, currentZone)
  }

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    // Comprobar si la nueva fecha es mayor o igual a hoy
    if (newDate >= formattedToday) {
        setSelectedDate(newDate);
        calculateTurnByDate(newDate);
    } else {
        alert("No es posible seleccionar fechas en el pasado");
        setSelectedDate(formattedToday); // Reiniciar a hoy
        setNextTurn(currentZone)
    }
};

function calculateTurnByDate(date) {

  const dateParts = date.split('-'); // Separar el string por "-"
    const year = parseInt(dateParts[0], 10); // Año
    const month = parseInt(dateParts[1], 10) - 1; // Mes (0-11)
    const day = parseInt(dateParts[2], 10); // Día

    // Crear el objeto Date
    const selectedDateObj = new Date(year, month, day);


  const daysFromStart = getDaysBetweenDates(selectedDateObj);
  const zone = (daysFromStart % 9) + 1;
  setNextTurn(zone.toString());
}
  
  function updateZone(newZone, currentZone) {
    const zoneNumber = parseInt(newZone);
    setSelectedZone(newZone);

    if (zoneNumber) {
      var daysUntilNextTurn = (9 - (currentZone - 1) + (zoneNumber - 1)) % 9
      if(daysUntilNextTurn === 0)
      {
        daysUntilNextTurn = 9
      }
      const today = new Date()
      const nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());;
      nextDate.setDate(nextDate.getDate() + daysUntilNextTurn);
      setDisplayDate(nextDate.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      
      var month = nextDate.toLocaleDateString('es-CO', { month: 'long'})
      setNextMonth(month.charAt(0).toUpperCase() + month.slice(1))
      var dayName = nextDate.toLocaleDateString('es-CO', { weekday: 'long'})
      setNextDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1))
      setNextDay(nextDate.toLocaleDateString('es-CO', { day: 'numeric'}))
      setNextYear(nextDate.toLocaleDateString('es-CO', { year: 'numeric'}))
    } else {
      setDisplayDate('');
    }
  };

  return (
    <div className="App">
      <h1 class="text-start text-white fw-bold">Racionamiento de Agua</h1>
      <div className="row">
        <div className="col-md-6 mt-4">
          <div className="card text-white shadow flow">
            <div class="text-start fw-bold ms-4 mt-4 text-danger">
              <h7><i class="bi bi-calendar-check text-danger"></i> Turno de Hoy</h7>
            </div>
            <div className="card-body">
              <div class="card-group d-flex m-1">
                <div class="card text-start fw-bold border-0 transparent-bg" style={{flex: '0 0 50%'}}>
                    <p class="text-secondary">Fecha Actual</p>
                    <h4 class="text-white"><strong>{currentDate}</strong></h4>
                </div>
                <div class="card border-0 transparent-bg" style={{flex: '0 0 5%'}}></div>
                <div class="card d-flex align-items-center justify-content-center fw-bold bg-danger rounded turn" style={{flex: '0 0 45%'}}>
                    <h4 class="text-white mb-0"><strong>Turno</strong></h4>
                    <h2 class="text-white mb-0"><strong>{currentZone}</strong></h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="card text-white shadow flow">
          <div class="text-start fw-bold ms-4 mt-4 text-danger">
              <h7><i class="bi bi-arrow-right-circle"></i> Próxima Fecha</h7>
            </div>
            <div className="card-body">
              <div class="card-group d-flex m-1">
              <div class="card text-start fw-bold border-0 d-flex justify-content-center transparent-bg" style={{flex: '0 0 50%'}}>
                    <p class="text-secondary">Seleccione un Turno</p>
                    <select className="form-select" value={selectedZone} onChange={handleChange}>
                      {[...Array(9)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          Turno {index + 1}
                        </option>
                      ))}
                    </select>
                </div>
              <div class="card border-0 transparent-bg" style={{flex: '0 0 5%'}}></div>
              <div class="card d-flex align-items-center justify-content-center fw-bold border-0 " style={{flex: '0 0 45%'}}>
              {displayDate && 
                <div class="card bg-dark" style={{width: '100%'}}>
                  <div class="card-header bg-secondary text-white">
                    <h6 class="m-0"><strong>{nextMonth}</strong></h6>
                  </div>
                    <div class="card-body text-white">
                    <h7 class="day-name m-0">{nextDayName}</h7>
                    <h1 class="date-number m-1"><strong>{nextDay}</strong></h1>
                    <h7 class="year m-0">{nextYear}</h7>
                  </div>
                  <div class="card-footer bg-danger p-1"></div>
                </div>}
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="card text-white shadow flow">
          <div class="text-start fw-bold ms-4 mt-4 text-danger">
              <h7><i class="bi bi-search"></i> Turno Según Fecha</h7>
            </div>
            <div className="card-body">
              <div class="card-group d-flex m-1">
              <div class="card text-start fw-bold border-0 d-flex justify-content-center transparent-bg" style={{flex: '0 0 50%'}}>
                    <p class="text-secondary">Seleccione una Fecha</p>
                    <Form>
            <Form.Group controlId="datePicker">
                <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={formattedToday} // Establecer la fecha mínima en el día actual
                />
            </Form.Group>
        </Form>
                </div>
              <div class="card border-0 transparent-bg" style={{flex: '0 0 5%'}}></div>
              <div class="card d-flex align-items-center justify-content-center fw-bold bg-secondary rounded turn" style={{flex: '0 0 45%'}}>
                    <h4 class="text-white mb-0"><strong>Turno</strong></h4>
                    <h2 class="text-white mb-0"><strong>{nextTurn}</strong></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

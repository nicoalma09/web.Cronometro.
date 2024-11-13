import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [partials, setPartials] = useState([]); // Estado para guardar los parciales

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds(prevMilliseconds => {
          if (prevMilliseconds === 99) {
            setSeconds(prevSeconds => prevSeconds + 1);
            return 0;
          }
          return prevMilliseconds + 1;
        });
      }, 10);  // Actualiza cada 10ms
    } else {
      clearInterval(interval);   // Si está pausado, limpia el intervalo
    }

    return () => clearInterval(interval);  // Limpiar intervalo cuando el componente se desmonte
  }, [isActive]);

  const toggle = () => setIsActive(!isActive);  // Alterna entre iniciar y pausar

  const reset = () => {
    setIsActive(false);  // Pausa el cronómetro
    setSeconds(0);       // Reinicia los segundos
    setMilliseconds(0);  // Reinicia los milisegundos
    setPartials([]);     // Borra la lista de parciales
  };

  const savePartial = () => {
    // Guarda el tiempo parcial actual (en segundos y milisegundos)
    const partialTime = {
      seconds,
      milliseconds,
    };
    setPartials([...partials, partialTime]); // Añade el nuevo parcial al array
  };

  return (
    <div className="App">
      <h1>Cronómetro</h1>
      <div className="time">
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:
        {String(seconds % 60).padStart(2, '0')}.
        {String(milliseconds % 60).padStart(2, '0')} 
      </div>
      <div className="controls">
        <button onClick={toggle}>
          {isActive ? 'Detener' : 'Iniciar'}
        </button>
        <button onClick={reset}>Restablecer</button>
        <button onClick={savePartial}>Parcial</button> {/* Nuevo botón "Parcial" */}
      </div>
      <div className="partials">
        <h2>Parciales</h2>
        <ul>
          {partials.map((partial, index) => (
            <li key={index}>
              {String(Math.floor(partial.seconds / 60)).padStart(2, '0')}.
              {String(partial.seconds % 60).padStart(2, '0')}.
              {String(partial.milliseconds % 60).padStart(2, '0')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

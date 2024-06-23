import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import logo from './assets/CatBalance-cropped.png'

import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState(null);
  const [ano, setAno] = useState(null);
  const [mes, setMes] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function onCalcularClick() {
    setShowError(false);
    setErrorMessage('');
    
    if (!isFormValid()) {
      return;
    }

    const response = await fetch('http://localhost:8080/cat-balance?' + new URLSearchParams({
      nome,
      peso,
      ano,
      mes
  }).toString());
    console.log(response);
    const message = await response.json();
    setResultMessage(message.message);
    setShowResult(true);
  }

  function isFormValid() {
    if (!nome || !peso || !ano || !mes) {
      setShowError(true);
      setErrorMessage('Você precisa preencher todos os campos!');
      return false;
    }
    if (peso < 0) {
      setShowError(true);
      setErrorMessage('Digite um valor válido para o campo de peso!');
      return false;
    }
    if (ano < 0) {
      setShowError(true);
      setErrorMessage('Digite um valor válido para o campo de ano!');
      return false;
    }
    if (mes < 0) {
      setShowError(true);
      setErrorMessage('Digite um valor válido para o campo de mês!');
      return false;
    }

    return true;
  }

  function onVoltarClick() {
    setNome('');
    setPeso(null);
    setAno(null);
    setMes(null);
    setShowResult(false);
    setResultMessage('');
  }

  return (
    <div className="App">
      <div className="Linha Logo">
        <img
          className='Imagem'
          src={logo}
          alt='logotipo catBalance'
        />
      </div>
      {showError && <Alert className="Alerta" severity="error">{errorMessage}</Alert>}
      {showResult ?
        <div>
          <div className="Resultado Linha">
            {resultMessage}
          </div>
          <div className="Linha">
           <Button variant="contained" onClick={ () => onVoltarClick()}>Calcular novamente</Button>
          </div>
        </div>
        :
        <div>
          <div className="Linha">
            <div className='Campo'>
              <TextField id="outlined-basic" label="Nome" value={nome} onChange={(event) => setNome(event.target.value)} variant="outlined" />
            </div>
            <div className="Campo Ml-12">
              <TextField id="outlined-basic" label="Peso" type='number' value={peso} onChange={(event) => setPeso(event.target.value)} variant="outlined" />
            </div>
          </div>
          <div className="Linha">
            <div className='Campo'>
              <TextField id="outlined-basic" label="Ano" type='number' value={ano} onChange={(event) => setAno(event.target.value)} variant="outlined" />
            </div>
            <div className="Campo Ml-12">
              <TextField id="outlined-basic" label="Mês" type='number' value={mes} onChange={(event) => setMes(event.target.value)} variant="outlined" />
            </div>
          </div>
          <div className="Linha">
            <Button variant="contained" onClick={ () => onCalcularClick()}>Calcular</Button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;

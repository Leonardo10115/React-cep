import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState('')

  const buscarCep = async () => {
    if (!cep) return;

    try{
      setErro('');
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
  const data = await response.json();

  if (data.erro) {
    setErro('CEP não encontrado');
    setEndereco(null);
  }else {
    setEndereco(data);
  }
    } catch (error) {
      setErro('Erro ao buscar o CEP. Verifique se o formato está correto');
      setEndereco(null);
    }
  };
  return (
    <>
    <div className='container'>
      <h1>Buscar Cep</h1>

      <input type="text" placeholder='Digite o CEP' value={cep} onChange={(e) => setCep(e.target.value)} />
    </div>

    <button onClick={buscarCep}>Buscar</button>

    {erro && <p style={{color: 'red'}}>{erro}</p>}

    {endereco && (
      <div className='resultado'>
        <p>CEP: {endereco.cep}</p>
        <p>Rua: {endereco.logradouro}</p>
        <p>Bairro: {endereco.bairro}</p>
        <p>Cidade: {endereco.localidade}</p>
        <p>Estado: {endereco.uf}</p>
      </div>
    )}
    </>
    
  )
}

export default App

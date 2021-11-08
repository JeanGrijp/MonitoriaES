import { useEffect, useState } from "react";
import axios from 'axios';
import api from "../../services/api";
import './CountStyle.css';
export const Count = () => {

  const [count, setcount] = useState(0);
  const [contas, setContas] = useState([]);
  const [campos, setCampos] = useState({name: "", balance: "", cpf: ""});




  const handleChange = (e) => {
    const { value, name } = e.target;
    setCampos((prev) => {
      return { ...prev, [name]: value };
    });
  };
  
  useEffect(() => {
    console.log(`a variável de estado ${count} mudou, ativando o useEffect`)
  }, []);
  
  // https://60dccba8c2b6280017febca8.mockapi.io/accounts

  const getAccounts = async () => {
    // api.get('/').then((item) => console.log(item)).catch((error) => console.log(error));
    try {
      const response = await api.get("/");
      const dados = response.data;
      setContas(dados);
      console.log("RESPONSE", response);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    
    getAccounts();

  }, []);


  const onEditClick = (contaAtualQueTaEditando) => {
  
    setCampos(contaAtualQueTaEditando)
    
  }


  const enviarDados = async (e) => {
    e.preventDefault();
    const id = campos.id;

    try {
      const body = campos;
      // true ? "isso aqui" : "esse outro"
      // "" == false
      const response = await id ? api.put(`/${id}`, body) : api.post('/', body);
      console.log("ENVIOU", response);
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  const onDeleteClick = async (id) => {
    
    try {
      const response = await api.delete(`/${id}`);
      const novaListaDeContas = contas.filter((contaAtual) => contaAtual.id != id);
      setContas(novaListaDeContas);
      console.log("DELETE", response);
    } catch (error) {
      console.log("ERROR", error)
    }
  }




  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => setcount(count + 1)}>incrementar</button>
      <button onClick={() => setcount(count - 1)}>decrementar</button>

      <form id="account" onSubmit={enviarDados}>
        <div>
          <label>ID</label>
          <input type="text" name="id" onChange={handleChange} value={campos.id}/>
        </div>
        <div>
          <label>Nome</label>
          <input type="text" name="name" onChange={handleChange} value={campos.name}/>
        </div>
        <div>
          <label>Balance</label>
          <input type="text" name="balance" onChange={handleChange} value={campos.balance}/>
        </div>
        <div>
          <label>CPF</label>
          <input type="text" name="cpf" onChange={handleChange} value={campos.cpf}/>
        </div>
        <button type="submit">{campos.id ? "ATUALIZAR" : "CRIAR"}</button>
      </form>

      <p>Nome: {campos.name}</p>
        <p>Cpf: {campos.cpf}</p>
        <p>Total: {campos.balance}</p>

      {contas.map((contaAtual) => (
        <div key={contaAtual.id} className="lista__item">
          <p>Nome: {contaAtual.name}</p>
          <p>Cpf: {contaAtual.cpf}</p>
          <p>Total: {contaAtual.balance}</p>
          <button onClick={() => onDeleteClick(contaAtual.id)}>DELETAR</button>
          <button onClick={() => onEditClick(contaAtual)}>EDITAR</button>
        </div>
      ))}
    </div>
  );
}
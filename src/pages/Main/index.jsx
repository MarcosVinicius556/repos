import { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

import api from '../../services/api';

export default function Main(){

  const[newRepo, setNewRepo] = useState('');
  const[repositorios, setRepositorios] = useState([]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  //Ao algum dos estados mudarm o callback será chamado e executará as funções contidas dentro
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    async function submit() {
      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      }

      //Mantém o que já tinha e adiciona mais
      setRepositorios([ ...repositorios, data ]);
      setNewRepo('');
    }

    submit();
  }, [newRepo, repositorios])

  return(
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>
      {/*Normalmente quando se tem mais de 2 
        encadeamentos de componentes, um novo é criado....  */}
      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder='Adicionar Repositórios' value={newRepo} onChange={handleInputChange}/>

        <SubmitButton>
          <FaPlus color='#fff' size={14} />
        </SubmitButton>
      </Form>

    </Container>
  )
}
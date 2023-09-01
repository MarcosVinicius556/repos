import { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';

export default function Main(){

  const[newRepo, setNewRepo] = useState('');
  const[repositorios, setRepositorios] = useState([]);
  const[loading, setLoading] = useState(false);
  const[alert, setAlert] = useState(null);

  //DIdMount (Ao componente ser criado) - Busca
  useEffect(() => {
    const repoStorage = localStorage.getItem('@repos');
    
    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }

  }, []);

  //DidUpdate (Ao componente ser atualizado) - Salva
  useEffect(() => {
    localStorage.setItem('@repos', JSON.stringify(repositorios));

  }, [repositorios]); //Ao alterar esta state, executa esta função

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  //Ao algum dos estados mudarm o callback será chamado e executará as funções contidas dentro
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    async function submit() {
        try {

            if(newRepo === '') {
              throw new Error('Você precisa indicar um repositório!');
            }

            const response = await api.get(`repos/${newRepo}`);
    
            //Passando por todos os repo, e verificando se tem algum com o mesmo nome informado
            const hasRepo = repositorios.find(repo => repo.name === newRepo);

            if(hasRepo){
              throw new Error('Repositório duplicado');
            }

            const data = {
              name: response.data.full_name,
            }
    
            //Mantém o que já tinha e adiciona mais
            setRepositorios([ ...repositorios, data ]);
            setNewRepo('');
        } catch (error) {
            setAlert(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
      }  

    submit();
  }, [newRepo, repositorios]);

  /**
   * Utilizando useCallback novamente,
   * pois sempre que se está manipulando 
   * estados com react é mais interessante 
   * utilziar o useCallback
   */

  const handleDelete = useCallback((repo) => {
    /**
     * Verifica e retorna todos que sejam diferentes do escolhido
     */
    const find = repositorios.filter(r => r.name != repo);

    setRepositorios(find);
  }, [repositorios]);

  return(
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>
      {/*Normalmente quando se tem mais de 2 
        encadeamentos de componentes, um novo é criado....  */}
      <Form onSubmit={handleSubmit} error={alert}>
        <input type="text" placeholder='Adicionar Repositórios' value={newRepo} onChange={handleInputChange}/>

        <SubmitButton loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color='#fff' size={14}  />
            ) : (
              <FaPlus color='#fff' size={14} />
            )
          }
          
        </SubmitButton>
      </Form>

      <List>
          {
            repositorios.map(repo => (
              <li key={repo.name}>
                <span>
                  <DeleteButton onClick={() => handleDelete(repo.name)}>
                    <FaTrash size={14} />
                  </DeleteButton>
                  {repo.name}
                </span>
                <a href="">
                  <FaBars size={20}/>
                </a>
              </li>
            ))
          }
      </List>

    </Container>
  )
}
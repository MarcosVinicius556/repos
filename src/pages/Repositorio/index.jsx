import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from "./styles";
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

function Repositorio() {

    const{ repositorio } = useParams()

    const[ repo, setRepo ] = useState({});
    const[ issues, setIssues ] = useState([]);
    const[ loading, setLoading ] = useState(true);
    const[ page, setPage ] = useState(1);
    const[ filters, setFilters ] = useState([
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false },
    ]);


    useEffect(() => {

        async function load() {
            /**
             * Executa um array de promisses ao mesmo tempo
             * Bom de utlizar quando se tem casos em que 
             * é necessário mais de 1 requisição para buscar todos os dados
             * da página, o retorno é um array,e pode ser utilizado com desconstrução 
             * por exemplo
             */
            const [ repositorioData, issuesData ] = await Promise.all([
                api.get(`/repos/${decodeURIComponent(repositorio)}`),
                api.get(`/repos/${decodeURIComponent(repositorio)}/issues`, {
                    //axios permite passar parâmetros desta forma
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                }),
            ]);

            setRepo(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);

        }

        load();

    }, [repositorio]);

    useEffect(() => {
        async function loadIssue() {
          const response = await api.get(`/repos/${decodeURIComponent(repositorio)}/issues`, {
                //axios permite passar parâmetros desta forma
                params: {
                    state: 'open',
                    page: page,
                    per_page: 5
                }
            });

            setIssues(response.data);

        }

        loadIssue();
    }, [page]);

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1);
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        );    
    }
    
    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={30}/>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                <h1>{ repo.name }</h1>
                <p>{ repo.description}</p>
            </Owner>
            <FilterList>
                {
                    filters.map((filter, index) => (
                        <button 
                            type="button" 
                            key={filter.label} 
                            onClick={() => {}}>
                                {filter.label}
                        </button>
                    ))
                }
            </FilterList>
            <IssuesList>
                {
                    issues.map((issue) => (
                        <li key={String(issue.id)}> {/**Convertendo o id da issue para string */}
                            <img src={issue.user.avatar_url} alt={issue.user.login} />

                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}> {label.name} </span>
                                    ))}
                                </strong>

                                <p>{issue.user.login}</p>

                            </div>

                        </li>
                    ))
                }
            </IssuesList>

            <PageActions>

                <button type="button" disabled={page < 2} onClick={() => handlePage('back')}>Voltar</button>
                <button type="button" onClick={() => handlePage('next')}>Proximo</button>
            </PageActions>

        </Container>
    )
}

export default Repositorio;
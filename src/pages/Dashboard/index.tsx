import React, { useState,useEffect, FormEvent } from 'react'
import { Title, Form, Repositories ,Error} from './styles'
import {Link} from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import logoIgm from '../../assets/logo.svg'
import api from '../../services/api'

interface Repository {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
}

const Dashboard: React.FunctionComponent = () => {
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')
        if(storagedRepositories){
            return JSON.parse(storagedRepositories);
        }else{
            return []
        }
    });
    const [newRepo, setNewRepo] = useState('')
    const [inputError,setInputError] = useState('');

    useEffect(() => {

    },[]);

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories',JSON.stringify(repositories))
    },[repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if(!newRepo){
            setInputError("digite o autor/nome do repositório")
            return
        }
      
        
        //adicionar repositório
        //consumir api do github
        //salvar novo repositório no estado
        try{
            const response = await api.get<Repository>(`repos/${newRepo}`)
            const repository = response.data;
            setRepositories([...repositories, repository])
            setNewRepo('');
            setInputError('');
        }catch(e){
            setInputError("erro na busca do repositório")
        }
       
        
    }


    return (
        <>
            <img src={logoIgm} alt="Github Explorer" />
            <Title>Explore Repositórios no github</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input value={newRepo} onChange={(e): void => setNewRepo(e.target.value)} type="text" placeholder="digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>
            {inputError && <Error>{inputError}</Error>}
            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`repository/${repository.full_name}`} >
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    )
}

export default Dashboard;
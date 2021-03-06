import React,{useEffect,useState} from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import logoIgm from '../../assets/logo.svg'
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi'
import { RepositoryInfo,Issues } from './styles'
import api from '../../services/api'

import { Header } from './styles'

interface RepositoryParams {
    repository: string
}

interface Repository {
    full_name: string,
    description: string,
    stargazers_count:number
    forks_count:number
    open_issues_count:number
    owner: {
        login: string,
        avatar_url: string
    }
}

interface Issue{
    id:number;
    title:string;
    html_url:string;
    user:{
        login:string
    }
}

const Dashboard: React.FunctionComponent = () => {

    const [repository,setRepository] = useState<Repository | null>(null);
    const [issues,setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>()
    useEffect(() => {
        api.get<Repository>(`repos/${params.repository}`).then(response => {
            setRepository(response.data);
        }) 

        api.get<Issue[]>(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        }) 
    },[params.repository])
    return (
        <>
            <Header>
                <img src={logoIgm} alt="github explorer" />
                <Link to="/">
                    <FiChevronLeft size={16}></FiChevronLeft>
                </Link>
            </Header>
            {repository && (
                      <RepositoryInfo>
                      <header>
                          <img src={repository.owner.avatar_url} alt={repository.owner.avatar_url} />
                          <div>
                              <strong>{repository.full_name}</strong>
                              <p>{repository.description}</p>
                          </div>
                      </header>
                      <ul>
                          <li>
                              <strong>{repository.stargazers_count}</strong>
                              <span>Stars</span>
                          </li>
                          <li>
                              <strong>{repository.forks_count}</strong>
                              <span>Forks</span>
                          </li>
                          <li>
                              <strong>{repository.open_issues_count}</strong>
                              <span>Issues</span>
                          </li>
                      </ul>
                  </RepositoryInfo>
            )}
      
            <Issues>
             {issues.map(issue => {
                 return  <a  href={issue.html_url} key={issue.id} >
                 <div>
                     <strong>{issue.title}</strong>
                     <p>{issue.user.login}</p>
                 </div>
                 <FiChevronRight size={20} />
             </a>
             })}
               
            </Issues>
        </>
    )
}

export default Dashboard;
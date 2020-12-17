import styled from 'styled-components'

export const Header = styled.header`
    display:flex;
    align-items:center;
    justify-content:space-between;

    a{
        display:flex;
        align-items:center;
        text-decoration:none;
        color:#a8a8b3;
        transition:color 0.2s;

        &:hover{
            color:#666;
        }

        svg{
            margin-right:4px;
        }
    }
`
export const RepositoryInfo = styled.section`
    margin-top:80px;
    align-items:center;
    img{
        width:120px;
        height:120px;
        border-radius:50%;
    }

    div{
        margin-left:24px;
        strong{
            font-size:36px;
            color:#737380;
            margin-top:4px;
        }
    }

    ul{
        display:flex;
        list-style:none;
        margin-top:40px;

        

        li{

          & + li{
                    margin-left:80px;
         }
            strong{
                display:block;
                font-size:36px;
                color:#3D3D4D;
            }
        }

        span{
            display:block;
            margin-top:4px;
            color:#6c6c80;
        }
    }

`
export const Issues = styled.div`
    margin-top:80px;
    a{
        background:#fff;
        border-radius:5px;
        width:100%;
        padding:24px;
        display:block;
        text-decoration:none;
        display:flex;
        align-items:center;

       & + a{
            margin-top:16px;
        }
        transition:transaform 0.2s;
         &:hover{
            transform:translateX(10px);
        }
        div{
            flex:1;
            margin:8px 16px;
            strong{
                font-size:20px;
                color:#3D3D4D;
                margin-top:4px;
            }

            p{
                font-size:18px;
                color:#A8A8B3;
                margin-top:4px;
            }
        }

        svg{
           margin-left:auto; 
           color:#cbcbd6;
        }
    }
`
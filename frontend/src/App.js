import './App.css';
import {useState, useEffect} from 'react'
import React from 'react'
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

function App() {
  const [articles,setArticles] = useState([])
  const [token, removeToken] = useCookies(['mytoken'])
  const [editArticle, setEditArticle] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    fetch('https://articles-backend.vercel.app/api/articles/',{
      'method':'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])
  useEffect(() => {
    if(token['mytoken'] === 'undefined' || token['mytoken'] === null){
      navigate('/');
    }
  }, [token])
    
  const editBtn = (article) => {
    setEditArticle(article)
  }
  const articleForm = () => {
    setEditArticle({title:'',description:''})
  }
  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id){
        return article;
      }
      else{
        return myarticle;
      }
    })
    setArticles(new_article)
  }
  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }
  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false
      }
      return true;
    })
    setArticles(new_articles)
  }
  const logoutBtn = () => {
    removeToken(['mytoken'])
  }
  return (
    <div className='App'>
      <div className='row'>
        <div className='col'>
      <h1>Django React</h1>
      <br />
      <div className='col'>
        <button button onClick={articleForm}  className = "btn btn-primary" style={{backgroundColor:"black",border:'black'}}>Insert Article</button>

        <button onClick={logoutBtn}  className = "btn btn-primary col1" style={{backgroundColor:"black",border:'black'}}>Logout</button>
      </div>
      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn} />
      {editArticle ? 
      <Form article = {editArticle} updatedInformation={updatedInformation} insertedInformation={insertedInformation} /> : null}
      </div>
      </div>
      </div>
  )
}

export default App
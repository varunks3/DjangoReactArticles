import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
 
 
function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [token, setToken] = useCookies(['mytoken'])
  const [isLogin, setLogin] = useState(true)
  const navigate = useNavigate();
 
  const RegisterBtn = () => {
    APIService.RegisterUser({username, password})
    .then(() => loginBtn())
    .catch(error => console.log(error))
  }
  const loginBtn = () => {
    APIService.LoginUser({username, password})
    .then(resp => setToken('mytoken', resp.token))
    .catch(error => console.log(error))
  }
 
  useEffect(() => {
    if(token['mytoken'] === 'undefined'){
      navigate('/');
    }
    else 
    if (token['mytoken']){
      navigate('articles/');
    }
    
    
  }, [token])
  
  return (
    <div className='App'>
      <br />
      <br />

      {isLogin ? <h1>Please Login</h1> :<h1>Please Register</h1>}

      <br />
      <br />
      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>Username</label>
        <input type='text' className='form-control' id='username' placeholder='Please enter username'
        value = {username} onChange = {e => setUsername(e.target.value)}/>
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>password</label>
        <input type='text' className='form-control' id='password' placeholder='Please enter password'
        value = {password} onChange = {e => setPassword(e.target.value)}/>
      </div>
      {isLogin ?  <button onClick={loginBtn} style={{backgroundColor:"black",border:'black'}} className='btn btn-primary'>Login</button> :  
      <button onClick={RegisterBtn} style={{backgroundColor:"black",border:'black'}}className='btn btn-primary'>Register</button>}
      
      <div className='mb-3'>
        <br/>
        {isLogin ? <h5>Don't have an Account? Please <button className='btn btn-primary'style={{backgroundColor:"black"}} onClick={() => setLogin(false)} >Register</button>Here</h5>
        : <h5>Already have Account? Please <button className='btn btn-primary'style={{backgroundColor:"black"}} onClick={() => setLogin(true)} >Login</button></h5>}
      </div>
    </div>
  )
}

export default Login
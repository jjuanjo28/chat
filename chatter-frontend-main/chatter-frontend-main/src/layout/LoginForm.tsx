import Field from '../components/Home/Field';
import React, { useState, useEffect } from 'react';
import FormData from 'form-data';
import Link from 'next/link';
import { LoginData } from '../types/login';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginData, setUserData } from '../redux/userSlice';

function LoginForm() {
 
  const dispatch = useDispatch();
  const [token, setToken] = useState("null")
  

  useEffect(() => {
  axios.get('http://localhost:8080/users', {
   headers: {
         Authorization: `Baerer ${token}`
          }
    })
   .then(response =>{
   dispatch(setUserData({
     name: response.data.name,
     lastName: response.data.lastName,
     email: response.data.email,
     photo: response.data.image,
     userId: ''
   }))
   })
   .catch(error => {
    console.log(error)
   })
 }, [token])



  const initialValues: LoginData = {
    email: '',
    password: ''
  };


  const [formData, setFormData] = useState<LoginData>(initialValues);
  const data = new FormData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    
    data.append('email', formData.email);
    data.append('password', formData.password);
    let newData = JSON.stringify(formData)
    
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8080/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : newData
};

axios.request(config)

.then((response) => {
  console.log(response)
  localStorage.setItem("token", response.data.token)
  localStorage.setItem("userId", response.data.userId)
  dispatch(setLoginData({
    userId : response.data.userId,
    authToken: response.data.token
  }))
  setToken(response.data.token)
 
})
.catch((error) => {
  console.log(error);
});


resetForm();


//    ----------> CON FETCH <---------------------------------------------------------

// fetch("http://localhost:8080/login", 
//{method: "POST", headers: myHeaders, body: newData, redirect:"follow" })
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
    /* 
      TODO: 
      1. Check login
      2. Handle errors (if there is at least one) 
    */
  };

  const resetForm = () => {
    // data.delete('email');
    // data.delete('password');
  };

  return (
    <div
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
   
     <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />
      
      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Ingresar
        </button>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;

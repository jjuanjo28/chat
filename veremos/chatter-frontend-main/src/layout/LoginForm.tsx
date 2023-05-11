import Field from '../components/Home/Field';
import React, { useState, useEffect } from 'react';
import FormData from 'form-data';
import Link from 'next/link';
import { LoginData } from '../types/login';
import axios from 'axios';


let URI = "http://localhost:8080/login"

function LoginForm() {

  
 
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
    resetForm();
    
    data.append('email', formData.email);
    data.append('password', formData.password);
    const newData = JSON.stringify(formData)
    console.log(newData)
    
   // var myHeaders = new Headers();
    
  //  myHeaders.append("Content-Type", "application/json");

    // const requestOptions = {
    //   method: 'POST',
    //   maxBodyLength: Infinity,
    //   headers: myHeaders,
    //   data : newData
    // };

//  fetch(URI, requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
    
// INTENTO CON AXIOS NO FUNCIONA

    const requestOptions = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : newData
    };
    axios.request(requestOptions) 
   
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (!error.response) {
        console.log(error.response)
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
       
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

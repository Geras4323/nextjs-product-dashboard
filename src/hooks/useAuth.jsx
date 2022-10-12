import React from 'react';

import Cookie from 'js-cookie';
import axios from 'axios';

import endpoints from '../services/api';


function useAuth() {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function logIn(email, password) {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      }
    }
    const { data: access_token } = await axios.post(endpoints.auth.login, {email, password}, options);  // recibo un access token que está linkeado a ese usuario
    // console.log(access_token);
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 })

      axios.defaults.headers.common['Authorization'] = `Bearer ${Cookie.get('token')}`  // linkeo axios a ese access token
      const { data: user } = await axios.get(endpoints.auth.profile);   // hago el pedido a la API con ese access token, que dentro de la API tiene información de ese usuario porque ese access token se creó unicamente para los datos de ese usuario. Por eso la API sabe qué información devolver
      // console.log(user);
      setUser(user);
    }
  }

  async function logOut() {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/'
  }


  return {
    user,
    logIn,
    logOut,
    error,
    setError,
    loading,
    setLoading,
  }
}

export { useAuth };

/*
B - server, tomá estos datos (user, password)
S - ok, esos datos corresponden a un usuario, asi que te doy un access token linkeado a ese usuario
B - buneisimo, ahora toma de nuevo ese access token y dame el perfil al que corresponda
S - para ese access token tengo este usuario (user)
*/
import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const getData = async () => {
      const res = await axios.post(
        'https://reqres.in/api/login',
        JSON.stringify({
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const usersRes = await axios.get('https://reqres.in/api/unknown', {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
          'Content-Type': 'application/json',
        },
      });

      const users = usersRes.data.data;
      users && users.map((user) => console.log(user.name, '<----'));
    };

    getData();
  };

  return (
    <div>
      <div>
        <div>
          <h3>Hello there, Sign in to continue</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username/Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div></div>
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div></div>
              </div>
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));

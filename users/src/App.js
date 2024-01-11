import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)//true - по умолчанию загрузка страницы идет (то есть с самого открытия страница загружается)
  React.useEffect(()=>{
    //получаем ответ с бека; если ответ усаешный, то конвертим его в json
    fetch("https://reqres.in/api/users")
    .then(res=> res.json())
    .then(json =>{
      setUsers(json.data);
    }).catch(err=>{ 
      console.warn(err);
      alert ("Ошибка при получении данных пользователей")
    });
  }, [])
/* hbl */
  return (
    <div className="App">
      <Users items = {users} isLoading = {isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;

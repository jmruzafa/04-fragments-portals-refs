import React, { useState } from 'react';

import './App.css';
import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UserList';

function App() {
  const [usersList, setUserList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUserList((prevUserList) => {
      //add new user to existing list 
      //spread operator
      return [...prevUserList, {id: Math.random().toString(), name: uName, age: uAge }];
    });

  };
  // '<>' will return no div so we will avoid "div soup" but project setup has to support it
  //We can also use <React.Fragment>
  return (
    <> 
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList}/>
    </>
  );
}

export default App;

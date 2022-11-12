import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [UserId, setUserId] = useState('');
  const [UserName, setUserName] = useState('');
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');

  const [UserList, setUserList] = useState([]);

  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    Axios.get('https://localhost:3002/api/get').then((response) => {
      setUserList(response.data)
    })
  },[])

  const submitUser = () => {
    Axios.post('https://localhost:3002/api/insert', {
      UserId: UserId,
      UserName: UserName,
      UserEmail: UserEmail,
      UserPassword: UserPassword
    });

    setUserList([
      ...UserList, {
        UserId: UserId,
        UserName: UserName,
        UserEmail: UserEmail,
        UserPassword: UserPassword
      },
    ]);
  };

  const deleteUser = (UserName) => {
    Axios.delete(`http://localhost:3002/api/delete/${UserName}`);
  };

  const updateUser = (UserName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      UserId: UserId,
      UserName: newUserName,
      UserEmail: UserEmail,
      UserPassword: UserPassword
    });
    setNewUserName("")
  };

  return (
    <div className="App">
      <h1>411 Project 1 Stage 4 CRUD Implementation</h1>

      <div className = "form">
        <label>Id: </label>
        <input type = "text" name = "UserId" onChange={(e) => {setUserId(e.target.value)}}></input>
        <label>Name: </label>
        <input type = "text" name = "UserName" onChange={(e) => {setUserName(e.target.value)}}></input>
        <label>Email: </label>
        <input type = "text" name = "UserEmail" onChange={(e) => {setUserEmail(e.target.value)}}></input>
        <label>Password: </label>
        <input type = "text" name = "UserPassword" onChange={(e) => {setUserPassword(e.target.value)}}></input>

        <button onClick={submitUser}>Submit</button>

        {UserList.map((val) => {
          return (
            <div className = "card">
              <h1> UserName: {val.UserName} </h1>
              <p> UserEmail: {val.UserEmail}</p>
              <button onClick={() => { deleteUser(val.UserName) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewUserName(e.target.value)
              } }/>
              <button onClick={() => {
                updateUser(val.UserName)
              }}> Update</button>
              </div>
          );
          
          ;
        })}

      </div>
    </div>
  );
}

export default App;

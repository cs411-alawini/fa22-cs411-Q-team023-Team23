import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [insertuserName, setInsertUserName] = useState('');
  const [insertuserPassword, setInsertUserPassword] = useState('');
  const [insertuserEmail, setInsertUserEmail] = useState('');
  const [insertuserId, setInsertUserId] = useState('');
  const [deleteuserId, setDeleteUserId] = useState('');
  const [updateuserName, setUpdateUserName] = useState('');
  const [updateuserPassword, setUpdateUserPassword] = useState('');
  const [searchuserName, setSearchUserName] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [userList, setUserList] = useState([]);




  const submitInsert = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      insertuserId: insertuserId,
      insertuserName: insertuserName,
      insertuserPassword: insertuserPassword,
      insertuserEmail: insertuserEmail
    });
  };

  const submitDelete = () => { 
    Axios.post(`http://localhost:3002/api/delete/${deleteuserId}`, {
      deleteuserId: deleteuserId
    });
  };

  const submitUpdate = () => { 
    Axios.put(`http://localhost:3002/api/update`, {
      updateuserName: updateuserName,
      updateuserPassword: updateuserPassword,
    });
  };

  const submitSearch = () => {
    Axios.get('http://localhost:3002/api/search/keyword?keyword=' + searchuserName).then((response) => {
      if (response.data.length != 0) {
        setUserList(response.data);
        setSearchResult('Here is your result!\n');
      } else {
        setSearchResult('No records according to your conditions!\n');
      }
    }) 
  };

  const overallSearch = () => {
    Axios.get('http://localhost:3002/api/search/all').then((response) => {
      setUserList(response.data)
    });
  };


  return ( 
        <div className="form">
        <h1>CS411 CURD Functions</h1>

        {/* Insert */}
        <label> Insert </label>
        <label> UserId: </label>
        <input type="text" name="userId1" onChange={(e) => {
          setInsertUserId(e.target.value)
        }}/>
        <label> UserName: </label>
        <input type="text" name="userName1" onChange={(e) => {
          setInsertUserName(e.target.value)
        }}/>
        <label> UserPassword:</label>
        <input type="text" name="userPassword1" onChange={(e) => {
          setInsertUserPassword(e.target.value)
        }}/>
        <label> UserEmail:</label>
        <input type="text" name="userEmail1" onChange={(e) => {
          setInsertUserEmail(e.target.value)
        }}/>
        <button onClick={submitInsert}> Submit Insert</button>
        
        {/* Delete */}
        <br></br><label> Delete </label>
        <label> UserId: </label>
        <input type="text" name="userId4" onChange={(e) => {
          setDeleteUserId(e.target.value)
        }}/>
        <button onClick={submitDelete}> Submit Delete</button>

        {/* Update */}
        <br></br><label> Update </label>
        <label> UserName: </label>
        <input type="text" name="userName3" onChange={(e) => {
          setUpdateUserName(e.target.value)
        }}/>
        <label> UserPassword:</label>
        <input type="text" name="userPassword3" onChange={(e) => {
          setUpdateUserPassword(e.target.value)
        }}/>
        <button onClick={submitUpdate}> Submit Update</button>

        {/* Search */}
        <br></br><label> Search </label>
        <label> UserName: </label>
        <input type="text" name="userName2" onChange={(e) => {
          setSearchUserName(e.target.value)
        }}/>
        <button onClick={submitSearch}> Submit Search</button>

        <div>{searchResult}</div>
        {userList.map((val, key) => {
          return (
          <div className='SearchResult'> 
            <h3>UserId: {val.UserId}</h3> 
            <h3>UserName: {val.UserName}</h3>
            <h3>UserEmail: {val.UserEmail}</h3> 
            <h3>UserPassword: {val.UserPassword}</h3> 
          </div>
          );
        })}

        </div> )
}

export default App;
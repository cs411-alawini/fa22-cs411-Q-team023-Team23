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

  const [advance1Result, setadvance1Result] = useState('');
  const [advance1List, setadvance1List] = useState([]);

  const [advance2Result, setadvance2Result] = useState('');
  const [advance2List, setadvance2List] = useState([]);


  useEffect(() => {
    Axios.get('https://localhost:3002/api/get').then((response) => {
      setUserList(response.data)
    })
  },[])

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
    Axios.post('http://localhost:3002/api/search', {
      searchuserName: searchuserName
    }).then((response) => {
      if (response.data.length > 0) {
        setUserList(response.data);
        setSearchResult('Here is your result!\n');
      } else {
        setSearchResult('No records according to your conditions!\n');
      }
    });
  };

  const submitAdvance1 = () => {
    Axios.post('http://localhost:3002/api/advance1', {
    }).then((response) => {
      if (response.data.length > 0) {
        setadvance1List(response.data);
        setadvance1Result('Here is your result!\n');
      } else {
        setadvance1Result('No records according to your conditions!\n');
      }
    });
  };

  const submitAdvance2 = () => {
    Axios.post('http://localhost:3002/api/advance2', {
    }).then((response) => {
      if (response.data.length > 0) {
        setadvance2List(response.data);
        setadvance2Result('Here is your result!\n');
      } else {
        setadvance2Result('No records according to your conditions!\n');
      }
    });
  };


  // const overallSearch = () => {
  //   Axios.get('http://localhost:3002/api/search/all').then((response) => {
  //     setUserList(response.data)
  //   });
  // };


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
        {userList.map((val) => {
          return (
          <div className='SearchResult'>  
            <h3>UserId: {val.UserId}</h3> 
            <h3>UserName: {val.UserName}</h3>
            <h3>UserEmail: {val.UserEmail}</h3> 
            <h3>UserPassword: {val.UserPassword}</h3> 
          </div>
          );
        })}

        {/* AD 1 */}
        <br></br><label> AD 1 </label>
        <button onClick={submitAdvance1}> Submit Advance1 </button>
        <div>{advance1Result}</div>
        {advance1List.map((val) => {
          return (
          <div className='Advance2Result'> 
            <h3>TypeName: {val.TypeName}</h3> 
            <h3>PokemonName: {val.PokemonName}</h3>
            <h3>Attack: {val.Attack}</h3> 
            <h3>AvgAttack: {val.AvgAttack}</h3> 
            <h3>Defense: {val.Defense}</h3> 
            <h3>AvgDefense: {val.AvgDefense}</h3> 
          </div>
          );
        })}

        {/* AD 2 */}
        <br></br><label> AD 2 </label>
        <button onClick={submitAdvance2}> Submit Advance2 </button>
        <div>{advance2Result}</div>
        {advance2List.map((val) => {
          return (
          <div className='Advance2Result'> 
            <h3>PokemonName: {val.PokemonName}</h3> 
            <h3>FirstTypeName: {val.FirstTypeName}</h3>
            <h3>SecondTypeName: {val.SecondTypeName}</h3> 
            <h3>Hp: {val.Hp}</h3> 
            <h3>Attack: {val.Attack}</h3> 
            <h3>Defense: {val.Defense}</h3> 
            <h3>SpecialAttack: {val.SpecialAttack}</h3> 
            <h3>SpecialDefense: {val.SpecialDefense}</h3> 
            <h3>Speed: {val.Speed}</h3> 
            <h3>Generation: {val.Generation}</h3> 
          </div>
          );
        })}

        </div> )
}

export default App;
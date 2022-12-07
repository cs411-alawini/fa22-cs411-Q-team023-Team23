import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  // CRUD User Table
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
  ////////////////////////////////////////////////////////////////////////////
  // Search Pokemon Table
  const [searchpokemonName, setSearchPokemonName] = useState('');
  const [searchpokemonResult, setSearchPokemonResult] = useState('');
  const [pokemonList, setPokemonList] = useState([]);

  // Add new Pokemon
  const [insertPokemonId, setInsertPokemonId] = useState('');
  const [insertPokemonName, setInsertPokemonName] = useState('');
  const [insertPokemonGeneration, setInsertPokemonGeneration] = useState('');
  const [insertPokemonHeight, setInsertPokemonHeight] = useState('');
  const [insertPokemonWeight, setInsertPokemonWeight] = useState('');

  const [insertPokemonTotal, setInsertPokemonTotal] = useState('');
  const [insertPokemonHp, setInsertPokemonHp] = useState('');
  const [insertPokemonAttack, setInsertPokemonAttack] = useState('');
  const [insertPokemonDefense, setInsertPokemonDefense] = useState('');
  const [insertPokemonSpeAttack, setInsertPokemonSpeAttack] = useState('');

  const [insertPokemonSpeDefense, setInsertPokemonSpeDefense] = useState('');
  const [insertPokemonSpeed, setInsertPokemonSpeed] = useState('');
  const [insertPokemonFirstTypeId, setInsertPokemonFirstTypeId] = useState('');
  const [insertPokemonSecondTypeId, setInsertPokemonSecondTypeId] = useState('');

  // Search Pokemon by Types
  const [searchtype1Name, setSearchType1Name] = useState('');
  const [searchtype2Name, setSearchType2Name] = useState('');
  const [searchpokemontypeResult, setSearchPokemonTypeResult] = useState('');
  const [pokemontypeList, setPokemonTypeList] = useState([]);

  // AD1
  const [advance1Result, setadvance1Result] = useState('');
  const [advance1List, setadvance1List] = useState([]);

  // AD2
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

  const submitPokemonInsert = () => { 
    Axios.post('http://localhost:3002/api/pokemoninsert', {
      insertPokemonId: insertPokemonId,
      insertPokemonName: insertPokemonName,
      insertPokemonGeneration: insertPokemonGeneration,
      insertPokemonHeight: insertPokemonHeight,
      insertPokemonWeight: insertPokemonWeight,

      insertPokemonTotal: insertPokemonTotal,
      insertPokemonHp: insertPokemonHp,
      insertPokemonAttack: insertPokemonAttack,
      insertPokemonDefense: insertPokemonDefense,
      insertPokemonSpeAttack: insertPokemonSpeAttack,

      insertPokemonSpeDefense: insertPokemonSpeDefense,
      insertPokemonSpeed: insertPokemonSpeed,
      insertPokemonFirstTypeId: insertPokemonFirstTypeId,
      insertPokemonSecondTypeId: insertPokemonSecondTypeId
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
////////////////////////////////////////////////////////////////////////////
  const submitPokemonSearch = () => {
    // console.log("666");
    Axios.post('http://localhost:3002/api/pokemonsearch', {
      searchpokemonName: searchpokemonName
    }).then((response) => {
      if (response.data.length > 0) {
        setPokemonList(response.data);
        setSearchPokemonResult('Here is your result!\n');
      } else {
        setSearchPokemonResult('No records according to your conditions!\n');
      }
    });
  };
////////////////////////////////////////////////////////////////////////////
  const submitPokemonTypeSearch = () => {
    // console.log("666");
    Axios.post('http://localhost:3002/api/pokemontypesearch', {
      searchtype1Name: searchtype1Name,
      searchtype2Name: searchtype2Name
    }).then((response) => {
      console.log(response.data);
      if (response.data[1].length > 0) {
        setPokemonTypeList(response.data[1]);
        setSearchPokemonTypeResult('Here is your result!\n');
      } else {
        setSearchPokemonTypeResult('No records according to your conditions!\n');
      }
    });
  };

  const submitAdvance1 = () => {
    // console.log("666");
    Axios.post('http://localhost:3002/api/advance1search', {
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
    // console.log("666");
    Axios.post('http://localhost:3002/api/advance2search', {
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
        <h1>CS411 Pokebook</h1>

        <h2 class="headertekst">USER CURD</h2>
        {/* Insert */}
        <br></br><label> Insert </label>
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
        <br></br><label><h2>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</h2></label>

        <h2 class="headertekst">Pokemon</h2>
        {/* PokemonSearch */}
        <br></br><label><h2>Search Pokemon</h2> </label>
        <br></br><label> PokemonName: </label>
        <input type="text" name="PokemonName2" onChange={(e) => {
          setSearchPokemonName(e.target.value)
        }}/>
        <button onClick={submitPokemonSearch}> Submit Search</button>

        <div>{searchpokemonResult}</div>
        {pokemonList.map((val) => {
          return (
          <div className='SearchResult'>  
            <h3>PokemonId: {val.PokemonId}</h3> 
            <h3>PokemonName: {val.PokemonName}</h3>
            <h3>Type1: {val.FirstTypeName}</h3> 
            <h3>Type2: {val.SecondTypeName}</h3> 
            <h3>Generation: {val.Generation}</h3> 
          </div>
          );
        })}

        {/* PokemonTypeSearch */}
        <br></br><label><h2>Search by Type</h2> </label>
        <br></br><label> TypeName1: </label>
        <input type="text" name="PokemonTypeName1" onChange={(e) => {
          setSearchType1Name(e.target.value)
        }}/>
        <br></br><label> TypeName2: </label>
        <input type="text" name="PokemonTypeName2" onChange={(e) => {
          setSearchType2Name(e.target.value)
        }}/>
        <button onClick={submitPokemonTypeSearch}> Submit Search</button>

        <div>{searchpokemontypeResult}</div>
        {pokemontypeList.map((val) => {
          return (
          <div className='SearchResult'>  
            <h3>Id: {val.PokemonId}</h3> 
            <h3>Name: {val.PokemonName}</h3>
            <h3>Generation: {val.Generation}</h3> 
            <h3>TypeName1: {val.FirstType}</h3> 
            <h3>TypeName2: {val.SecondType}</h3> 
            <h3>RestraintName: {val.TheRestraintName}</h3> 
            <h3>GenerationStatus: {val.GenerationStatus}</h3> 
            <br></br>
          </div>
          );
        })}

        {/* PokemonInsert */}
        {/* 1 */}
        <label><h2> Insert Pokemon </h2></label>
        <br></br><label> Id: </label>
        <input type="text" name="PokemonId1" onChange={(e) => {
          setInsertPokemonId(e.target.value)
        }}/>
        <br></br><label> Name: </label>
        <input type="text" name="PokemonName1" onChange={(e) => {
          setInsertPokemonName(e.target.value)
        }}/>
        <br></br><label> Generation:</label>
        <input type="text" name="PokemonGeneration1" onChange={(e) => {
          setInsertPokemonGeneration(e.target.value)
        }}/>
        <br></br><label> Height:</label>
        <input type="text" name="PokemonHeight1" onChange={(e) => {
          setInsertPokemonHeight(e.target.value)
        }}/>
        <br></br><label> Weight:</label>
        <input type="text" name="PokemonWeight1" onChange={(e) => {
          setInsertPokemonWeight(e.target.value)
        }}/>
        {/* 2 */}
        <br></br><label> Total:</label>
        <input type="text" name="PokemonTotal1" onChange={(e) => {
          setInsertPokemonTotal(e.target.value)
        }}/>
        <br></br><label> Hp: </label>
        <input type="text" name="PokemonHp1" onChange={(e) => {
          setInsertPokemonHp(e.target.value)
        }}/>
        <br></br><label> Attack:</label>
        <input type="text" name="PokemonAttack1" onChange={(e) => {
          setInsertPokemonAttack(e.target.value)
        }}/>
        <br></br><label> Defense:</label>
        <input type="text" name="PokemonDefense1" onChange={(e) => {
          setInsertPokemonDefense(e.target.value)
        }}/>
        <br></br><label> SpeAttack:</label>
        <input type="text" name="PokemonSpeAttack1" onChange={(e) => {
          setInsertPokemonSpeAttack(e.target.value)
        }}/>
        {/* 3 */}
        <br></br><label> SpeDefense:</label>
        <input type="text" name="PokemonSpeDefense" onChange={(e) => {
          setInsertPokemonSpeDefense(e.target.value)
        }}/>
        <br></br><label> Speed: </label>
        <input type="text" name="PokemonSpeed1" onChange={(e) => {
          setInsertPokemonSpeed(e.target.value)
        }}/>
        <br></br><label> TypeId1:</label>
        <input type="text" name="PokemonFirstTypeId1" onChange={(e) => {
          setInsertPokemonFirstTypeId(e.target.value)
        }}/>
        <br></br><label> TypeId2:</label>
        <input type="text" name="PokemonSecondTypeId" onChange={(e) => {
          setInsertPokemonSecondTypeId(e.target.value)
        }}/>

        <button onClick={submitPokemonInsert}> Submit PokemonInsert</button>

        {/* AD 1 */}
        <br></br>
        <br></br><label><h3>AD 1</h3>  </label>
        <button onClick={submitAdvance1}> Submit Advance1 </button>

        <div>{advance1Result}</div>
        {advance1List.map((val) => {
          return (
          <div className='Advance1Result'> 
            <h3>FirstType: {val.TypeName}</h3> 
            <h3>PokemonName: {val.PokemonName}</h3>
            <h3>Attack: {val.Attack}</h3> 
            <h3>AvgAttack: {val.AvgAttack}</h3> 
            <h3>Defense: {val.Defense}</h3> 
            <h3>AvgDefense: {val.AvgDefense}</h3> 
            <br></br>
          </div>
          );
        })}

        {/* AD 2 */}
        <br></br>
        <br></br><label><h3>AD 2</h3>  </label>
        <button onClick={submitAdvance2}> Submit Advance2 </button>

        <div>{advance2Result}</div>
        {advance2List.map((val) => {
          return (
          <div className='Advance2Result'> 
            <h3>PokemonName: {val.PokemonName}</h3> 
            <h3>FirstType: {val.FirstTypeName}</h3>
            <h3>SecondType: {val.SecondTypeName}</h3> 
            <h3>Hp: {val.Hp}</h3> 
            <h3>Attack: {val.Attack}</h3> 
            <h3>Defense: {val.Defense}</h3> 
            <h3>SpecialAttack: {val.SpecialAttack}</h3> 
            <h3>SpecialDefense: {val.SpecialDefense}</h3> 
            <h3>Speed: {val.Speed}</h3> 
            <h3>Generation: {val.Generation}</h3> 
            <br></br>
          </div>
          );
        })}

        </div> )
}

export default App;

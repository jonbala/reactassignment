import React, { useEffect, useState } from "react";
import { User } from "./components/User/User";
import { AddUser } from "./components/AddUser/AddUser";
import './styles.css';
import Main from "./Main";

 const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (name, email, street, company) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        street: street,
        company: company
      }),
      
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((error) => console.log(error));
  };


  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
	 	<Main/>
		<div className="mainText">
			<h1>Users</h1>
		</div>
      		<AddUser onAdd={onAdd} />
      			{users.map((user) => (
        		<User
          			id={user.id}
         			  key={user.id}
          			name={user.name}
          			email={user.email}
                street={user.street}
                company={user.company}
          			onDelete={onDelete}
        		/>
     		 ))}
    </div>
  );
}

export default App;
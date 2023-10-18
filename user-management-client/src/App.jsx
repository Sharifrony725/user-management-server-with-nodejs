import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUsers(data))

  }, [])

  const handleAddUser = event =>{
    event.preventDefault();
    const form  = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("inside post response", data);
      const newUsers = [...users, data];
      setUsers(newUsers);
      form.reset();
    });
  }

  return (
    <>
      <h2>User Management System</h2>
      <h3>Numbers of Users: {users.length}</h3>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /> <br />
        <br />
        <input type="text" name="email" /> <br />
        <br />
        <button>Submit</button>
      </form>

      {users.map((user) => (
        <p key={user.id}>
          {user.id} {user.name} {user.email}
        </p>
      ))}
    </>
  );
}

export default App

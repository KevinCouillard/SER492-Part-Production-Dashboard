import { useState } from "react";
import Axios from "axios";

function Users() {
  const url = "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isManager, setIsManager] = useState("");
  const [userList, setUserList] = useState([]);

  const getUsers = () => {
    Axios.get(url + "/user")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const addUser = () => {
    Axios.post(url + "/user", {
      email: email,
      password: password,
      isManager: isManager,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const deleteUsers = (id) => {
    Axios.delete(url + "/user/" + id)
      .then((response) => {
        const newUserList = userList.filter((item) => item.id !== id);
        setUserList(newUserList);
        getUsers();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="user">
      <div className="email">
        <label>Email: </label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="password">
        <label>Password: </label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div className="isManager">
        <label>IsManager: </label>
        <input
          type="text"
          onChange={(event) => {
            setIsManager(event.target.value);
          }}
        />
      </div>
      <button onClick={getUsers}>Get User</button>
      <button onClick={addUser}>Add User</button>

      {userList.map((val, key) => {
        return (
          <div className="user-display">
            <h3>Email: {val.email}</h3>
            <h3>Password: {val.password}</h3>
            <h3>IsManager: {val.isManager}</h3>
            <button onClick={() => deleteUsers(val.user_id)}>
              Delete User
            </button>
            <br />
          </div>
        );
      })}
    </div>
  );
}
export default Users;

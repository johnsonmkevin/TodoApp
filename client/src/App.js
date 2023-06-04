import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [tasks, setTasks] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
      if (response.status === 200) {
				console.log("Worked");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(authToken){
      getData();
    }
  }, []); //this allows our getData function to not keep running



  //sort by date
  //compare  dates sort method returns a new array

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {authToken ? (
        <>
          <ListHeader listName={"To Do List📝"} getData={getData} />
          <p>Hello! {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;

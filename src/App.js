import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
      return JSON.parse(lists);
    }
    else
      return [];
  }

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData())

  //adding items to list
  const addItem = () => {
    if (!inputData) {
      alert("please enter the data")
    }
    else {
      const myNewData = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      setItems([...items, myNewData]);
      setInputData("");
    }
  }

  //deleting items from list
  const deleteItem = (index) => {

    const updatedItems = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItems);

  }

  //removing all items
  const removeAll = () => {
    setItems([]);
  }

  //using local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items])

  return (
    <div className="App">
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="https://th.bing.com/th/id/R.88f91f9534addee8dba2faebfe476d87?rik=TvalQitLDVvEwA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-N4qh2cl3o74%2fT4h6JMlea2I%2fAAAAAAAABjc%2fqp0k7dqntys%2fs1600%2fchecklist%2b2.JPG&ehk=fnpN6dMIRU6WF1vfnDl7UOMQRrVdq4GdnGfjEfNmWP8%3d&risl=&pid=ImgRaw&r=0" alt="todoLogo" />
            <figcaption>add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input placeholder="add items ✍" type='text' className='form-control'
              value={inputData} onChange={(e) => setInputData(e.target.value)} />
            <i className="fa fa-plus" onClick={addItem}></i>
          </div>

          <div className="showItems">

            {items.map((currElem) => {
              return (<div className="eachItem" key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className="todo-btn">
                  <i className="far fa-edit add-btn"></i>
                  <i class="fa-solid fa-trash-alt" onClick={() => deleteItem(currElem.id)}></i>
                </div>
              </div>)
            })}


          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeAll}><span>check all</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

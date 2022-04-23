// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

function App() {
  const [formState, setFormState] = useState({"name":"","email":"","message":""});

  const handleChange = e =>{ 
    setFormState({ ...formState, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/",{
      method : "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    }).then(() =>{
      alert("success");
    })
    .catch(error => alert(error));
  }
  let {name,email,message} = formState;
  return (
    <div className="App">
      <header className="App-header">
       <form
        onSubmit={handleSubmit}
       >
         <label>Name</label><br/>
         <input name="name" type="text" value={name} onChange={handleChange} required/><br/>
         <label>Email</label><br/>
         <input name="email" type="email" value={email} onChange={handleChange} required/><br/>
         <label>Message</label><br/>
         <textarea name="message"  value={message} onChange={handleChange} required/><br/>
         <button type="button">Send Message</button>
       </form>
      </header>
    </div>
  );
}

export default App;

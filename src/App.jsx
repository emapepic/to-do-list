import {useState} from 'react';
import Header from './components/Header.jsx';
import InputFields from './components/InputFields.jsx';

function App() {
  const [showInputFields, setShowInputFields] = useState(false);
  function addTask() {
    setShowInputFields(true);
  }

  return (
    <>
      <Header/>
      {showInputFields && <InputFields/>}
      <button onClick={addTask}>Add</button>
    </>
  )
}

export default App

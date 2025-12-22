export default function InputFields({addTask, inputValue, setInput}) {
  const handleEnter = (e) => {
    if(e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className='input-container'>
      {/* da bi uzeli vrijednost iz polja moramo je staviti u value pomocu funkcije koju stavljamo u onChange */}
      <input type="text" value={inputValue} onChange={setInput} onKeyDown={handleEnter} />
      <button onClick={addTask}>Save</button>
    </div>
  );
}
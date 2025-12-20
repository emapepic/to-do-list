export default function InputFields({showTask, inputValue, setInput}) {
  const handleEnter = (e) => {
    if(e.key === "Enter") {
      showTask();
    }
  }

  return (
    <div className='input-container'>
      {/* da bi uzeli vrijednost iz polja moramo je staviti u value pomocu funkcije koju stavljamo u onChange */}
      <input type="text" value={inputValue} onChange={setInput} onKeyDown={handleEnter} />
      <button onClick={showTask}>Save</button>
    </div>
  );
}
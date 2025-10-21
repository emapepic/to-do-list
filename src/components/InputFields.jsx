export default function InputFields({showTask, inputValue, setInput}) {
    return (
      <div className='input-container'>
        {/* da bi uzeli vrijednost iz polja moramo je staviti u value pomocu funkcije koju stavljamo u onChange */}
        <input type="text" value={inputValue} onChange={setInput} />
        <button onClick={showTask}>Save</button>
      </div>
    );
}
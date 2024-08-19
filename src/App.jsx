import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [Length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumberAllowed) {
      str += "0123456789";
    }
    if (CharacterAllowed) {
      str += "!@#$%^&*()-+=[]{}";
    }
    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [Length, NumberAllowed, CharacterAllowed]);

  const passwordRef = useRef(null);

  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [Length, NumberAllowed, CharacterAllowed, passwordGenerator]);

  return (
    <>
      <div className="box1">
        <h1>Password Generator</h1>
        <div className="box2">
          <input
            type="text"
            value={Password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="btn" onClick={copyPasswordClipboard}>Copy</button>
        </div>
        <div className="box3">
          <input
            type="range"
            min={8}
            max={100}
            value={Length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {Length}</label>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={NumberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={CharacterAllowed}
              id="charInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

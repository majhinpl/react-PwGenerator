import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberallowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(false);

  // use useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "JqxkLwEzXpTbUhCsRvYiQ";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPwdToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange();

    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();

  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white mb-4">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input type="text" 
          value={password} 
          placeholder='password' 
          readOnly
          ref={passwordRef}
          className='outline-none w-full py-1 px-3'
          />

          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPwdToClipboard}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
          </div>

          <label htmlFor="length">Length: {length}</label>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberallowed((prev) => !prev)
            }}            
            className="cursor-pointer"
            />
          </div>

          <label htmlFor="length">Numbers</label>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id="charecterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}            
            className="cursor-pointer"
            />
          </div>

          <label htmlFor="length">Charecters</label>
          
        </div>

        
      </div>
    </>
  )
}

export default App

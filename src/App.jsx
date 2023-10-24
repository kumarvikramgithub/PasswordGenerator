
import { useState, useCallback, useEffect, useRef } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
function App() {
  const [length, setLength]=useState(8);
  const [numberAllowed, setNumberAllowd] = useState(false);
  const [charAllowed, setCharAllowd] = useState(false);
  const [password, setPassword]  =useState("");
  const [isCoppied, setIsCoppied] = useState(false);

  // use ref hook
  const passwordRef = useRef(null);
  const copyPasswordToClipboard = ()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(
      passwordRef.current?.value.substring(0, length)
    );
    setIsCoppied(true);
    setTimeout(() => {
      setIsCoppied(false);
    }, 2000);
  }
  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
      if(numberAllowed) str +="0123456789";
      if(charAllowed) str += "!@#$%^&*-_+=/~`";
      for (let index = 1; index <= length; index++) {
        let charAt = Math.random()*str.length+1;
        pass += str.charAt(charAt);
        
      }
      setPassword(pass);
    },
    [length, numberAllowed, charAllowed],
  )
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="bg-black h-screen py-10 w-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-semibold text-red-600">
        Password Generator
      </h1>

      <div className="mt-10 bg-slate-700 p-8  flex flex-col justify-center items-center rounded-md shadow-lg">
        <div className=" w-full flex justify-center">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none py-1 px-3 w-full shadow-md rounded-s-md"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 rounded-e-md"
            onClick={copyPasswordToClipboard}
          >
            {isCoppied?<IoCheckmarkDoneSharp
              className=" text-slate-100"
              size={20}
            />:'Copy'}
            
          </button>
        </div>
        <div className=" w-full flex justify-center mt-5">
          <input
            type="range"
            value={length}
            min={6}
            max={35}
            className="outline-none py-1"
            onChange={(e) => setLength(e.target.value)}
            id="length"
          />
          <label
            htmlFor="length"
            className="text-lg font-semibold text-slate-100 mx-2"
          >
            Length: {length}
          </label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            className="outline-none py-1 px-3 mx-2"
            onChange={() => setNumberAllowd((prev) => !prev)}
            id="number"
          />
          <label
            htmlFor="number"
            className="text-lg font-semibold text-slate-100 mx-2"
          >
            Number allowed
          </label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            className="outline-none py-1 px-3"
            onChange={() => setCharAllowd((prev) => !prev)}
            id="chars"
          />
          <label
            htmlFor="chars"
            className="text-lg font-semibold text-slate-100 mx-2"
          >
            Characters Allowed
          </label>
        </div>
      </div>
    </div>
  );
}

export default App

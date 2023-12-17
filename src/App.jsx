import { useState, useEffect, useCallback, useRef } from "react"

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%&*/=+{}[]()-_><|";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);

    }
    setpassword(pass);
  }, [length, characterAllowed, numberAllowed, setpassword]);

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, characterAllowed, setpassword]);
  const copyPasswordtoClipboard = useCallback(() => {
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.write(password);
         
  }, [password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8  text-orange-500 bg-gray-800">
        < h1 className="text-white my-3 text-center text-lg" > passwordGenerator</h1>
        <div className="flex shadow rounded-lg  overflow-hidden mb-10">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button onClick={copyPasswordtoClipboard} className="outline-none bg-blue-800 text-yellow-100 px-3 text-center  shrink-0"> copy</button>
        </div>

        <div className="flex text-sm  gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={8}
              max={100}
              value={length}
              className="curcor-pointer"
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label >Length:{length}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => { setnumberAllowed((prev) => !prev); }} />
            <label >Number</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id="characterInput"
              onChange={() => { setcharacterAllowed((prev) => !prev); }} />
            <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

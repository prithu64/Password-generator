import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  
  const [len,setLength] = useState(8);
  const [numAllowed,setNumber] = useState(false);
  const [charAllowed,setCharacter] = useState(false);
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
     let pass = ""
     let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
     if(numAllowed) str += "0123456789"
     if(charAllowed) str += "!@#&%*+-_"

     for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass +=str.charAt(char)
     }
    setPassword(pass)

  },[len, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
      PasswordGenerator()
  },[len, numAllowed, charAllowed, PasswordGenerator])

  return (
    <>
      <div className='flex items-center flex-col justify-center h-screen '>

       <h1 className='text-3xl mb-4'>Password Generator</h1>

       <div className=' flex max-w-md w-full  flex-col px-4'>
              
              {/*input and copy */}
             <div id='input div' className='flex mb-3 w-full rounded-lg overflow-hidden border border-zinc-500'>
                <input placeholder='Password' className='py-2 px-3 outline-none border-r border-zinc-500 flex-1 shadow-md' readOnly value={password} type='text' ref={passwordRef}/>
                <button className=' text-center py-2 px-4 hover:bg-blue-300 hover:text-black  bg-blue-600 text-white outline-none cursor-pointer ease-in-out duration-300' onClick={copyPasswordToClipboard}>Copy</button>
             </div>
             
             {/*slider and options div*/}
             <div  id='password customization div' className='flex items-center gap-x-4 mx-auto text-xs '>
                 {/*slider and length*/}
                 <div id='slider div' className='gap-2 flex items-center '>
                    <input type='range' min={6} max={18} value={len} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
                    <label>Length : {len}</label>
                 </div>
                 {/*number options*/}
                 <div className='flex gap-2 items-center' id='number div' >
                   <input type='checkbox' defaultChecked={numAllowed} className='cursor-pointer' onChange={()=>{setNumber((prev)=>(!prev));}}/>
                   <label>Numbers</label>
                 </div>
                 {/*character options*/}
                  <div className='flex gap-2 items-center'  id='character div' >
                   <input type='checkbox' defaultChecked={charAllowed} className='cursor-pointer' onChange={()=>{setCharacter((prev)=>(!prev));}}/>
                   <label>Characters</label>
                 </div>
             </div>

       </div>

      </div>
    </>
  )
}

export default App

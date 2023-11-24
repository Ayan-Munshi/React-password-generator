import  { useState,useCallback, useEffect, useRef} from 'react'   //5:0:0
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  
  const[length,setlength] = useState(8)
  const[password,setpassword] = useState("")
  const[addchar,setaddchar] = useState(false)
  const[addnum,setaddnum] = useState(false)

  const passwordref = useRef(null)  // we are useing useref() hook here to colour deeply the copied portion whenever we copy our password by using our copy button  
  
  const passwordgenerator = useCallback(function(){
    let passwrd = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkjmnopqrstuvwxyz" 

    if(addnum){
       str = str + "1234567890"
    }
    if(addchar){
       str = str + '%()[]{}-_$%^&*!@#?<>'
    }
    for(let i = 1 ; i <= length ; i++){
      var char = Math.floor(Math.random() * str.length + 1)
      passwrd = passwrd + str.charAt(char)  // charAt is a function // passwrd + because we need to append str.charAt(str) 
    }
      setpassword(passwrd)

   } , [length,setpassword,addchar,addnum]) // dependancies

  
   useEffect(()=>{
     passwordgenerator()
  },[length,addchar,addnum,passwordgenerator])


   const copytoclipboard = useCallback(()=>{    // although we can write this like 
                                                //function copytoclipboard(){window.navigator.clipboard.writeText(password)}
                                                // but by using usecallback we can optimize this portion

        passwordref.current?.select()          // we are useing useref() hook here to colour deeply copied portion whenever we copy our password by using our copy button  

        passwordref.current?.setSelectionRange(0,5) // although the full password will be selected but only 0 t0 5 character will be deep coloured

        window.navigator.clipboard.writeText(password)  

   },[password])   // we couldnt use the dependency if we wanted

  return (
    <>
    {/* <div className='items-center justify-center flex w-full max-w-md mx-auto shadow-emerald-50 rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-500'> */}
  <div className=' flex flex-col items-center bg-gray-700  px-10 py-3  rounded-lg text-blue-500'>
    <h1 className='text-center mb-4 text-xl'>Password Generator</h1>
    <div className='flex rounded-lg overflow-hidden w-full'>
      <input 
        type="text" 
        value={password}
        className='outline-none w-80 py-1 px-5 bg-zinc-300 text-black'     //w-80 will increase the width of the input box 
        placeholder='password' readOnly 
        ref={passwordref}/>             {/* passing this input section as a referance to the passwordref = useref hook */}

      <button          // code the inner logic of copy button at the last
      onClick={copytoclipboard}
      className='bg-zinc-500 rounded-3xl'>copy</button>
    </div>

    <div className='flex gap-x-2 py-5  '>

          <input type="range"
           min={6} max={100} value={length}
           onChange={(e)=>{setlength(e.target.value)}}  // onchange like eventhandler always wants a function thats why setlength is in a func
            /> 
            <label>Length:{length}</label> <br />


          <input type="checkbox"
          defaultChecked = {addchar}
          onChange={()=>{setaddchar((prev) => !prev)}} // this will perform action on the previous value this is just callback function not usecallback
          /> 
          <label>Addcharacter</label> <br/>

          <input type="checkbox" 
          defaultChecked={addnum}
          onChange={()=>{setaddnum((prev) => !prev)}}/>
          <label>Addnumber</label>ihjkl
    </div>
  </div>
 </>
  )
}

export default App

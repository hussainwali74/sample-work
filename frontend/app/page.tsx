"use client"
import {
  BeakerIcon,
  BoltIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/solid";

import { useEffect, useState  } from "react";

export default function HomePage() {

  const [userInfo, setUserInfo ]  = useState([])

  useEffect(()=>{
    const getData = async ()=>{
      const query = await fetch('https://jsonplaceholder.typicode.com/users')
      const response = await query.json()

      console.log(response)
      setUserInfo(response)
    } 
    getData()
  },[])


  return (
    <div className="text-white flex flex-col items-center justify-center h-screen ">
      {
        userInfo && userInfo.length && userInfo.map((user:any,i)=>{
          return (
            <div key={i}>
              <h4 key={i}>{user.name}</h4>
            </div>
          )
        })
      }
      <h1 className="text-5xl font-bold mb-20">gpt tutor</h1>
      <div className="flex space-x-8 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText ">explain maths to me</p>
            <p className="infoText">explain computer to me</p>
            <p className="infoText">explain youtube to me</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BoltIcon className="h-8 w-8" />
            <h2>Math Questions</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">Grade 1 math question</p>
            <p className="infoText">Grade 2 math question</p>
            <p className="infoText">Grade 3 math question</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon */}
            <BeakerIcon className="h-8 w-8" />
            <h2>Explain Solution</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">explain Solution of the question to me</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState,useEffect } from "react";
import axios from "axios";

function Fetchapi(){

  const URL="https://jsonplaceholder.typicode.com/posts";

  const [data,setData]=useState([])
  const [userId,setId]=useState(0)
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const [postId,setPostId]=useState("")

  useEffect(()=>{
    console.log("mounting phase");
    getdata();
  },[])

  let getdata=async()=>{
    try{
    const response=await axios.get(URL)
    console.log(response.data)
    setData(response.data)
    }
    catch(error){
      console.log("error",{error})
    }
  }

  let deletepost=async(id)=>{
    try{
      const del=await axios.delete(`${URL}/${id}`)
      console.log(postdata)
      let postdata=[...data]
      postdata=postdata.filter((del)=>del.id !== id)
      setData(postdata)
    }
    catch(error){
      console.log("error",{error})
    }
  }

  let putdata=async()=>{
    try{
      const response=await axios.put(URL,{
        userId:userId,
        title:title,
        body:body
      })
      let newdata=[...data]
      newdata.push(response.data)
      setData(newdata)
      setId(0)
      setTitle("")
      setBody("")
    }
    catch(error){
      console.log("error",{error})
    }
  }

  let id;

  let postdata=async()=>{
    try{
      const pos=await axios.post((`${URL}/${postId}`),{
        userId:userId,
        title:title,
        body:body
      })
      console.log(pos)
      let newdata=[...data]
      let index=newdata.findIndex((data)=>data.id===id)
      newdata[index]={
        userId:userId,
        id:postId,
        title:title,
        body:body
      }
      setData(newdata)
      setId(0)
      setTitle("")
      setBody("")
    }
    catch(error){
      console.log("error",{error})
    }
  }

  const handleChange=({target:{name,value}})=>{
    if(name ==="userId") setId(value)
    if(name ==="title")  setTitle(value)
    if(name ==="body") setBody(value)
   }
   const handleSubmit=(event)=>{
      event.preventDefault();
      if(postId) putdata(postId)
      else postdata()
   }

  const copyForm=(id)=>{
    let newPost=data.filter((a)=>{
        return a.id === id
    })
    console.log(newPost[0].id)
    setId(newPost[0].userId)
    setTitle(newPost[0].title)
    setBody(newPost[0].body)
    setPostId(newPost[0].id)
    } 

  return(
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>userId </label>
          <input name="userid" type="number" value={userId} onChange={(event)=>{handleChange(event)}}></input>
        </div><br />
        <div>
        <label>Title </label>
          <input name="title" type="title" value={title} onChange={(event)=>{handleChange(event)}}></input>
        </div><br />
        <div>
        <label>Body </label>
          <textarea name="body" value={body} onChange={(event)=>{handleChange(event)}}></textarea>
        </div><br />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <table>
        <tr>
          <td>postId</td>
          <td>Title</td>
          <td>Body</td>
        </tr>
        {data.map((a)=>{
          return(
            <tr key={a.id}>
              <td>{a.userId}</td>
              <td>{a.title}</td>
              <td>{a.body}</td>
              <button onClick={()=>{copyForm(a.id)}}>Edit</button>
              <button onClick={()=>{deletepost(a.id)}}>Delete</button>
            </tr>
          )
        })}
      </table>
    </div>
    </>
  )
}

export default Fetchapi;
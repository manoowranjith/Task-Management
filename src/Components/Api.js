import axios from "axios";
import React from "react";
function Api()
{
    const [db, setDb] = React.useState("")
    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/start',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])
    const saveTaskDetails=JSON.stringify(
        {

            "taskId":"12211",

            "taskHolderName":"Gowthaman M",

            "taskDate":"4/15/2021",

            "taskName":"Spring Projects",

            "taskStatus":"In Progress"
        
        }, null, 2       
    )
    function saveTask()
    {
        axios({
            method: 'post',
            url: 'http://localhost:3001/saveTask',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                taskId:"12211",
                taskHolderName:"Gowthaman M",
                taskDate:"4/15/2021",
                taskName:"Spring Projects",
                taskStatus:"In Progress"
            })
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });
    }
    function changeStatus()
    {
          axios({
            method: 'get',
            url: 'http://localhost:3001/changeStatus?id=12211',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }
    function alltasks()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/alltask',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });      
    }
    function getTask()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/getTask?name=Manoowranjith',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }

    function deleteHouse()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/deleteHouse?id=12211',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }

    return(
        <div>
            <h1 className="title">Task Management</h1>
            
            <div className="request-call">
                <div>
                    <h2>Save a new Task</h2>
                    <p>POST - /saveTask</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{saveTaskDetails}</pre>
                    <button onClick={()=>{saveTask()}} className="sendBtn">Send</button>
                </div>
                

                <div>
                    <h2>Change Task Status</h2>
                    <p>GET - /changeStatus?id=12211</p>
                    <button onClick={()=>{changeStatus()}} className="sendBtn">Send</button>
                </div>

                
                <div>
                    <h2> Get All Tasks</h2>
                    <p>GET - /alltasks</p>
                    <button onClick={()=>{alltasks()}} className="sendBtn">Send</button>
                </div>

                <div>
                    <h2>Get Task by Task HolderName</h2>
                    <p>GET - /getTask?name=Manoowranjith</p>
                    <button onClick={()=>{getTask()}} className="sendBtn">Send</button>
                </div>
                
                <div>
                    <h2>Delete a Task</h2>
                    <p>GET - /deleteHouse?id=12211</p>
                    <button onClick={()=>{deleteHouse()}} className="sendBtn">Send</button>
                </div>

            </div>
            <div className="api-response">
                <h1>DB-Table</h1>
                <pre>
                    {db}
                </pre>
            </div>
        </div>
    )
}
export default Api;
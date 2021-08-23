import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const FORMAT="dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
export const AddTask = ({onAddTask,onCancel}) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState(null)
    return (
            <div className="add-task-dialog">
                    <input value={task} onChange={(event)=>{
                        setTask(event.target.value);
                    }}/>
                    <div className="add-task-action-container">
                        <div className="btns-container">
                            <button className="add-btn" 
                            disabled={!task}
                            onClick={()=>{
                                onAddTask(task,date);
                                onCancel();
                                setTask("");
                                console.log(task);
                                }}>Add Task</button>
                            <button className="cancel-btn" onClick={()=>{
                                onCancel();
                                setTask("");
                                }}>Cancel</button>
                        </div>
                        <div className="icon-container"><DayPickerInput onDayChange={(day)=>setDate(day)} 
                        placeholder={`${dateFnsFormat(new Date(),FORMAT)}`} 
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers:{
                                disabled:[
                                    {before:new Date()},
                                ]
                            }
                        }}
                        /></div>
                    </div>
                </div>
    );
};

const TASKS_HEADER_MAPPING ={
     INBOX:"Inbox",
     TODAY:"Today",
     NEXT_7:"Next 7 days",
};

const TaskItem=({selectedTab,tasks}) => {

    let tasksToRender=[...tasks];
        if(selectedTab === 'NEXT_7'){
            return tasks.filter(task => isAfter(task.date, new Date()) && 
            isBefore(task.date,addDays(new Date(),7))).map(task=>{
                return(<div className="task-items-container">
                <div className="task-item"><p>
                    {task.text}</p><p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
                </div>
            </div>

            )})
        }

        if(selectedTab === 'TODAY'){
            return tasks.filter(task => isToday(task.date)).map(task=>{
                return(<div className="task-items-container">
                <div className="task-item"><p>
                    {task.text}</p><p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
                </div>
            </div>)})
        }

            return (
            <div className="task-items-container">
                {
                    tasksToRender.map((task)=>{
                        return (<div className="task-item">
                            <p>{task.text}</p>
                            <p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
                        </div>)
                    })
                }
            </div>);

}
export const Task = ({selectedTab}) => {
    const [showAddTask,setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addNewTask=(text,date)=>{
        const newTaskItem={text,date: date||new Date()};
        //console.log(text);
        setTasks((prevState) =>[...prevState,newTaskItem]);
        console.log(tasks);
    }
    return (
        <div className="tasks">
            <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab==='INBOX'?<div className="add-task-btn" onClick={()=>setShowAddTask((prevState)=>!prevState)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>:null}
            {
                showAddTask && (
                <AddTask onAddTask={addNewTask} onCancel={()=> setShowAddTask(false)}/>
                )}

            { tasks.length > 0 ? (<TaskItem tasks={ tasks } selectedTab={selectedTab}/>): <p>No Task Yet !!</p> 
                
            }
            </div>
    )
}

export default Task; 
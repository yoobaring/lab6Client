import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Style.css'

const Student =()=>{

    let url = 'http://localhost/api/students'
    const [students, setStudents] = useState({}) 
    const [name, setName] = useState(' ') 
    const [surname, setSurname] = useState('') 
    const [id, setId] = useState('') 
    const [Major, setMajor] = useState('') 
    const [GPA, setGPA] = useState( ) 
    // ใช้ในการเปลี่ยนแปลง
    useEffect(()=>{
        getStudents()
    })

   //get api student  การดึงข้อมูลมาแสดง โดยใช้ axios มาแสดง 
    const getStudents = async () => {
        const result = await axios.get(url)
        setStudents(result.data)
    }   
    // ใช้ฟังก์ชั่น add student 
    const addStudent = async () => {
        const result = await axios.post(url,{
             name,surname,id,Major,GPA

        }) 
        getStudents()
      
    }
    // ฟังก์ช่น get เพื่อแสดงรายชื่อเฉพาะคนๆ

    const getStudent = async (no) => {
        const result = await axios.get(`http://localhost/api/students/${no}`)
        setName(result.data.name)
        setSurname(result.data.surname)
        setId(result.data.id)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
    }   
    // ฟังก์ชั่น อัพเดตข้อมูล

    const updateStudent = async (no) => {
        const result = await axios.put(`http://localhost/api/students/${no}`,{
             name,surname,id,Major,GPA

        }) 
        setName(result.data.name)
        setSurname(result.data.surname)
        setId(result.data.id)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
        getStudents()
      
    }

    // ฟังก์ชั่นเพื่อลบ
    
    const deleteStudent = async (no) => {
        const result = await axios.delete(`http://localhost/api/students/${no}`)
        getStudents()
    }   
    

    const printStudent = () => {
        if ( students && students.length )
            return students.map((student,index) => {
                return (
                    <li key={index}>
                       {student.no+1}. {student.name}  {student.surname} : {student.id} : {student.Major} : {student.GPA} 
                       <br/><button className="button button1" onClick={ ()=> getStudent(student.no)}>GET</button>
                       <button className="button button2"onClick={ ()=> updateStudent(student.no)}>UPDATE</button>
                       <button className="button button3" onClick={ ()=> deleteStudent(student.no)}>DELETE</button>

                    </li>
                )
             
            })
        else {
            return (<h2 alingn ="center"> No Student </h2>)
        }

    }
   

    return (
        <div >
           
                {printStudent()}
          <br/>
            
           GET STUDENTSS : {name} {surname} {id} {Major} {GPA}

           <br/>
                <input 
                onChange={(e)=> setName(e.target.value)}
                type='text'
                value={name}
                name='name'
                placeholder='Enter name'
                /><br/>
                <input
                onChange={(e)=> setSurname(e.target.value)}
                type='text'
                value={surname}
                name='surname'
                placeholder='Enter surname'
                /><br/>
                <input
                onChange={(e)=> setId(e.target.value)}
                type='text'
                value={id}
                name='id'
                placeholder='Enter id'
                /><br/>
                <input
                onChange={(e)=> setMajor(e.target.value)}
                type='text'
                value={Major}
                name='Major'
                placeholder='Enter major'
                /><br/>
                <input 
                onChange={(e)=> setGPA(e.target.value)}
                type='number'
                value={GPA}
                name='GPA'
                placeholder='Enter GPA'
                /><br/><button className="button button5" onClick={addStudent}>ADD STUDENTS</button>
        </div>
    )
}

export default Student;
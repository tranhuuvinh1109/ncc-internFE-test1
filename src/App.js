
import {useState} from 'react'
import Student from './components/Student';
import Add from './components/Add';
import { ToastContainer } from 'react-toastify';
import Edit from './components/Edit';
import { info } from 'autoprefixer';


function App() {
  const [edit,setEdit] = useState(false)
  const database = [
    {
      id: 0,
      firstName: 'Tran',
      lastName: 'Vinh',
      age: '20',
      classroom: 'NHAT1',
      avatar: 'avt1.jpg'
    },
    {
      id: 1,
      firstName: 'Nguyen',
      lastName: 'Thuy',
      age: '21',
      classroom: 'DTU',
      avatar: 'avt2.jpg'
    }
  ]
  const [studentEdit,setStudentEdit] = useState ()
  const [listStudent, setListStudent] = useState(database)
  const addStudent = (student)=>{
    setListStudent([...listStudent,student])
    console.log('add->',listStudent)
  }
  const deleteStudent = (id) =>{
    setListStudent(listStudent.filter(e => e.id != id))
  }
  const handleEdit = (student) =>{
    setEdit(true)
    setStudentEdit(student)

  }
  const handleCancel = ()=>{
    setEdit(false)
  }
  const handleUpdateStudent = (id,infor) =>{
    console.log(1123,id,infor);
    const newInfor = listStudent.map(
      (e)=>{
        if(e.id === id){
          return infor
        }
        return e
      }
    )
    setListStudent(newInfor)
  }

  
  return (
    <div className="App">
      <h1 className='text-center  font-bold text-3xl'>
        Quản lý học sinh
      </h1>
      <div className='flex'>
        {
          edit ? <Edit data={studentEdit} handleUpdateStudent={handleUpdateStudent} handleCancel={handleCancel}/> : <Add addStudent={addStudent}></Add>
        }
        
        
        
        <div className='list flex-1 ml-2.5'>
          <h1 className='font-medium text-xl mb-2.5'>
            Danh sách học sinh
          </h1>
          <div>
            <Student data={listStudent} deleteStudent={deleteStudent} handleEdit={handleEdit}></Student>
          </div>
        </div>
      
      </div>
      <ToastContainer />
      
    </div>
  );
}

export default App;

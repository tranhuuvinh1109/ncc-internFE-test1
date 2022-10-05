import Input from '../Input'
import {useEffect, useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add({addStudent}) {
    const initalStudent = {
        id: undefined,
        firstName : '',
        lastName: '',
        age: '',
        classroom: '',
        avatar: ''
    }
    const [errorMsg,setErrorMsg] = useState({})
    const [student,setStudent] = useState(initalStudent)
    const [avatar,setAvatar] = useState()
    useEffect(()=>{
        return ()=>{
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    },[avatar])
    const handleInputChange = (e) =>{
        if(e.target.files){
            console.log(e.target.files[0]);
            const file = e.target.files[0]
            file.preview = URL.createObjectURL(file)
            setAvatar(file)
        }
        const {name, value} = e.target
        setStudent({...student,[name]:value})
        console.log('-->1',student)

    }
    const validate = () => {
        const msg = {}
        if(!student.firstName){
            msg.firstName = 'Vui lòng nhập họ tên.'
        }
        if(!student.lastName){
            msg.lastName = 'Vui lòng nhập tên.'
        }
        if(!student.age){
            msg.age = 'Vui lòng nhập tuổi.'
        }
        if(student.age){
            if(isNaN(student.age)){
                msg.age = 'Vui lòng nhập vào là số.'
            }
            if(student.age < 0){
                msg.age = 'Tuổi không được bé hơn 0, vui lòng nhập lại.'
            }
        }
        if(!student.classroom){
            msg.classroom = 'Vui lòng nhập lớp.'
        }
        if(!student.avatar){
            msg.avatar = 'Vui lòng chọn avatar.'
        }
        if(student.avatar){
            if(!student.avatar.match(/\.(jpg|jpeg|png|gif)$/)){
                msg.avatar = 'Vui lòng chọn ảnh có đuôi jpg, png, jqeg, gif.'
            }
        }
        setErrorMsg(msg)
        if(Object.keys(msg).length > 0) return false
        return true
        
    }
    
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        
        const check = validate()
        console.log(check);
        if(check){

            confirmAlert({
                title: 'Xác nhận!!!',
                message: 'Bạn có chắc chắn muốn thêm học sinh này ?',
                buttons: [
                  {
                    label: 'Có',
                    onClick: () => {
                        
                        addStudent(student)
                        setStudent(initalStudent)
                        setAvatar('')
                        console.log('-->',student)
                        toast.success(`Đã thêm học sinh thành công!`, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                  },
                  {
                    label: 'Không'
                  }
                ]
              });
        }
        
    }
    return ( 
        <div className='add'>
            <h2 className='font-medium text-xl'>Thêm học sinh</h2>
            
            <form onSubmit={handleOnSubmit}>
                <Input type='text' name='firstName' handleInputChange={handleInputChange} value={student.firstName} validate={errorMsg}></Input>
                <Input type='text' name='lastName' handleInputChange={handleInputChange} value={student.lastName} validate={errorMsg}></Input>
                <Input type='text' name='age' handleInputChange={handleInputChange} value={student.age} validate={errorMsg}></Input>
                <Input type='text' name='classroom' handleInputChange={handleInputChange} value={student.classroom} validate={errorMsg}></Input>
                <Input type='file' name='avatar' handleInputChange={handleInputChange} value={student.avatar} validate={errorMsg}></Input>
                {
                    avatar && <img src={avatar.preview} alt='avatar' className='max-w-sm'></img>
                }
                <button className='w-full py-2 border rounded-lg border-solid border-neutral-400 bg-yellow-200 mt-3 hover:bg-sky-700 text-zinc-50' >
                    Thêm học sinh
                </button>
                
            </form>
      </div>
     );
}

export default Add;
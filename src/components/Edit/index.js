import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from 'react'
import Input from '../Input'
function Edit({data,handleUpdateStudent,handleCancel}) {
    const [infor,setInfor] = useState(data)
    const [errorMsg,setErrorMsg] = useState({})
    useEffect(()=>{
        setInfor(data)
    },[data])
    const handleInputChange = (e) =>{
        const {name, value} = e.target
        
        setInfor({...infor,[name]:value})

    }
    const validate = () => {
        const msg = {}
        if(!infor.firstName){
            msg.firstName = 'Vui lòng nhập họ tên.'
        }
        if(!infor.lastName){
            msg.lastName = 'Vui lòng nhập tên.'
        }
        if(!infor.age){
            msg.age = 'Vui lòng nhập tuổi.'
        }
        if(infor.age){
            if(isNaN(infor.age)){
                msg.age = 'Vui lòng nhập vào là số.'
            }
            if(infor.age < 0){
                msg.age = 'Tuổi không được bé hơn 0, vui lòng nhập lại.'
            }
        }
        if(!infor.classroom){
            msg.classroom = 'Vui lòng nhập lớp.'
        }
        if(!infor.avatar){
            msg.avatar = 'Vui lòng chọn avatar.'
        }
        setErrorMsg(msg)
        if(Object.keys(msg).length > 0) return false
        return true
        
    }
    const handleOnSubmit = (e,id)=>{
        e.preventDefault()
        const check = validate()
        if(check){
            confirmAlert({
                title: 'Xác nhận!!!',
                message: 'Bạn có chắc chắn lưu thông tin học sinh này ?',
                buttons: [
                  {
                    label: 'Có',
                    onClick: () => {
                        if(id >=0 ){
                            handleUpdateStudent(id,infor)
                            handleCancel()
                            toast.success(`Đã sửa thông tin học sinh thành công!`, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                        }else{
                            toast.error(`Sửa thông tin học sinh thất bại!`, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
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
        <div>
            <h2 className='font-medium text-xl'>Sửa thông tin học sinh</h2>
            <form onSubmit={(e)=>handleOnSubmit(e,data.id)}>
                <Input type='text' name='firstName' handleInputChange={handleInputChange} value={infor.firstName} validate={errorMsg}></Input>
                <Input type='text' name='lastName' handleInputChange={handleInputChange} value={infor.lastName} validate={errorMsg}></Input>
                <Input type='text' name='age' handleInputChange={handleInputChange} value={infor.age} validate={errorMsg}></Input>
                <Input type='text' name='classroom' handleInputChange={handleInputChange} value={infor.classroom} validate={errorMsg}></Input>
                {/* <Input type='text' name='avatar' handleInputChange={handleInputChange} value={infor.avatar}></Input> */}
                <button className='w-full py-2 border rounded-lg border-solid border-neutral-400 bg-yellow-200 mt-3 hover:bg-sky-700 text-zinc-50' >
                    Lưu thông tin
                </button>
                <button className='w-full py-2 border rounded-lg border-solid border-neutral-400  mt-3 hover:bg-sky-700 text-black ' onClick={handleCancel}>
                    Cancel
                </button>
                
            </form>
        </div>
     );
}

export default Edit;
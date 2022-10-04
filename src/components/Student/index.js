
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Student({data,deleteStudent,handleEdit}) {
    const handleOnClickDelete = (id) => {
        
        confirmAlert({
          title: 'Xác nhận!!!',
          message: 'Bạn có chắc chắn muốn xoá học sinh này ?',
          buttons: [
            {
              label: 'Có',
              onClick: () => {
                if(id){
                    deleteStudent(id)
                    
                    toast.success(`Đã xoá học sinh thành công!`, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }else{
                    toast.error('Đã xoá học sinh thất bại!', {
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

    const handleOnclickEdit = (student)=>{
        if(student){
            handleEdit(student)
        }
    }
    return ( 
       <table className="w-full">
            <thead>
                <tr className="bg-lime-400">
                    <th>
                        ID
                    </th>
                    <th>
                        Firstname
                    </th>
                    <th>
                        Lastname
                    </th>
                    <th>
                        Age
                    </th>
                    <th>
                        Classroom
                    </th>
                    <th>
                        Avatar
                    </th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map((e,index)=>{
                        return(
                            <tr key={index}>
                                <td>
                                    {e.id}
                                </td>
                                <td>
                                    {e.firstName}
                                </td>
                                <td>
                                    {e.lastName}
                                </td>
                                <td>
                                    {e.age}
                                </td>
                                <td>
                                    {e.classroom}
                                </td>
                                <td>
                                    {e.avatar}
                                </td>
                                <td>
                                    <button className="bg-yellow-200 w-full text-white hover:bg-sky-700" onClick={()=>{
                                        handleOnclickEdit(e)
                                    }}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="bg-red-600 w-full text-white hover:bg-sky-700" onClick={()=>handleOnClickDelete(e.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }  
            </tbody>                                                                   
       </table>
    );
}

export default Student;
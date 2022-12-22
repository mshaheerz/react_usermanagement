import axios from '../../axios/axios'
import React, { useState } from 'react'
import swal from 'sweetalert';

function UserDetails(props) {
 
    // const blockUser=(id)=>{
    //     axios.post('/admin/block_user',{id:id},{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
    //         console.log(response.data)
      
           
    //     }).catch((err)=>{
    //         swal(err.message)
    //     })
    // }
    const deleteUser=(id)=>{

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post('/admin/delete_user',{id},{headers:{"x-access-admintoken":localStorage.getItem("admintoken")}}).then((response)=>{
                    console.log(response.data)
                    props.setUsers(response.data.result)
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                      });
                }).catch((err)=>{
                    swal(err.message)
                })
                
           
            } else {
              swal("Your file is safe!");
            }
          });
   
  }
    
  return (

    <div className='container-fluid  mt-5' >
        <span className='text-white'> <h4>User Details </h4></span>
        <table className="table table-light ">
  <thead>
    
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">username</th>
      <th scope="col">email</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
   
 {
   props.users.map((e,index)=>{
       return (
       <tr key={index}>
      <th scope="row">{index+1}</th>
      <td><img src={e.image} alt="No image"  height='50px'/></td>
      <td>{e.username}</td>
      <td>{e.email}</td>
      <td>
        {/* <button className='btn btn-primary' onClick={()=>{blockUser(e._id)}}>Block</button>  */}
        <button  className="btn btn-danger" onClick={()=>{deleteUser(e._id)}}>Delete</button></td>
    </tr>) 

   })
    
    
}

   
  </tbody>
</table>
    </div>
  )
}

export default UserDetails
import React, { useEffect, useState } from 'react';
import SummeryApi from '../common';
import { toast } from 'react-toastify';
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../../src/components/ChsngeUserRole"; // Corrected import

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRole,setOpenUpdateRole] = useState(false);
    const [updatUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummeryApi.allUsers.url, {
                method: SummeryApi.allUsers.method,
                credentials: "include",
            });
            const dataResponse = await fetchData.json();
            
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            }
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error("Error fetching all users:", error);
            toast.error("Failed to fetch users. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((el, index) => (
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format("LL")}</td>
                            <td>
                                <button 
                                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white focus:outline-none'
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    }}>
                                    <MdModeEditOutline />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                openUpdateRole  && (
                    <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updatUserDetails.name}
                    email={updatUserDetails.email}
                    role={updatUserDetails.role}
                    userId={updatUserDetails._id}
                    callFunc={fetchAllUsers}
                    />
                ) 
            }
        </div>
    );
};

export default AllUsers;

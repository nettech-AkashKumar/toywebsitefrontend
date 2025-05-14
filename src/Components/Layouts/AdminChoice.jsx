// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'

// const AdminChoice = ({user, onStay, onGoToAdmin}) => {
//     const [showChoice, setShowChoice] = useState(false)
//     const navigate = useNavigate();
//     // const user = useSelector(state => state.auth.user);
//     // console.log('userAdminchoice', user)

//     useEffect(() => {
//         console.log('userAdminchoice', user)
//         if(user?.role?.toLowerCase() === "admin")  {
//             setShowChoice(true);
//         }
//     }, [user]);

//     // const goToAdminPanel = async () => {
//     //     navigate('/admin')
//     // }
//     // const stayHome = async() => {
//     //     setShowChoice(false);
//     // }

//     if(!showChoice) {
//         return null;
//     }

//   return (
//     <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
//             <h2 className="text-xl font-bold mb-4">You're an Admin </h2>
//             <p className="mb-6">Would you like to switch to the admin panel?</p>
//             <div className="flex justify-around">
//                 <button onClick={onGoToAdmin} className='bg-blue-600 text-white px-4 py-2  rounded  hover:bg-blue-700'>Go to Admin Panel</button>
//                 <button onClick={onStay} className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500'>Stay Here</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default AdminChoice

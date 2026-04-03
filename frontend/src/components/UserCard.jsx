import React from 'react'
import StatCard from './StatCard';
 function UserCard({userInfo}) {
  return (

    <div className='p-5 bg-white rounded-xl  shadow-gray-100 border border-outset
    border-gray-100/50 shadow-xl hover:-translate-y-1 transition-all hover:shadow-2xl hover:border-outset hover:border-gray-200/50 duration-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
          <img src={userInfo?.profileImageUrl} alt={userInfo?.name}
           className='h-12 w-12 rounded-full object-cover border-2 border-white'
          />
                  <div>
                    <p className='text-lg font-medium'>{userInfo.name}</p>
                    <p className='text-gray-600 text-sm'>{userInfo.email}</p>
                  </div>
            </div>
        </div>
        <div className='flex items-end gap-3 mt-5 hover:-traslate-y-1'>
                  <StatCard label="Pending" 
                  count={userInfo?.pendingTasks || 0} 
                  status="pending"/>
                  <StatCard label="In Progress" 
                  count={userInfo?.InProgressTasks || 0} 
                  status="inProgress"/>
                  <StatCard label="Completed Tasks" 
                  count={userInfo?.completedTasks || 0} 
                  status="completed"/>
                  </div>
    </div>

  )
}

export default UserCard;
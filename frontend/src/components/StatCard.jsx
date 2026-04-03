import React from 'react'

export default function StatCard({label,count,status}) {
    console.log("props console:",label,count,status)
    const getStatusTagColour = ()=>{
        switch(status){
            case "pending":
                return "bg-yellow-100 text-yellow-800" ;
                case "inProgress":
                    return "bg-orange-100 text-yellow-800";
                    case "completed":
                        return "bg-green-100 text-green=800";
                    
        }
    }
  return (
    <div className={`flex flex-1 text-[15px] font-medium ${getStatusTagColour()} px-4 py-0.5
    rounded-lg items-center gap-1`}>
        <span className='text-[12px] font-medium'>{count}</span>{ " "}<span>{label}</span>
    </div>
  )
}

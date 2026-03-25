import { IoIosCreate, IoIosLogOut } from "react-icons/io";
import { MdDashboardCustomize, MdLogout, MdOutlineGroups2, MdOutlineManageHistory, MdOutlineTaskAlt } from "react-icons/md";

export const SIDE_MENU_DATA = [
        {
            id:1,
            label:"Dashboard",
            icon: MdDashboardCustomize, 
            path:"/admin/dashboard"
        },
        {
            id:2,
            label:"Manage Task",
             icon: MdOutlineManageHistory,
             path:'/admin/tasks'
        },
        {
            id:3,
            label:"Create Task",
            icon:IoIosCreate,
            path:"/admin/create-task"
        },
        {
            id:4,
            label:"Team Members",
            icon:MdOutlineGroups2,
            path:"/admin/users"
        },
    // {
    //     id:5,
    //     label:"Logout",
    //     icon:IoIosLogOut,
    //     path:"logout"
    // }
]

export const USER_SIDE_MENU_DATA = [
     {
        id:1,
        label:"Dashboard",
        icon:MdDashboardCustomize,
        path:"/user/dashboard"
    },
    {
        id:2,
        label:"My Tasks",
        icon:MdOutlineTaskAlt,
        path:"/user/tasks"
    },
    {
        id:3,
        label:"Logout",
        icon:MdLogout,
        path:"logout"
    }
]

export const PRIORITY_DATA = [
    {label:"Low",value:"low"},
    {label:"Medium",value:"medium"},
    {label:"High",vlaue:"high"}
]

export const STATUS_DATA =[
{label:"Pending",value:"Pending"},
{label:"In Progress",value:"In Progress"},
{label:"Completed",value:"Completed"}
]
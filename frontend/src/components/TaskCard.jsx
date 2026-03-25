import React from "react";
import Progress from "./Progress";
import moment from "moment";
import AvtarGroup from "../components/AvatarGroup";
import { GrAttachment } from "react-icons/gr";

function TaskCard({
  title,
  description,
  priority,
  progress,
  status,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoCheckList,
  onClick,
}) {
  const statusConfig = {
    Pending:     { bg: "bg-amber-50",   text: "text-amber-700",  dot: "bg-amber-400",  border: "border-amber-400"  },
    "In Progress":{ bg: "bg-sky-50",    text: "text-sky-700",    dot: "bg-sky-400",    border: "border-sky-400"    },
    Completed:   { bg: "bg-emerald-50", text: "text-emerald-700",dot: "bg-emerald-400",border: "border-emerald-400"},
  };

  const priorityConfig = {
    Low:    { bg: "bg-slate-100",   text: "text-slate-600"  },
    Medium: { bg: "bg-orange-50",   text: "text-orange-600" },
    High:   { bg: "bg-rose-50",     text: "text-rose-600"   },
  };

  const s = statusConfig[status]  || statusConfig["Pending"];
  const p = priorityConfig[priority] || priorityConfig["Low"];

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm
                 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
                 cursor-pointer overflow-hidden"
    >
     
      <div className={`h-0.5 w-full ${s.border.replace("border-", "bg-")}`} />

      <div className="p-4">
        
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium
                            ${s.bg} ${s.text} px-2.5 py-1 rounded-full`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {status}
          </span>
          <span className={`text-[11px] font-medium ${p.bg} ${p.text}
                            px-2.5 py-1 rounded-full`}>
            {priority}
          </span>
          <div className="ml-auto">
            <span className="text-xs text-gray-500 font-medium">
              {completedTodoCount}/{todoCheckList?.length || 0} done
            </span>
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug mb-1">
          {title}
        </h3>
        <p className="text-[13px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>

        {/* Progress */}
        <Progress progress={progress} status={status} />

        {/* Divider */}
        <div className="border-t border-gray-50 my-3" />

        {/* Dates */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Start</p>
            <p className="text-[12px] font-medium text-gray-700">
              {moment(createdAt).format("D MMM YYYY")}
            </p>
          </div>
          <div className="h-6 w-px bg-gray-100" />
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Due</p>
            <p className="text-[12px] font-medium text-gray-700">
              {moment(dueDate).format("D MMM YYYY")}
            </p>
          </div>
        </div>

        {/* Footer: avatars + attachment */}
        <div className="flex items-center justify-between">
          <AvtarGroup avatars={assignedTo} />
          {attachmentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100
                            px-2.5 py-1 rounded-full text-blue-500">
              <GrAttachment className="text-[11px]" />
              <span className="text-[11px] font-medium ">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
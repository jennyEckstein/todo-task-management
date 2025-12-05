import { Calendar, Flag, Edit2, Trash2 } from 'lucide-react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
    const priorityColors = {
        High: 'bg-red-100 text-red-700 border-red-200',
        Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        Low: 'bg-green-100 text-green-700 border-green-200'
    };

    const statusColors = {
        Todo: 'bg-gray-100 text-gray-700 border-gray-200',
        InProgress: 'bg-blue-100 text-blue-700 border-blue-200',
        Done: 'bg-green-100 text-green-700 border-green-200'
    };

    const statusLabels = {
        Todo: 'To Do',
        InProgress: 'In Progress',
        Done: 'Done'
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div
            className={`bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow ${
                task.status === 'Done' ? 'opacity-75' : ''
            }`}
        >
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    onChange={() => onToggleStatus(task.id, task.status)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                />

                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold text-slate-800 ${
                            task.status === 'Done' ? 'line-through' : ''
                        }`}>
                            {task.title}
                        </h3>
                    </div>

                    {task.description && (
                        <p className={`text-slate-600 mb-3 ${
                            task.status === 'Done' ? 'line-through' : ''
                        }`}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                statusColors[task.status]
            }`}>
              {statusLabels[task.status]}
            </span>

                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                            priorityColors[task.priority]
                        }`}>
              <Flag size={14} />
                            {task.priority} Priority
            </span>

                        {task.category && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {task.category}
              </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-slate-600 text-sm">
              <Calendar size={14} />
                            {formatDate(task.dueDate)}
            </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit task"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete task"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
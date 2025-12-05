import TaskItem from './TaskItem';

const TaskList = ({ tasks, filter, onToggleStatus, onEdit, onDelete }) => {
    const statusLabels = {
        Todo: 'To Do',
        InProgress: 'In Progress',
        Done: 'Done'
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No tasks found</h3>
                <p className="text-slate-600">
                    {filter === 'all' ? 'Get started by creating your first task' : `No tasks with status "${statusLabels[filter]}"`}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
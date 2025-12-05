const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Tasks */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 text-sm font-medium mb-1">Total Tasks</p>
                        <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                    </div>
                </div>
            </div>

            {/* To Do */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 text-sm font-medium mb-1">To Do</p>
                        <p className="text-3xl font-bold text-slate-800">{stats.todo}</p>
                    </div>
                </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 text-sm font-medium mb-1">In Progress</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                    </div>
                </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 text-sm font-medium mb-1">Completed</p>
                        <p className="text-3xl font-bold text-green-600">{stats.done}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
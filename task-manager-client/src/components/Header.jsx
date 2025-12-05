const Header = ({ onNewTask }) => {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-1">Task Manager</h1>
                    <p className="text-slate-600">Organize your work and get things done</p>
                </div>
                <button
                    onClick={onNewTask}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                    New Task
                </button>
            </div>
        </header>
    );
};

export default Header;
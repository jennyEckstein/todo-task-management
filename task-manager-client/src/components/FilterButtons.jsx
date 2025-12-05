const FilterButtons = ({ currentFilter, onFilterChange }) => {
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'Todo', label: 'To Do' },
        { value: 'InProgress', label: 'In Progress' },
        { value: 'Done', label: 'Done' }
    ];

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
            <div className="flex gap-2 flex-wrap">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => onFilterChange(filter.value)}
                        className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                            currentFilter === filter.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterButtons;
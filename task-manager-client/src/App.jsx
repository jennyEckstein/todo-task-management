import { useState, useEffect, useCallback } from 'react';
import { taskService } from './services/taskService';
import API_BASE_URL from './config/api';

// Components
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks with filter
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = {};
            if (filter !== 'all') {
                filters.status = filter;
            }

            const data = await taskService.getTasks(filters);
            setTasks(data);
        } catch (err) {
            setError($`Failed to load tasks. Make sure the API is running on ${API_BASE_URL}`);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    // Fetch tasks on mount and when filter changes
    useEffect(() => {
        fetchTasks().catch(error => {
            console.error("Unhandled fetching tasks:", error);
        });
    }, [fetchTasks]);

    // Create new task
    const handleCreateTask = async (taskData) => {
        try {
            setIsCreating(true);
            await taskService.createTask(taskData);
            setShowNewTaskForm(false);
            await fetchTasks();
        } catch (err) {
            alert('Failed to create task. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    // Update task status using checkbox
    const handleToggleStatus = async (taskId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Done' ? 'Todo' : 'Done';

            // Optimistic update
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );

            await taskService.updateTaskStatus(taskId, newStatus);
            await fetchTasks();
        } catch (err) {
            alert('Failed to uptate task status. Please try again.');
            await fetchTasks();
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await taskService.deleteTask(taskId);
            await fetchTasks();
        } catch (err) {
            alert('Failed to delete task. Please try again.');
        }
    };

    // Edit task
    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowNewTaskForm(true);
    };

    // Update task
    const handleUpdateTask = async (taskData) => {
        try {
            setIsCreating(true);
            await taskService.updateTask(editingTask.id, taskData);
            setShowNewTaskForm(false);
            setEditingTask(null);
            await fetchTasks();
        } catch (err) {
            alert('Failed to update task. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    // Close form modal
    const handleCloseForm = () => {
        setShowNewTaskForm(false);
        setEditingTask(null);
    };

    // Calculate stats
    const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'Todo').length,
        inProgress: tasks.filter(t => t.status === 'InProgress').length,
        done: tasks.filter(t => t.status === 'Done').length,
    };

    // Loading state
    if (loading) {
        return <LoadingSpinner />;
    }

    // Error state
    if (error) {
        return <ErrorDisplay error={error} onRetry={fetchTasks} />;
    }

    // Main app
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <Header onNewTask={() => setShowNewTaskForm(true)} />
                <StatsCards stats={stats} />
                <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
                <TaskList
                    tasks={tasks}
                    filter={filter}
                    onToggleStatus={handleToggleStatus}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                />
            </div>

            {/* Task Form Modal */}
            {showNewTaskForm && (
                <TaskForm
                    onClose={handleCloseForm}
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    isLoading={isCreating}
                    initialData={editingTask}
                />
            )}
        </div>
    );
}

export default App;
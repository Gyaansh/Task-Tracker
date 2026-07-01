import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Clock, Loader2 as Spinner, CheckCircle2, ListTodo } from 'lucide-react';

import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskModal from '../components/TaskModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SortDropdown from '../components/SortDropdown';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Loader from '../components/Loader';
import StatsCard from '../components/StatsCard';
import useLayout from '../hooks/useLayout';

// View components — map keyed by layout id (clean, no large if-else)
import CardView     from '../components/views/CardView';
import KanbanView   from '../components/views/KanbanView';
import ListView     from '../components/views/ListView';
import TimelineView from '../components/views/TimelineView';

const VIEWS = { cards: CardView, kanban: KanbanView, list: ListView, timeline: TimelineView };

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const Home = ({ onAddTask, taskModalOpen, onModalClose }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Filter/search/sort state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Layout state — persisted to localStorage
  const { layout, setLayout } = useLayout();

  // Fetch tasks once on mount — switching layouts does NOT re-fetch
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await fetchTasks();
      setTasks(res.data.data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      if (editingTask) {
        const res = await updateTask(editingTask._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? res.data.data : t)));
        toast.success('Task updated!');
      } else {
        const res = await createTask(formData);
        setTasks((prev) => [res.data.data, ...prev]);
        toast.success('Task created!');
      }
      handleModalClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteTask(deletingTask._id);
      setTasks((prev) => prev.filter((t) => t._id !== deletingTask._id));
      toast.success('Task deleted');
      setDeletingTask(null);
    } catch {
      toast.error('Failed to delete task');
    } finally {
      setDeleting(false);
    }
  };

  const handleModalClose = () => {
    setEditingTask(null);
    onModalClose();
  };

  // Filtered + sorted tasks — reused across all view components
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (search)         result = result.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter)   result = result.filter((t) => t.status === statusFilter);
    if (priorityFilter) result = result.filter((t) => t.priority === priorityFilter);

    result.sort((a, b) => {
      if (sortBy === 'newest')   return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest')   return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return 0;
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const stats = useMemo(() => ({
    total:      tasks.length,
    pending:    tasks.filter((t) => t.status === 'Pending').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    completed:  tasks.filter((t) => t.status === 'Completed').length,
  }), [tasks]);

  const hasFilters = search || statusFilter || priorityFilter;

  // Resolve the active view component
  const ActiveView = VIEWS[layout] ?? CardView;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Good day! 👋</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Here's an overview of all your tasks.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Tasks"  count={stats.total}      icon={ListTodo}    colorClass="text-blue-600 dark:text-blue-400"    bgClass="bg-blue-50 dark:bg-blue-900/30" />
        <StatsCard label="Pending"      count={stats.pending}    icon={Clock}       colorClass="text-amber-600 dark:text-amber-400"  bgClass="bg-amber-50 dark:bg-amber-900/30" />
        <StatsCard label="In Progress"  count={stats.inProgress} icon={Spinner}     colorClass="text-indigo-600 dark:text-indigo-400" bgClass="bg-indigo-50 dark:bg-indigo-900/30" />
        <StatsCard label="Completed"    count={stats.completed}  icon={CheckCircle2} colorClass="text-emerald-600 dark:text-emerald-400" bgClass="bg-emerald-50 dark:bg-emerald-900/30" />
      </div>

      {/* Toolbar — search, filters, sort, layout switcher */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
        <SortDropdown value={sortBy} onChange={setSortBy} />
        <LayoutSwitcher layout={layout} onLayoutChange={setLayout} />
      </div>

      {/* Active view — keyed by layout to trigger fade-in animation on switch */}
      {loading ? (
        <Loader />
      ) : (
        <ActiveView
          key={layout}
          tasks={filteredTasks}
          onEdit={(t) => setEditingTask(t)}
          onDelete={(t) => setDeletingTask(t)}
          onAddTask={onAddTask}
          hasFilters={hasFilters}
        />
      )}

      {/* Modals */}
      <TaskModal
        isOpen={taskModalOpen || !!editingTask}
        task={editingTask}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        isLoading={submitting}
      />
      <DeleteConfirmationModal
        isOpen={!!deletingTask}
        task={deletingTask}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
        isLoading={deleting}
      />
    </main>
  );
};

export default Home;

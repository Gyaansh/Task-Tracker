import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { toInputDate } from '../utils/dateUtils';

const INITIAL_FORM = {
  title: '',
  description: '',
  status: 'Pending',
  priority: 'Medium',
  dueDate: '',
};

const TaskForm = ({ task, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing an existing task
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        dueDate: toInputDate(task.dueDate),
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  const selectClass =
    'w-full px-3 py-2 text-sm border rounded-lg ' +
    'bg-white dark:bg-slate-800 ' +
    'text-slate-800 dark:text-slate-100 ' +
    'border-slate-200 dark:border-slate-600 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ' +
    'transition-all duration-150';

  const textareaClass =
    'w-full px-3 py-2 text-sm border rounded-lg resize-none ' +
    'bg-white dark:bg-slate-800 ' +
    'text-slate-800 dark:text-slate-100 ' +
    'placeholder-slate-400 dark:placeholder-slate-500 ' +
    'border-slate-200 dark:border-slate-600 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ' +
    'transition-all duration-150';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <Input
        id="title"
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter task title"
        error={errors.title}
        required
      />

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add a description (optional)"
          rows={3}
          className={textareaClass}
        />
      </div>

      {/* Status + Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select id="status" name="status" value={form.status} onChange={handleChange} className={selectClass}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Priority
          </label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange} className={selectClass}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Due Date */}
      <Input
        id="dueDate"
        label="Due Date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : task ? 'Update Task' : 'Save Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;

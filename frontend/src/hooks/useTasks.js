import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://task-tracker-7bxp.onrender.com/api/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    if (!taskData.title.trim()) {
      setError('Title is required');
      return null;
    }
    try {
      const res = await axios.post(API_URL, taskData);
      await fetchTasks();
      return { success: true, task: res.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      return null;
    }
  };

  const updateTask = async (id, taskData) => {
    if (!taskData.title.trim()) {
      setError('Title is required');
      return null;
    }
    try {
      const res = await axios.put(`${API_URL}/${id}`, taskData);
      await fetchTasks();
      return { success: true, task: res.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      return null;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
      return { success: true };
    } catch (err) {
      setError('Failed to delete task');
      return null;
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { ...task, completed: !task.completed });
      await fetchTasks();
      return { success: true };
    } catch (err) {
      setError('Failed to update task');
      return null;
    }
  };

  return { tasks, loading, error, setError, addTask, updateTask, deleteTask, toggleTask };
}
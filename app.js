// ── TaskFlow App ──
// Manages tasks with priority levels, filters, and localStorage persistence.

const STORAGE_KEY = 'taskflow_tasks';

// ── State ──
let tasks = loadTasks();
let currentFilter = 'all';

// ── DOM References ──
const taskInput      = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn         = document.getElementById('addBtn');
const taskList       = document.getElementById('taskList');
const emptyState     = document.getElementById('emptyState');
const taskCount      = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns     = document.querySelectorAll('.filter-btn');
const currentDate    = document.getElementById('currentDate');

// ── Init ──
setDateLabel();
render();

// ── Event Listeners ──
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

clearCompleted.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Functions ──

/**
 * Creates a new task object and adds it to the list.
 */
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    id:       Date.now(),
    text:     text,
    priority: prioritySelect.value,
    done:     false,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(task);
  saveTasks();
  render();

  taskInput.value = '';
  taskInput.focus();
}

/**
 * Toggles the done state of a task by its ID.
 * @param {number} id
 */
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

/**
 * Removes a task from the list by its ID.
 * @param {number} id
 */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

/**
 * Filters tasks based on the current active filter.
 * @returns {Array} filtered tasks
 */
function getFilteredTasks() {
  switch (currentFilter) {
    case 'active':    return tasks.filter(t => !t.done);
    case 'completed': return tasks.filter(t => t.done);
    default:          return tasks;
  }
}

/**
 * Renders the task list and updates the footer count.
 */
function render() {
  const filtered = getFilteredTasks();
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    filtered.forEach(task => {
      taskList.appendChild(createTaskElement(task));
    });
  }

  updateFooter();
}

/**
 * Builds the <li> DOM element for a single task.
 * @param {Object} task
 * @returns {HTMLElement}
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.done ? ' done' : ''}`;
  li.dataset.id = task.id;

  li.innerHTML = `
    <span class="priority-dot ${task.priority}"></span>
    <input
      type="checkbox"
      class="task-check"
      ${task.done ? 'checked' : ''}
      aria-label="Mark task as done"
    />
    <span class="task-text">${escapeHTML(task.text)}</span>
    <span class="priority-badge ${task.priority}">${task.priority}</span>
    <button class="delete-btn" aria-label="Delete task">✕</button>
  `;

  li.querySelector('.task-check').addEventListener('change', () => toggleTask(task.id));
  li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

  return li;
}

/**
 * Updates the footer task count label.
 */
function updateFooter() {
  const remaining = tasks.filter(t => !t.done).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
}

/**
 * Sets the date label in the header.
 */
function setDateLabel() {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  currentDate.textContent = new Date().toLocaleDateString('en-US', options);
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Saves the tasks array to localStorage.
 */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from localStorage, or returns an empty array.
 * @returns {Array}
 */
function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

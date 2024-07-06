document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTasks(data))
        .catch(error => console.error('Error loading tasks:', error));

    document.getElementById('task-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = event.target.taskTitle.value;
        const description = event.target.taskDescription.value;
        const priority = event.target.taskPriority.value;

        if (title && description) {
            const newTask = { title, description, priority };
            addTask(newTask);
            event.target.reset();
        } else {
            alert('Please provide both a task title and description.');
        }
    });
});

function renderTasks(tasks) {
    const mustHavesColumn = document.querySelector('#must-haves .column__cards');
    const couldHavesColumn = document.querySelector('#could-haves .column__cards');
    const wontHavesColumn = document.querySelector('#wont-haves .column__cards');

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        if (task.priority === 'Must haves') {
            mustHavesColumn.appendChild(taskCard);
        } else if (task.priority === 'Could haves') {
            couldHavesColumn.appendChild(taskCard);
        } else if (task.priority === "Won't haves") {
            wontHavesColumn.appendChild(taskCard);
        }
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.classList.add('card__title');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.classList.add('card__description');
    description.textContent = task.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        card.remove();
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(deleteBtn);

    return card;
}

function addTask(task) {
    const taskCard = createTaskCard(task);

    if (task.priority === 'Must haves') {
        document.querySelector('#must-haves .column__cards').appendChild(taskCard);
    } else if (task.priority === 'Could haves') {
        document.querySelector('#could-haves .column__cards').appendChild(taskCard);
    } else if (task.priority === "Won't haves") {
        document.querySelector('#wont-haves .column__cards').appendChild(taskCard);
    }
}
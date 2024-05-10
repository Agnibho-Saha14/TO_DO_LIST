window.addEventListener('load', () => {
    const form = document.querySelector('#new-task');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');
    const toggleBtn = document.querySelector('#toggle-mode');
    const hd=document.querySelector('.main-heading');
    const ts=document.querySelector('.tasks');
    const body = document.body;
    function updateTaskStyles() {
        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            const textInput = task.querySelector('.text');
            if (body.classList.contains('light-mode')) {
                task.style.backgroundColor = 'var(--light)';
                textInput.style.color = 'var(--darkest)';
            } else {
                
                task.style.backgroundColor = 'var(--darkest)';
                textInput.style.color = 'var(--light)';
            }
        });
    }


    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode'); 
        input.classList.toggle('light-mode');
        toggleBtn.classList.toggle('light-mode');
        ts.classList.toggle('light-mode');
        hd.classList.toggle('light-mode');
        const tasks = document.querySelectorAll('.task');
       updateTaskStyles();

    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        const task = input.value.trim();
        if (!task) {
            alert("Enter a task");
            return;
        }
        var a=new Audio('./bell-add.mp3');
        a.play();
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        if (body.classList.contains('light-mode')) {
            task_el.style.backgroundColor = 'var(--light)';
        } else {
            task_el.style.backgroundColor = 'var(--darkest)';
        }

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);

        const task_action_el = document.createElement('div');
        task_action_el.classList.add('actions');

        const task_edit_btn = document.createElement('button');
        task_edit_btn.classList.add('edit');
        task_edit_btn.textContent = 'Edit';

        const task_del_btn = document.createElement('button');
        task_del_btn.classList.add('delete');
        task_del_btn.textContent = 'Task Completed';

        task_action_el.appendChild(task_edit_btn);
        task_action_el.appendChild(task_del_btn);
        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        input.value = "";
        
        task_edit_btn.addEventListener('click', () => {
            if (task_edit_btn.textContent.toLowerCase() === "edit") {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_btn.textContent = 'Save';

            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_btn.textContent = 'Edit';
                var a=new Audio("./pencil-edit.mp3");
                a.play();
            }
        });


        task_del_btn.addEventListener('click', () => {
            list_el.removeChild(task_el); 
            var a=new Audio("./firecrack-complete.mp3");
            a.play();
        });
        updateTaskStyles();
    });
    
});

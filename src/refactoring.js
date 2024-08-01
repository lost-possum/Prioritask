// As implied by the title, this will be used when refactoring the main code. Here I have defined several functions that can help to simplify the existing code. 

        // 1st unused function. For use in refactoring code at a later time
        function createElement(tag, attributes = {}, classes = [], textContent = '') {
            const element = document.createElement(tag);
            for (let key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
            classes.forEach(cls => element.classList.add(cls));
            if (textContent) element.textContent = textContent;
            return element;
        }
    
        // 2nd unused function. For use in later refactoring
        function appendChildren(parent, children) {
            children.forEach(child => parent.appendChild(child));
        }
    
        //3rd unused function; see above
        function createTaskTopRow(taskCount) {
            const taskTopRowDiv = createElement('div', { id: `taskTopRow-task${taskCount}` }, ['taskTopRow']);
            const taskNumberBoxDiv = createElement('div', { id: `taskNumberBox-task${taskCount}` }, ['taskNumberBox'], taskCount.toString());
            const taskTopRightBarDiv = createElement('div', { id: `taskTopRightBar-task${taskCount}` }, ['taskTopRightBar']);
            appendChildren(taskTopRowDiv, [taskNumberBoxDiv, taskTopRightBarDiv]);
            return taskTopRowDiv;
        }
        
        function createTaskMain(taskCount, taskInput) {
            return createElement('div', { id: `taskMain-task${taskCount}` }, ['taskMain'], taskInput);
        }
        
        function createTaskTagRow(taskCount, processedTags) {
            const taskTagRowDiv = createElement('div', { id: `taskTagRow-task${taskCount}` }, ['taskTagRow']);
            const taskTagRowBufferBoxDiv = createElement('div', { id: `taskTagRowBufferBox-task${taskCount}` }, ['taskTagRowBufferBox']);
            appendChildren(taskTagRowDiv, [taskTagRowBufferBoxDiv]);
        
            processedTags.forEach((tag, index) => {
                const tagElement = createElement('span', { id: `taskCell${taskCount}-tag${index + 1}` }, ['tag'], '#' + tag);
                taskTagRowDiv.appendChild(tagElement);
            });
        
            return taskTagRowDiv;
        }
        
        function createTaskBottomRow(taskCount, priority) {
            const taskBottomRowDiv = createElement('div', { id: `taskBottomRow-task${taskCount}` }, ['taskBottomRow']);
            const taskInfoBarDiv = createElement('div', { id: `taskInfoBar-task${taskCount}` }, ['taskInfoBar'], `priority ${priority}`);
            const taskCheckBoxDiv = createElement('div', { id: `taskCheckBoxDiv-task${taskCount}` }, ['taskCheckBox']);
            const taskCheckBoxInput = createElement('input', { id: `taskCheckBoxInput-task${taskCount}`, type: 'checkbox' }, ['taskCheckBoxInput']);
            taskCheckBoxDiv.appendChild(taskCheckBoxInput);
            appendChildren(taskBottomRowDiv, [taskCheckBoxDiv, taskInfoBarDiv]);
            return taskBottomRowDiv;
        }
        // end previous code section
    
        // see above. use in refactoring (Create Task Function)
    
        function createTask(taskInput, tagsInput) {
            taskCount++;
            const taskCellDiv = createElement('div', { id: `taskCell-task${taskCount}` }, ['taskCell']);
            
            const taskTopRowDiv = createTaskTopRow(taskCount);
            const taskMainDiv = createTaskMain(taskCount, taskInput);
            const processedTags = processTags(tagsInput);
            const taskTagRowDiv = createTaskTagRow(taskCount, processedTags);
            const taskBottomRowDiv = createTaskBottomRow(taskCount, selectedPriority);
        
            appendChildren(taskCellDiv, [taskTopRowDiv, taskMainDiv, taskTagRowDiv, taskBottomRowDiv]);
        
            document.getElementById('taskColumn').appendChild(taskCellDiv);
            window.alert(`Task ${taskCount} successfully added to your list!`);
            localStorage.removeItem('taskDescriptionEntry');
            localStorage.removeItem('taskTagEntry');
        
            removePlaceholderIfTaskExists();
            saveTasksToAppData();
        }
        
        function processTags(tagsInput) {
            const tagsArray = tagsInput.split(' ');
            const processedTags = [];
        
            tagsArray.forEach(tag => {
                if (tag.startsWith('#')) {
                    processedTags.push(tag.substring(1));
                } else {
                    window.alert('Please use the correct tag format (#tag1 #tag2 #tag3...');
                    return;
                }
            });
        
            return processedTags;
            }    
        // end previous code section
    
        // next unused function - Load Tasks from App Data
        function loadTasksFromAppData() {
            const savedTasks = getAppData('savedTasks');
            if (savedTasks) {
                const tasks = JSON.parse(savedTasks).tasks;
                for (let taskId in tasks) {
                    createTaskFromData(tasks[taskId]);
                }
            }
            removePlaceholderIfTaskExists();
        }
        
        function createTaskFromData(taskData) {
            const taskCount = taskData.id.split('-task')[1];
        
            const taskCellDiv = createElement('div', { id: `taskCell-task${taskCount}` }, ['taskCell']);
            const taskTopRowDiv = createTaskTopRow(taskCount);
            const taskMainDiv = createTaskMain(taskCount, taskData.taskMain.text);
            const taskTagRowDiv = createTaskTagRow(taskCount, taskData.taskTagRow.tags);
            const taskBottomRowDiv = createTaskBottomRow(taskCount, taskData.taskBottomRow.priority);
        
            appendChildren(taskCellDiv, [taskTopRowDiv, taskMainDiv, taskTagRowDiv, taskBottomRowDiv]);
            document.getElementById('taskColumn').appendChild(taskCellDiv);
            removePlaceholderIfTaskExists();
        }
        // end section
        
        // unused - Save Tasks to App Data
        function saveTasksToAppData() {
            const tasks = {};
            const taskCells = document.querySelectorAll('.taskCell');
        
            taskCells.forEach(taskCell => {
                const taskCount = taskCell.id.split('-task')[1];
                const taskTopRow = taskCell.querySelector('.taskTopRow');
                const taskMain = taskCell.querySelector('.taskMain');
                const taskTagRow = taskCell.querySelector('.taskTagRow');
                const taskBottomRow = taskCell.querySelector('.taskBottomRow');
        
                const taskJSON = {
                    id: taskCell.id,
                    taskTopRow: {
                        taskNumberBox: taskTopRow.querySelector('.taskNumberBox').textContent,
                        taskTopRightBar: taskTopRow.querySelector('.taskTopRightBar').textContent
                    },
                    taskMain: {
                        text: taskMain.textContent
                    },
                    taskTagRow: {
                        tags: Array.from(taskTagRow.querySelectorAll('.tag')).map(tag => tag.textContent)
                    },
                    taskBottomRow: {
                        priority: taskBottomRow.querySelector('.taskInfoBar').textContent
                    }
                };
        
                tasks[`taskCell-task${taskCount}`] = taskJSON;
            });
        
            setAppData('savedTasks', JSON.stringify({ tasks: tasks }), 30);
        }
        // end section
    
        // unused - Utility Functions for App Data
        function setAppData(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + ";path=/";
        }
        
        function getAppData(name) {
            const nameEQ = name + "=";
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) === 0) {
                    return cookie.substring(nameEQ.length, cookie.length);
                }
            }
            return null;
        }
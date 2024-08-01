// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE

// This code comes with ABSOLUTELY NO WARRANTY. I cannot even BEGIN to guarantee it will perform its intended functionality in its current form

// Welcome to my first full-fledged project. I know it is an absolute mess right now, but I'm working on it as best as I can. I'm fully aware it desperately needs a solid refactoring, and I'm going to work through that process piece by piece. I preface this work by stating I am a beginner on the road to becoming a programmer. Many parts of this code, such as cookie generation, JSON import, and dynamic DOM manipulation are the first time I have worked with such features. 

// You will likely experience bugs when working with this application, some of which I am fully aware of but have not yet had time to fix. That said, feel free to reach out to me with bug reports at the email address or Signal username I have listed above and I will respond to them when time allows.

// BEGIN CODE



// import { } from "";


document.addEventListener('DOMContentLoaded', function() {
    let taskCount = 0;
    let currentYear = new Date().getFullYear();

    const taskForm = document.getElementById('newTaskForm');
    const buttons = declareButtons();

    populateYearDropdown();

    deleteTaskButton.addEventListener('click', function(e) {
        e.preventDefault();

        let checkedTaskCheckboxes = document.querySelectorAll('#taskColumn .taskCell .taskCheckBox input[type="checkbox"]:checked');

        checkedTaskCheckboxes.forEach(function(checkbox) {
            let taskCell = checkbox.closest('.taskCell');
            if (taskCell) {
                taskCell.remove();
            }
        });

        saveTasksToAppData();
    });

    loadTasksFromAppData();
    loadUserTagsFromAppData();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let taskFormElements = taskFormDeclareElements;

        if (taskDescriptionValue !== "") {
            taskFormElements.taskDescriptionEntry.value = taskFormElements.savedTaskDescriptionEntry || '';
            taskFormElements.taskTagEntry.value = taskFormElements.savedTaskTagEntry || '';

            localStorage.setItem('taskDescriptionEntry', taskForm.taskDescriptionValue);
            localStorage.setItem('taskTagEntry', taskForm.taskTagValue);

            createTask(taskFormElements.taskDescriptionValue, taskForm.taskTagValue);

            taskFormElements.taskDescriptionEntry.value = '';
            taskFormElements.taskTagEntry.value = '';
        } else {
            window.alert('Please enter a task description.');
        }
    });

    document.getElementById('taskDescriptionEntry').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('taskSubmitButton').click();
        }
    });

    let tagListModal = document.getElementById('tagListModal');
    let tagListModalButton = document.getElementById('tagListModalButton');
    let closeTagListModal = document.getElementsByClassName('close')[0];

    tagListModalButton.onclick = function(e) {
        e.preventDefault();
        tagListModal.style.display = "block";
    }

    closeTagListModal.onclick = function() {
        tagListModal.style.display = "none";
    }

    window.onclick = function(e) {
        if (e.target == tagListModal) {
            tagListModal.style.display = "none";
        }
    }

    importInput.type = 'file';
    importInput.style.display = 'none';
    importInput.addEventListener('change', importAppData);
    
    exportButton.addEventListener('click', function(e) {
        e.preventDefault();
        exportAppData();
    });
    
    importButton.addEventListener('click', function(e) {
        e.preventDefault();
        let placeholder = document.getElementById('taskColumnPlaceholder');
        if (placeholder) {
            placeholder.remove();
        }
        importInput.click();
    });
    
    document.body.appendChild(importInput);
});
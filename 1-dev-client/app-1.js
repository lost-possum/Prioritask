// version 1 - split 10:26PM 06/29/2024

var taskCount = 0;
const currentYear = new Date().getFullYear();

document.getElementById('newTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    

    var taskInput = document.getElementById('taskDescriptionEntry').value;
    
    if (taskInput.trim() !== "") {
        taskCount++;

        var taskTopRowDiv = document.createElement('div');
        var taskNumberBoxDiv = document.createElement('div');
        var taskTopRightBarDiv = document.createElement('div');
        var taskMainDiv = document.createElement('div');
        var taskTagRowDiv = document.createElement('div');
        var taskBottomRowDiv = document.createElement('div');
        var taskInfoBarDiv = document.createElement('div');
        var taskCheckBoxDiv = document.createElement('div');

        var selectedMonth = document.getElementById('monthDropdown').value;
        var selectedDay = document.getElementById('dayDropdown').value;
        var selectedHour = document.getElementById('hourDropdown').value;
        var selectedMinute = document.getElementById('minuteDropdown').value;
        var selectedAMPM = document.getElementById('amPMDropdown').value;
        var selectedYear = document.getElementById('yearDropdown').value;
        var selectedPriority = document.getElementById('priorityDropdown').value;
        console.log('')

        function populateYearDropdown() {
            const yearDropdown = document.getElementById('yearDropdown');
            const options = yearDropdown.getElementsByTagName('option');
            for (let i = 1; i < options.length; i++) {
                options[i].value = currentYear + (i - 1);
                options[i].id = `optionYear${currentYear + (i -1)}`;
                options[i].textContent = currentYear + (i - 1);
            }
        }

        populateYearDropdown();

        var taskTimeSkipCheckbox = document.getElementById('taskTimeSkipCheckBox');

        taskTopRowDiv.className = 'taskTopRow';
        taskNumberBoxDiv.className = 'taskNumberBox';
        taskTopRightBarDiv.className = 'taskTopRightBar';
        taskMainDiv.className = 'taskMain';
        taskTagRowDiv.className = 'taskTagRow';
        taskBottomRowDiv.className = 'taskBottomRow';
        taskInfoBarDiv.className = 'taskInfoBar';
        taskCheckBoxDiv.className = 'taskCheckBox';
        console.log('Class names assigned to new DOM elements');

        taskTopRowDiv.id = `taskTopRow-task${taskCount}`;
        taskNumberBoxDiv.id = `taskNumberBox-task${taskCount}`;
        taskTopRightBarDiv.id = `taskTopRightBar-task${taskCount}`;
        taskMainDiv.id = `taskMain-task${taskCount}`;
        taskTagRowDiv.id = `taskTagRow-task${taskCount}`;
        taskBottomRowDiv.id = `taskBottomRow-task${taskCount}`;
        taskInfoBarDiv.id = `taskInfoBar-task${taskCount}`;
        taskCheckBoxDiv.id = `taskCheckBoxDiv-task${taskCount}`;
        console.log('IDs assigned to new DOM elements')

        if ((selectedMonth === '' || selectedDay === '' || selectedHour === '' || selectedMinute === '' || selectedAMPM === '') && (!taskTimeSkipCheckbox.checked))  {
            window.alert('Please enter a complete time and date or select "skip"');
            return;
        }

        document.addEventListener('DOMContentLoaded', function() {
            if (selectedPriority === '') {
                window.alert("Please select a task priority (you can choose skip if you'd like to leave this empty)");
            }
        });

        taskNumberBoxDiv.textContent = taskCount.toString();

        document.addEventListener('DOMContentLoaded', function() {
            console.log('taskTimeSkipCheckbox is type ' + typeof taskTimeSkipCheckbox);
            if (!taskTimeSkipCheckbox.checked) {
                taskTopRightBarDiv.textContent = `complete by ${selectedHour}:${selectedMinute} ${selectedAMPM} on ${selectedMonth} ${selectedDay}, ${selectedYear} `;
            } else {
                taskTopRightBarDiv.textContent = '';
            }
        });

        taskMainDiv.textContent = taskInput;
        taskBottomRowDiv.textContent = `priority ${selectedPriority}`;

        taskTopRowDiv.appendChild(taskNumberBoxDiv);
        taskTopRowDiv.appendChild(taskTopRightBarDiv);
        taskBottomRowDiv.appendChild(taskInfoBarDiv);
        taskBottomRowDiv.appendChild(taskCheckBoxDiv);

        var taskCells = document.querySelectorAll('.taskCell');
        for (var i = 0; i < taskCells.length; i++) {
            if (taskCells[i].textContent.trim() === "") {
                taskCells[i].appendChild(taskTopRowDiv);
                taskCells[i].appendChild(taskMainDiv);
                taskCells[i].appendChild(taskTagRowDiv);
                taskCells[i].appendChild(taskBottomRowDiv);
                console.log(`Created user task #${taskCount}`);
                break;
            }
        }

        document.getElementById('taskDescriptionEntry').value = '';
    } else {
        console.log('Please enter a task description');
    }
});

document.getElementById('taskDescriptionEntry').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        document.getElementById('taskSubmitButton').click(); 
    }
});
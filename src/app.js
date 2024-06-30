document.addEventListener('DOMContentLoaded', function() {
    var taskCount = 0;
    const currentYear = new Date().getFullYear();

    function populateYearDropdown() {
        const yearDropdown = document.getElementById('yearDropdown');
        const options = yearDropdown.getElementsByTagName('option');
        for (let i = 1; i < options.length; i++) {
            options[i].value = currentYear + (i - 1);
            options[i].id = `optionYear${currentYear + (i - 1)}`;
            options[i].textContent = currentYear + (i - 1);
        }
    }

    populateYearDropdown();

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

            var taskTimeSkipCheckbox = document.getElementById('taskTimeSkipCheckbox');

            if (!taskTimeSkipCheckbox) {
                console.error('taskTimeSkipCheckbox element not found.');
                return;
            }

            taskTopRowDiv.className = 'taskTopRow';
            taskNumberBoxDiv.className = 'taskNumberBox';
            taskTopRightBarDiv.className = 'taskTopRightBar';
            taskMainDiv.className = 'taskMain';
            taskTagRowDiv.className = 'taskTagRow';
            taskBottomRowDiv.className = 'taskBottomRow';
            taskInfoBarDiv.className = 'taskInfoBar';
            taskCheckBoxDiv.className = 'taskCheckBox';

            taskTopRowDiv.id = `taskTopRow-task${taskCount}`;
            taskNumberBoxDiv.id = `taskNumberBox-task${taskCount}`;
            taskTopRightBarDiv.id = `taskTopRightBar-task${taskCount}`;
            taskMainDiv.id = `taskMain-task${taskCount}`;
            taskTagRowDiv.id = `taskTagRow-task${taskCount}`;
            taskBottomRowDiv.id = `taskBottomRow-task${taskCount}`;
            taskInfoBarDiv.id = `taskInfoBar-task${taskCount}`;
            taskCheckBoxDiv.id = `taskCheckBoxDiv-task${taskCount}`;

            if ((selectedMonth === '' || selectedDay === '' || selectedHour === '' || selectedMinute === '' || selectedAMPM === '') && (!taskTimeSkipCheckbox.checked)) {
                window.alert('Please enter a complete time and date or select "skip"');
                return;
            }

            if (selectedPriority === '') {
                window.alert('Please select a task priority or choose "skip"');
                return;
            }

            taskNumberBoxDiv.textContent = taskCount.toString();

            if (taskTimeSkipCheckbox.checked) {
                taskTopRightBarDiv.textContent = '';
            } else {
                taskTopRightBarDiv.textContent = `complete by ${selectedHour}:${selectedMinute} ${selectedAMPM} on ${selectedMonth} ${selectedDay}, ${selectedYear} `;
            };

            taskMainDiv.textContent = taskInput;

            var tagsInput = document.getElementById('taskTagEntry').value;
            var tagsArray = tagsInput.split(' ');
            var processedTags = [];

            if (tagsInput.trim() !== '') {
                for (var i = 0; i < tagsArray.length; i++) {
                    var tag = tagsArray[i].trim();

                    if (tag.startsWith('#')) {
                        var processedTag = tag.substring(1);
                        processedTags.push(processedTag);
                        console.log(processedTags);
                    } else {
                        window.alert('Please use the correct tag format (#tag1 #tag2 #tag3...');
                        break;
                    }
                }
            };

            processedTags.forEach(function(tag) {
                var tagElement = docuemnt.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                taskTagRowDiv.appendChild(tagElement);
            });

            if (selectedPriority === 'skip') {
                console.log('Task priority input skipped');
            } else {
            taskInfoBarDiv.textContent = `priority ${selectedPriority}`;
            }

            taskTopRowDiv.appendChild(taskNumberBoxDiv);
            taskTopRowDiv.appendChild(taskTopRightBarDiv);
            taskBottomRowDiv.appendChild(taskCheckBoxDiv);
            taskBottomRowDiv.appendChild(taskInfoBarDiv);

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
            document.getElementById('taskTagEntry').value = '';
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
});

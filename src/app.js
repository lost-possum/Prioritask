document.addEventListener('DOMContentLoaded', function() {
    var taskCount = 0;
    var currentYear = new Date().getFullYear();

    function populateYearDropdown() {
        const yearDropdown = document.getElementById('yearDropdown');
        const options = yearDropdown.getElementsByTagName('option');
        const selectedYearValue = localStorage.getItem('selectedYearValue');

        for (let i = 1; i < options.length; i++) {
            options[i].value = currentYear + (i - 1);
            options[i].id = `optionYear-${currentYear + (i - 1)}`;
            options[i].textContent = currentYear + (i - 1);
        }

        if (selectedYearValue && yearDropdown.querySelector(`option[value="${selectedYearValue}"]`)) {
            yearDropdown.value = selectedYearValue;
        } else {
            localStorage.removeItem('selectedYearValue');
        }

        yearDropdown.addEventListener('change', function() {
            localStorage.setItem('selectedYearValue', yearDropdown.value);
        });
    }

    populateYearDropdown();

    function populateTagSelector() {
        var tags = ['#work', '#personal', '#urgent', '#important', '#shopping'];
        var tagSelector = document.getElementById('tagSelector');
        tagSelector.innerHTML = '';

        tags.forEach(function(tag) {
            var tagElement = document.createElement('div');
            tagElement.classList.add('tag-selector-tag');
            tagElement.textContent = tag;

            tagElement.addEventListener('click', function() {
                addTagToEntry(tag);
            });

            tagSelector.appendChild(tagElement);
        });
    }

    function addTagToEntry(tag) {
        var taskTagEntry = document.getElementById('taskTagEntry');
        var currentValue = taskTagEntry.value.trim();

        if (currentValue === '') {
            taskTagEntry.value = tag;
        } else {
            taskTagEntry.value = currentValue + ' ' + tag;
        }
    }

    var openTagSelectorButton = document.getElementById('openTagSelectorButton');
    openTagSelectorButton.addEventListener('click', function() {
        var tagSelector = document.getElementById('tagSelector');
        tagSelector.style.display = 'block';
    });

    document.addEventListener('click', function(e) {
        var tagSelectorContainer = document.getElementById('tagSelectorContainer');
        if (!tagSelectorContainer.contains(e.target)) {
            var tagSelector = document.getElementById('tagSelector');
            tagSelector.style.display = 'none';
        }
    });

    populateTagSelector();

    var taskForm = document.getElementById('newTaskForm');
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var taskDescriptionEntry = document.getElementById('taskDescriptionEntry');
        var taskTagEntry = document.getElementById('taskTagEntry');

        var taskDescriptionValue = taskDescriptionEntry.value.trim();
        var taskTagValue = taskTagEntry.value.trim();

        var savedTaskDescriptionEntry = localStorage.getItem('taskDescriptionEntry');
        var savedTaskTagEntry = localStorage.getItem('taskTagEntry');

        if (taskDescriptionValue !== "") {
            taskDescriptionEntry.value = savedTaskDescriptionEntry || '';
            taskTagEntry.value = savedTaskTagEntry || '';

            localStorage.setItem('taskDescriptionEntry', taskDescriptionValue);
            localStorage.setItem('taskTagEntry', taskTagValue);

            createTask(taskDescriptionValue, taskTagValue);

            taskDescriptionEntry.value = '';
            taskTagEntry.value = '';
        } else {
            window.alert('Please enter a task description.');
        }
    });

    function createTask(taskInput, tagsInput) {
        taskCount++;

        var taskCellDiv = document.createElement('div');
        var taskTopRowDiv = document.createElement('div');
        var taskNumberBoxDiv = document.createElement('div');
        var taskTopRightBarDiv = document.createElement('div');
        var taskMainDiv = document.createElement('div');
        var taskTagRowDiv = document.createElement('div');
        var taskTagRowBufferBoxDiv = document.createElement('div');
        var taskBottomRowDiv = document.createElement('div');
        var taskInfoBarDiv = document.createElement('div');
        var taskCheckBoxDiv = document.createElement('div');
        var ghostSpaceDiv = document.getElementById('ghostSpace');

        var selectedMonth = document.getElementById('monthDropdown').value;
        var selectedDay = document.getElementById('dayDropdown').value;
        var selectedHour = document.getElementById('hourDropdown').value;
        var selectedMinute = document.getElementById('minuteDropdown').value;
        var selectedAMPM = document.getElementById('amPMDropdown').value;
        var selectedYear = document.getElementById('yearDropdown').value;
        var selectedPriority = document.getElementById('priorityDropdown').value;

        var taskColumnPlaceholder = document.getElementById('taskColumnPlaceholder');
        var taskTimeSkipCheckbox = document.getElementById('taskTimeSkipCheckbox');

        if (!taskTimeSkipCheckbox) {
            console.error('taskTimeSkipCheckBox element not found.');
            return;
        }

        taskCellDiv.className = 'taskCell';
        taskTopRowDiv.className = 'taskTopRow';
        taskNumberBoxDiv.className = 'taskNumberBox';
        taskTopRightBarDiv.className = 'taskTopRightBar';
        taskMainDiv.className = 'taskMain';
        taskTagRowDiv.className = 'taskTagRow';
        taskTagRowBufferBoxDiv.className = 'taskTagRowBufferBox';
        taskBottomRowDiv.className = 'taskBottomRow';
        taskInfoBarDiv.className = 'taskInfoBar';
        taskCheckBoxDiv.className = 'taskCheckBox';

        taskCellDiv.id = `taskCell-task${taskCount}`;
        taskTopRowDiv.id = `taskTopRow-task${taskCount}`;
        taskNumberBoxDiv.id = `taskNumberBox-task${taskCount}`;
        taskTopRightBarDiv.id = `taskTopRightBar-task${taskCount}`;
        taskMainDiv.id = `taskMain-task${taskCount}`;
        taskTagRowDiv.id = `taskTagRow-task${taskCount}`;
        taskTagRowBufferBoxDiv.id = `taskTagRowBufferBox-task${taskCount}`;
        taskBottomRowDiv.id = `taskBottomRow-task${taskCount}`;
        taskInfoBarDiv.id = `taskInfoBar-task${taskCount}`;
        taskCheckBoxDiv.id = `taskCheckBoxDiv-task${taskCount}`;

        if ((selectedMonth === '' || selectedDay === '' || selectedYear === '' || selectedHour === '' || selectedMinute === '' || selectedAMPM === '') && (!taskTimeSkipCheckbox.checked)) {
            window.alert('Please complete time and date or select "skip"');
            return;
        }

        if (selectedPriority === '') {
            window.alert('Please select a task priority or choose "skip"');
            return;
        }

        taskNumberBoxDiv.textContent = taskCount.toString();

        var selectedMonthOption = document.getElementById('monthDropdown').options[document.getElementById('monthDropdown').selectedIndex];
        var selectedMonthOptionId = selectedMonthOption.id;
        var selectedMonthNumber = selectedMonthOptionId.split('-m')[1];
        var selectedMonthNumberInt = parseInt(selectedMonthNumber, 10);
        var selectedYearNumberInt = parseInt(selectedYear, 10);
        var selectedDayNumberInt = parseInt(selectedDay, 10);

        if (taskTimeSkipCheckbox.checked) {
            taskTopRightBarDiv.textContent = '';
        } else {
            var taskDate = new Date(selectedYearNumberInt, selectedMonthNumberInt - 1, selectedDayNumberInt);
            var taskDateDayOfWeek = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
            taskTopRightBarDiv.textContent = `complete by ${taskDateDayOfWeek}, ${selectedHour}:${selectedMinute} ${selectedAMPM} on ${selectedMonth} ${selectedDay}, ${selectedYear}`;
        }

        taskMainDiv.textContent = taskInput;

        var tagsArray = tagsInput.split(' ');
        var processedTags = [];

        if (tagsInput.trim() !== '') {
            for (var i = 0; i < tagsArray.length; i++) {
                var tag = tagsArray[i].trim();

                if (tag.startsWith('#')) {
                    var processedTag = tag.substring(1);
                    processedTags.push(processedTag);
                } else {
                    window.alert('Please use the correct tag format (#tag1 #tag2 #tag3...');
                    return;
                }
            }
        }

        taskTagRowDiv.appendChild(taskTagRowBufferBoxDiv);

        processedTags.forEach(function(tag) {
            var tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = '#' + tag;
            taskTagRowDiv.appendChild(tagElement);
            ghostSpaceDiv.appendChild(tagElement);
        });

        if (selectedPriority !== 'skip') {
            taskInfoBarDiv.textContent = `priority ${selectedPriority}`;
        }

        if (taskColumnPlaceholder !== null) {
            taskColumnPlaceholder.remove();
        }

        taskTopRowDiv.appendChild(taskNumberBoxDiv);
        taskTopRowDiv.appendChild(taskTopRightBarDiv);
        taskBottomRowDiv.appendChild(taskCheckBoxDiv);
        taskBottomRowDiv.appendChild(taskInfoBarDiv);
        taskCellDiv.appendChild(taskTopRowDiv);
        taskCellDiv.appendChild(taskMainDiv);
        taskCellDiv.appendChild(taskTagRowDiv);
        taskCellDiv.appendChild(taskBottomRowDiv);

        document.getElementById('taskColumn').appendChild(taskCellDiv);

        window.alert(`Task ${taskCount} successfully added to your list`);
    }

    document.getElementById('taskDescriptionEntry').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('taskSubmitButton').click();
        }
    });
});
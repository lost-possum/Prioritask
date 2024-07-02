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

    function loadTasksFromCookies() {
        var savedTasks = getCookie('savedTasks');
        if (savedTasks) {
            savedTasks = JSON.parse(savedTasks);
            savedTasks.forEach(function(taskData) {
                createTask(taskData.taskInput, taskData.tagsInput);
            });
        }
    }

    function loadUserTagsFromCookies() {
        var userTags = getCookie('userTags');
        if (userTags) {
            userTags = JSON.parse(userTags);
            createTagTable(userTags);
        }
    }

    function saveTasksToCookies() {
        var tasks = [];
        // collect task data and save to tasks array
        // example
        // tasks.push({ taskInput: taskInputValue, tagsInput: tagsInputValue});

        // convert tasks array to JSON string and set as cookies
        
        saveTasksToCookies('savedTasks', JSON.stringify(tasks, 30));
    }

    function saveUserTagsToCookies(tagsArray) {
        setCookie('userTags', JSON.stringify(tagsArray), 30);
    }

    // helper function to set cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + ";path=/";
    }

    // helper funtion to get cookie value by name
    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) ===0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    loadTasksFromCookies();
    loadUserTagsFromCookies();

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

        createTagTable(processedTags);

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

        window.alert(`Task ${taskCount} successfully added to your list!`);
        localStorage.removeItem('taskDescriptionEntry');
        localStorage.removeItem('taskTagEntry');

        var inputElements = document.querySelectorAll('input');
        inputElements.forEach(function(input) {
            input.style.overflow = 'hidden';
            input.style.overflow = '';
        });
    }

    function createTagTable(tagsArray) {
        var tagListInnerModalContent = document.getElementById('tagListInnerModalContent');
        var tagTable = document.getElementById('tagTable');
        var defaultTagTable = document.getElementById('defaultTagTable');

        if (defaultTagTable) {
            defaultTagTable.remove();
        };
 
        if (!tagTable) {
            tagTable = document.createElement('table');
            tagTable.id = 'tagTable';

            var tagHeaderRow = tagTable.insertRow();
            var tagHeaderCell = document.createElement('th');
            tagHeaderCell.id = 'tagHeaderCell';
            tagHeaderCell.textContent = 'Tags';
            tagHeaderRow.appendChild(tagHeaderCell);
            tagListInnerModalContent.appendChild(tagTable);
        };

        var existingTags = new Set();
        Array.from(tagTable.getElementsByClassName('tag')).forEach(tagElement => {
            existingTags.add(tagElement.textContent.trim());
        });

        tagsArray.forEach(function(tag) {
            tag = tag.trim();
            if (existingTags.has('#' + tag)) {
                return;
            }

            var tagRow = tagTable.insertRow();
            var tagCell = tagRow.insertCell();
            var tagElement = document.createElement('span');
            tagElement.className = 'tag'
            tagElement.textContent = '#' + tag;
            tagCell.appendChild(tagElement);
            existingTags.add('#' + tag);
        });
    };

    document.getElementById('taskDescriptionEntry').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('taskSubmitButton').click();
        }
    });

    var tagListModal = document.getElementById('tagListModal');
    var tagListModalButton = document.getElementById('tagListModalButton');
    var closeTagListModal = document.getElementsByClassName('close')[0];

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
});
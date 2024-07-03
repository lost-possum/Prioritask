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

        processedTags.forEach(function(tag, index) {
            var tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = `taskCell${taskCount}-tag${index + 1}`;
            tagElement.textContent = '#' + tag;
            taskTagRowDiv.appendChild(tagElement);
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
            tagHeaderCell.colSpan = 6;
            tagHeaderRow.appendChild(tagHeaderCell);

            var buttonRow = tagTable.insertRow();
            var buttonCell = document.createElement('td');
            buttonCell.colSpan = 6;
            buttonCell.style.textAlign = 'center';

            var tagCellSortButton = document.createElement('button');
            tagCellSortButton.textContent = 'Sort (A-Z)';
            tagCellSortButton.addEventListener('click', function(e) {
                e.preventDefault();
                sortTagsAZ();
            });

            var tagCellDeleteButton = document.createElement('button');
            tagCellDeleteButton.textContent = 'Delete Selected';
            tagCellDeleteButton.addEventListener('click', function(e) {
                e.preventDefault();
                deleteTags();
            });

            buttonCell.appendChild(tagCellSortButton);
            buttonCell.appendChild(tagCellDeleteButton);
            buttonRow.appendChild(buttonCell);
            tagListInnerModalContent.appendChild(tagTable);
        };

        var existingTags = new Set();
        Array.from(tagTable.getElementsByClassName('tag')).forEach(tagElement => {
            existingTags.add(tagElement.textContent.trim());
        });

        var currentRow = tagTable.insertRow();
        var tagCountInRow = 0;
        var tagListTagCount = 1;

        tagsArray.forEach(function(tag) {
            if (existingTags.size >= 42) {
                return;
            }

            tag = tag.trim();
            if (existingTags.has('#' + tag)) {
                return;
            }

            if (tagCountInRow >= 6) {
                currentRow = tagTable.insertRow();
                tagCountInRow = 0;
            }

            var tagCell = currentRow.insertCell();
            var tagContainer = document.createElement('div');
            tagContainer.className = 'tagContainer';

            var tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = `tagList-tag${tagListTagCount}`;
            tagElement.textContent = '#' + tag;

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'tagCheckbox';

            tagContainer.appendChild(tagElement);
            tagContainer.appendChild(checkbox);
            tagCell.appendChild(tagContainer);

            existingTags.add('#' + tag);
            tagCountInRow++;
            tagListTagCount++;
        });
    };

    function sortTagsAZ() {
        var tagTable = document.getElementById('tagTable');
        if (!tagTable) return;

        var tagsArray = Array.from(tagTable.getElementsByClassName('tag')).map(tagElement => tagElement.textContent.trim().substring(1));

        tagsArray.sort();

        while (tagTable.rows.length > 2) {
            tagTable.deleteRow(2);
        }

        var currentRow = tagTable.insertRow();
        var tagCountInRow = 0;
        var tagListTagCount = 1;

        tagsArray.forEach(function(tag) {
            if (tagCountInRow >= 6) {
                currentRow = tagTable.insertRow();
                tagCountInRow = 0;
            }

            var tagCell = currentRow.insertCell();
            var tagContainer = document.createElement('div');
            tagContainer.className = 'tagContainer';

            var tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = `tagList-tag${tagListTagCount}`;
            tagElement.textContent = '#' + tag;

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'tagCheckbox';

            tagContainer.appendChild(tagElement);
            tagContainer.appendChild(checkbox);
            tagCell.appendChild(tagContainer);

            tagCountInRow++;
            tagListTagCount++;
        });
    }

    function deleteTags() {
        var tagTable = document.getElementById('tagTable');
        if (!tagTable) return;

        var checkboxes = tagTable.getElementsByClassName('tagCheckbox');
        var tagsToDelete = [];

        Array.from(checkboxes).forEach(function(checkbox) {
            if (checkbox.checked) {
                tagsToDelete.push(checkbox.closest('.tagContainer'));
            }
        });

        tagsToDelete.forEach(function(tagContainer) {
            tagContainer.parentElement.remove();
        });

        var remainingTags = Array.from(tagTable.getElementsByClassName('tag'));
        var tagListTagCount = 1;

        var currentRow;
        remainingTags.forEach(function(tagElement, index) {
            if (index % 6 === 0) {
                currentRow = tagTable.rows[Math.floor(index / 6) + 2];
            }
            var tagCell = currentRow.cells[index % 6];
            var tagContainer = tagCell.getElementsByClassName('tagContainer')[0];
            tagContainer.querySelector('.tag').id = `tagList-tag${tagListTagCount}`;
            tagListTagCount++;
        });
    }

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
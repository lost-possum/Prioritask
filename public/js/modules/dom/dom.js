// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { newTaskDeclareElements, declareDropdownContent } from "../declarations.js";


function removePlaceholderIfTaskExists() {
    let placeholderExists = document.querySelector('#taskColumn #taskColumnPlaceholder') !== null;
    let taskCellExists = document.querySelector('#taskColumn .taskCell') !== null;

    if ((placeholderExists && taskCellExists)) {
    document.getElementById('taskColumnPlaceholder').remove();
    }
};


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
};


function createTask(taskInput, tagsInput, newTaskElements) {
    taskCount++;

        newTaskElements = newTaskDeclareElements(taskCount);

        if ((selectedMonth === '' || selectedDay === '' || selectedYear === '' || selectedHour === '' || selectedMinute === '' || selectedAMPM === '') && (!taskTimeSkipCheckbox.checked)) {
            window.alert('Please complete time and date or select "skip"');
            return;
        }

        if (selectedPriority === '') {
            window.alert('Please select a task priority or choose "skip"');
            return;
        }

        taskNumberBoxDiv.textContent = taskCount.toString();

        let dropdownContents = declareDropdownContent();

        if (taskTimeSkipCheckbox.checked) {
            taskTopRightBarDiv.textContent = '';
        } else {
            let taskDate = new Date(selectedYearNumberInt, selectedMonthNumberInt - 1, selectedDayNumberInt);
            let taskDateDayOfWeek = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
            taskTopRightBarDiv.textContent = `complete by ${taskDateDayOfWeek}, ${selectedHour}:${selectedMinute} ${selectedAMPM} on ${selectedMonth} ${selectedDay}, ${selectedYear}`;
        }

        taskMainDiv.textContent = taskInput;

        let tagsArray = tagsInput.split(' ');
        let processedTags = [];

        if (tagsInput.trim() !== '') {
            for (let i = 0; i < tagsArray.length; i++) {
                let tag = tagsArray[i].trim();

                if (tag.startsWith('#')) {
                    let processedTag = tag.substring(1);
                    processedTags.push(processedTag);
                } else {
                    window.alert('Please use the correct tag format (#tag1 #tag2 #tag3...');
                    return;
                }
            }
        }

        processedTags.forEach(function(tag, index) {
            let tagElement = document.createElement('span');
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

        appendTaskChildren(newTaskElements);

        document.getElementById('taskColumn').appendChild(taskCellDiv);

        let placeholder = document.getElementById('taskColumnPlaceholder');
        if (placeholder) {
            
        }
        window.alert(`Task ${taskCount} successfully added to your list!`);
        localStorage.removeItem('taskDescriptionEntry');
        localStorage.removeItem('taskTagEntry');

        let inputElements = document.querySelectorAll('input');
        inputElements.forEach(function(input) {
            input.style.overflow = 'hidden';
            input.style.overflow = '';
        });

        removePlaceholderIfTaskExists();
        saveTasksToAppData();

        return taskCount, dropdownContents;
};


export { removePlaceholderIfTaskExists, populateYearDropdown, createTask };
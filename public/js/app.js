// Prioritask - Version 0.0.8 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE

// This code comes with ABSOLUTELY NO WARRANTY. I cannot even BEGIN to guarantee it will perform its intended functionality in its current form

// Welcome to my first full-fledged project. I know it is an absolute mess right now, but I'm working on it as best as I can. I'm fully aware it desperately needs a solid refactoring, and I'm going to work through that process piece by piece. I preface this work by stating I am a beginner on the road to becoming a programmer. Many parts of this code, such as cookie generation, JSON import, and dynamic DOM manipulation are the first time I have worked with such features. 

// You will likely experience bugs when working with this application, some of which I am fully aware of but have not yet had time to fix. That said, feel free to reach out to me with bug reports at the email address or Signal username I have listed above and I will respond to them when time allows.

// BEGIN CODE



import { taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent } from "./export.js";
import { removePlaceholderIfTaskExists, populateYearDropdown, newTaskDefineElements } from "./export.js";
import { setAppData, saveUserTagsToAppData, saveTasksToAppData, loadTasksFromAppData, loadUserTagsFromAppData } from "./export.js";;


document.addEventListener('DOMContentLoaded', function() {
    const deleteTaskButton = document.getElementById('deleteTaskButton');

    let taskCount = 0;
    let currentYear = new Date().getFullYear();

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

    let taskForm = document.getElementById('newTaskForm');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let taskForm = taskFormDeclareElements;

        if (taskDescriptionValue !== "") {
            taskForm.taskDescriptionEntry.value = taskForm.savedTaskDescriptionEntry || '';
            taskForm.taskTagEntry.value = taskForm.savedTaskTagEntry || '';

            localStorage.setItem('taskDescriptionEntry', taskForm.taskDescriptionValue);
            localStorage.setItem('taskTagEntry', taskForm.taskTagValue);

            createTask(taskForm.taskDescriptionValue, taskForm.taskTagValue);

            taskForm.taskDescriptionEntry.value = '';
            taskForm.taskTagEntry.value = '';
        } else {
            window.alert('Please enter a task description.');
        }
    });

    function createTask(taskInput, tagsInput) {
        taskCount++;

        newTaskElements = newTaskDeclareElements();

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

        taskCheckBoxDiv.appendChild(taskCheckBoxInput);
        taskTopRowDiv.appendChild(taskNumberBoxDiv);
        taskTopRowDiv.appendChild(taskTopRightBarDiv);
        taskBottomRowDiv.appendChild(taskCheckBoxDiv);
        taskBottomRowDiv.appendChild(taskInfoBarDiv);
        taskCellDiv.appendChild(taskTopRowDiv);
        taskCellDiv.appendChild(taskMainDiv);
        taskCellDiv.appendChild(taskTagRowDiv);
        taskCellDiv.appendChild(taskBottomRowDiv);

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
    }

    function createTaskFromData(taskData) {
        taskCount++;
    
        let taskCellDiv = document.createElement('div');
        let taskTopRowDiv = document.createElement('div');
        let taskNumberBoxDiv = document.createElement('div');
        let taskTopRightBarDiv = document.createElement('div');
        let taskMainDiv = document.createElement('div');
        let taskTagRowDiv = document.createElement('div');
        let taskBottomRowDiv = document.createElement('div');
        let taskInfoBarDiv = document.createElement('div');
        let taskCheckBoxDiv = document.createElement('div');
        let taskCheckBoxInput = document.createElement('input');
    
        taskCellDiv.className = 'taskCell';
        taskTopRowDiv.className = 'taskTopRow';
        taskNumberBoxDiv.className = 'taskNumberBox';
        taskTopRightBarDiv.className = 'taskTopRightBar';
        taskMainDiv.className = 'taskMain';
        taskTagRowDiv.className = 'taskTagRow';
        taskBottomRowDiv.className = 'taskBottomRow';
        taskInfoBarDiv.className = 'taskInfoBar';
        taskCheckBoxDiv.className = 'taskCheckBox';
    
        taskCellDiv.id = `taskCell-task${taskCount}`;
        taskTopRowDiv.id = `taskTopRow-task${taskCount}`;
        taskNumberBoxDiv.id = `taskNumberBox-task${taskCount}`;
        taskTopRightBarDiv.id = `taskTopRightBar-task${taskCount}`;
        taskMainDiv.id = `taskMain-task${taskCount}`;
        taskTagRowDiv.id = `taskTagRow-task${taskCount}`;
        taskBottomRowDiv.id = `taskBottomRow-task${taskCount}`;
        taskInfoBarDiv.id = `taskInfoBar-task${taskCount}`;
        taskCheckBoxDiv.id = `taskCheckBoxDiv-task${taskCount}`;
    
        let taskTopRowData = taskData[`taskTopRow-task${taskCount}`];
        if (taskTopRowData) {
            taskNumberBoxDiv.textContent = taskTopRowData[`taskNumberBox-task${taskCount}`]?.text || '';
            taskTopRightBarDiv.textContent = taskTopRowData[`taskTopRightBar-task${taskCount}`]?.text || '';
        }
    
        let taskMainData = taskData[`taskMain-task${taskCount}`];
        if (taskMainData) {
            taskMainDiv.textContent = taskMainData.text || '';
        }
    
        let taskTagRowData = taskData[`taskTagRow-task${taskCount}`];
        if (taskTagRowData) {
            for (let tagId in taskTagRowData) {
                if (tagId !== `taskTagRow-task${taskCount}`) {
                    let tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.id = tagId;
                    tagElement.textContent = taskTagRowData[tagId];
                    taskTagRowDiv.appendChild(tagElement);
                }
            }
        }
    
        let taskBottomRowData = taskData[`taskBottomRow-task${taskCount}`];
        if (taskBottomRowData) {
            taskInfoBarDiv.textContent = taskBottomRowData[`taskInfoBar-task${taskCount}`]?.text || '';
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
        removePlaceholderIfTaskExists();
    }  

    function createTagTable(tagsArray) {
        let tagListInnerModalContent = document.getElementById('tagListInnerModalContent');
        let tagTable = document.getElementById('tagTable');
        let defaultTagTable = document.getElementById('defaultTagTable');

        if (defaultTagTable) {
            defaultTagTable.remove();
        }

        if (!tagTable) {
            tagTable = document.createElement('table');
            tagTable.id = 'tagTable';

            let tagHeaderRow = tagTable.insertRow();
            let tagHeaderCell = document.createElement('th');
            tagHeaderCell.id = 'tagHeaderCell';
            tagHeaderCell.textContent = 'Tags';
            tagHeaderCell.colSpan = 6;
            tagHeaderRow.appendChild(tagHeaderCell);

            let buttonRow = tagTable.insertRow();
            let buttonCell = document.createElement('td');
            buttonCell.colSpan = 6;
            buttonCell.style.textAlign = 'center';

            let tagCellSortButton = document.createElement('button');
            tagCellSortButton.textContent = 'Sort (A-Z)';
            tagCellSortButton.addEventListener('click', function(e) {
                e.preventDefault();
                sortTagsAZ();
            });

            let tagCellDeleteButton = document.createElement('button');
            tagCellDeleteButton.textContent = 'Delete Selected';
            tagCellDeleteButton.addEventListener('click', function(e) {
                e.preventDefault();
                deleteTags();
            });

            buttonCell.appendChild(tagCellSortButton);
            buttonCell.appendChild(tagCellDeleteButton);
            buttonRow.appendChild(buttonCell);
            tagListInnerModalContent.appendChild(tagTable);
        }

        let existingTags = new Set();
        Array.from(tagTable.getElementsByClassName('tag')).forEach(tagElement => {
            existingTags.add(tagElement.textContent.trim());
        });

        let currentRow = tagTable.insertRow();
        let tagCountInRow = 0;
        let tagListTagCount = 1;

        tagsArray.forEach(function(tag) {
            tag = tag.trim();
            if (existingTags.has('#' + tag)) {
                return;
            }

            if (tagCountInRow >= 6) {
                currentRow = tagTable.insertRow();
                tagCountInRow = 0;
            }

            let tagCell = currentRow.insertCell();
            let tagContainer = document.createElement('div');
            tagContainer.className = 'tagContainer';

            let tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = `tagList-tag${tagListTagCount}`;
            tagElement.textContent = '#' + tag;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'tagCheckbox';

            tagContainer.appendChild(tagElement);
            tagContainer.appendChild(checkbox);
            tagCell.appendChild(tagContainer);

            existingTags.add('#' + tag);
            tagCountInRow++;
            tagListTagCount++;
        });
    }

    function createTagTableFromData(tags) {
        let tagListInnerModalContent = document.getElementById('tagListInnerModalContent');
        let tagTable = document.getElementById('tagTable');
        let defaultTagTable = document.getElementById('defaultTagTable');

        if (defaultTagTable) {
            defaultTagTable.remove();
        }

        if (!tagTable) {
            tagTable = document.createElement('table');
            tagTable.id = 'tagTable';

            let tagHeaderRow = tagTable.insertRow();
            let tagHeaderCell = document.createElement('th');
            tagHeaderCell.id = 'tagHeaderCell';
            tagHeaderCell.textContent = 'Tags';
            tagHeaderCell.colSpan = 6;
            tagHeaderRow.appendChild(tagHeaderCell);

            let buttonRow = tagTable.insertRow();
            let buttonCell = document.createElement('td');
            buttonCell.colSpan = 6;
            buttonCell.style.textAlign = 'center';

            let tagCellSortButton = document.createElement('button');
            tagCellSortButton.textContent = 'Sort (A-Z)';
            tagCellSortButton.addEventListener('click', function(e) {
                e.preventDefault();
                sortTagsAZ();
            });

            let tagCellDeleteButton = document.createElement('button');
            tagCellDeleteButton.textContent = 'Delete Selected';
            tagCellDeleteButton.addEventListener('click', function(e) {
                e.preventDefault();
                deleteTags();
            });

            buttonCell.appendChild(tagCellSortButton);
            buttonCell.appendChild(tagCellDeleteButton);
            buttonRow.appendChild(buttonCell);
            tagListInnerModalContent.appendChild(tagTable);
        }

        let existingTags = new Set();
        Array.from(tagTable.getElementsByClassName('tag')).forEach(tagElement => {
            existingTags.add(tagElement.textContent.trim());
        });

        let currentRow = tagTable.insertRow();
        let tagCountInRow = 0;
        let tagListTagCount = 1;

        for (let tagId in tags) {
            let tag = tags[tagId].trim();
            if (existingTags.has('#' + tag)) {
                continue;
            }

            if (tagCountInRow >= 6) {
                currentRow = tagTable.insertRow();
                tagCountInRow = 0;
            }

            let tagCell = currentRow.insertCell();
            let tagContainer = document.createElement('div');
            tagContainer.className = 'tagContainer';

            let tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = tagId;
            tagElement.textContent = '#' + tag;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'tagCheckbox';

            tagContainer.appendChild(tagElement);
            tagContainer.appendChild(checkbox);
            tagCell.appendChild(tagContainer);

            existingTags.add('#' + tag);
            tagCountInRow++;
            tagListTagCount++;
        }
    }

    function sortTagsAZ() {
        let tagTable = document.getElementById('tagTable');
        if (!tagTable) return;

        let tagsArray = Array.from(tagTable.getElementsByClassName('tag')).map(tagElement => tagElement.textContent.trim().substring(1));

        tagsArray.sort();

        while (tagTable.rows.length > 2) {
            tagTable.deleteRow(2);
        }

        let currentRow = tagTable.insertRow();
        let tagCountInRow = 0;
        let tagListTagCount = 1;

        tagsArray.forEach(function(tag) {
            if (tagCountInRow >= 6) {
                currentRow = tagTable.insertRow();
                tagCountInRow = 0;
            }

            let tagCell = currentRow.insertCell();
            let tagContainer = document.createElement('div');
            tagContainer.className = 'tagContainer';

            let tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.id = `tagList-tag${tagListTagCount}`;
            tagElement.textContent = '#' + tag;

            let checkbox = document.createElement('input');
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
        let tagTable = document.getElementById('tagTable');
        if (!tagTable) return;

        let checkboxes = tagTable.getElementsByClassName('tagCheckbox');
        let tagsToDelete = [];

        Array.from(checkboxes).forEach(function(checkbox) {
            if (checkbox.checked) {
                tagsToDelete.push(checkbox.closest('.tagContainer'));
            }
        });

        tagsToDelete.forEach(function(tagContainer) {
            tagContainer.parentElement.remove();
        });

        let remainingTags = Array.from(tagTable.getElementsByClassName('tag'));
        let tagListTagCount = 1;

        let currentRow;
        remainingTags.forEach(function(tagElement, index) {
            if (index % 6 === 0) {
                currentRow = tagTable.rows[Math.floor(index / 6) + 2];
            }
            let tagCell = currentRow.cells[index % 6];
            let tagContainer = tagCell.getElementsByClassName('tagContainer')[0];
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

    function exportAppData() {
        saveTasksToAppData();
        saveUserTagsToAppData();

        let tasks = getAppData('savedTasks');
        let tags = getAppData('userTags');
        
        let data = {
            tasks: tasks ? JSON.parse(tasks) : [],
            tags: tags ? JSON.parse(tags) : []
        };
        
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "prioritask-data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    function importAppData(e) {
        let file = e.target.files[0];
        let fileName = file.name;
        let fileExtension = fileName.split('.').pop().toLowerCase();

        if (fileExtension !== 'json') {
            alert('Invalid file format. Please upload a JSON file.');
            return;
        }
        
        if (!file) {
            return;
        }
        
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = JSON.parse(e.target.result);
            
            if (data.tasks) {
                setAppData('savedTasks', JSON.stringify(data.tasks), 30);
            }
            
            if (data.tags) {
                setAppData('userTags', JSON.stringify(data.tags), 30);
            }
    
            // Remove existing tasks before loading new ones
            let taskColumn = document.getElementById('taskColumn');

            while (taskColumn.firstChild) {
                taskColumn.removeChild(taskColumn.firstChild);
            }
    
            loadTasksFromAppData();
            loadUserTagsFromAppData();
        };

        reader.readAsText(file);

        removePlaceholderIfTaskExists();
    }
    
    let exportButton = document.getElementById('appDataExportButton');
    let importButton = document.getElementById('appDataImportButton');
    let importInput = document.createElement('input');
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
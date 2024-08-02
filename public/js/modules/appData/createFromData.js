// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { sortTagsAZ, deleteTags, appendChildrenForCreateTaskFromData } from "../dom/tags";


function createTagTableFromData(tags, tagTable, tagListInnerModalContent, defaultTagTable) {
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
        tagCellSortButton.id = 'tagCellSortButton';
        tagCellSortButton.textContent = 'Sort (A-Z)';

        tagCellSortButton.addEventListener('click', function(e) {
            e.preventDefault();
            sortTagsAZ();
        });

        let tagCellDeleteButton = document.createElement('button');
        tagCellDeleteButton.id = 'tagCellDeleteButton';
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

    console.log('Execution of createTagTableFromData() complete; returning tagCountInRow and tagListTagCount');
    console.log('tagCountInRow: ', tagCountInRow, ' tagListTagCount: ', tagListTagCount);

    return tagCountInRow, tagListTagCount;
};


function createTaskFromData(taskCount, taskData, taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskCheckBoxDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv) {
    console.log('Executing createTaskFromData()');

    taskCount++;
    console.log('Increasing taskCount by 1; new taskCount: ', taskCount);

    let { taskNumberBoxDiv, taskTopRightBarDiv, taskMainDiv, taskTagRowDiv, taskInfoBarDiv }  = newTaskDeclareElements(taskCount);
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
    
    appendChildrenForCreateTaskFromData(taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskCheckBoxDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv);

    return taskCount;
};


export { createTagTableFromData, createTaskFromData };
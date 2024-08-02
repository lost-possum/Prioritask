// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



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

    return tagCountInRow, tagListTagCount;
};


function sortTagsAZ(tagTable) {
    let tagTable = document.getElementById('tagTable');
        
    if (!tagTable) {
        console.error('tagTable not found; terminating sortTagsAZ()');
        return;
    };

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

    return tagCountInRow, tagListTagCount;
};


function deleteTags() {
    let tagTable = document.getElementById('tagTable');

     if (!tagTable) {
        console.error('tagTable does not exist. Terminating deleteTags()');
        return;
     }

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
    
    return tagListTagCount;
};


export { createTagTable, sortTagsAZ, deleteTags };
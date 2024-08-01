// Prioritask - Version 0.0.8 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { declareDropdownContent } from "./declarations.js";


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


function createTask(taskInput, tagsInput) {
   
};

export { removePlaceholderIfTaskExists, populateYearDropdown, createTask };
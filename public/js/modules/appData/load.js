// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { getAppData, createTagTableFromData, createTaskFromData, removePlaceholderIfTaskExists } from "../../export.js";


function loadUserTagsFromAppData() {
    let userTags = getAppData('userTags');
    if (userTags) {
        userTags = JSON.parse(userTags).tags;
        createTagTableFromData(userTags);
    }
};


function loadTasksFromAppData(taskCount, taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskCheckBoxDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv) {
    let savedTasks = getAppData('savedTasks');

    if (savedTasks) {
        savedTasks = JSON.parse(savedTasks).tasks;
        for (let taskId in savedTasks) {
            let taskData = savedTasks[taskId];
            createTaskFromData(taskCount, taskData, taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskCheckBoxDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv);
        }
    }

    removePlaceholderIfTaskExists();
};


export { loadUserTagsFromAppData, loadTasksFromAppData };
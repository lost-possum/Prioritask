// Prioritask - Version 0.0.8 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { removePlaceholderIfTaskExists } from "../export.js";


function setAppData(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + ";path=/";
};


function getAppData(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};


function saveTasksToAppData() {
    let tasks = {};
    let taskCells = document.querySelectorAll('.taskCell');

    taskCells.forEach(function(taskCell) {
        let taskCount = taskCell.id.split('-task')[1];
        let taskTopRow = taskCell.querySelector('.taskTopRow');
        let taskMain = taskCell.querySelector('.taskMain');
        let taskTagRow = taskCell.querySelector('.taskTagRow');
        let taskBottomRow = taskCell.querySelector('.taskBottomRow');

        let taskJSON = {
            [`taskTopRow-task${taskCount}`]: {
                [`taskNumberBox-task${taskCount}`]: {
                    "text": taskTopRow.querySelector('.taskNumberBox').textContent
                },
                [`taskTopRightBar-task${taskCount}`]: {
                    "text": taskTopRow.querySelector('.taskTopRightBar').textContent
                }
            },
            [`taskMain-task${taskCount}`]: {
                "text": taskMain.textContent
            },
            [`taskTagRow-task${taskCount}`]: {
            },
            [`taskBottomRow-task${taskCount}`]: {
                [`taskCheckBoxDiv-task${taskCount}`]: "",
                [`taskInfoBar-task${taskCount}`]: {
                    "text": taskBottomRow.querySelector('.taskInfoBar').textContent
                }
            }
        };

        let tags = taskTagRow.querySelectorAll('.tag');

        tags.forEach(function(tag, index) {
            taskJSON[`taskTagRow-task${taskCount}`][`taskCell${taskCount}-tag${index + 1}`] = tag.textContent;
        });

        tasks[`taskCell-task${taskCount}`] = taskJSON;
    });

    setAppData('savedTasks', JSON.stringify({ tasks: tasks }), 30);
};


function saveUserTagsToAppData() {
    let tags = {};
    let tagElements = document.querySelectorAll('#tagTable .tag');

    tagElements.forEach(function(tagElement) {
        let tagId = tagElement.id;
        let tagText = tagElement.textContent;
        tags[tagId] = tagText;
    });

    setAppData('userTags', JSON.stringify({ tags: tags }), 30);
};


function loadTasksFromAppData() {
    let savedTasks = getAppData('savedTasks');
    if (savedTasks) {
        savedTasks = JSON.parse(savedTasks).tasks;
        for (let taskId in savedTasks) {
            let taskData = savedTasks[taskId];
            createTaskFromData(taskData);
        }
    }

    removePlaceholderIfTaskExists();
};


function loadUserTagsFromAppData() {
    let userTags = getAppData('userTags');
    if (userTags) {
        userTags = JSON.parse(userTags).tags;
        createTagTableFromData(userTags);
    }
}


export { setAppData, getAppData, saveTasksToAppData, saveUserTagsToAppData, loadTasksFromAppData, loadUserTagsFromAppData };
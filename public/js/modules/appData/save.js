// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



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
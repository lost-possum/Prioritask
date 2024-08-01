// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



function appendTaskChildren(newTaskElements) {
    newTaskElements.taskCheckBoxDiv.appendChild(newTaskElements.taskCheckBoxInput);
    newTaskElements.taskTopRowDiv.appendChild(newTaskElements.taskNumberBoxDiv);
    newTaskElements.taskTopRowDiv.appendChild(newTaskElements.taskTopRightBarDiv);
    newTaskElements.taskBottomRowDiv.appendChild(newTaskElements.taskCheckBoxDiv);
    newTaskElements.taskBottomRowDiv.appendChild(newTaskElements.taskInfoBarDiv);
    newTaskElements.taskCellDiv.appendChild(newTaskElements.taskTopRowDiv);
    newTaskElements.taskCellDiv.appendChild(newTaskElements.taskMainDiv);
    newTaskElements.taskCellDiv.appendChild(newTaskElements.taskTagRowDiv);
    newTaskElements.taskCellDiv.appendChild(newTaskElements.taskBottomRowDiv);    
};


function appendChildrenForCreateTaskFromData() {
    taskTopRowDiv.appendChild(taskNumberBoxDiv);
    taskTopRowDiv.appendChild(taskTopRightBarDiv);
    taskBottomRowDiv.appendChild(taskCheckBoxDiv);
    taskBottomRowDiv.appendChild(taskInfoBarDiv);
    taskCellDiv.appendChild(taskTopRowDiv);
    taskCellDiv.appendChild(taskMainDiv);
    taskCellDiv.appendChild(taskTagRowDiv);
    taskCellDiv.appendChild(taskBottomRowDiv);
    
    document.getElementById('taskColumn').appendChild(taskCellDiv);
}; 
// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



function appendTaskChildren(taskCheckBoxDiv, taskCheckBoxInput, taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv) {
    taskCheckBoxDiv.appendChild(taskCheckBoxInput);
    taskTopRowDiv.appendChild(taskNumberBoxDiv);
    taskTopRowDiv.appendChild(taskTopRightBarDiv);
    taskBottomRowDiv.appendChild(taskCheckBoxDiv);
    taskBottomRowDiv.appendChild(taskInfoBarDiv);
    taskCellDiv.appendChild(taskTopRowDiv);
    taskCellDiv.appendChild(taskMainDiv);
    taskCellDiv.appendChild(taskTagRowDiv);
    taskCellDiv.appendChild(taskBottomRowDiv);    
};


function appendChildrenForCreateTaskFromData(taskTopRowDiv, taskNumberBoxDiv, taskTopRightBarDiv, taskBottomRowDiv, taskCheckBoxDiv, taskInfoBarDiv, taskCellDiv, taskMainDiv, taskTagRowDiv) {
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


export { appendTaskChildren, appendChildrenForCreateTaskFromData };
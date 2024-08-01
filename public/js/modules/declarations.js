// Prioritask - Version 0.0.8 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



function taskFormDeclareElements() {
    let taskDescriptionEntry = document.getElementById('taskDescriptionEntry');
    let taskTagEntry = document.getElementById('taskTagEntry');
    let taskDescriptionValue = taskDescriptionEntry.value.trim();
    let taskTagValue = taskTagEntry.value.trim();
    let savedTaskDescriptionEntry = localStorage.getItem('taskDescriptionEntry');
    let savedTaskTagEntry = localStorage.getItem('taskTagEntry');

    return {
        taskDescriptionEntry,
        taskTagEntry,
        taskDescriptionValue,
        taskTagValue,
        savedTaskDescriptionEntry,
        savedTaskTagEntry
    }
};


function newTaskDeclareElements() {
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

        let selectedMonth = document.getElementById('monthDropdown').value;
        let selectedDay = document.getElementById('dayDropdown').value;
        let selectedHour = document.getElementById('hourDropdown').value;
        let selectedMinute = document.getElementById('minuteDropdown').value;
        let selectedAMPM = document.getElementById('amPMDropdown').value;
        let selectedYear = document.getElementById('yearDropdown').value;
        let selectedPriority = document.getElementById('priorityDropdown').value;

        let taskColumnPlaceholder = document.getElementById('taskColumnPlaceholder');
        let taskTimeSkipCheckbox = document.getElementById('taskTimeSkipCheckbox');

        taskCellDiv.className = 'taskCell';
        taskTopRowDiv.className = 'taskTopRow';
        taskNumberBoxDiv.className = 'taskNumberBox';
        taskTopRightBarDiv.className = 'taskTopRightBar';
        taskMainDiv.className = 'taskMain';
        taskTagRowDiv.className = 'taskTagRow';
        taskBottomRowDiv.className = 'taskBottomRow';
        taskInfoBarDiv.className = 'taskInfoBar';
        taskCheckBoxDiv.className = 'taskCheckBox';
        taskCheckBoxInput.className = 'taskCheckBoxInput';

        taskCellDiv.id = `taskCell-task${taskCount}`;
        taskTopRowDiv.id = `taskTopRow-task${taskCount}`;
        taskNumberBoxDiv.id = `taskNumberBox-task${taskCount}`;
        taskTopRightBarDiv.id = `taskTopRightBar-task${taskCount}`;
        taskMainDiv.id = `taskMain-task${taskCount}`;
        taskTagRowDiv.id = `taskTagRow-task${taskCount}`;
        taskBottomRowDiv.id = `taskBottomRow-task${taskCount}`;
        taskInfoBarDiv.id = `taskInfoBar-task${taskCount}`;
        taskCheckBoxDiv.id = `taskCheckBoxDiv-task${taskCount}`;
        taskCheckBoxInput.id = `taskCheckBoxInput-task${taskCount}`;

        taskCheckBoxInput.type = 'checkbox';

        return {
            selectedMonth,
            selectedDay,
            selectedHour,
            selectedMinute,
            selectedAMPM,
            selectedYear,
            selectedPriority,
            taskColumnPlaceholder,
            taskTimeSkipCheckbox
        }
};


function declareDropdownContent() {
    let selectedMonthOption = document.getElementById('monthDropdown').options[document.getElementById('monthDropdown').selectedIndex];
    let selectedMonthOptionId = selectedMonthOption.id;
    let selectedMonthNumber = selectedMonthOptionId.split('-m')[1];
    let selectedMonthNumberInt = parseInt(selectedMonthNumber, 10);
    let selectedYearNumberInt = parseInt(selectedYear, 10);
    let selectedDayNumberInt = parseInt(selectedDay, 10);
    
    return {
        selectedMonthOption,
        selectedMonthOptionId,
        selectedMonthNumber,
        selectedMonthNumberInt,
        selectedYearNumberInt,
        selectedDayNumberInt
    }
};


export { taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent };
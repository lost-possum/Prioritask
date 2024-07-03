importButton.addEventListener('click', function(e) {
    e.preventDefault();
    var placeholder = document.getElementById('taskColumnPlaceholder');
    if (placeholder) {
        placeholder.remove();
    }
    var taskColumn = document.getElementById('taskColumn');
    var existingTaskCell = taskColumn.getElementsByClassName('taskCell');
    if (existingTaskCell) {
        window.alert('Deleting existing task cells!');
        existingTaskCell.remove();
    }
    importInput.click();
});
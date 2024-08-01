// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



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


function importAppData(e) {
    let file = e.target.files[0];
    let fileName = file.name;
    let fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension !== 'json') {
        console.error('invalid file extension; file extension must be json; terminating importAppData()')
        alert('Invalid file format. Please upload a JSON file.');
        return;
    }
        
    if (!file) {
        console.error('file not found; terminating importAppData()');
        return;
    }
        
    let reader = new FileReader();
    let data = JSON.parse(e.target.result);

    reader.onload = function(e) {
        if (data.tasks) {
            setAppData('savedTasks', JSON.stringify(data.tasks), 30);
        }
        
        if (data.tags) {
            setAppData('userTags', JSON.stringify(data.tags), 30);
        }

        // Remove existing tasks before loading new ones
        let taskColumn = document.getElementById('taskColumn');
        while (taskColumn.firstChild) {
            taskColumn.removeChild(taskColumn.firstChild);
        }

        loadTasksFromAppData();
        loadUserTagsFromAppData();
    };

    reader.readAsText(file);

    removePlaceholderIfTaskExists();
};


function exportAppData() {
    saveTasksToAppData();
    saveUserTagsToAppData();

    let tasks = getAppData('savedTasks');
    let tags = getAppData('userTags');
        
    let data = {
        tasks: tasks ? JSON.parse(tasks) : [],
        tags: tags ? JSON.parse(tags) : []
    };
        
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    let downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "prioritask-data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};


export { setAppData, getAppData, importAppData, exportAppData };
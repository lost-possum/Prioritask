// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { createTagTableFromData, createTaskFromData } from "./modules/appData/createFromData.js";
import { setAppData, getAppData, importAppData, exportAppData } from "./modules/appData/data.js";
import { loadUserTagsFromAppData,loadTasksFromAppData } from "./modules/appData/load.js";
import { saveUserTagsToAppData, saveTasksToAppData } from "./modules/appData/save.js";
import { appendTaskChildren, appendChildrenForCreateTaskFromData } from "./modules/dom/append.js";
import { removePlaceholderIfTaskExists, populateYearDropdown, createTask } from "./modules/dom/dom.js";
import { createTagTable, sortTagsAZ, deleteTags } from "./modules/dom/tags.js";
import { declareBaseElements, declareButtons, taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent } from "./modules/declarations.js"


export { createTagTableFromData, createTaskFromData };
export { setAppData, getAppData, importAppData, exportAppData };
export { loadUserTagsFromAppData, loadTasksFromAppData };
export { saveUserTagsToAppData, saveTasksToAppData };
export { appendTaskChildren, appendChildrenForCreateTaskFromData };
export { removePlaceholderIfTaskExists, populateYearDropdown, createTask };
export { createTagTable, sortTagsAZ, deleteTags };
export { declareBaseElements, declareButtons, taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent }; 
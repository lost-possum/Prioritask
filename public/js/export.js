// Prioritask - Version 0.0.8 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent } from "./modules/declarations.js";
import { removePlaceholderIfTaskExists, populateYearDropdown, createTask } from "./modules/dom.js";
import { getAppData, setAppData, saveTasksToAppData, saveUserTagsToAppData, loadTasksFromAppData, loadUserTagsFromAppData } from "./modules/localStorage.js";


export { taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent };
export { removePlaceholderIfTaskExists, populateYearDropdown, createTask };
export { getAppData, setAppData, saveUserTagsToAppData, saveTasksToAppData, loadTasksFromAppData, loadUserTagsFromAppData };
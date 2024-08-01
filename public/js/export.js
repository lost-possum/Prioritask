// Prioritask - Version 0.0.5 (alpha)
// Viihna Leraine - viihna@ViihnaTech.com // viihna.78 (Signal) // Viihna-Lehraine (Github)
// License - GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

// BEGIN CODE



import { declareButtons, taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent } from "./modules/declarations.js"
import { createTagTableFromData, createTaskFromData } from "./modules/appData/createFromData.js";
import { setAppData, getAppData, importAppData, exportAppData } from "./modules/appData/data.js";
import { removePlaceholderIfTaskExists, populateYearDropdown, createTask } from "./modules/dom/dom.js";


export { declareButtons, taskFormDeclareElements, newTaskDeclareElements, declareDropdownContent }; 
export { createTagTableFromData, createTaskFromData };
export { setAppData, getAppData, importAppData, exportAppData };
export { removePlaceholderIfTaskExists, populateYearDropdown, createTask }
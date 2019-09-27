
// The main array to which all tasks related details are to be added in form of objects
var tasks = [];
var clickEvent = new Event('click');

    /* It checks for any key press events that occurs in the body
     * and redirects it the correct receivers based on class name
     *
     * @param e - The element that triggered the keypress event
     */
    document.querySelector('body').addEventListener("keypress", function (e) {
        if(e.target.className === "taskAddition") {
            console.log(e.keyCode);
            addSubTasks(e);
        }
        if(e.target.className === "inputStep") {
            getSteps(e);
        }

        if(e.target.className === "newTaskHeading") {
            updateTaskHeading(e);
        }

        if(e.target.className === "newList") {
            addCategory(e);
        }
    });

    document.querySelector('body').addEventListener("click", function (e) {
        console.log('^^^^^^^');
        console.log(e.target.className);

        if(e.target.id === "sideNav") {
            console.log("*****");
            displaySideMenu(e);
        }

        if(e.target.className === "categoryName") {
            console.log("######");
            addTasks(e);
        }

        if(e.target.className === "contextIcon") {
            console.log("###5555###");
            showTaskDeleteOption(e);
        }
    });

/**
 * the event when the user adds a new list. The function checks
 * till the user presses ENTER key, and then it adds the entered
 * input is added into the main array
 *
 * @param e The event object containig the entered value
 */
function addCategory(e) {
    let category = e.target.value;
    if(e.keyCode === 13 && category != "") {
        e.preventDefault();
        let taskDetails = {};
        let subTasks = [];
        let taskId = Date.now();
        taskDetails.id = taskId; 
        taskDetails.taskName = category;
        taskDetails.isAvailable = true;
        taskDetails.isDeleted = false;
        taskDetails["subTasks"] = subTasks;
        tasks.push(taskDetails); 
        console.log(tasks);
        e.target.value = "";        
        displayAddedCategory();
    }  
  }

/**
 * It displays the selected category to which the tasks are
 * added
 */
function displayAddedCategory() {
    let div = document.querySelector(".category");
    let stats = document.querySelector(".menuOptions").lastChild;
    clearContent(stats);
    clearContent(div);
    showTotalCategories();
    for(let i = 0; i < tasks.length; i++) {
        (function () {
            if (tasks[i].isDeleted == false) {
                let id = tasks[i].id;
                let index = tasks.indexOf(tasks[i]);
                console.log(index);
                let categoryDiv = createElement("div");
                let icon = createElement("i");
                let para = createElement("p");
                icon.setAttribute("class","sideMenuIcons");
                icon.setAttribute("id","list");
                icon.setAttribute("display","inline");
                categoryDiv.setAttribute("class", "categoryName");
                categoryDiv.setAttribute("id", index);
                categoryDiv.dispatchEvent(clickEvent);
                addInnerHTML(para,tasks[i].taskName);
                categoryDiv.appendChild(icon);
                categoryDiv.appendChild(para);
                div.appendChild(categoryDiv);
            }
        }());
    }
}

/**
 * It gets the total number of categories added
 *  
 */
function showTotalCategories() {
    let menuBar = document.querySelector(".menuOptions")
    let para = createElement("p");
    para.setAttribute("class", "totalCategories");
    let count = 0;
    for(let key in tasks) {
        if(tasks[key].isDeleted === false)
            count += 1;
    }
    addInnerHTML(para,count);
    menuBar.appendChild(para);
}

/**
 * It asks the user to add tasks for a particular category after
 * he/she presses the particular category
 *
 * @param index The index of main category selected in the array 
 */
function addTasks(e) {
    let index = e.target.id;
    let totalTasks;
    let completedTasks;
    document.querySelector(".taskDetails").style.visibility = "visible";
    let taskInfo = document.querySelector(".taskDetails");
    let tasksBody = document.querySelector(".tasks");
    clearContent(taskInfo);
    clearContent(tasksBody.lastChild);
    clearContent(document.querySelector(".subTaskDetails"));
    let header = document.querySelector(".subTaskHeader");
    let addDiv = createElement("div");
    let icon = createElement("i");
    let contextIcon = createElement("i");
    contextIcon.setAttribute("class", "contextIcon");
    contextIcon.setAttribute("id", index);
    let categoryDeletion = createElement("div");
    categoryDeletion.setAttribute("class", "categoryDeletion");
    contextIcon.dispatchEvent(clickEvent);
    /*contextIcon.addEventListener('click',function(e) {
        if(categoryDeletion.style.display === "none") {
            categoryDeletion.style.display = "block";
            clearContent(categoryDeletion);
            let para = createElement("p");
            addInnerHTML(para,"Delete");
            categoryDeletion.appendChild(para);
            categoryDeletion.addEventListener('click',deleteCategory(index));
            header.appendChild(categoryDeletion);
        }
        else {
            categoryDeletion.style.display = "none";
        }
    });*/
    let para = createElement("p");
    para.setAttribute("id","stats");
    let getTask = createElement("input");
    addInnerHTML(header,tasks[index]["taskName"])
    header.style.color = "#117AD3";
    header.style.fontFamily = "'Roboto', sans-serif";
    addDiv.setAttribute("class", "subTaskAddition");
    addDiv.setAttribute("id", index);
    icon.setAttribute("id","addList");
    icon.setAttribute("class","taskAdder");
    addInnerHTML(addDiv,"Add Task");
    displaySubTasks(index);
    addDiv.addEventListener('click',function(e) {getSubTasks(e,index)});
    header.appendChild(contextIcon);
    header.appendChild(categoryDeletion);
    tasksBody.appendChild(header);
    totalTasks = tasks[index].subTasks.length;
    completedTasks = getCompletedTasks(index);
    addInnerHTML(para,`${completedTasks} of ${totalTasks} tasks completed`);
    tasksBody.appendChild(para);
    addDiv.appendChild(icon);
    taskInfo.appendChild(addDiv);
}

/**
 * It shows the delete option for a task
 * @param e 
 */
function showTaskDeleteOption(e) {
    let header = document.querySelector(".subTaskHeader"); 
    let index = e.target.id;
    console.log(index+"&&&&&");
    let categoryDeletion = document.querySelector(".categoryDeletion");
    if(categoryDeletion.style.display == "none") {
        console.log("@@@@@@@");
        categoryDeletion.style.display = "block";
        clearContent(categoryDeletion);
        let para = createElement("p");
        addInnerHTML(para,"Delete");
        categoryDeletion.appendChild(para);
        categoryDeletion.addEventListener('click',deleteCategory(index));  
    }
    else {
        categoryDeletion.style.display = "none";
    }
}

/**
 * It soft deletes a category based on index
 * 
 * @param  index - The index of category in main array 
 */
function deleteCategory(index) {
    console.log(index);
    tasks[index].isDeleted = true;
}

/**
 * It returns the total number of tasks for a category
 *
 * @param index - The index of the category
 *
function getTotalTasks(index) {
    var total = 0;
    for(let key in tasks[index].subTasks) {
        if(tasks[index].subTasks[key].isDeleted == false) {
            console.log(tasks[index].subTasks[key].isDeleted);
            total = total + 1;
        }
    }
    console.log(total);
    return total;
}/

/**
 * It returns the total number of completed tasks for a category
 *
 * @param index - The index of the category
 */
function getCompletedTasks(index) {
    var total = 0;
    for(let key in tasks[index].subTasks) {
        if(tasks[index].subTasks[key].isAvailable == false) {
            console.log(tasks[index].subTasks[key].isAvailable);
            total = total + 1;
        }
    }
    console.log(total);
    return total;
}
/**
 * It gets the tasks for a particular category. It gets the index
 * value of the category in main list and adds the tasks to it
 * 
 * @param e - The event object containing the eneterd value
 * @param index - The index of category in main array 
 */
function getSubTasks(e,index) {
    document.querySelector(".subTaskAddition").style.display = "none";
    let taskDetails = document.querySelector(".taskDetails");
    let getSubTask = createElement("input");
    getSubTask.setAttribute("placeholder", "Type here");
    getSubTask.setAttribute("class", "taskAddition");
    getSubTask.setAttribute("id",index);
    taskDetails.appendChild(getSubTask);
    let indexInfo = createElement("input");
    indexInfo.setAttribute("class","indexInfo");
    indexInfo.setAttribute("value",index);
    indexInfo.setAttribute("type","hidden");
    taskDetails.appendChild(indexInfo);
    document.querySelector(".subTaskAddition").style.display = "block";
}

function addSubTasks(e) {
    console.log(e.target.id+"@@@@@@@");
    if(e.keyCode === 13 && document.querySelector(".taskAddition").value != "") {
        //document.querySelector(".subTaskAddition").style.display = "block";
        let index = document.querySelector(".indexInfo").value;
        let subTaskInfo = {};
        subTaskInfo["info"] = document.querySelector(".taskAddition").value;
        subTaskInfo["steps"] = [];
        subTaskInfo["notes"] = "";
        subTaskInfo["isAvailable"] = true;
        subTaskInfo["isDeleted"] = false;
        tasks[index].subTasks.push(subTaskInfo);
        document.querySelector(".taskAddition").value = "";
        console.log(document.querySelector(".indexInfo").value+" --------------");
        displaySubTasks(index);
    }
}

/**
 * It displays the sub tasks for a particular category
 *
 * @param index - The index of category in main array
 */
function displaySubTasks(index) {
    var taskDetails = document.querySelector(".subTaskDetails");
    clearContent(taskDetails);
    for(let key in tasks[index].subTasks) {
        (function () {
            var div = createElement("div");
            var para = createElement("p");
            var taskIndex = key;
            div.setAttribute("class", "subTask");
            var status = tasks[index].subTasks[key].isAvailable;
            if(status) {
                let uncheck = createElement("i");
                uncheck.setAttribute("class", "selectIcon");
                uncheck.setAttribute("id","unCheckedIcon");
                div.appendChild(uncheck);
                addInnerHTML(para,tasks[index].subTasks[taskIndex].info);
                div.appendChild(para);
                uncheck.addEventListener('click',function(e) {strikeContent(index,taskIndex,-1)});
                para.addEventListener('click',function(e) {addSteps(index,taskIndex)});
                taskDetails.appendChild(div);
                displayStepsMenu();
                addSteps(index,taskIndex);
            }
            if(!status)  {
                let check = createElement("i");
                check.setAttribute("class", "selectIcon");
                check.setAttribute("id","checkedIcon");
                div.appendChild(check);
                let strikedTask = tasks[index].subTasks[taskIndex].info.strike();
                addInnerHTML(para,strikedTask)
                div.appendChild(para);
                check.addEventListener('click',function(e) {strikeContent(index,taskIndex,-1)});
                para.addEventListener('click',function(e) {addSteps(index,taskIndex)});
                taskDetails.appendChild(div);
                displayStepsMenu();
                addSteps(index,taskIndex);
            }
        }());
    }
}


/**
 * It adds the various steps for the selected task of a category
 *
 * @param index - The index of selected category in main array
 * @param subIndex - The index of tasks in list of tasks inside the selected category 
 */
function addSteps(index,subIndex) {
    let header = document.querySelector(".stepHeader");
    clearContent(header);
    addSlider();
    var stepDetails = document.querySelector(".steps");
    clearContent(document.querySelector(".stepInputDiv"));
    let radio = createElement("input");
    let step = createElement("input");
    let inputDiv = createElement("div");
    let para = createElement("p");
    para.setAttribute("id","stepHeading");
    let countPara = createElement("p");
    countPara.setAttribute("id","stepStats");
    addInnerHTML(countPara,`${getCompletedSteps(index,subIndex)} of ${getTotalSteps(index,subIndex)} steps completed`);
    inputDiv.setAttribute("class","stepInput");
    step.setAttribute("class", "inputStep");
    step.setAttribute("placeholder", "Add step");
    inputDiv.appendChild(step);
    radio.setAttribute("type","checkbox");
    radio.setAttribute("id", "taskCheckBox");
    let categoryInfo = createElement("input");
    let taskInfo = createElement("input");
    categoryInfo.setAttribute("id","category");
    categoryInfo.setAttribute("type","hidden");
    categoryInfo.setAttribute("value",index);
    taskInfo.setAttribute("id","task");
    taskInfo.setAttribute("type","hidden");
    taskInfo.setAttribute("value", subIndex);
    header.appendChild(countPara);
    let status = tasks[index].subTasks[subIndex].isAvailable;
    if(status) {
        addInnerHTML(para,tasks[index].subTasks[subIndex].info);
        header.appendChild(para);
        para.addEventListener('click',function(e) {editTaskName(index,subIndex)});
        displayStepsMenu();
        displaySteps(index,subIndex);
    }
    else {
        let task = tasks[index].subTasks[subIndex].info;
        let strikedTask = task.strike();
        addInnerHTML(para,strikedTask);
        header.appendChild(para);
        para.addEventListener('click',function(e) {editTaskName(index,subIndex)});
        displayStepsMenu();
        displaySteps(index,subIndex);
    }
    header.appendChild(categoryInfo);
    header.appendChild(taskInfo);
    header.appendChild(radio);
    document.querySelector(".stepInputDiv").appendChild(inputDiv);
}

/**
 * It gets the total steps count for a particular task
 *
 * @param index - The index of selected category in main array
 * @param subIndex - The index of tasks in list of tasks inside the selected category 
 */
function getTotalSteps(index,subIndex) {
    var total = 0;
    for (key in tasks[index].subTasks[subIndex].steps) {
        if(tasks[index].subTasks[subIndex].steps[key].isDeleted == false) 
            total += 1;
    }
    return total;
}

/**
 * It gets the the completed steps count for a particular task
 *
 * @param index - The index of selected category in main array
 * @param subIndex - The index of tasks in list of tasks inside the selected category 
 */
function getCompletedSteps(index,subIndex) {
    var total = 0;
    for (key in tasks[index].subTasks[subIndex].steps) {
        if(tasks[index].subTasks[subIndex].steps[key].isAvailable == false) 
            total += 1;
    }
    return total;
}

/**
 * It adds a slider icon for showing and hiding the steps menu
 *
 */
function addSlider () {
    let stepsMenu = document.querySelector(".slider");
    stepsMenu.addEventListener('click',function(e) {displayStepsMenu()});
}
/**
 * It changes the task name
 *
 * @param index - The index of selected category in main array
 * @param subIndex - The index of tasks in list of tasks inside the selected category 
 */
function editTaskName(index,subIndex) {
    let header = document.querySelector(".stepHeader").firstChild;
    let input = createElement("input");
    input.setAttribute("class", "newTaskHeading");
    input.setAttribute("value", tasks[index].subTasks[subIndex].info);
    clearContent(header);
    document.querySelector(".stepHeader").appendChild(input);
}

/**
 * It updates the task name in main array
 *
 * @param e - The event object containing the eneterd value
 */
function updateTaskHeading(e) {
    if(e.keyCode === 13 && e.target.value != "") {
        let categoryIndex = document.querySelector("#category").value;
        let taskIndex = document.querySelector("#task").value;
        tasks[categoryIndex].subTasks[taskIndex].info = e.target.value;
        addTasks(categoryIndex);
        displayStepsMenu();
        addSteps(categoryIndex,taskIndex);
    }
}
    
/**
 * It gets the input value from user for each step for a particular task
 *
 * @param e - The event object containing the eneterd value
 */
function getSteps (e) {
    if(e.keyCode === 13 && e.target.value != "") {
        let categoryIndex = document.querySelector("#category").value;
        let taskIndex = document.querySelector("#task").value;
        let stepInfo = {};
        stepInfo["step"] = e.target.value;
        stepInfo["isAvailable"] = true;
        stepInfo["isDeleted"] = false;          
        console.log(categoryIndex+"========"+categoryIndex);
        tasks[categoryIndex].subTasks[taskIndex].steps.push(stepInfo);
        e.target.value = "";
        displaySteps(categoryIndex,taskIndex);
    }
}
    
/**
 * It shows the right pannel when a particular task is selected for adding steps 
 * and other details
 */      
function displayStepsMenu () {
    var tasks = document.querySelector(".tasks");
    if(tasks.style.width == "85em") {
        document.querySelector(".subTask").style.width = "50em";
        tasks.style.width = "57em";
        document.querySelector(".stepDetails").style.width = "40em";
        document.querySelector(".stepDetails").style.left= "73em";

    }
    else {
        document.querySelector(".subTask").style.width = "70em";
        tasks.style.width = "85em";
        document.querySelector(".stepDetails").style.left = "100em";
        tasks.style.marginRight = "0em";
    }
}

/**
 * It displays the steps for a particular task that has been added
 *
 * @param categoryIndex - The index of category in the main array
 * @param taskIndex - The index of tasks in list of tasks inside the selected category 
 */
function displaySteps(categoryIndex,taskIndex) { 
    var stepDetails = document.querySelector(".steps");
    clearContent(stepDetails);
    for(let key in tasks[categoryIndex].subTasks[taskIndex].steps) {
        let icon = createElement("i");
        if(tasks[categoryIndex].subTasks[taskIndex].steps[key].isDeleted == false) {
            var div = createElement("div");
            var para = createElement("p");
            div.setAttribute("class", "subStep");
            let subIndex = key;
            let status = tasks[categoryIndex].subTasks[taskIndex].steps[key].isAvailable;
            let deleteOption = createElement("i");
            deleteOption.setAttribute("class", "stepDeletion");
            deleteOption.onclick = function(e) {deleteStep(categoryIndex,taskIndex,subIndex)};
            div.appendChild(deleteOption);
            if(status) {
                addInnerHTML(para,tasks[categoryIndex].subTasks[taskIndex].steps[key].step);
                para.onclick = function(e) {strikeContent(categoryIndex,taskIndex,subIndex)};
                div.appendChild(para);
                stepDetails.appendChild(div);
            }
            if(!status)  {
                let step = tasks[categoryIndex].subTasks[taskIndex].steps[key].step;
                let strikedStep = step.strike();
                addInnerHTML(para,strikedStep);
                para.onclick = function(e) {strikeContent(categoryIndex,taskIndex,subIndex)};
                div.appendChild(para);
                stepDetails.appendChild(div);
            }
        }
    }
}

/**
 * It deletes a step based on selection
 *
 * @param e - The event object containing the eneterd value
 * @param categoryIndex - The index of category in the main array
 * @param taskIndex - The index of tasks in list of tasks inside the selected category
 */
function deleteStep(categoryIndex,taskIndex,subIndex) {
    tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isDeleted = true;
}

/**
 * It strikes and unstrikes a step
 *
 * @param e - The event object containing the eneterd value
 * @param categoryIndex - The index of category in the main array
 * @param taskIndex - The index of tasks in list of tasks inside the selected category
 */
function strikeContent(categoryIndex,taskIndex,subIndex) {
    if(-1 != subIndex) {
        let stepStatus = tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable;
        if(stepStatus) {
            tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable = false;
            displaySteps(categoryIndex,taskIndex);
        }
        else {
            tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable = true;
            displaySteps(categoryIndex,taskIndex);
        }
    }

    if(-1 != taskIndex && -1 == subIndex) { 
        let taskStatus = tasks[categoryIndex].subTasks[taskIndex].isAvailable;
        if(taskStatus) {
            tasks[categoryIndex].subTasks[taskIndex].isAvailable = false;
            displaySteps(categoryIndex,taskIndex);
            displaySubTasks(categoryIndex);
        }
        else {
            tasks[categoryIndex].subTasks[taskIndex].isAvailable = true;
            displaySteps(categoryIndex,taskIndex);
            displaySubTasks(categoryIndex);
        }
    }
}

/**
 * It creates and returns an HTML element based on requirement
 * 
 * @param  type - The type of element to be created
 * @returns The created element
 */
function createElement(type) {
    return document.createElement(type);
}

/**
 * It adds content inside a particular element
 * 
 * @param  obj - The element to which the content is to be added 
 * @param content - The content to be added  
 */
function addInnerHTML(obj,content) {
    obj.innerHTML = content;
}

/**
 * It clears all the contents of an element
 * @param  obj - The element whoose content is to be cleared 
 */
function clearContent(obj) {
    obj.innerHTML = "";
}

/**
 * It displays the side menu when the user clicks the menu icon
 * All functions of the To do app is accessed from here
 * 
 */
function displaySideMenu(e) {
    let tasks = document.querySelector(".tasks");
    console.log(e.target.value)
    if(e.target.value === "open") {
        e.target.value = "close";
        document.querySelector(".menu").setAttribute("class", "menu menuClosed");
        //document.querySelector(".category").setAttribute("class", "category categoryHidden");
        //document.querySelector(".newList").setAttribute("class", "newList newListHidden");
        document.querySelector(".tasks").setAttribute("class", "tasks tasksClosed");
    }
    else {
        e.target.value = "open";
        document.querySelector(".menu").setAttribute("class", "menu");
        //document.querySelector(".category").setAttribute("class", "category");
        //document.querySelector(".newList").setAttribute("class", "newList");
        document.querySelector(".tasks").setAttribute("class", "tasks");
    }   
}





 


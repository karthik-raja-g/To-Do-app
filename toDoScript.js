
// The main array to which all tasks related details are to be added in form of objects
var tasks = [];

var button = document.getElementById("sideNav");
var addBtn = document.querySelector("#newList");
var count = 0;
button.addEventListener('click', displaySideMenu);

/**
 * It displays the side menu when the user clicks the menu icon
 * All functions of the To do app is accessed from here
 * 
 */
function displaySideMenu() {
    var tasks = document.querySelector(".tasks");
    var css = ".menu a:hover {background-color: none}";
    var sheets = document.styleSheets;
    //console.log(sheets);
    if(tasks.style.width == "100em") {
        tasks.style.width = "85em";
        tasks.style.marginLeft = "15em";
        document.querySelector(".menu").style.width = "18em";
        /*if(document.styleSheets.cssRules[-1] == css) {
            document.styleSheets.removeRule(-1);
        }*/
    }
    else {
        tasks.style.width = "100em";
        document.querySelector(".menu").style.width = "10em";
        tasks.style.marginLeft = "0em";
        //document.styleSheets.insertRule(css,-1);
    }
}

/**
 * the event when the user adds a new list. The function checks
 * till the user presses ENTER key, and then it adds the entered
 * input is added into the main array
 *
 * @param e The event object containig the entered value
 */
addBtn.addEventListener("keypress", function (e) {
    let category = addBtn.value;
    if(e.keyCode === 13 && addBtn.value != "") {
        e.preventDefault();
        let taskDetails = {};
        let subTasks = [];
        let taskId = Date.now();
        taskDetails.id = taskId; 
        taskDetails.taskName = category;
        taskDetails.isAvailable = true;
        taskDetails["subTasks"] = subTasks;
        tasks.push(taskDetails); 
        console.log(tasks);
        addBtn.value = "";        
        //document.querySelector("#counter").innerHTML = (count+=1);
        displayAddedCategory();
    }  
  });

/**
 * It displays the selected category to which the tasks are
 * added
 */
function displayAddedCategory() {
    let div = document.querySelector(".category");
    div.innerHTML = "";
    for(let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let index = tasks.indexOf(tasks[i]);
        console.log(index);
        let categoryDiv = document.createElement("div");
        let icon = document.createElement("i");
        let anchor = document.createElement("a");
        categoryDiv.setAttribute("id",id);
        icon.setAttribute("class","sideMenuIcons");
        icon.setAttribute("id","list");
        icon.setAttribute("display","inline");
        anchor.setAttribute("href","#ff");
        categoryDiv.setAttribute("class", "categoryName");
        categoryDiv.setAttribute("display","inline");
        categoryDiv.onclick = function(e) {addTasks(index)};
        anchor.innerHTML = tasks[i].taskName;
        categoryDiv.appendChild(anchor);
        div.appendChild(icon);
        div.appendChild(categoryDiv);
    }
}

/**
 * It asks the user to add tasks for a particular category after
 * he/she presses the particular category
 *
 * @param index The index of main category selected in the array 
 */
function addTasks(index) {
    var taskInfo = document.querySelector(".taskDetails");
    var tasksBody = document.querySelector(".tasks");
    taskInfo.innerHTML = "";
    document.querySelector(".subTaskDetails").innerHTML = "";
    var header = document.querySelector(".subTaskHeader");
    let addDiv = document.createElement("div");
    let icon = document.createElement("i");
    header.innerHTML = tasks[index]["taskName"]+"...";
    header.style.color = "#117AD3";
    header.style.fontFamily = "'Roboto', sans-serif";
    addDiv.setAttribute("class", "subTaskAddition");
    addDiv.setAttribute("id", index);
    icon.setAttribute("id","list");
    icon.style.position = "relative"; 
    icon.setAttribute("display","inline");
    icon.style.height= "2em";
    icon.style.width= "2em"; 
    addDiv.innerHTML = "Add Task";
    displaySubTasks(index);
    addDiv.onclick = function(e) {getSubTasks(e,index)};
    tasksBody.appendChild(header);
    addDiv.appendChild(icon);
    taskInfo.appendChild(addDiv);
}

/**
 * It gets the tasks for a particular category. It gets the index
 * value of the category in main list and adds the tasks to it
 * 
 * @param e - The event object containing the eneterd value
 * @param index - The index of category in main array 
 */
function getSubTasks(e,index) {
    var taskDetails = document.querySelector(".taskDetails");
    let ref = e.target.id+"_input";
    var getSubTask = document.createElement("input");
    getSubTask.setAttribute("border-style", "none");
    getSubTask.setAttribute("class", ref);
    getSubTask.setAttribute("display", "inline");
    taskDetails.appendChild(getSubTask);

    /* It checks for any key press events that occurs in the body
     * and redirects it the correct receivers based on class name
     *
     * @param e - The element that triggered the keypress event
     */
    document.querySelector('body').addEventListener("keypress", function (e) {
        if(e.target.className === ref) {
            console.log(e.keyCode);
            if(e.keyCode === 13 && getSubTask.value != "") {
                let subTaskInfo = {};
                subTaskInfo["info"] = getSubTask.value;
                subTaskInfo["steps"] = [];
                subTaskInfo["notes"] = "";
                subTaskInfo["isAvailable"] = true;
                tasks[index].subTasks.push(subTaskInfo);
                getSubTask.value = "";
                displaySubTasks(index);
            }
        }

        if(e.target.className === "inputStep") {
            getSteps(e);
        }

    });
}

/**
 * It displays the sub tasks for a particular category
 *
 * @param index - The index of category in main array
 */
function displaySubTasks(index) {
    var taskDetails = document.querySelector(".subTaskDetails");
    taskDetails.innerHTML = "";
    for(let key in tasks[index].subTasks) {
        var div = document.createElement("div");
        var para = document.createElement("p");
        div.setAttribute("class", "subTask");
        let sub = key;
        console.log(key+"$$$$$$");
        para.innerHTML = tasks[index].subTasks[key].info;
        div.appendChild(para);
        console.log(index+"----"+sub+"------"+tasks[index].subTasks[key].info);
        div.onclick = function(e) {addSteps(index,sub)};
        taskDetails.appendChild(div);
    }
}

/**
 * It adds the various steps for the selected task of a category
 *
 * @param index - The index of selected category in main array
 * @param subIndex - The index of tasks in list of tasks inside the selected category 
 */
function addSteps(index,subIndex) {
    console.log("index---- "+ index);
    console.log("subIndex---- "+ subIndex);
    displayStepsMenu();
    let header = document.querySelector(".stepHeader");
    header.innerHTML = "";
    var stepDetails = document.querySelector(".steps");
    var st = document.querySelector(".stepDetails");
    document.querySelector(".stepInputDiv").innerHTML = "";
    let radio = document.createElement("input");
    let step = document.createElement("input");
    let inputDiv = document.createElement("div");
    inputDiv.setAttribute("class","stepInput");
    step.setAttribute("class", "inputStep");
    step.setAttribute("placeholder", "Add step");
    inputDiv.appendChild(step);
    radio.setAttribute("type","checkbox");
    radio.setAttribute("id", "hola");
    //let label = document.createElement("label");
    //label.setAttribute("for", "hola");
    console.log(tasks[index].subTasks[subIndex].info);
    let categoryInfo = document.createElement("input");
    let taskInfo = document.createElement("input");
    categoryInfo.setAttribute("id","category");
    categoryInfo.setAttribute("type","hidden");
    categoryInfo.setAttribute("value",index);
    taskInfo.setAttribute("id","task");
    taskInfo.setAttribute("type","hidden");
    taskInfo.setAttribute("value", subIndex);
    displaySteps(index,subIndex);
    header.appendChild(categoryInfo);
    header.appendChild(taskInfo);
    st.appendChild(radio);
    //header.appendChild(label);
    header.innerHTML += tasks[index].subTasks[subIndex].info;
    document.querySelector(".stepInputDiv").appendChild(inputDiv);
}

/**
 * It gets the input cvalue from user for each step for a particular task
 *
 * @param e - The event object containing the eneterd value
 */
function getSteps (e) {
    if(e.keyCode === 13 && e.target.value != "") {
        console.log(e.target.value+"kkkkkkkkkkkkk");
        let categoryIndex = document.querySelector("#category").value;
        let taskIndex = document.querySelector("#task").value;
        let stepInfo = {};
        stepInfo["step"] = e.target.value;
        stepInfo["isAvailable"] = "true";
        console.log(categoryIndex+"========"+categoryIndex);
        tasks[categoryIndex].subTasks[taskIndex].steps.push(stepInfo);
        console.log(e.target.value);
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
        console.log("grrrr");
        document.querySelector(".subTask").style.width = "50em";
        tasks.style.width = "57em";
        document.querySelector(".stepDetails").style.width = "40em";
        document.querySelector(".stepDetails").style.left= "73em";

    }

    /*else if (tasks.style.width == "57em" && document.querySelector(".stepDetails").style.width == "40em") {
        document.querySelector(".subTask").style.width = "50em";
        tasks.style.width = "57em";
        document.querySelector(".stepDetails").style.width = "40em";
        document.querySelector(".stepDetails").style.left= "73em";
    }*/
    else {
        console.log("grrrrpppppp");
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
    console.log("$$$$$$$$$!!!!!!");
    stepDetails.innerHTML = "";
    for(let key in tasks[categoryIndex].subTasks[taskIndex].steps) {
        var div = document.createElement("div");
        var para = document.createElement("p");
        div.setAttribute("class", "subStep");
        let subIndex = key;
        console.log(tasks[categoryIndex].subTasks[taskIndex].steps[key].step+"$$fffff$$$$");
        console.log(tasks[categoryIndex].subTasks[taskIndex].steps[key].isAvailable+"$$ff222222fff$$$$");
        let status = tasks[categoryIndex].subTasks[taskIndex].steps[key].isAvailable;
        if(status) {
            para.innerHTML = tasks[categoryIndex].subTasks[taskIndex].steps[key].step;
            div.onclick = function(e) {strikeStep(categoryIndex,taskIndex,subIndex)};
            div.appendChild(para);
            stepDetails.appendChild(div);
        }
        if(!status)  {
            let strikedStep = tasks[categoryIndex].subTasks[taskIndex].steps[key].step.strike();
            para.innerHTML = strikedStep;
            div.onclick = function(e) {strikeStep(categoryIndex,taskIndex,subIndex)};
            div.appendChild(para);
            stepDetails.appendChild(div);
        }
    }
}

/**
 * It strikes and unstrikes a step
 *
 * @param e - The event object containing the eneterd value
 * @param categoryIndex - The index of category in the main array
 * @param taskIndex - The index of tasks in list of tasks inside the selected category
 */
function strikeStep(categoryIndex,taskIndex,subIndex) {
    console.log("ffffffffffff");
    let stepStatus = tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable;
    console.log(stepStatus);
    if(stepStatus) {
        tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable = false;
        displaySteps(categoryIndex,taskIndex);
    }
    else {
        tasks[categoryIndex].subTasks[taskIndex].steps[subIndex].isAvailable = true;
        displaySteps(categoryIndex,taskIndex);
    }
}





 


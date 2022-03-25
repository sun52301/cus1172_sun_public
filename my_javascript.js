var task_array = []

function create_list() {
  var ul_element = document.querySelector("#all_tasks");

  while(ul_element.firstChild) {
    ul_element.removeChild(ul_element.firstChild);
  }
  for(var i=0; i < task_array.length; i++) {
    var li = document.createElement("li");
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.onclick = markComplete;
    if (task_array[i].status === "completed") {
      li.classList.add("completed");
      checkbox.checked = true;
    }
    if (task_array[i].priority === "high")
    {
      li.style.color = "red";
    }
    else if(task_array[i].priority === "medium")
    {
      li.style.color = "orange";
    }
    else
    {
      li.style.color = "green";
    }
    li.innerHTML = task_array[i].title;
    li.insertBefore(checkbox, li.firstChild);
    li.setAttribute("id", task_array[i].title)
    var button = document.createElement("button");
    button.classList.add("remove_task");
    button.onclick = RemoveTask;
    button.innerText = "x";
    li.appendChild(button);
    ul_element.appendChild(li);
  }
}
document.querySelector("#add_task").addEventListener("click", function(e){
  var title = document.querySelector("#title").value;
  var priority = document.querySelector("form select").value;
  if (document.querySelector("#pending").checked)
  var status = "pending";
  else
    var status = "completed";
    task_array.push({
      title: title,
      priority: priority,
      status: status
    })
    create_list();
    e.preventDefault();
})
function RemoveTask(e) {
  var id = e.target.parentElement.id;
  task_array = task_array.filter(data => data.title != id);
  create_list();
  e.preventDefault();
}
function markComplete(e) {
  var id = e.target.parentElement.id;
  task_array = task_array.map(x => {
    if (x.title === id) x.status = "completed";
    return x;
  })
  create_list();
}
create_list();

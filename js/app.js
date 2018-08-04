//variables

const $addItemsAction = document.querySelector(".addItems-action");
const $input = document.querySelector(".addItems-input");
const $submitButton = document.querySelector(".addItems-submit");

const $removeItemsAction = document.querySelector(".displayItems-action");
const $list = document.querySelector(".grocery-list");
const $listItem = document.querySelector(".grocery-item");
const $clear = document.querySelector(".displayItems-clear");

//function
const addItem = event => {
  event.preventDefault();
  let value = $input.value;
  if (value === "") {
    showAction($addItemsAction, "Please add grocery item", false);
  } else {
    showAction($addItemsAction, `${value} add with success`, true);
    createItem(value);
    updateStorage(value);
  }
};
const showAction = (element, text, value) => {
  if (value === true) {
    element.classList.add("success");
    element.innerText = text;
    $input.value = "";
    setTimeout(function() {
      element.classList.remove("success");
    }, 3000);
  } else {
    element.classList.add("alert");
    element.innerText = text;
    $input.value = "";
    setTimeout(function() {
      element.classList.remove("alert");
    }, 3000);
  }
};
const createItem = value => {
  let parent = document.createElement("div");
  parent.classList.add("grocery-item");
  parent.innerHTML = `
<h4 class="grocery-item__title">${value}</h4>
<a href="#" class="grocery-item__link">
    <i class="far fa-trash-alt"></i>
</a>`;
  $list.appendChild(parent);
};
// update storage
const updateStorage = value => {
  let groceryList;
  let exists = localStorage.getItem("groceryList");
  groceryList = localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
};
//localStorage.clear();
//display local sotorage
const displayStorage = _ => {
  let exists = localStorage.getItem("groceryList");

  if (exists) {
    let storageItems = JSON.parse(localStorage.getItem("groceryList"));
    storageItems.forEach(function(element) {
      createItem(element);
    });
  }
};

const removeItems = _ => {
  //delete from local storage
  localStorage.removeItem("groceryList");

  let items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    showAction($removeItemsAction, "All items deleted", false);
    items.forEach(function(element) {
      $list.removeChild(element);
    });
  } else {
    showAction($removeItemsAction, "No more items to delete", true);
  }
};
//remove single item
const removeSingleItem = event => {
  event.preventDefault();
  let link = event.target.parentElement;
  if (link.classList.contains("grocery-item__link")) {
    let text = link.previousElementSibling.innerHTML;
    let groceryItem = event.target.parentElement.parentElement;
    //remove from the list
    $list.removeChild(groceryItem);
    showAction($removeItemsAction, `${text} removed from the list`, true);
    //remove from the local storage
    editStorage(text);
  }
};
//edit storage
const editStorage = item => {
  let groceryItems = JSON.parse(localStorage.getItem("groceryList"));
  let index = groceryItems.indexOf(item);
  groceryItems.splice(index, 1);
  localStorage.removeItem("groceryList");
  localStorage.setItem("groceryList", JSON.stringify(groceryItems));
};
//event listeners
$submitButton.addEventListener("click", addItem);
document.addEventListener("DOMContentLoaded", displayStorage);
$clear.addEventListener("click", removeItems);
$list.addEventListener("click", removeSingleItem);

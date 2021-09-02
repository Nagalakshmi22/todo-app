var theme = document.getElementById("theme-color");
var icon = document.querySelector(".icons");
var writeHere = document.getElementById('write-here')
var todoListItems = document.querySelector(".lists-display ul")
var itemsLeftCount = document.querySelector(".status-left span")


itemsLeftCount.innerText = document.querySelectorAll('ul li').length;
console.log(itemsLeftCount.innerText)


theme.addEventListener('click', () => {
  document.querySelector("body").classList = [theme.checked ? 'theme-dark' : 'theme-light'];
  icon.setAttribute = [theme.checked ? icon.src="images/icon-sun.svg" : icon.src="images/icon-moon.svg" ];
});

function updateItemsCount(number) {
  itemsLeftCount.innerText = +itemsLeftCount.innerText + number;
}

writeHere.addEventListener("keypress",(e)=>{
  if(e.key === "Enter" && writeHere.value != ""){
    insertNewItem(writeHere.value);
    writeHere.value="";
    
  }
});

function insertNewItem(text){
  console.log("adding")
  var newItem = document.createElement("li");

  newItem.innerHTML = `
  <label class="container label-class">
      <input type="checkbox" class="input-class">
      <span class="text">${text}</span>
      <span class="checkmark"></span>
  </label>
  <span class="remove"></span>
  `;
  console.log("added")
  todoListItems.append(newItem);
  updateItemsCount(1) 
  console.log(todoListItems)
 }

function check_block_remove(remove_item_checked){
  remove_item_checked.remove()
}

todoListItems.addEventListener('click',(e) => {
  if (e.target.classList.contains('remove')) {
    updateItemsCount(-1) 
    check_block_remove(e.target.parentElement)
  }
});

document.querySelector('.clear-button').addEventListener('click', () => {
  document.querySelectorAll('.label-class input[type="checkbox"]:checked').forEach(item => {
      check_block_remove(item.closest('li'));
      
  });
});


function status_check(id) {
  const all_status = todoListItems.querySelectorAll('li');

  switch(id) {
      case 'check-all':
          all_status.forEach(item => {
              item.classList.remove('hidden');
          })
          break;
      case 'check-active':
          all_status.forEach(item => {
              item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
          })
          break;
      case 'check-completed': 
          all_status.forEach(item => {
              !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
          })
          break;
  }
}

document.querySelectorAll('.status-right input').forEach(radio => {
  radio.addEventListener('change', (e) => {
      status_check(e.target.id);
  });
});


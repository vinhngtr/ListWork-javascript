const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const btnClear = document.getElementById("clear");
const searchItem = document.getElementById("filter");

// ! Add item in listItem
let arrayItem = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
arrayItem.forEach(addItem);

function addItem(text) {
  const newItem = ` <li>
    ${text}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </li>`;
  itemList.insertAdjacentHTML("beforeend", newItem);
}
function ADD(e) {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Nhập vào tên item cần thêm!");
    return;
  }
  if (arrayItem.indexOf(itemInput.value) !== -1) {
    alert("Giá trị nhập vào đã tồn tại - Mời bạn nhập lại !");
    itemInput.value = "";
  } else {
    arrayItem.push(itemInput.value);
    addItem(itemInput.value);
    localStorage.setItem("items", JSON.stringify(arrayItem));
    customizeUI();
    itemInput.value = "";
  }
 
}

itemForm.addEventListener("submit", ADD);

function removeItem(text) {
  const itemStorage = arrayItem; //! 1 mảng chứa tất cả item ở localStorage
  const idxItem = itemStorage.indexOf(text);
  itemStorage.splice(idxItem, 1);
  localStorage.setItem("items", JSON.stringify(itemStorage));
}
// ! REMOVE item and clear all item
itemList.addEventListener("click", function (e) {
  if (e.target.tagName == "I") {
    const isRemove = confirm("Bạn có chắc chắn xóa item này khỏi danh sách ?");
    const textRemove = e.target.parentElement.parentElement.innerText.trim();
    if (isRemove) {
      e.currentTarget.removeChild(e.target.parentElement.parentElement);
      removeItem(textRemove); //? hàm xóa giá trị ở localStorage
      customizeUI();
    } else {
      return;
    }
  }
});

//! Clear all item
btnClear.addEventListener("click", function (e) {
  const isClear = confirm("Bạn có chắc chắn xóa toàn bộ danh sách hiện tại ?");
  if (isClear) {
    localStorage.clear();
    itemList.innerHTML = "";
    arrayItem = [];
    customizeUI();
  }
});

// ! Filter item for input user
searchItem.addEventListener("input", function (e) {
  // console.log(searchItem.value);
  const textCheck = e.target.value.toLowerCase();
  const numberItem = itemList.querySelectorAll("li");
  numberItem.forEach((item) => {
    const valueItem = item.innerText.toLowerCase();
    if (valueItem.indexOf(textCheck) === -1) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
  if (textCheck === "") {
    numberItem.forEach((item) => {
      if (item.style.display === "none") {
        item.style.display = "block";
      }
    });
  }
});

//! Check UI when item is length == 0
function customizeUI() {
  const numberItem = itemList.querySelectorAll("li");
  if (numberItem.length === 0) {
    btnClear.style.display = "none";
    searchItem.style.display = "none";
  } else {
    btnClear.style.display = "block";
    searchItem.style.display = "block";
  }
}
customizeUI();

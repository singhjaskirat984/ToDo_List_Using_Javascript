add = document.getElementById('add')
  add.addEventListener('click', () => {
    console.log("updating List..")
    var tit = document.getElementById('title').Value
    var desc = document.getElementById('description').Value
    console.log(tit);
    console.log(desc);
    if (localStorage.getItem('itemsJson') == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }else{
      var itemJsonArrayStr;
      itemJsonArrayStr = document.getElementById('itemsJson')
      itemJsonArray = JSON.parse(itemsJsonArrayStr);
      itemJsonArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
  });
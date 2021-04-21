
//to populate table with values already inside the local storage on page load
if (localStorage.getItem('itemsJson') != null) {
    update();
}


//to populate table with new values on click Add To List Button
add = document.getElementById('add');
add.addEventListener("click", getAndUpdate);


// to get values from the textfields and store it into the local storage
function getAndUpdate() {
    console.log("updating List..")
    tit = document.getElementById('title').value
    desc = document.getElementById('description').value
    console.log(tit)
    console.log(desc)
    //if i have not created or set any thing of name itemsJson in my local storage ever before
    if (localStorage.getItem('itemsJson') == null) {
        //then we create a new itemJson
        //craeting an array 
        itemJsonArray = [];
        //push tit and desc in it
        itemJsonArray.push([tit, desc]);
        //converting that array into string
        var str1 = JSON.stringify(itemJsonArray)
        //storing that string inside local storage
        //array saved into local storage as string format
        localStorage.setItem('itemsJson', str1)
    }
    //now if itemsjson has already been creted earlier that is we are using application not for first time
    //that means it already has one or more values in it
    else {
        //retrieving previous values from storage
        var itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        //pushing new values into array so now array contains both previous +  new values
        itemJsonArray.push([tit, desc]);
        //updating vaues again in storage
        var str2 = JSON.stringify(itemJsonArray)
        localStorage.setItem('itemsJson', str2)
    }
    //to reset values of textfields on submit
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    //till here getting values from textfields and storing into local storage
    console.log(itemJsonArray)
    //calling update to populate/display values which has just now be stored in the local storage
    update();
}

//only to populate the Table with previously added values which are in the storage
function update() {
    //if-else has been added just to declare itemJsonArray bcoz error was coming
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        var str1 = JSON.stringify(itemJsonArray)
        localStorage.setItem('itemsJson', str1)
    }
    //if-else has been added just to declare itemJsonArray bcoz error was coming
    else {
        var itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    //to display the newly added TODO LIst Items on click of add to List
    let tableBody = document.getElementById("tableBody")
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button type="button" class="btn btn-sm btn-primary" onclick="del(${index})">Delete</button></td></th>
          </tr>
          `
    });
    //this line populates the table
    tableBody.innerHTML = str;
}

//function to delete
function del(itemIndex) {
    console.log("delete", itemIndex)
    //retireving values from local storage
    var itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    //again update the string inside the storage
    var str2 = JSON.stringify(itemJsonArray)
    localStorage.setItem('itemsJson', str2)
    //after deletion update/populate the table
    update();
}

//to clear List
function clearStorge() {
    if (confirm("Do you really want to clear?")) {
        console.log("clearing storage");
        localStorage.clear();
        update();
    }
}

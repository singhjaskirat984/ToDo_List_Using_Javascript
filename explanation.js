window.addEventListener("load", pageFullyLoaded, false);

function pageFullyLoaded(e) {

  //to display TODO List items which are already stored in storage on page load
  if (localStorage.getItem('itemsJson') != null) {
    var itemJsonArrayStr = localStorage.getItem('itemsJson')
      itemJsonArray = JSON.parse(itemJsonArrayStr);
    let tableBody = document.getElementById("tableBody")
    let str = "";
    itemJsonArray.forEach((element, index) => {
      str += `
      <tr>
        <th scope="row">${index}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary">Delete</button></th>
      </tr>
      
      `
    });

    tableBody.innerHTML = str;
  }

  add = document.getElementById('add');
  add.addEventListener("click", () => {
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
    //now if itemsjson has already been creted earlier that is we are using application not for firs time
    //that means it already has one or more values in it
    else {
      //so we want to get those values back in the itemJsonArray
      //so for that we create another string
      //and retrieve all the previous values which are already stored in the local storage
      //bcoz even if we had values earlier those values would have been wiped out after every refresh from the array variable
      //so we store them in local storage and retrieve them every time
      //bcox retirevd values are in string first we store them in string
      var itemJsonArrayStr = localStorage.getItem('itemsJson');
      //parse that str back into an array and getting all the alredy created values in the array
      itemJsonArray = JSON.parse(itemJsonArrayStr); //remeber itemjsonarray will always be empty here as this func runs after click on submit//so here new itemjsonarray is going to be created each time we click on submit //basically new array is being created here
      //itemjsonarray has scope only till this click function so at each click new vars are formed so itemJsonArray will always be empty at this stage
      // after evvery execution of this fucntion vriables get destroyed
      //that is why we need to retirieve prev values always and store in this array
      //1st reason is above 2nd reason is maybe the things overwrite in storage
      //so if we append only new values previous values will be overwritten and lost
      //main point         //therefore retrieve old values in form of string, convert them to array append with new values convert back to an updated string and store back in storge
      //after retrieveing and pushing previous values into array
      //now we push the newest values which user has just entered
      itemJsonArray.push([tit, desc]);
      //and also storing those newest values + previous values as well into the local storage as a string with new values
      //that is updated string
      var str2 = JSON.stringify(itemJsonArray)
      localStorage.setItem('itemsJson', str2)
      //after that when user comes again
      //the values are again retrieved from the storage as a string
      //and those values are converted and stored in the array
      //now new values are taken and are stored in array
      //so now array has previous + new values
      //now that array is now converted back to string
      //string contains both prev and new values
      //updated string is stored back in to storage
      //this goes on
      //todo         //make flowchart of this logic 
    }
    console.log(itemJsonArray)

     //to display the newly added TODO LIst Items on click of add to List
     let tableBody = document.getElementById("tableBody")
     let str = "";
     itemJsonArray.forEach((element, index) => {
       str += `
       <tr>
         <th scope="row">${index}</th>
         <td>${element[0]}</td>
         <td>${element[1]}</td>
         <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></th>
       </tr>
       
       `
     });

     tableBody.innerHTML = str;

  });
}
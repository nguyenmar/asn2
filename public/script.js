function func1 (a,b,c){
    console.log(a+b+c);
}

var func2 = function(){
    console.log("hello world");
}

// func2();

function asc(a,b){
    return a-b;
}

var arr = [10, 22, 13, 54, 5, 69];
arr.sort(asc);

// for (item in arr) {
//  console.log(arr[item]);    
// }

var x = arr.every(function(val){
    return val > 7;
});

console.log(x);

// -- objects

// var person = { 
//     firstname: "Mar",
//     lastname: "Nguyen",
//     id: 1234,
//     fullname: function(){
//         return this.firstname + " " + this.lastname;
//     }
//  }

// function Person(f, l, i, a)
// {
//     this.firstname = f;
//     this.lastname = l;
//     this.age = a;
//     this.id = i;
// }

// -- event handlers
function runcommand(){
    document.getElementsByTagName("h1")[0].innerHTML = "ADD USERS";
}
document.getElementById("button").onclick = runcommand;

// -- event listeners
document.getElementById("button").addEventListener('click', (evt)=>{console.log("hello")});
document.getElementById("button").addEventListener('click', (evt)=>{console.log("world")});

window.addEventListener('keypress', (evt)=>{console.log(evt.keyCode)});



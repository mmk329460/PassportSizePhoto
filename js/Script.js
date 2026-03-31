let img=document.querySelector("img");

img.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdv6adqkEh4qlVIM6tHJT4Tz2hytIc7xPmpAmAGX5SzhBFmnFf4EGFkxkFexce164PbdoGNvnyWaLj7wpTZ58Y9-aWSAMf&s&ec=121584914")

let h2=document.querySelector("h2");
h2.style.color="blue";



/// add eventListener

h2.addEventListener("click",function(){
  h2.style.color="red";
})


/// dblclick

let p=document.querySelector("p");
p.addEventListener("dblclick",function(){
  p.style.color="green";
})


/// input

let inp = document.querySelector("input");
inp.addEventListener("input",function(evn){
  console.log(evn.data);
})


let input = document.querySelector("input");
let output = document.querySelector("#output");

input.addEventListener("input", function(e){
  output.innerText = e.target.value;
});



// change even tab chalta hai jab aapka input select ya textarea mein koi change  ho jaaaye

let sel=document.querySelector("select");
let device=document.querySelector("#mm");
sel.addEventListener("change",function(dets){
  device.textContent=`${dets.target.value} Device Selected`;

})

/// first mini project

let h1=document.querySelector("h1");
window.addEventListener("keydown",function(dets){
  h1.textContent=dets.key;
  
});



/// upload file

let btn=document.querySelector("#btn");
let filein=document.querySelector("#filei");
btn.addEventListener("click",function(){
  filein.click();
});


filein.addEventListener("change",function(val){
  const file=val.target.files[0];
  if(file){
    btn.textContent=file.name;
  }
});
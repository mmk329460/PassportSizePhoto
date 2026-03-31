
let form=document.querySelector("form");
let inputs=document.querySelector("input");

let main=document.querySelector("#main");

form.addEventListener("submit",function(val){
  val.preventDefault();

  let card=document.createElement("div");
  card.classList.add("card");

  let profile=document.createElement("div");
  profile.classList.add("profile");

  card.appendChild(profile);


  let img=document.createElement("img");
  img.setAttribute("src","https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg")


  let h3=document.createElement("h3");
  h3.textContent="lkjdlfkhsdkfjlkshf";
  let h5=document.createElement("h5");
  h5.textContent="ikjhffkjhdkjhf";
  let p=document.createElement("p");
  p.textContent="hkjhjajjia,ndfkdakjhdfkhaskjfhkjhf";

  profile.appendChild(img);
  card.appendChild(profile);
  card.appendChild(h3);
  card.appendChild(5);
  card.appendChild(p);
 
  main.appendChild(card);


});



 /// MOUSEOVER

 let abc=document.querySelector("#ab");
 abc.addEventListener("mouseover",function(){
  abc.style.backgroundColor="blue";
 })

 abc.addEventListener("mouseout",function(){
  abc.style.backgroundColor="red";
 })




 //// window mousemove

 window.addEventListener("mousemove", function(dets){
  abc.style.top=dets.clientY + "px";
  abc.style.left=dets.clientX + "px";
 })



 ///  tubble

 let ul=document.querySelector("ul");
 ul.addEventListener("click",function(dev){
  dev.target.classList.toggle("lt");
 })
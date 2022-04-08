const button = document.querySelector(".button");
console.log(button)
button.addEventListener("click", function(){
    buttonPressed(this)
})
function buttonPressed(button){
    button.classList.add("pressed")
    setTimeout(function(){
        button.classList.remove("pressed")
    }, 100)
}
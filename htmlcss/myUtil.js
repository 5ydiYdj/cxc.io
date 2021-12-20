function showData(data,selector){
    let temp = document.querySelector(selector);
    temp.innerText = data;
}

function changeBackgroundColor(color,selector){
    let temp = document.querySelector(selector);
    temp.style.backgroundColor = color; 
}
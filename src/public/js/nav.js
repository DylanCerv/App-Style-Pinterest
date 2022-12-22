const btnHome = document.getElementById('Home');
const btnAdd = document.getElementById('Add');

const URLactual = window.location.pathname;;


if (URLactual == '/') {
    btnAdd.classList.remove('mark');
    btnHome.classList.add('mark');

}else if(URLactual.substring(0, 5) == '/img/'){
    btnHome.classList.remove('mark');
    btnAdd.classList.remove('mark');

}else if(URLactual == '/upload'){
    btnHome.classList.remove('mark');
    btnAdd.classList.add('mark');
}

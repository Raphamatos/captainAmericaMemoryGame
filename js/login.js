const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');


const validateInput = ({target}) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled');//remove o atributo desabilitado
    }else{
        button.setAttribute('disabled', '');//adiciona o atributo desabilitado
    }
}
const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('Player', input.value);
    window.location = '../pages/game.html';

}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

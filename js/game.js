const grid = document.querySelector('.grid');//seleciona a tag grid
const spanPlayer = document.querySelector('.player');//seleciona a tag player
const tempo = document.querySelector('.tempo');


const personagens = [
    'Capitãoamerica1',
    'Capitãoamerica2',
    'Capitãoamerica3',
    'Capitãoamerica4',
    'Capitãoamerica5',
    'Capitãoamerica6',
    'Capitãoamerica7',
    'Capitãoamerica8',
    'Capitãoamerica9',
    'Capitãoamerica10',
];//array das imagens

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = ''; //pega o valor da primeira carta selecionada
let secondCard = '';//pega o valor da segunda carta selecionada

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('disabled-card');
    if (disabledCards.length === 20) {
        alert('Eu posso fazer isso o dia todo!');
        clearInterval(this.loop);//para o tempo
    }
} // Conta quantas cartas foram desabilitadas, ao chegar em 20, finaliza o jogo

const checkCards = () => {
    const firstPersonagem = firstCard.getAttribute('data-personagem'); //adicionda na carta um atributo, para comparação
    const secondPersonagem = secondCard.getAttribute('data-personagem'); //adicionda na carta um atributo, para comparação
    if (firstPersonagem === secondPersonagem) {
        firstCard.firstChild.classList.add('disabled-card');//adiciona na carta a classe "desativada"
        secondCard.firstChild.classList.add('disabled-card');//adiciona na carta a classe "desativada"
        firstCard = '';
        secondCard = '';
        checkEndGame();

    } else
        setTimeout(() => {
            firstCard.classList.remove('revelar-card');//remove na carta a classe
            secondCard.classList.remove('revelar-card');
            firstCard = '';
            secondCard = '';
        }, 1000);

}

const revelarCard = ({ target }) => {
    if (target.parentNode.className.includes('revelar-card')) {
        return;
    }//verifica se a carta tem a classe revelar
    if (firstCard === '') {
        target.parentNode.classList.add('revelar-card');
        firstCard = target.parentNode;//adiciona na carta a classe revelar
    } else if (secondCard === '') {
        target.parentNode.classList.add('revelar-card');
        secondCard = target.parentNode;//adiciona na carta a classe revelar
        checkCards();//chama a função check
    }
}

const createCard = (personagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('../imagens/${personagem}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revelarCard);//adiciona evento de click 
    card.setAttribute('data-personagem', personagem);
    return card;
}

const loadGame = () => {
    const duplicatePersonagens = [...personagens, ...personagens];
    const embaralhadoArray = duplicatePersonagens.sort(() => Math.random() - 0.5);
    embaralhadoArray.forEach((personagem) => {
        const card = createCard(personagem);
        grid.appendChild(card);
    });
}
const startTimer = () => {
    this.loop = setInterval(() => { // o this que é um objeto vai dar a condição de recuperar esse setInterval em qualquer lugar do nosso site
        const tempoAtual = +tempo.innerHTML;
        tempo.innerHTML = tempoAtual + 1;
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('Player'); //nome do Player salvo da tela de login
    startTimer();//da play na função de contagem do tempo
    loadGame();
}

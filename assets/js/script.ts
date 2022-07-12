// declarando variáveis
let url: string;
const result: HTMLElement | null = document.querySelector('#result');
let areaWord: HTMLInputElement | null = document.querySelector('#input-word');

// função para buscar palavra 
async function searchWord() {

    // pegando valores
    let word: string | undefined = areaWord?.value;

    // validando valor requisitado
    if (areaWord!.value == '') {

        result!.innerHTML = 'digite uma palavra antes de buscar';

    } else {
        //criando url e exibindo a plavra pesquisa ao usuário
        url = `https://significado.herokuapp.com/v2/${word}`;
        result!.innerHTML = `<h2 id="searched-word">${word}</h2>`;

        // realizando requisição a API
        await fetch(url)
        // tratando o retorno positivo da promise
        .then(valor => valor.json())
        .then(array => {
            result!.innerHTML += `
            <p><span>1°</span>${array[0].meanings[0]}</p>
            <p><span>2°</span>${array[0].meanings[1]}</p>
            `;
        }).catch(() => {
            // tratando o retorno negativo da promise
            result!.innerHTML += '<p>Não foi possível encontrar o significado desta palavra, verifique a ortografia e tente novamente</p>';
        });
    }
}

// função para ocultar o resultado ao começar uma nova busca
function reset() {

    areaWord!.value = '';
    result!.innerHTML = '';
};
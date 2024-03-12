const conteinerVideos = document.querySelector('.videos__container');

async function buscarEMostrarVideos(){
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

        videos.forEach((video) => {

            if(video.categoria == "") {
                throw new Error('Video nao tem categoria');
            } //isso pode usar para avisar os erros especificos

            conteinerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo Dp Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p> <!-- hidden sinifica escondido, usamos apenas para pegar info pelo class catehoria-->
                </div>
            </li>

            `;
        })
    } catch(error) {
        conteinerVideos.innerHTML = `<p style="color: crimson;"> Houve um erro ao corregar os videos: ${error} </p>`
    } finally {
        //alert('Isso sempre acontece!');
    }
}

buscarEMostrarVideos();

//tratamos erro com try .... catch

/* ESTE JEITO QUANDP TEM POUCAS OPERACOES .then
//O fetch é um método do JavaScript que significa "buscar". O lugar em que buscaremos é a API.
const api = fetch("http://localhost:3000/videos")
.then(resposta => (resposta.json()))
//O .then()  é uma função do JavaScript assíncrono. Ela vai esperar a nossa promise ser cumprida, ou seja, ficar fulfilled. E quando isso acontecer, realizará a ação estipulada na função.
// .json é uma função que vai transformar nossa resposta em um JSON (JavaScript Object Notation)
.then((videos) => 
    videos.forEach((video) => {
        conteinerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="Logo Dp Canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>

        `;
    })
)

//tratamento dos erros

.catch((error) => {
    conteinerVideos.innerHTML = `<p> Houve um erro ao corregar os videos: ${error} </p>`
}) */



//tratando barra de pesquisa

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener('input', filtrarPesquisa);  //quando acontece input

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
  
    videos.forEach((video) => {
      const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        //manipuka display   //1valorFiltro true?    //2titulo inclue valorFiltro  //se 1true e 2true //se 1true e 2false  // se 1false
      video.style.display =     valorFiltro ?          titulo.includes(valorFiltro) ? 'block'           : 'none'            : 'block';
    });
  }
  

/*um jeito mais PESADO

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');

    if(barraDePesquisa.value != "") {  //se input nao esta vazio
        for (let video of videos) {  //for cada video dos videos
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase(); //procuramos os titulos e modificamos em LowerCase
            let valueFiltro = barraDePesquisa.value.toLowerCase(); // modificamos input em LowerCasa

            if(!titulo.includes(valueFiltro)) {   //se titulo nao igual input
                video.style.display = "none"; //video desaparece da tela
            } else {
                video.style.display = "block"; //se nao fica na tela
            }
        }
    } else {
        videos.style.display = "block"; // se input vazio todos os videos permanecem na tela
    }
}*/

//filtrando categorias

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach ((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = filtro.toLowerCase();

    videos.forEach((video) => {
        const categoria = video.querySelector('.categoria').textContent.toLowerCase();

        video.style.display =  valorFiltro!='tudo' ? categoria.includes(valorFiltro) ?  'block' : 'none' : 'block';
    });
    /*
    for( let video of videos) {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro)&& valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }*/   
}
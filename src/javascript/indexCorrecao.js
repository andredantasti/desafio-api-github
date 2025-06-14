

// function pegarNomeInput(){
//     const btn = document.getElementById("btn-search");
//     btn.addEventListener("click", function(){
//         const username = document.getElementById("input-search").value;
//         if(username == ""){
//             alert("Favor inserir um nome de usuário")
//         } else{
//             console.log(username);
//         }

//         pegarDadosGit(username);
//         pegarRepositorio(username);
//     })
// }

// pegarNomeInput();

// async function pegarDadosGit(username){

//     const resposta = await fetch(`https://api.github.com/users/${username}`);
//     console.log(resposta);
//     const user = await resposta.json();
//     console.log(user);
//     const {avatar_url, name, bio} = user;
//     console.log(avatar_url);
//     console.log(name);
//     console.log(bio);

//     nome.innerText = user.name ?? "usuário não cadastrado";
//     biografia.innerText = user.bio ?? "usuário não tem Bio";
//     imagemAvatar.src = user.avatar_url;

// }

// async function pegarRepositorio(username) {
//     const resposta = await fetch(`https://api.github.com/users/${username}/repos`)
//     console.log(resposta);

//     const repositorio = await resposta.json();
//     console.log(repositorio);
    
//     const dezRepositorio = repositorio.slice(
//         1,11);
//     console.log(dezRepositorio);

//     dezRepositorio.forEach(respo => {
//        console.log(respo);
       
//        const li = document.createElement("li");
//        const a = document.createElement("a");

//        li.appendChild(a);
//        listaRepositorios.appendChild(li);
        
//         a.textContent = respo.name;
//         a.href = respo.clone_url;
//         a.target = "_blank";
       

//        console.log(li);
       
//     });
// }

import { baseUrl, repositoriesQuantity } from "./services/variables.js";
import {getUser} from "./services/getUser.js";
import {getRepositories} from "./services/getRepositories.js";
import {user} from "./objects/user.js";
import {screen} from "./objects/screen.js";

const nome = document.getElementById("name");
const biografia = document.getElementById("bio");
const imagemAvatar = document.getElementById("avatar");
const listaRepositorios = document.getElementById("lista");

document.getElementById("btn-search").addEventListener("click", function(){
    const userName = document.getElementById("input-search").value;

    getUserData(userName);
    getUserRepos(userName);
})

document.getElementById("input-search").addEventListener("keyup", function(e){
    const userName = e.target.value; //valor que está dentro do input
    const key = e.which || e.keyCode; //acionando ação pelo teclado
    const isEnterKeyPressed = key === 13;
    if(isEnterKeyPressed){
        getUserData(userName);
        
    }
})

async function getUserData(userName){

    const userResponse = await getUser(userName);
    const repositoriesResponse = await getRepositories(userName);
    

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    console.log(user)


    screen.renderUser(user);

    //user.setRepositories(respositories);

    // getUser(userName).then(userData => {
    //     let userInfo = `<div class="info">
    //                 <img src="${userData.avatar_url}" alt="Foto perfil usuário">    <div class= "data">
    //                 <h1>${userData.name ?? 'Não possui nome cadastrado'}</h1>
    //             <p>${userData.bio ?? 'Não possui Bio cadastrada'}</p>
    //             </div>
    //             </div>`


    //             document.querySelector(".profile-data").innerHTML = userInfo;
    // })
}


// function getUserRepos(userName){
//      getRepositories(userName).then(reposData => {
//          let repositoriesItens = "";
//          reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
//          });
//          document.querySelector(".profile-data").innerHTML += `<div class="repositories section">
//          <h2>Repositórios</h2>
//          <ul>${repositoriesItens}</ul>
//          </div>`
//     })
// }


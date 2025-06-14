const btn = document.getElementById("btn-search");
console.log(btn);

const dadosPagina = document.getElementsByClassName("profile-data");
const nome = document.getElementById("name");
const avatar = document.getElementById("avatar");
const biografia = document.getElementById("bio");
const repositorio = document.getElementsByClassName("repositories");
const linhas = document.getElementsByTagName("li");
console.log(linhas);
const lista = document.getElementById("lista");
console.log(lista);

btn.addEventListener("click", function () {
  pegarUsuario();
  pegarRepositorio();
});

async function pegarUsuario() {
  const username = document.getElementById("input-search").value;
  try {
    const resposta = await fetch(`https://api.github.com/users/${username}`);
    console.log(resposta);
    const user = await resposta.json();
    console.log(user);
    const { name, avatar_url, bio } = user;
    avatar.src = user.avatar_url;
    nome.innerText = user.name;
    biografia.innerText = user.bio;
  } catch (error) {
     if(`${username == ""}`){
    console.log("Usuário não encontrado", error);
    }
  }finally{
    console.log("Bloco pegar Usuario Finalizado");
  }
}

async function pegarRepositorio() {
  const username = document.getElementById("input-search").value;
  try {

      const resposta = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  console.log(resposta);
  const repositorio = await resposta.json();
  console.log(repositorio);

  const dez = repositorio.slice(1, 11);
  console.log(dez);
  console.log(dez[2].name);
  console.log(dez[2].archive_url);

  dez.forEach((element) => {
    const li = document.createElement("li");
    console.log(li);
    const a = document.createElement("a");
    li.appendChild(a);

    a.textContent = element.name;
    a.href = element.clone_url;
    a.target = "_blank";

    lista.appendChild(li);
  });
    
  } catch (error) {
    if(`${username == ""}`){
    console.log("Usuário não encontrado", error);
    }
  } finally{
    console.log("Bloco repositorios Finalizado");
  }

}

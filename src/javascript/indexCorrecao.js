
import { baseUrl, repositoriesQuantity } from "./services/variables.js";
import { getUser } from "./services/getUser.js";
import { getRepositories } from "./services/getRepositories.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", function () {
  const userName = document.getElementById("input-search").value;
  if(validadeEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", function (e) {
  const userName = e.target.value; //valor que está dentro do input
  const key = e.which || e.keyCode; //acionando ação pelo teclado
  const isEnterKeyPressed = key === 13;
  if (isEnterKeyPressed) {
   if(validadeEmptyInput(userName)) return;
    getUserData(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if(userResponse.message === "Not Found"){
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  console.log(user);

  screen.renderUser(user);

}

function validadeEmptyInput(userName){
     if (userName.length === 0) {
      alert("Preencha o campo com um nome de usuário do GitHub");
      return true;
    }
}
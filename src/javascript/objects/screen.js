const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                     <img src="${
                       user.avatarUrl
                     }" alt="Foto perfil usuário">    <div class= "data">
                     <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                 <p>${user.bio ?? "Não possui Bio cadastrada"}</p>
                 <p>  <i class="fas fa-user"> </i> ${
                   user.followers
                 } Followers </p> 
                 <p> <i class="fas fa-user"></i> ${
                   user.following
                 } Following </p>
                 </div>
                 </div>`;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} <p>
      <span><i class="fa-solid fa-code-fork"></i> ${repo.forks}</span> 
      <span><i class="fa-solid fa-star fa-" style="color: #FFD43B;"></i> ${repo.stargazers_count}</span> 
      <span>👀${repo.watchers}</span> 
      <span>🧑‍🏫${repo.language}</span></p></a>
      </li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
         <h2>Repositórios</h2>
         <ul>${repositoriesItens}</ul><div/>`;
    }

    let eventsItens = "";

    user.events.forEach((event) => {
      if (event.type === "PushEvent" || "CreateEvent") {
        let repoName = event.repo.name;

        if (event.type === "PushEvent") {
          let message = event.payload.commits[0].message;
          eventsItens += `<li><strong>${repoName}</strong> - ${message}</li>`;
        } else {
          eventsItens += `<li><strong>${repoName}</strong> - Sem mensangem de commit</li>`;
        }
      }
    });

    this.userProfile.innerHTML += `<div class="events section">
      <h2>Eventos</h2>
      <ul>${eventsItens}</ul>
      </div>`;
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não Encontrado</h3>";
  },
};

export { screen };

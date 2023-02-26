import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.errorMessage = document.querySelector(".error-message");
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  updateUser() {
    const promises = this.entries.map((entry) => GithubUser.search(entry.login));

    Promise.all(promises)
      .then((results) => {
        results.forEach((result, index) => {
          const { public_repos, followers } = result;
          this.entries[index].public_repos = public_repos;
          this.entries[index].followers = followers;
        });

        localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
        this.update();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async addUser(username) {
    try {
      this.errorMessage.textContent = "";

      if (!username.trim()) {
        this.errorMessage.textContent = "O campo de usuário está vazio.";
        return;
      }

      const user = await GithubUser.search(username);

      const duplicateUser = this.entries.find((entry) => user.login === entry.login);

      if (duplicateUser) {
        this.errorMessage.textContent = "O usuário já está na lista de favoritos.";
        return;
      }

      if (user.login === undefined) {
        this.errorMessage.textContent = `O usuário não foi encontrado`;
        return;
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  deleteUser(user) {
    const filteredUsers = this.entries.filter((entry) => user.login !== entry.login);

    this.entries = filteredUsers;

    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.container = document.createElement("div");
    this.container.classList.add("users-container");

    this.root.appendChild(this.container);
    this.onAdd();
    this.updateUser();
  }

  onAdd() {
    const addUserButton = document.querySelector(".addUser");
    const searchInput = document.querySelector(".search-input");

    const handleAddUser = () => {
      const username = searchInput.value;
      this.addUser(username);
    };

    addUserButton.onclick = handleAddUser;

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleAddUser();
      }
    });

    searchInput.addEventListener("keydown", () => {
      this.errorMessage.textContent = "";
    });
  }

  update() {
    this.removeAllFavorites();

    this.entries.forEach((user) => {
      const newUser = this.createUser();

      newUser.querySelector(".user-name").textContent = user.name;
      newUser.querySelector(".user-login").textContent = user.login;
      newUser.querySelector(".user-login").href = `https://github.com/${user.login}`;
      newUser.querySelector(".user-followers").textContent = `${user.followers} seguidores`;
      newUser.querySelector(".user-repositories").textContent = `${user.public_repos} repositórios`;
      newUser.querySelector(".user-image").src = `https://github.com/${user.login}.png`;
      newUser.querySelector(".user-image").alt = `Imagem de ${user.name}`;

      newUser.querySelector(".user-remove").onclick = () => {
        this.deleteUser(user);
      };

      this.container.append(newUser);
    });
  }

  createUser() {
    const div = document.createElement("div");
    div.classList.add("user");

    div.innerHTML = `
          <div class="user-info">
            <span href="" class="user-remove"></span>
            <p class="user-name"></p>
            <a href="" class="user-login" target="_blank"></a>
            <p class="user-followers"></p>
            <p class="user-repositories"></p>
          </div>
          <img src="" alt="" class="user-image" />        
        `;

    return div;
  }

  removeAllFavorites() {
    this.container.innerHTML = "";
  }
}

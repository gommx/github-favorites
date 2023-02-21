export class Repositories {
  static async searchRepositories() {
    const endpoint = `https://api.github.com/search/repositories?q=created:>2023-01-20&sort=stars&order=desc&per_page=5`;

    const response = await fetch(endpoint);

    const repositories = await response.json().then((repositories) =>
      repositories.items.map((repository) => {
        return {
          repo_name: repository.name,
          repo_url: repository.html_url,
          owner_login: repository.owner.login,
          owner_avatar: repository.owner.avatar_url,
          owner_url: repository.owner.html_url,
          language: repository.language,
          stars: repository.stargazers_count,
          forks_count: repository.forks_count,
          description: repository.description,
        };
      })
    );
    return repositories;
  }
}

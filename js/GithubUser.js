/**
 * Classe GithubUser com método estático search para buscar informações do usuário no Github.
 */
export class GithubUser {
  /**
   * Método estático que faz uma requisição HTTP para a API do Github com o nome de usuário fornecido e retorna um objeto contendo algumas informações básicas sobre o perfil do usuário.
   * @param {string} username O nome de usuário do Github a ser pesquisado.
   * @returns {Promise<object>} Um objeto contendo informações sobre o perfil do usuário no Github, incluindo login, nome, quantidade de repositórios públicos e quantidade de seguidores.
   */
  static async search(username) {
    // Cria o endpoint da API do Github a partir do nome de usuário fornecido.
    const endpoint = `https://api.github.com/users/${username}`;

    // Faz uma requisição HTTP para o endpoint e retorna a resposta em formato JSON.
    const response = await fetch(endpoint);
    const { login, name, public_repos, followers } = await response.json();

    // Extrai alguns campos específicos do objeto JSON retornado e retorna um objeto contendo apenas esses campos.
    return { login, name, public_repos, followers };
  }
}

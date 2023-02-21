# Documentação do código

Esta aplicação é um gerenciador de favoritos de usuários do GitHub. Ele permite que o usuário adicione nomes de usuário do GitHub à lista de favoritos, remova usuários da lista e visualize informações básicas sobre cada usuário, como o nome, a quantidade de repositórios públicos e a quantidade de seguidores. Os usuários favoritados são armazenados localmente e exibidos em uma lista na interface do usuário.

## Pontos principais do projeto

- Utilização da API do Github para buscar informações de usuários.
- Uso de `Promises` e `async/await` para realizar chamadas assíncronas à API do Github.
- Manipulação do armazenamento local do navegador (`localStorage`) para salvar e recuperar a lista de usuários favoritos;
- Uso de `classes` e `herança` no JavaScript para criar objetos e compartilhar comportamentos;
- Implementação de duas classes, `Favorites` e `FavoritesView`, que trabalham juntas para adicionar, remover, armazenar, recuperar e exibir os usuários favoritos.
- Manipulação do `DOM` para exibir e atualizar a lista de favoritos na página.
- Uso de eventos do navegador (como `click` e `keydown`) para adicionar usuários favoritos e interagir com a interface.
- Tratamento de erros ao adicionar usuários favoritos, com mensagens de alerta personalizadas.
- Utilização do padrão de módulos do JavaScript (`ES6 modules`).
- Implementação de uma interface gráfica simples, mas funcional, que permite adicionar e remover usuários favoritos.

## Arquivos

`index.html`

Este é o arquivo HTML principal da aplicação. Ele inclui links para fontes externas (Google Fonts), meta tags, links para folhas de estilo e scripts, e também contém o conteúdo da página, incluindo um cabeçalho e um conteúdo principal. O cabeçalho contém um título e um campo de pesquisa, enquanto o conteúdo principal contém a seção principal do site onde os resultados da pesquisa serão exibidos.

`style.css`

Este arquivo CSS contém a folha de estilos utilizada na aplicação.

`main.js`

Este é o arquivo principal da aplicação. Ele instancia a visualização de favoritos e a adiciona ao elemento com ID `#app` no arquivo HTML.

`GithubUser.js`

Este arquivo contém a classe `GithubUser`, que tem um método estático `search` para buscar informações do usuário no Github. A classe utiliza a API pública do Github para fazer uma requisição HTTP e retornar algumas informações básicas sobre o perfil do usuário, como login, nome, quantidade de repositórios públicos e quantidade de seguidores.

`Favorites.js`

Este arquivo contém as classes `Favorites` e `FavoritesView`. A classe `Favorites` é responsável por gerenciar a lista de favoritos. Ela armazena os usuários favoritados em um array e fornece métodos para adicionar e remover usuários da lista. A classe `FavoritesView` estende a classe `Favorites` e é responsável por exibir a lista de favoritos na interface do usuário.

## Fluxo de execução

1. Quando o arquivo `index.html` é carregado, ele carrega os arquivos JavaScript necessários e instância a visualização de favoritos no elemento com ID `#app`.

2. O usuário pesquisa por um nome de usuário no campo de pesquisa e clica no botão "Adicionar" ou pressiona a tecla Enter.

3. A aplicação faz uma chamada à API pública do Github para buscar informações sobre o usuário pesquisado.

4. Se o usuário pesquisado ainda não está na lista de favoritos, a aplicação adiciona o usuário à lista de favoritos e atualiza a visualização.

5. Se o usuário pesquisado já está na lista de favoritos, a aplicação exibe uma mensagem de erro informando que o usuário já foi adicionado à lista.

6. Se o usuário pesquisado não é encontrado na API do Github, a aplicação exibe uma mensagem de erro informando que o usuário não foi encontrado.

7. O usuário pode clicar no botão "Remover" ao lado do nome do usuário para removê-lo da lista de favoritos. A aplicação remove o usuário da lista e atualiza a visualização.

## Considerações finais

Este código é um exemplo simples de como utilizar a API pública do Github para buscar informações do perfil de um usuário e armazenar essas informações localmente em uma lista de favoritos. É possível expandir esta aplicação de várias maneiras, como adicionando mais informações sobre o perfil do usuário ou permitindo que o usuário pesquise por repositórios específicos.
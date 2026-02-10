# A fazer

- Tirar função de edição na propria pagina do card e quando o usuario clicar em editar ele será redirecionado para a página de criação do card mas com o titulo de editar e com o objeto do card para editar.[segundo]

- Criar dois card base para cada deck criado, um card base representa um card a ser adicionado e o outro card base representa um card a ser editado.
- Criar um estado para modificacao da criacao desses cards nos decks ja existentes, se no inicio do render home o estado for falso, entao para cada deck criado será criado dois cards (cardBaseCriar, cardBaseEditar), os cards serao armazenados em um objeto chamado cardBase com atributos (criar, editar) dentro do proprio deck.

- Ao criar card, mostrar uma mensagem dizendo: card criado com sucesso.

- Fazer o cardModal puxar do modal onde tera o background do modal.

1- Criar estado para salvar no localSotrage chamado atualizado

2- Fazer uma funcao com base no estado do atualizado verificando se ele for falso atualizar e criar para cada deck criado um objeto chamado cardBase e dentro do cardBase (criar e editar) contendo o mesmo objeto do card base, ao final da função, setar o atualizado para true. 
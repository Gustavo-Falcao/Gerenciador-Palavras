# A fazer

- Tirar função de edição na propria pagina do card e quando o usuario clicar em editar ele será redirecionado para a página de criação do card mas com o titulo de editar e com o objeto do card para editar.[segundo]

- Ao criar card, mostrar uma mensagem dizendo: card criado com sucesso.



2- Fazer uma funcao com base no estado do atualizado verificando se ele for falso atualizar e criar para cada deck criado um objeto chamado cardBase e dentro do cardBase (criar e editar) contendo o mesmo objeto do card base, ao final da função, setar o atualizado para true. 

- Separar funcionalidades e UI diferente para criar card e editar card.
 - O controle de modo (edicao/criacao) sera feito pelo stateNavegacao.cardPanel.mode.
 - Alteracoes:
    - Titulo da pagina (criar/editar)
    - Botao final (criar card/salvar alteracoes)
 - Quando o mode estiver em editar
  - Um botao aparecera dando a opcao de voltar, e se o usuario voltar e nao tiver salvo as alteracoes, aparecera um modal perguntado se ele quer mesmo voltar e perder todas as alteracoes feitas, com opcoes como (Sim/Salvar e sair).
  - Se caso o usuario só sair, os dados da edicao que ele fez ainda estarao salvos no cardBase edicao, mas sele ele clicar em outro card para editar eu verifico se o id do card que ele acabou de clicar bate com o que esta salvo no cardBase, se for igual nada muda, mas se for diferente uma mensagem aparecera dizendo "As alteracoes para o card nome foram salvas, mas nao atualizadas. Deseja descartar as mudancas feitas ou confirmar elas ?" se descartar for a opcao, entao o cardBase de edicao só ira receber o novo card que ele quer editar, caso contrario o cardBase de edicao sera atribuido ao card com o mesmo id e o novo card de edicao será atribuido ao cardBase.
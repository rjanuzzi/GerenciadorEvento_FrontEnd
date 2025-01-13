## Frontend (React + Vite)

Este projeto de frontend é desenvolvido com **React** e **Vite**, proporcionando uma interface de usuário interativa para gerenciar o login, cadastro de administradores e a administração de eventos. Abaixo estão as funcionalidades principais implementadas:

### 1. Tela de Login
- **Campos:**
  - Email do Administrador
  - Senha
- **Funcionalidades:**
  - Caso o usuário opte por "Gravar Senha", ela será salva para facilitar o acesso em futuras sessões.
  - Botões de **Entrar** e **Cadastrar-se**, permitindo a navegação para a tela de cadastro.

### 2. Tela de Cadastro de Administrador
- **Campos:**
  - Nome do Administrador
  - Email
  - Senha
  - Confirmar Senha
- **Validação:** 
  - Verificação para garantir que o campo de **Senha** coincide com o campo de **Confirmar Senha**.
- **Mensagem de Sucesso:**
  - Após o cadastro, uma mensagem de sucesso é exibida, confirmando o registro do administrador.

### 3. Tela Home de Eventos
- **Funcionalidades:**
  - Exibe a lista de eventos cadastrados pelo administrador com:
    - Imagem
    - Título do evento
    - Data
    - Localização
  - **Opções de edição**: Permite editar a data e a localização de cada evento.
  - **Excluir evento**: Possibilita a remoção de um evento da lista.
  - **Botão de Adicionar Evento**: Ao clicar, abre uma modal com os seguintes campos:
    - Nome do evento
    - Data
    - Localização
    - Imagem
  - **Botão de salvar**: Permite salvar um novo evento após o preenchimento dos campos.

Este frontend interage diretamente com o backend (Spring Boot) para autenticação e manipulação de dados de eventos, proporcionando uma experiência de gerenciamento de eventos simples e eficiente.

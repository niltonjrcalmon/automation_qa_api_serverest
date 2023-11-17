# Cypress Serverest API Test
 
Projeto com objetivo de automação de testes de API utilizando o framework Cypress. Desenvolvido na API REST https://serverest.dev/.

## Ferramentas utilizadas:
- [VSCode](https://code.visualstudio.com/ "VSCode")
- [Cypress](https://www.npmjs.com/package/cypress "Cypress")
- [Node.js](https://nodejs.org/en/download "Node.Js")

## Linguagem aplicada:
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript "JavaScript")
 
## Tutorial, Instalação e execução
 
### Executar este projeto em sua maquina

* Clone o repositório 
```
https://github.com/niltonjrcalmon/automation_qa_api_serverest.git
```
 
* Em um terminal, dentro da pasta do projeto, execute o seguinte comando:
 
**Instalar as dependências:**  
```
npm install
```
 
### Tutorial para iniciar um novo projeto utilizando esta estrutura
 
* Dentro da pasta especifica para o projeto:

**Pacote para inicializar um novo projeto Node.js e criar um arquivo package.json com valores padrão**
```
npm init -y 
```
 
* Instalar a última versão do cypress:
```
npm install --save-dev cypress
```
* Instalar o bahmutov para facilitar visualmente os teste de API com Cypress:
```
npm install --save-dev @bahmutov/cy-api
```
* Somente para o report do mochawesome:  
```
npm install --save-dev mochawesome
npm install cypress-multi-reporters --save-dev
```

- [Faker](https://github.com/faker-js/faker "Faker"): gerar dados de teste.


### Truque
 
* Execução de testes no `NPM SCRIPTS`:

**Abrir o Cypress**
```
npm run cy:open
```
**Executar os testes e gerar relatório**
```
npm run cy:run 
```
**Gerar os relatórios de testes**
```
npm run report:merge 
npm run report:generate 
```
 
## Acesso ao projeto e/ou relatório 
Configurado no workflow do GitHub para gerar os relatórios de testes e acessa-lo no GitHub Pages. Abaixo está a URL de acesso:

### https://niltonjrcalmon.github.io/automation_qa_api_serverest/

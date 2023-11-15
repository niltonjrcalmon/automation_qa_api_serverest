const faker = require('faker-br');

const product = {
  nomeProduto: faker.commerce.productName(),
  preco: faker.commerce.price(),
  descricao: faker.commerce.productAdjective(),
  qtdProduto: faker.random.number(Math.floor(Math.random() * 500))

}

describe('Login de usuário', () => {
  //método que irá realizar o login antes de iniciar os testes de CRUD
  before(() => {
    cy.api({
      method: 'POST',
      url: `/login`,
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((res) => {
      const token = res.body.authorization 
      expect(res.status).to.eql(200) 
      expect(res.body).is.not.empty 
      expect(res.body.message).to.equal('Login realizado com sucesso') 
      Cypress.env('authToken', token);
    })
  });

  it('Deve realizar login com sucesso', () => {
    // Nada precisa ser acrescentado aqui, pois o login já foi realizado no bloco 'before'
  });

  describe('CRUD - Produtos', () => {
    before(() => {
      cy.postProduct(product).then((res) => {
        expect(res.status).to.eql(201)
        expect(res.body.message).to.equal('Cadastro realizado com sucesso')
        //Vou capturar a resposta do id desse produto para utilizar em outros CRUD
        Cypress.env('productId', res.body._id)
        //Validando que o id foi criado/ id existe.
        expect(res.body._id).to.exist
      });
    })

    it('Realizar cadastro de produto com sucesso', () => {
      // Nada precisa ser acrescentado aqui, pois o cadastro já foi realizado no bloco 'before'
    });

    it('Listar produto cadastrado pelo id', () => {
      cy.api({
        method: 'GET',
        url: `/produtos/${Cypress.env('productId')}`
      }).then((res) => {
        expect(res.status).to.eql(200)
        //Validando as informações iguais de cada título do produto
        expect(res.body.nome).to.equal(product.nomeProduto)
        expect(res.body.descricao).to.equal(product.descricao)
        //Validando o id igual ao fornecido no cadastro do produto
        expect(res.body._id).to.equal(Cypress.env('productId', res.body._id))
      })
    })

    it('Editar dados do produto já cadastrado', () => {
      cy.editProduct(product).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.message).to.equal('Registro alterado com sucesso')
      })

      cy.log('consultando produto pelo Id')
      cy.api({
        method: 'GET',
        url: `/produtos/${Cypress.env('productId')}`
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.nome).to.equal(product.nomeProduto)
        expect(res.body.descricao).to.equal(product.descricao)
        //Validando que o id do "editar" é o mesmo fornecido no "cadastro" do produto
        expect(res.body._id).to.eql(Cypress.env('productId', res.body._id))
      })
    })

    it('Listar todos produtos cadastrado', () => {
      cy.api({
        method: 'GET',
        url: '/produtos'
      }).then((res) => {
        expect(res.status).to.eql(200)
      })
    })

    it('Deletar produto cadastrado', () => {
      cy.api({
        method: 'DELETE',
        url: `/produtos/${Cypress.env('productId')}`,
        headers: {
          //utilizando o token gerado no login para conseguir deletar o produto
          authorization: `${Cypress.env('authToken')}`,
        }
      }).then((res) => {
        expect(res.status).to.eql(200)
        expect(res.body.message).to.equal('Registro excluído com sucesso')
      })

      cy.log('Validando que o produto foi excluído, consultando pelo Id')
      cy.api({
        failOnStatusCode: false,
        method: 'GET',
        url: `/produtos/${Cypress.env('productId')}`,
      }).then((res) => {
        expect(res.status).to.eql(400)
        //Validando e confirmando que o produto foi excluído.
        expect(res.body.message).to.equal('Produto não encontrado')
      })
      //Listar todos os produtos cadastrado, após o último cadastrado ser deletado
      cy.log('Listar todos os produtos cadastrado')
      cy.api({
        method: 'GET',
        url: '/produtos'
      }).then((res) => {
        expect(res.status).to.eql(200)
      })
    })
  });
});


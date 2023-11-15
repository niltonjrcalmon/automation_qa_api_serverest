Cypress.Commands.add('postProduct', (product) => {
    cy.api({
        failOnStatusCode: false,
        method: 'POST',
        url: `/produtos`,
        headers: {
            //utilizando o token gerado no login para conseguir cadastrar os produtos
            authorization: `${Cypress.env('authToken')}`, 
        },
        body: {
            "nome": product.nomeProduto,
            "preco": product.preco,
            "descricao": product.descricao,
            "quantidade": product.qtdProduto
        },
    })
})

Cypress.Commands.add('editProduct', (product) => {
    cy.api({
        method: 'PUT',
        url: `/produtos/${Cypress.env('productId')}`,
        headers: {
            //utilizando o token gerado no login para conseguir editar os produtos
        authorization: `${Cypress.env('authToken')}`,
        },
        body: {
          "nome": product.nomeProduto,
          "preco": product.preco,
          "descricao": product.descricao,
          "quantidade": product.qtdProduto
        },
    })     
})
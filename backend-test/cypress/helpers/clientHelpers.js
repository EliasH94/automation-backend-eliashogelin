const faker =require('faker')
const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENTS = 'http://localhost:3000/api/client/new'
const ENDPOINT_DEL_CLIENT = 'http://localhost:3000/api/client/'
const ENDPOINT_PUT_CLIENT = 'http://localhost:3000/api/client/1'

function createRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }
    return payload
}

function editRandomClientPayload(){
    const fakeName = faker.name.firstName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "id":1,
        "created":"2020-01-05T12:00:00.000Z",
        "name":fakeName,
        "email":fakeEmail,
        "telephone":fakePhone
    }
    return payload
}

function getRequestAllClientsWithAssertions(cy, name, email, telephone){
    cy.request({
        method:"GET",
    url: ENDPOINT_GET_CLIENTS,
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    },        
    }).then((response => {
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(name)
        expect(responseAsString).to.have.string(email)
        expect(responseAsString).to.have.string(telephone)

        cy.log(response.body[response.body.length -1].id)
    }))
}

function getAllClientsRequest(cy){
    cy.authenticateSession().then((response => { 
        cy.request({
            method:"GET",
        url: ENDPOINT_GET_CLIENTS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },        
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
        }))
    }))
}

function deleteGetRequest(cy){
    cy.request({
        method:"GET",
    url: ENDPOINT_GET_CLIENTS,
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    },        
    }).then((response => {
        
        let lastID = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_DEL_CLIENT+lastID,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
            
        }))
    }))
}

function createClientRequest(cy){
    cy.authenticateSession().then((response => {
    let fakeClient = createRandomClientPayload()
    cy.request({
        method:"POST",
    url: ENDPOINT_POST_CLIENTS,
    headers:{
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    }, 
    body:fakeClient     
}).then((response => {
    const responseAsString = JSON.stringify(response)
    expect(responseAsString).to.have.string(fakeClient.name)
}))

    getRequestAllClientsWithAssertions(cy, fakeClient.name, fakeClient.email, fakeClient.telephone)

}))
}

function createClientRequestDelete(cy){
    cy.authenticateSession().then((response => {
        let fakeClient = createRandomClientPayload()
        cy.request({
            method:"POST",
            url: ENDPOINT_POST_CLIENTS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }, 
            body:fakeClient     
    }).then((response => {
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(fakeClient.name)
    }))
    
    deleteGetRequest(cy) 
    
    }))
}

function editClient(cy){
    cy.authenticateSession().then((response => {
        let fakeEditClient = editRandomClientPayload()
        cy.request({
            method:"PUT",
            url: ENDPOINT_PUT_CLIENT,
            headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
            body:fakeEditClient     
        }).then((response => {
            const responseAsString = JSON.stringify(response)
            expect(responseAsString).to.have.string(fakeEditClient.name)
        }))
    }))        
}


module.exports = {
    createRandomClientPayload,
    createClientRequest,
    getAllClientsRequest,
    createClientRequestDelete,
    editClient
}
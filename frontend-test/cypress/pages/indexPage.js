/// <reference types="cypress" />

// elements
const titleOfIndexPage ='Testers Hotel'
const usernameTextfield=':nth-child(1) > input'
const passwordTextfield = ':nth-child(2) > input'
const loginbutton ='.btn'

// action / functions

function checkTitleOfIndexPage(){
    cy.title().should('eq', titleOfIndexPage)
}

function performLogin(cy, username, password, contentToConfirm){
    cy.get(usernameTextfield).type(username)
    cy.get(passwordTextfield).type(password)
    cy.get(loginbutton).click()
    cy.contains(contentToConfirm)
}

// exports
module.exports = {
    checkTitleOfIndexPage,
    performLogin
}
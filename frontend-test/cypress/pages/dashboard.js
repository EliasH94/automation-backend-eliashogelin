/// <reference types="cypress" />

// elements
const logoutbutton = '.user > .btn'
const titleOfDashboardPage = 'Testers Hobuttontel'
const roombutton = ':nth-child(1) > .btn'
const clientbutton = '.blocks > :nth-child(2) > .btn'
const billbutton = ':nth-child(3) > .btn'
const reservebutton = ':nth-child(4) > .btn'

// action / functions

function checkTitleOfDashboardPage(){
    cy.title().should('eq', titleOfDashboardPage)
}

function performLogout(cy, contentToConfirm){
    cy.get(logoutbutton).click()
    cy.contains(contentToConfirm)
}

function visitRoomPage(cy, contentToConfirm){
    cy.get(roombutton).click()
    cy.contains(contentToConfirm)
}

function visitClientPage(cy, contentToConfirm){
    cy.get(clientbutton).click()
    cy.contains(contentToConfirm)
}

function visitBillPage(cy, contentToConfirm){
    cy.get(billbutton).click()
    cy.contains(contentToConfirm)
}

function visitReservePage(cy, contentToConfirm){
    cy.get(reservebutton).click()
    cy.contains(contentToConfirm)
}


// export
module.exports = {
    checkTitleOfDashboardPage,
    performLogout,
    visitRoomPage,
    visitClientPage,
    visitBillPage,
    visitReservePage
}
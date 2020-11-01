/// <reference types="cypress" />

import * as target from '../target/targets'

// Elements
const createRoomButton = 'h2 > .btn'
const category = ':nth-child(1) > select'
const roomNumber = ':nth-child(2) > input'
const floor = ':nth-child(3) > input'
const available = '.checkbox'
const price = ':nth-child(5) > input'
const type = ':nth-child(6) > select'
const savebutton = '.blue'

// Actions / Functions

function createRoom(cy, contentToConfirm){
    cy.get(createRoomButton).click()
    cy.get(category).select(target.category)
    cy.get(roomNumber).type(target.roomNumber)
    cy.get(floor).type(target.floor)
    cy.get(available).click()
    cy.get(price).type(target.price)
    cy.get(type).select(['penthouse', 'balcony'])
    cy.get(savebutton).click()
    cy.contains(contentToConfirm)
}

function deleteRoom(cy, contentToConfirm){
    cy.get(':nth-child(3) > .action').click()
    cy.get('.menu > :nth-child(2)').click()
    cy.contains(contentToConfirm).should('not.exist')
}


// Export

module.exports = {
    createRoom,
    deleteRoom
}


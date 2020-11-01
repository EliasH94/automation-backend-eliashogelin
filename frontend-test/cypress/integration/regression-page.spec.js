/// <reference types="cypress" />

import * as target from '../target/targets'
import * as indexFuncs from '../pages/indexPage'
import * as dashboardFuncs from '../pages/dashboard'
import * as roomFuncs from '../pages/room'

//Test suite
describe('Test suite Index', function(){

    beforeEach(()=>{
        cy.visit(target.base_url)
        indexFuncs.checkTitleOfIndexPage(cy)
    })
    // Test case
    it('Perform login and logout', function(){
        indexFuncs.performLogin(cy, target.username, target.password, 'Tester Hotel Overview')
        dashboardFuncs.performLogout(cy, 'Login')
    
    })

    it('Perform invalid login', function(){
        indexFuncs.performLogin(cy, target.username, target.invalidPassword, 'Bad username or password')
    })

})

//Test suite
describe('Test suite Dashboard', function(){

    before(()=>{
        cy.visit(target.base_url)
        indexFuncs.performLogin(cy, target.username, target.password, 'Tester Hotel Overview')
    })

    afterEach(()=>{
        cy.visit(target.dashboard_url)
    })

    it('Visit Room Page', function(){
        dashboardFuncs.visitRoomPage(cy, 'Rooms')
    })
    
    it('Visit Client Page', function(){
        dashboardFuncs.visitClientPage(cy, 'Client')
    })

    it('Visit Bill Page', function(){
        dashboardFuncs.visitBillPage(cy, 'Bill')
    })

    it('Visit Reservation Page', function(){
        dashboardFuncs.visitReservePage(cy, 'Reservation')
    })

})

describe('Create & Delete Room', function(){

  /*  before(()=>{
        cy.visit(target.base_url)
        indexFuncs.performLogin(cy, target.username, target.password, 'Tester Hotel Overview')
    }) */

    // This is a test case
    it('Create Room', function(){
        dashboardFuncs.visitRoomPage(cy, 'Rooms')
        roomFuncs.createRoom(cy, target.roomNumber)
    })

    it('Delete Room', function(){
        roomFuncs.deleteRoom(cy, target.roomNumber)
    })
})
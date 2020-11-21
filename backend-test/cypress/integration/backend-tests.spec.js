import * as clientHelper from '../helpers/clientHelpers'

describe ('Testfall', function(){

it ('Create client', function(){
   clientHelper.createClientRequest(cy)
})

it ('Get all clients', function(){
    clientHelper.getAllClientsRequest(cy)
})

it ('Edit client', function(){
    clientHelper.editClient(cy)
})

it ('Create and delete client', function(){
    clientHelper.createClientRequestDelete(cy)
})

})
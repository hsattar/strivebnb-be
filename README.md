## DEPLOYED AT 
https://hs-strivebnb.herokuapp.com/

### ENDPOINTS:
/users:
(/) => GET, POST - STRUCTURE => 
    {
        id: 'STRING'            => SERVER GENERATED
        name: 'STRING',
        lastName: 'STRING'
    }
(/:id) => GET, PUT, DELETE

/locations:
(/) => GET, POST - STRUCTURE => 
    {
        id: 'STRING'            => SERVER GENERATED
        country: 'STRING',
        city: 'STRING',
        postcode: 'STRING'
    }
(/:id) => GET, PUT, DELETE

/houses:
(/) => GET, POST - STRUCTURE => 
    {
        id: 'STRING'            => SERVER GENERATED
        name: 'STRING',
        description: 'STRING',
        price: INT,
        userId: 'FROM_USER_TABLE',
        locationId: 'FROM_LOCATION_TABLE'
    }

(/search) => GET - QUERIES SUPPORTED =>    
    ?name=QUERY_GOES_HERE 
    ?country=QUERY_GOES_HERE
    ?city=QUERY_GOES_HERE
    ?price=SPECIFY_MIN_AND_MAX_PRICE_COMMA_SEPERATED_50,200

(/deleteall) => DELETE - DELETES ALL RECORDS IN HOUSES TABLE

(/:id) => GET, PUT, DELETE
# node-task
-------------------------------------------------------------------------------------------------

  1.Run  `npm install` to install all dependencies.

  2. create '.env' file and add 3 properties :-
    ->`APP_DB`: will contain the mongodb URI
    ->`PORT`: will contain the port number
    ->`APP_SECRET`: will contain any string that will act as JWT secret.

  3. Run `npm run devStart` to run in dev mode.
  -------------------------------------------------------------------------------------------------------
  . This app has been deployed in `https://sjmahi-node-task.herokuapp.com/`
  
  . API LIST
  -------------
  `POST` https://sjmahi-node-task.herokuapp.com/api/clients
    
   
     {
    "client": {
        "agencyId": "1",
        "clientId": "06a009dfdddhhhf4-7f83-4cc07-duuhwafjdasjcfnas-4b63190e2a58a4",
        "name": "client1",
        "email": "dstpierdffy7e0@wikibas.com",
        "city": "Xinqiadfdgohe",
        "phoneNo": "1415758246",
        "totalBill": 437688
    },
    "agency":{
         "agencyId": "1",
        "name": "agency1",
        "state": "Karnataka",
        "city": "Bengaluru",
        "phoneNo": "1415778246",
        "address1": "MG ROAD"
    }
    }
  
  
  `PUT`  https://sjmahi-node-task.herokuapp.com/api/clients/`clientId` [needs token to access]
  
  
  `GET`  https://sjmahi-node-task.herokuapp.com/api/clients/topclients [needs token to access]
  
  #TEMPORARY TOKEN
  -------------------- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjA2YTAwOWRmZGRkaGhoZjQtN2Y4My00Y2MwNy1kdXVod2FmamRhc2pjZm5hcy00YjYzMTkwZTJhNThhNCIsImVtYWlsIjoiZGNsaWVudDFAZ21haWwuY29tIiwicGhvbmVObyI6IjE0MTU3NTgyNDYiLCJpYXQiOjE2NTY5NTU4MTcsImV4cCI6MTY1NzU2MDYxN30.HurQEDah1PkwnF34ag-SADSJM5k8hPN63688zt7g2Pk`

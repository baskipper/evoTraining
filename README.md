Evo training app
======================

This represents my (Benjamin Skipper) attempt to fulfill the specifications of the evo training assignment

# Getting started

Run npm install, and import the database, specifically the zip collection

# Basic usage

The table should load automatically. To update a record, click on the edit button on the right hand side. All fields are required.

# REST client usage.

To use a rest client with this app, point to port 10002. The routes are 10002/api/zip/add to add a new record, and 10002/api/zip/update to update a record.
Examples:

Adding requires all fields with the exception of _id
```
http://localhost:10002/api/zip/add

{
    "city": "Birmingham",
    "pop" : "300",
    "loc": ["33.5250", "86.8130"],
    "state": "AL"
}
```

Note that for updating, only fields that are supplied will be updated; any blank fields will be ignored. _id and at least one other field is required.
```
http://localhost:10002/api/zip/update

{
    "_id": "35244",
    "city": "Birmingham",
    "pop" : "300",
    "loc": ["33.5250", "86.8130"],
    "state": "AL"
}
```

# Relevant files

```
./lib/fetch.js
./ilb/ZipCollection.js
```

These two files are the primary means of interacting with the database.

```
./lib/restService.js
```

This file handles any calls made through a REST client

```
./web/views/partials/hello.jade
./web/public/js/controllers/mainController.js
```

This handles the primary view, containing the table displaying all zip codes.

```
./web/views/partials/edit.jade
./web/public/js/controllers/editController.js
```

This handles the edit view, allowing for a single given record to be updated through the browser.

```
./web/views/partials/loadingModalGlobal.jade
./web/views/partials/index.jade
./web/public/js/controllers/LoadingGlobalController.js
./web/public/js/services/eventsSrvc.js
```

These handle the loading GIF that I borrowed from MOBILETicket

```
./config/providers/RESTprovider.js
./config/providers/SocketProvider.js
```
These handle all rest and socket calls made to the app.
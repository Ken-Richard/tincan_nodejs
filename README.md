# Experimental Learning Record Store

`NOTE: This is an experiment and not finished.`

## Overview

The goal is to implement a Learning Record Store for the
TinCan/Experience API that supports cloud content delivery.

The initial focus is Articulate Storyline which uses the
alternative syntax (everything is a post) for all transactions.

Implemented with Node.js.

Data is stored in-memory for ease and speed of testing. Database
drivers will be added once the main transactions are implemented.

## Testing

1. npm test
2. Articulate Storyline

## How does it work?

1. Node.js with Express
2. Middleware to support CORS and OPTION.
3. Middleware to support methods verb override
 * Handles routing when method=verb appears in the query string
4. Middleware to extract the parameters
 * Extracts the body from POST/PUT
 * Handles form encoded data when the content type is json
 * Extracts the actual JSON payload from the content parameter
5. Middleware to extend the request object
 * Adds functions to handle common TCAPI parameters
6. State Handler - GET/PUT/POST/DELETE for State Requests
7. Statement Handler - GET/PUT/POST/DELETE for Statement Requests

## Supported Transactions

* GET    /TCAPI/activities/state/
* PUT    /TCAPI/activities/state/
* DELETE /TCAPI/activities/state/
* PUT    /TCAPI/statements


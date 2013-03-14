# Experimental Learning Record Store

`NOTE: This is an experiment and not finished.`

## Overview

This learning record store is built using Node.js and the
express framework.

## Where does the data go?

The data for the LRS is simply cached in memory. This is
not a long term solution. It works this way to make it
easier to debug the request processing.

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
6. State Handler - GET & PUT for State Requests
7. Statement Handler - GET & PUT for Statement Requests

## Supported Transactions

* GET /TCAPI/activities/state/
* PUT /TCAPI/activities/state/
* PUT /TCAPI/statements

## Tested With

I am testing with articulate storyline files stored in S3. The goal is
to have everything work in "the cloud" using Cloud Front CDN for delivery
of courses.


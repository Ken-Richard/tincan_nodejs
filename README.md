# Experimental Learning Record Store

`NOTE: This is an experiment and not finished.`

Project Home: <https://github.com/Ken-Richard/tincan_nodejs>

Implementation of the
[ADL Experience API](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md)

## Overview

The goal is to implement a Learning Record Store for the
TinCan/Experience API that supports cloud content delivery.
The initial focus is Articulate Storyline which uses the
alternative syntax (everything is a post) for all transactions.
Data is stored in-memory for ease and speed of testing. Database
drivers will be added once the main transactions are implemented.

## Installation

1. Install Node.js
2. git clone git@github.com:Ken-Richard/tincan_nodejs.git
3. cd tincan_nodejs
4. npm install

## Running the server (In-Memory Database)

1. node server.js

Once installed, you can use the sample URL below to run an
Articulate Storyline course with your local server as an
end point.

<http://s3.amazonaws.com/aes-media-dev/system/test/effective_teams_tincan/story.html?auth=SAMPLE-AUTHCODE&actor={%22name%22:%20[%22First%20Last%22],%20%22mbox%22:%20[%22mailto:firstlast@mycompany.com%22]}&activity_id=SAMPLE-ACTIVITY-ID&registration=SAMPLE-REGISTRATION-ID&endpoint=http://localhost:3000/xAPI/>

## Running the server (Amazon Dynamo Database)

1. Create three tables in your Amazon DynamoDB Instance. Provision at the lowest levels for the "Free Tier". This should be enough for testing.
  a. xapi-registrations (Hash Key registration_id)
  b. xapi-statements (Hash Key registration_id; Range Key statement_id)
  b. xapi-statements (Hash Key registration_id; Range Key state_id)
2. Run the server with the following environmental variables.

TC_DB=dynamo S3_KEY=<Key> S3_SECRET=<Secret> S3_REGION=<Region> node server.js

## Supported Transactions

* GET    /TCAPI/activities/state/
* PUT    /TCAPI/activities/state/
* DELETE /TCAPI/activities/state/
* PUT    /TCAPI/statements

## Testing

Tests use a in-memory dataabase by default. You can also run tests with the Amazon Dynamo DB by setting the environment
variable. Do this at your own risk - It will create, update and delete data from your tables.

1. npm test


## Implementation Details

1. Node.js server with the Express Framework
2. Middleware for CORS and HTTP Verb Overrides
3. Middleware for Parameter & Content Processing
4. Controllers for State & Statemet

## Open Tasks

<https://github.com/Ken-Richard/tincan_nodejs/blob/master/TODO.md>

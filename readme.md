# iReporter

[![Build Status](https://travis-ci.org/sojida/iReporter.svg?branch=develop)](https://travis-ci.org/sojida/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/sojida/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/sojida/iReporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/fd1eae30f69e455e74da/maintainability)](https://codeclimate.com/github/sojida/iReporter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fd1eae30f69e455e74da/test_coverage)](https://codeclimate.com/github/sojida/iReporter/test_coverage)

## Application Description
Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention.

<b> View UI Template:</b>https://sojida.github.io/iReporter/<br/>
<b> Test API Endpoints Here: </b> https://sojida-ireporter.herokuapp.com/ <br/>
<b> Pivotal Tracker: </b> https://www.pivotaltracker.com/n/projects/2226753 

## Table of content

 * [Features](#features)
 * [Technologies](#technologies)
 * [Installation](#installation)
 * [Testing](#testing)
 * [API Routes](#api-routes)



## Features

1. Users can create an account and log in.
2. Users can create a ​red-flag ​record (An incident linked to corruption).
3. Users can create ​intervention​ record​ ​(a call for a government agency to intervene e.g
repair bad road sections, collapsed bridges, flooding e.t.c).
4. Users can edit their ​red-flag ​or ​intervention ​records.
5. Users can delete their ​red-flag ​or ​intervention ​records.
6. Users can add geolocation (Lat Long Coordinates) to their ​red-flag ​or ​intervention
records​.
7. Users can change the geolocation (Lat Long Coordinates) attached to their ​red-flag ​or
intervention ​records​.
8. Admin can change the ​status​ of a record to either ​under investigation, rejected ​(in the
event of a false claim)​ ​or​ resolved ​(in the event that the claim has been investigated and
resolved)​.

## Technologies
HTML

CSS

Modern JavaScript technologies were adopted for this project

ES2015: Also known as ES6 or ES2015 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone this repository into your local machine:

`git clone https://github.com/sojida/iReporter.git`

2. Install dependencies

`npm install`

3. Start the application by running

`npm start`

4. Open your browse and Navigate to

`localhost:3000`

5. Install postman to test all endpoints


## Testing

- run test using `npm run test`

## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>GET</td> <td>api/v1/incidents</td> <td>Get all the incidents</td></tr>

<tr><td>GET</td> <td>api/v1/red-flags</td>  <td>Get all red-flag records</td></tr>

<tr><td>GET</td> <td>api/v1/interventions</td>  <td>Get all intervention records</td></tr>

<tr><td>POST</td> <td>api/v1/red-flags</td>  <td>Create red-flag record</td></tr>

<tr><td>POST</td> <td>api/v1/interventions</td>  <td>Create intervention record</td></tr>

<tr><td>PATCH</td> <td>api/v1/red-flags/:red-flag-id/location</td> <td>edit location of red-flag record</td></tr>

<tr><td>PATCH</td> <td>api/v1/interventions/:intervention-id/location</td> <td>edit location of intervention record</td></tr>

<tr><td>PATCH</td> <td>api/v1/red-flags/:red-flag-id/comment</td> <td>edit comment of red-flag record</td></tr>

<tr><td>PATCH</td> <td>api/v1/interventions/:intervention-id/comment</td> <td>edit comment of intervention record</td></tr>

<tr><td>DELETE</td> <td>api/v1/red-flags/:red-flag-id</td>  <td>delete red-flag record</td></tr>

<tr><td>DELETE</td> <td>api/v1/interventions/:red-flag-id</td>  <td>delete inervention record</td></tr>

</table>


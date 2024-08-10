// Run unit tests for various classes.
// To run: node backendJS/Tests.js
const Board = require('./Board.js');
const Piece = require('./Piece.js');
const Connections = require('./Connections.js');

Board.tests();
Piece.tests();
Connections.tests();

// TODO: make sure all constraints set are not set to defaults.
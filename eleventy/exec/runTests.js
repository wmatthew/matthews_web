// Run unit tests for various classes.
// > node exec/runTests.js

const Board = require('../backendJS/Board.js');
const Piece = require('../backendJS/Piece.js');
const Connections = require('../backendJS/Connections.js');
const PieceSupply = require('../backendJS/PieceSupply.js');

Board.tests();
Piece.tests();
Connections.tests();
PieceSupply.tests();
// TODO: make sure all constraints set are not being set to default values.
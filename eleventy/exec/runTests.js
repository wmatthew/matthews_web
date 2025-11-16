// Run unit tests for various classes.
// > node exec/runTests.js

import Board from '../backendJS/Board.js';
import Piece from '../backendJS/Piece.js';
import Connections from '../backendJS/Connections.js';
import PieceSupply from '../backendJS/PieceSupply.js';
import Constraints from '../backendJS/Constraints.js';

Board.tests();
Piece.tests();
Connections.tests();
PieceSupply.tests();
Constraints.tests();
// TODO: make sure all constraints set are not being set to default values.
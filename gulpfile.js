const blocks = require("./tasks/build-blocks");
const create = require("./tasks/create-block");
const partials = require("./tasks/build-partials");

exports.buildBlocks = blocks.buildBlocks;

exports.createBlock = create.createBlock;

exports.buildPartials = partials.buildPartials;

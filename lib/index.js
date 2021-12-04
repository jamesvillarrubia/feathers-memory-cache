"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeFind = exports.purgeId = exports.purgePath = exports.purge = exports.cacheAfter = exports.cacheBefore = void 0;
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "cacheBefore", { enumerable: true, get: function () { return hooks_1.before; } });
Object.defineProperty(exports, "cacheAfter", { enumerable: true, get: function () { return hooks_1.after; } });
var utils_1 = require("./utils");
Object.defineProperty(exports, "purge", { enumerable: true, get: function () { return utils_1.purge; } });
Object.defineProperty(exports, "purgePath", { enumerable: true, get: function () { return utils_1.purgePath; } });
Object.defineProperty(exports, "purgeId", { enumerable: true, get: function () { return utils_1.purgeId; } });
Object.defineProperty(exports, "purgeFind", { enumerable: true, get: function () { return utils_1.purgeFind; } });
//# sourceMappingURL=index.js.map
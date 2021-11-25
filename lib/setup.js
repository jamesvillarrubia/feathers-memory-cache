"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const utils_1 = require("./utils");
const lru_cache_1 = __importDefault(require("lru-cache"));
const setup = (options = {}) => (app) => {
    options = {
        max: 500,
        maxAge: 1000 * 60 * 5,
        ...options,
        ...app.get('cache') // get default settings
    };
    const customHash = typeof options.customHash === 'function' ? options.customHash : () => '';
    const buildKey = typeof options.key === 'function' ? options.key : utils_1.getKey;
    const scope = typeof options.scope === 'string' ? `cache_${options.scope}` : 'cache_Global';
    if (app.get(scope)) {
        return app.get(scope);
    }
    // console.log('typeof',typeof options.customHash)
    // console.log('customHash', customHash())
    let cache = new lru_cache_1.default(options);
    app.set(scope, {
        cache,
        customHash,
        buildKey
    });
    // console.log('been set', app.get(scope), customHash())
    return {
        cache,
        customHash,
        buildKey
    };
};
exports.setup = setup;
//# sourceMappingURL=setup.js.map
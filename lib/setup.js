"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.setDefaultOptions = void 0;
const utils_1 = require("./utils");
const lru_cache_1 = __importDefault(require("lru-cache"));
const setDefaultOptions = (options) => {
    return {
        scope: 'Global',
        allowedMethods: ['get', 'find'],
        purgeOnMutate: ['get'],
        customHash: () => '',
        key: utils_1.getKey,
        max: 500,
        maxAge: 1000 * 60 * 5,
        ...options
    };
};
exports.setDefaultOptions = setDefaultOptions;
const setup = (options) => (app) => {
    const { customHash, key: buildKey } = (0, exports.setDefaultOptions)({
        ...options,
        ...app.get('in-mem-cache') // get default settings from config
    });
    const storedScope = typeof options.scope === 'string' ? `cache_${options.scope}` : 'cache_Global';
    //prevents overwriting
    if (app.get(storedScope)) {
        return app.get(storedScope);
    }
    let cache = new lru_cache_1.default(options);
    app.set(storedScope, {
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
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeId = exports.getKey = exports.hashCode = void 0;
const qs = __importStar(require("qs"));
// Collisions are possible with this code but not likely
function hashCode(s) {
    let h;
    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return String(h || '');
}
exports.hashCode = hashCode;
// This function returns repeatable key based on the contents of the ctx.
// Keys should be idempotent 
function getKey(ctx, customHash) {
    ctx.params = ctx.params || {};
    const q = ctx.params.query || {};
    const p = ctx.params.paginate === false ? 'disabled' : 'enabled';
    let path = `pagination-ctx:${p}::${ctx.path}`;
    let idHash = '';
    let auth = '';
    let hash = '';
    // console.log(ctx.params)
    if (ctx.params.authenticated) {
        const entity = ctx.app.get('authentication').entity;
        let e = ctx.params[`${entity}`] || {};
        let authentication = ctx.params.authentication || {};
        auth = JSON.stringify({ [entity]: e, authentication });
    }
    // if there's an id, append it to the path and create and idHash
    if (ctx.id) {
        path += `/${ctx.id}`;
        idHash = hashCode(`/${ctx.id}`);
    }
    // if there is a query, append that string to the path
    if (Object.keys(q).length > 0) {
        path += `?${qs.stringify(JSON.parse(JSON.stringify(q)), { encode: false })}`;
    }
    if (customHash && typeof customHash === 'function') {
        hash = `${customHash(ctx)}`;
    }
    // return the key in the following format:
    // {service}_{id}_{key}_{auth}
    // where each {...} is hashed independently and {id}, {auth},and {customHash} are optional
    // {books}{/1234}{pagination-ctx:enabled::books/id?q=xxx&y=zzz}{auth}{customFunc}
    return `${hashCode(ctx.path || '')}_${idHash}_${hashCode(path)}_${hashCode(auth) || ''}_${hashCode(hash) || ''}`;
}
exports.getKey = getKey;
// This iterates through ALL of the keys and deletes any with a matching path AND id `{path}{id}`
const purgeId = (scope = 'Global') => (ctx) => {
    const { cache } = ctx.app.get(`cache_${scope}`);
    if (ctx.id) {
        let pathHash = hashCode(`${ctx.path}`);
        let idHash = hashCode(`/${ctx.id}`);
        cache.forEach((_value, key, cache) => {
            if (key.indexOf(`${pathHash}_${idHash}_`) === 0) {
                cache.del(key);
            }
        });
    }
};
exports.purgeId = purgeId;
// // This iterates through ALL of the keys and deletes any with a matching path and any ID `{path}`
// export const purgePath = (scope = 'Global') => (ctx) => {
//   const { cache } = ctx.app.get(`cache_${scope}`)
//   if (ctx.path) {
//     pathHash = hashCode(ctx.path);
//     cache.forEach((value, key, cache) => {
//       if (key.indexOf(`${pathHash}_`) === 0) {
//         cache.del(key);
//       }
//     });
//   }
// };
// // Cleans out the entire cache by scope
// export const purge = (scope = 'Global') => (ctx) => {
//   const { cache, customHash } = ctx.app.get(`cache_${scope}`)
//   cache.reset();
// };
//# sourceMappingURL=utils.js.map
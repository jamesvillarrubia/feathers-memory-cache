import { HookContext } from '@feathersjs/feathers';
export interface CustomHash {
    (ctx: HookContext): string;
}
export interface CustomKey {
    (ctx: HookContext, customHash?: CustomHash): string;
}
export declare function hashCode(s: string): string;
export declare const getKey: CustomKey;
export declare const purgeId: (scope?: string) => (ctx: HookContext) => void;
export declare const purgeFind: (scope?: string) => (ctx: HookContext) => void;
export declare const purgePath: (scope?: string) => (ctx: HookContext) => void;
export declare const purge: (scope?: string) => (ctx: HookContext) => void;

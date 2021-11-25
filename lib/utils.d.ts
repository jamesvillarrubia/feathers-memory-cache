import { HookContext } from '@feathersjs/feathers';
export interface CustomHash {
    (ctx: HookContext): string;
}
export interface CustomKey {
    (ctx: HookContext): string;
}
export declare function hashCode(s: String): string;
export declare function getKey(ctx: HookContext, customHash: Function): string;
export declare const purgeId: (scope?: string) => (ctx: HookContext) => void;

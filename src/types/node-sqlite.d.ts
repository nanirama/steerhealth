/**
 * Minimal declarations for Node's built-in `node:sqlite` (Node >= 22.13; the Docker image uses
 * Node 24). The project's @types/node is v20, which predates this module.
 */
declare module 'node:sqlite' {
  type SQLValue = null | number | bigint | string | Uint8Array
  type Params = SQLValue[] | [Record<string, SQLValue>]
  export interface RunResult {
    changes: number | bigint
    lastInsertRowid: number | bigint
  }
  export class StatementSync {
    run(...params: SQLValue[]): RunResult
    run(params: Record<string, SQLValue>): RunResult
    get(...params: SQLValue[]): Record<string, SQLValue> | undefined
    get(params: Record<string, SQLValue>): Record<string, SQLValue> | undefined
    all(...params: SQLValue[]): Record<string, SQLValue>[]
    all(params: Record<string, SQLValue>): Record<string, SQLValue>[]
  }
  export class DatabaseSync {
    constructor(path: string, options?: { open?: boolean; readOnly?: boolean; timeout?: number })
    exec(sql: string): void
    prepare(sql: string): StatementSync
    close(): void
  }
  export type { Params, SQLValue }
}

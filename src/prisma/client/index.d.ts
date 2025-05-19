
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model subscriptions
 * 
 */
export type subscriptions = $Result.DefaultSelection<Prisma.$subscriptionsPayload>
/**
 * Model credit_purchases
 * 
 */
export type credit_purchases = $Result.DefaultSelection<Prisma.$credit_purchasesPayload>
/**
 * Model tasks_log
 * 
 */
export type tasks_log = $Result.DefaultSelection<Prisma.$tasks_logPayload>
/**
 * Model agent_results
 * 
 */
export type agent_results = $Result.DefaultSelection<Prisma.$agent_resultsPayload>
/**
 * Model whatsapp_messages
 * 
 */
export type whatsapp_messages = $Result.DefaultSelection<Prisma.$whatsapp_messagesPayload>
/**
 * Model admin_activity_logs
 * 
 */
export type admin_activity_logs = $Result.DefaultSelection<Prisma.$admin_activity_logsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  user: 'user',
  admin: 'admin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const PlanType: {
  essential: 'essential',
  professional: 'professional',
  completo: 'completo'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const PackType: {
  PACK_100: 'PACK_100',
  PACK_500: 'PACK_500',
  PACK_1000: 'PACK_1000'
};

export type PackType = (typeof PackType)[keyof typeof PackType]


export const MessageDirection: {
  inbound: 'inbound',
  outbound: 'outbound'
};

export type MessageDirection = (typeof MessageDirection)[keyof typeof MessageDirection]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type PlanType = $Enums.PlanType

export const PlanType: typeof $Enums.PlanType

export type PackType = $Enums.PackType

export const PackType: typeof $Enums.PackType

export type MessageDirection = $Enums.MessageDirection

export const MessageDirection: typeof $Enums.MessageDirection

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscriptions`: Exposes CRUD operations for the **subscriptions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscriptions.findMany()
    * ```
    */
  get subscriptions(): Prisma.subscriptionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credit_purchases`: Exposes CRUD operations for the **credit_purchases** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credit_purchases
    * const credit_purchases = await prisma.credit_purchases.findMany()
    * ```
    */
  get credit_purchases(): Prisma.credit_purchasesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tasks_log`: Exposes CRUD operations for the **tasks_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks_logs
    * const tasks_logs = await prisma.tasks_log.findMany()
    * ```
    */
  get tasks_log(): Prisma.tasks_logDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent_results`: Exposes CRUD operations for the **agent_results** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agent_results
    * const agent_results = await prisma.agent_results.findMany()
    * ```
    */
  get agent_results(): Prisma.agent_resultsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.whatsapp_messages`: Exposes CRUD operations for the **whatsapp_messages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Whatsapp_messages
    * const whatsapp_messages = await prisma.whatsapp_messages.findMany()
    * ```
    */
  get whatsapp_messages(): Prisma.whatsapp_messagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin_activity_logs`: Exposes CRUD operations for the **admin_activity_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admin_activity_logs
    * const admin_activity_logs = await prisma.admin_activity_logs.findMany()
    * ```
    */
  get admin_activity_logs(): Prisma.admin_activity_logsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.0
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    subscriptions: 'subscriptions',
    credit_purchases: 'credit_purchases',
    tasks_log: 'tasks_log',
    agent_results: 'agent_results',
    whatsapp_messages: 'whatsapp_messages',
    admin_activity_logs: 'admin_activity_logs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "subscriptions" | "credit_purchases" | "tasks_log" | "agent_results" | "whatsapp_messages" | "admin_activity_logs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      subscriptions: {
        payload: Prisma.$subscriptionsPayload<ExtArgs>
        fields: Prisma.subscriptionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.subscriptionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.subscriptionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findFirst: {
            args: Prisma.subscriptionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.subscriptionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          findMany: {
            args: Prisma.subscriptionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          create: {
            args: Prisma.subscriptionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          createMany: {
            args: Prisma.subscriptionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.subscriptionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          delete: {
            args: Prisma.subscriptionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          update: {
            args: Prisma.subscriptionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          deleteMany: {
            args: Prisma.subscriptionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.subscriptionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.subscriptionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>[]
          }
          upsert: {
            args: Prisma.subscriptionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$subscriptionsPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscriptions>
          }
          groupBy: {
            args: Prisma.subscriptionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.subscriptionsCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionsCountAggregateOutputType> | number
          }
        }
      }
      credit_purchases: {
        payload: Prisma.$credit_purchasesPayload<ExtArgs>
        fields: Prisma.credit_purchasesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.credit_purchasesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.credit_purchasesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          findFirst: {
            args: Prisma.credit_purchasesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.credit_purchasesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          findMany: {
            args: Prisma.credit_purchasesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>[]
          }
          create: {
            args: Prisma.credit_purchasesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          createMany: {
            args: Prisma.credit_purchasesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.credit_purchasesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>[]
          }
          delete: {
            args: Prisma.credit_purchasesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          update: {
            args: Prisma.credit_purchasesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          deleteMany: {
            args: Prisma.credit_purchasesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.credit_purchasesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.credit_purchasesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>[]
          }
          upsert: {
            args: Prisma.credit_purchasesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$credit_purchasesPayload>
          }
          aggregate: {
            args: Prisma.Credit_purchasesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredit_purchases>
          }
          groupBy: {
            args: Prisma.credit_purchasesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Credit_purchasesGroupByOutputType>[]
          }
          count: {
            args: Prisma.credit_purchasesCountArgs<ExtArgs>
            result: $Utils.Optional<Credit_purchasesCountAggregateOutputType> | number
          }
        }
      }
      tasks_log: {
        payload: Prisma.$tasks_logPayload<ExtArgs>
        fields: Prisma.tasks_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tasks_logFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tasks_logFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          findFirst: {
            args: Prisma.tasks_logFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tasks_logFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          findMany: {
            args: Prisma.tasks_logFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>[]
          }
          create: {
            args: Prisma.tasks_logCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          createMany: {
            args: Prisma.tasks_logCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tasks_logCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>[]
          }
          delete: {
            args: Prisma.tasks_logDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          update: {
            args: Prisma.tasks_logUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          deleteMany: {
            args: Prisma.tasks_logDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tasks_logUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tasks_logUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>[]
          }
          upsert: {
            args: Prisma.tasks_logUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tasks_logPayload>
          }
          aggregate: {
            args: Prisma.Tasks_logAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTasks_log>
          }
          groupBy: {
            args: Prisma.tasks_logGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tasks_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.tasks_logCountArgs<ExtArgs>
            result: $Utils.Optional<Tasks_logCountAggregateOutputType> | number
          }
        }
      }
      agent_results: {
        payload: Prisma.$agent_resultsPayload<ExtArgs>
        fields: Prisma.agent_resultsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agent_resultsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agent_resultsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          findFirst: {
            args: Prisma.agent_resultsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agent_resultsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          findMany: {
            args: Prisma.agent_resultsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>[]
          }
          create: {
            args: Prisma.agent_resultsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          createMany: {
            args: Prisma.agent_resultsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agent_resultsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>[]
          }
          delete: {
            args: Prisma.agent_resultsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          update: {
            args: Prisma.agent_resultsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          deleteMany: {
            args: Prisma.agent_resultsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agent_resultsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agent_resultsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>[]
          }
          upsert: {
            args: Prisma.agent_resultsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agent_resultsPayload>
          }
          aggregate: {
            args: Prisma.Agent_resultsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent_results>
          }
          groupBy: {
            args: Prisma.agent_resultsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Agent_resultsGroupByOutputType>[]
          }
          count: {
            args: Prisma.agent_resultsCountArgs<ExtArgs>
            result: $Utils.Optional<Agent_resultsCountAggregateOutputType> | number
          }
        }
      }
      whatsapp_messages: {
        payload: Prisma.$whatsapp_messagesPayload<ExtArgs>
        fields: Prisma.whatsapp_messagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.whatsapp_messagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.whatsapp_messagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          findFirst: {
            args: Prisma.whatsapp_messagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.whatsapp_messagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          findMany: {
            args: Prisma.whatsapp_messagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>[]
          }
          create: {
            args: Prisma.whatsapp_messagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          createMany: {
            args: Prisma.whatsapp_messagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.whatsapp_messagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>[]
          }
          delete: {
            args: Prisma.whatsapp_messagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          update: {
            args: Prisma.whatsapp_messagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          deleteMany: {
            args: Prisma.whatsapp_messagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.whatsapp_messagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.whatsapp_messagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>[]
          }
          upsert: {
            args: Prisma.whatsapp_messagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$whatsapp_messagesPayload>
          }
          aggregate: {
            args: Prisma.Whatsapp_messagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWhatsapp_messages>
          }
          groupBy: {
            args: Prisma.whatsapp_messagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Whatsapp_messagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.whatsapp_messagesCountArgs<ExtArgs>
            result: $Utils.Optional<Whatsapp_messagesCountAggregateOutputType> | number
          }
        }
      }
      admin_activity_logs: {
        payload: Prisma.$admin_activity_logsPayload<ExtArgs>
        fields: Prisma.admin_activity_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.admin_activity_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.admin_activity_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          findFirst: {
            args: Prisma.admin_activity_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.admin_activity_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          findMany: {
            args: Prisma.admin_activity_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>[]
          }
          create: {
            args: Prisma.admin_activity_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          createMany: {
            args: Prisma.admin_activity_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.admin_activity_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>[]
          }
          delete: {
            args: Prisma.admin_activity_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          update: {
            args: Prisma.admin_activity_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          deleteMany: {
            args: Prisma.admin_activity_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.admin_activity_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.admin_activity_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>[]
          }
          upsert: {
            args: Prisma.admin_activity_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$admin_activity_logsPayload>
          }
          aggregate: {
            args: Prisma.Admin_activity_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin_activity_logs>
          }
          groupBy: {
            args: Prisma.admin_activity_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Admin_activity_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.admin_activity_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Admin_activity_logsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    subscriptions?: subscriptionsOmit
    credit_purchases?: credit_purchasesOmit
    tasks_log?: tasks_logOmit
    agent_results?: agent_resultsOmit
    whatsapp_messages?: whatsapp_messagesOmit
    admin_activity_logs?: admin_activity_logsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    admin_activities: number
    credit_purchases: number
    subscriptions: number
    tasks_log: number
    whatsapp_messages: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_activities?: boolean | UsersCountOutputTypeCountAdmin_activitiesArgs
    credit_purchases?: boolean | UsersCountOutputTypeCountCredit_purchasesArgs
    subscriptions?: boolean | UsersCountOutputTypeCountSubscriptionsArgs
    tasks_log?: boolean | UsersCountOutputTypeCountTasks_logArgs
    whatsapp_messages?: boolean | UsersCountOutputTypeCountWhatsapp_messagesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAdmin_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: admin_activity_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCredit_purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credit_purchasesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasks_logWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountWhatsapp_messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: whatsapp_messagesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    credits_balance: number | null
  }

  export type UsersSumAggregateOutputType = {
    credits_balance: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    subscription_plan: string | null
    credits_balance: number | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    subscription_plan: string | null
    credits_balance: number | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    subscription_plan: number
    credits_balance: number
    created_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    credits_balance?: true
  }

  export type UsersSumAggregateInputType = {
    credits_balance?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    email: string
    name: string
    role: $Enums.UserRole
    subscription_plan: string | null
    credits_balance: number
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
    admin_activities?: boolean | users$admin_activitiesArgs<ExtArgs>
    credit_purchases?: boolean | users$credit_purchasesArgs<ExtArgs>
    subscriptions?: boolean | users$subscriptionsArgs<ExtArgs>
    tasks_log?: boolean | users$tasks_logArgs<ExtArgs>
    whatsapp_messages?: boolean | users$whatsapp_messagesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "subscription_plan" | "credits_balance" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_activities?: boolean | users$admin_activitiesArgs<ExtArgs>
    credit_purchases?: boolean | users$credit_purchasesArgs<ExtArgs>
    subscriptions?: boolean | users$subscriptionsArgs<ExtArgs>
    tasks_log?: boolean | users$tasks_logArgs<ExtArgs>
    whatsapp_messages?: boolean | users$whatsapp_messagesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      admin_activities: Prisma.$admin_activity_logsPayload<ExtArgs>[]
      credit_purchases: Prisma.$credit_purchasesPayload<ExtArgs>[]
      subscriptions: Prisma.$subscriptionsPayload<ExtArgs>[]
      tasks_log: Prisma.$tasks_logPayload<ExtArgs>[]
      whatsapp_messages: Prisma.$whatsapp_messagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.UserRole
      subscription_plan: string | null
      credits_balance: number
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin_activities<T extends users$admin_activitiesArgs<ExtArgs> = {}>(args?: Subset<T, users$admin_activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credit_purchases<T extends users$credit_purchasesArgs<ExtArgs> = {}>(args?: Subset<T, users$credit_purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends users$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, users$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks_log<T extends users$tasks_logArgs<ExtArgs> = {}>(args?: Subset<T, users$tasks_logArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    whatsapp_messages<T extends users$whatsapp_messagesArgs<ExtArgs> = {}>(args?: Subset<T, users$whatsapp_messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'UserRole'>
    readonly subscription_plan: FieldRef<"users", 'String'>
    readonly credits_balance: FieldRef<"users", 'Int'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.admin_activities
   */
  export type users$admin_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    where?: admin_activity_logsWhereInput
    orderBy?: admin_activity_logsOrderByWithRelationInput | admin_activity_logsOrderByWithRelationInput[]
    cursor?: admin_activity_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Admin_activity_logsScalarFieldEnum | Admin_activity_logsScalarFieldEnum[]
  }

  /**
   * users.credit_purchases
   */
  export type users$credit_purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    where?: credit_purchasesWhereInput
    orderBy?: credit_purchasesOrderByWithRelationInput | credit_purchasesOrderByWithRelationInput[]
    cursor?: credit_purchasesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Credit_purchasesScalarFieldEnum | Credit_purchasesScalarFieldEnum[]
  }

  /**
   * users.subscriptions
   */
  export type users$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    cursor?: subscriptionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * users.tasks_log
   */
  export type users$tasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    where?: tasks_logWhereInput
    orderBy?: tasks_logOrderByWithRelationInput | tasks_logOrderByWithRelationInput[]
    cursor?: tasks_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Tasks_logScalarFieldEnum | Tasks_logScalarFieldEnum[]
  }

  /**
   * users.whatsapp_messages
   */
  export type users$whatsapp_messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    where?: whatsapp_messagesWhereInput
    orderBy?: whatsapp_messagesOrderByWithRelationInput | whatsapp_messagesOrderByWithRelationInput[]
    cursor?: whatsapp_messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Whatsapp_messagesScalarFieldEnum | Whatsapp_messagesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model subscriptions
   */

  export type AggregateSubscriptions = {
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  export type SubscriptionsAvgAggregateOutputType = {
    amount: number | null
  }

  export type SubscriptionsSumAggregateOutputType = {
    amount: number | null
  }

  export type SubscriptionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    plan_type: $Enums.PlanType | null
    status: string | null
    start_date: Date | null
    end_date: Date | null
    method: string | null
    amount: number | null
  }

  export type SubscriptionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    plan_type: $Enums.PlanType | null
    status: string | null
    start_date: Date | null
    end_date: Date | null
    method: string | null
    amount: number | null
  }

  export type SubscriptionsCountAggregateOutputType = {
    id: number
    user_id: number
    plan_type: number
    status: number
    start_date: number
    end_date: number
    method: number
    amount: number
    _all: number
  }


  export type SubscriptionsAvgAggregateInputType = {
    amount?: true
  }

  export type SubscriptionsSumAggregateInputType = {
    amount?: true
  }

  export type SubscriptionsMinAggregateInputType = {
    id?: true
    user_id?: true
    plan_type?: true
    status?: true
    start_date?: true
    end_date?: true
    method?: true
    amount?: true
  }

  export type SubscriptionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    plan_type?: true
    status?: true
    start_date?: true
    end_date?: true
    method?: true
    amount?: true
  }

  export type SubscriptionsCountAggregateInputType = {
    id?: true
    user_id?: true
    plan_type?: true
    status?: true
    start_date?: true
    end_date?: true
    method?: true
    amount?: true
    _all?: true
  }

  export type SubscriptionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to aggregate.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned subscriptions
    **/
    _count?: true | SubscriptionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type GetSubscriptionsAggregateType<T extends SubscriptionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriptions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriptions[P]>
      : GetScalarType<T[P], AggregateSubscriptions[P]>
  }




  export type subscriptionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
    orderBy?: subscriptionsOrderByWithAggregationInput | subscriptionsOrderByWithAggregationInput[]
    by: SubscriptionsScalarFieldEnum[] | SubscriptionsScalarFieldEnum
    having?: subscriptionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionsCountAggregateInputType | true
    _avg?: SubscriptionsAvgAggregateInputType
    _sum?: SubscriptionsSumAggregateInputType
    _min?: SubscriptionsMinAggregateInputType
    _max?: SubscriptionsMaxAggregateInputType
  }

  export type SubscriptionsGroupByOutputType = {
    id: string
    user_id: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date
    end_date: Date
    method: string
    amount: number
    _count: SubscriptionsCountAggregateOutputType | null
    _avg: SubscriptionsAvgAggregateOutputType | null
    _sum: SubscriptionsSumAggregateOutputType | null
    _min: SubscriptionsMinAggregateOutputType | null
    _max: SubscriptionsMaxAggregateOutputType | null
  }

  type GetSubscriptionsGroupByPayload<T extends subscriptionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionsGroupByOutputType[P]>
        }
      >
    >


  export type subscriptionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
  }

  export type subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "plan_type" | "status" | "start_date" | "end_date" | "method" | "amount", ExtArgs["result"]["subscriptions"]>
  export type subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriptions"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      plan_type: $Enums.PlanType
      status: string
      start_date: Date
      end_date: Date
      method: string
      amount: number
    }, ExtArgs["result"]["subscriptions"]>
    composites: {}
  }

  type subscriptionsGetPayload<S extends boolean | null | undefined | subscriptionsDefaultArgs> = $Result.GetResult<Prisma.$subscriptionsPayload, S>

  type subscriptionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<subscriptionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionsCountAggregateInputType | true
    }

  export interface subscriptionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['subscriptions'], meta: { name: 'subscriptions' } }
    /**
     * Find zero or one Subscriptions that matches the filter.
     * @param {subscriptionsFindUniqueArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends subscriptionsFindUniqueArgs>(args: SelectSubset<T, subscriptionsFindUniqueArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscriptions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {subscriptionsFindUniqueOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends subscriptionsFindUniqueOrThrowArgs>(args: SelectSubset<T, subscriptionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends subscriptionsFindFirstArgs>(args?: SelectSubset<T, subscriptionsFindFirstArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscriptions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindFirstOrThrowArgs} args - Arguments to find a Subscriptions
     * @example
     * // Get one Subscriptions
     * const subscriptions = await prisma.subscriptions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends subscriptionsFindFirstOrThrowArgs>(args?: SelectSubset<T, subscriptionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscriptions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends subscriptionsFindManyArgs>(args?: SelectSubset<T, subscriptionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscriptions.
     * @param {subscriptionsCreateArgs} args - Arguments to create a Subscriptions.
     * @example
     * // Create one Subscriptions
     * const Subscriptions = await prisma.subscriptions.create({
     *   data: {
     *     // ... data to create a Subscriptions
     *   }
     * })
     * 
     */
    create<T extends subscriptionsCreateArgs>(args: SelectSubset<T, subscriptionsCreateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {subscriptionsCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends subscriptionsCreateManyArgs>(args?: SelectSubset<T, subscriptionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {subscriptionsCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscriptions = await prisma.subscriptions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends subscriptionsCreateManyAndReturnArgs>(args?: SelectSubset<T, subscriptionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscriptions.
     * @param {subscriptionsDeleteArgs} args - Arguments to delete one Subscriptions.
     * @example
     * // Delete one Subscriptions
     * const Subscriptions = await prisma.subscriptions.delete({
     *   where: {
     *     // ... filter to delete one Subscriptions
     *   }
     * })
     * 
     */
    delete<T extends subscriptionsDeleteArgs>(args: SelectSubset<T, subscriptionsDeleteArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscriptions.
     * @param {subscriptionsUpdateArgs} args - Arguments to update one Subscriptions.
     * @example
     * // Update one Subscriptions
     * const subscriptions = await prisma.subscriptions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends subscriptionsUpdateArgs>(args: SelectSubset<T, subscriptionsUpdateArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {subscriptionsDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscriptions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends subscriptionsDeleteManyArgs>(args?: SelectSubset<T, subscriptionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends subscriptionsUpdateManyArgs>(args: SelectSubset<T, subscriptionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {subscriptionsUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscriptions = await prisma.subscriptions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionsWithIdOnly = await prisma.subscriptions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends subscriptionsUpdateManyAndReturnArgs>(args: SelectSubset<T, subscriptionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscriptions.
     * @param {subscriptionsUpsertArgs} args - Arguments to update or create a Subscriptions.
     * @example
     * // Update or create a Subscriptions
     * const subscriptions = await prisma.subscriptions.upsert({
     *   create: {
     *     // ... data to create a Subscriptions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscriptions we want to update
     *   }
     * })
     */
    upsert<T extends subscriptionsUpsertArgs>(args: SelectSubset<T, subscriptionsUpsertArgs<ExtArgs>>): Prisma__subscriptionsClient<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscriptions.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends subscriptionsCountArgs>(
      args?: Subset<T, subscriptionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionsAggregateArgs>(args: Subset<T, SubscriptionsAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionsAggregateType<T>>

    /**
     * Group by Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {subscriptionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends subscriptionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: subscriptionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, subscriptionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the subscriptions model
   */
  readonly fields: subscriptionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for subscriptions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__subscriptionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the subscriptions model
   */
  interface subscriptionsFieldRefs {
    readonly id: FieldRef<"subscriptions", 'String'>
    readonly user_id: FieldRef<"subscriptions", 'String'>
    readonly plan_type: FieldRef<"subscriptions", 'PlanType'>
    readonly status: FieldRef<"subscriptions", 'String'>
    readonly start_date: FieldRef<"subscriptions", 'DateTime'>
    readonly end_date: FieldRef<"subscriptions", 'DateTime'>
    readonly method: FieldRef<"subscriptions", 'String'>
    readonly amount: FieldRef<"subscriptions", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * subscriptions findUnique
   */
  export type subscriptionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findUniqueOrThrow
   */
  export type subscriptionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions findFirst
   */
  export type subscriptionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findFirstOrThrow
   */
  export type subscriptionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of subscriptions.
     */
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions findMany
   */
  export type subscriptionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter, which subscriptions to fetch.
     */
    where?: subscriptionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of subscriptions to fetch.
     */
    orderBy?: subscriptionsOrderByWithRelationInput | subscriptionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing subscriptions.
     */
    cursor?: subscriptionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` subscriptions.
     */
    skip?: number
    distinct?: SubscriptionsScalarFieldEnum | SubscriptionsScalarFieldEnum[]
  }

  /**
   * subscriptions create
   */
  export type subscriptionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to create a subscriptions.
     */
    data: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
  }

  /**
   * subscriptions createMany
   */
  export type subscriptionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * subscriptions createManyAndReturn
   */
  export type subscriptionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to create many subscriptions.
     */
    data: subscriptionsCreateManyInput | subscriptionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriptions update
   */
  export type subscriptionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The data needed to update a subscriptions.
     */
    data: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
    /**
     * Choose, which subscriptions to update.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions updateMany
   */
  export type subscriptionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
  }

  /**
   * subscriptions updateManyAndReturn
   */
  export type subscriptionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * The data used to update subscriptions.
     */
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyInput>
    /**
     * Filter which subscriptions to update
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * subscriptions upsert
   */
  export type subscriptionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * The filter to search for the subscriptions to update in case it exists.
     */
    where: subscriptionsWhereUniqueInput
    /**
     * In case the subscriptions found by the `where` argument doesn't exist, create a new subscriptions with this data.
     */
    create: XOR<subscriptionsCreateInput, subscriptionsUncheckedCreateInput>
    /**
     * In case the subscriptions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<subscriptionsUpdateInput, subscriptionsUncheckedUpdateInput>
  }

  /**
   * subscriptions delete
   */
  export type subscriptionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
    /**
     * Filter which subscriptions to delete.
     */
    where: subscriptionsWhereUniqueInput
  }

  /**
   * subscriptions deleteMany
   */
  export type subscriptionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which subscriptions to delete
     */
    where?: subscriptionsWhereInput
    /**
     * Limit how many subscriptions to delete.
     */
    limit?: number
  }

  /**
   * subscriptions without action
   */
  export type subscriptionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the subscriptions
     */
    select?: subscriptionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the subscriptions
     */
    omit?: subscriptionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: subscriptionsInclude<ExtArgs> | null
  }


  /**
   * Model credit_purchases
   */

  export type AggregateCredit_purchases = {
    _count: Credit_purchasesCountAggregateOutputType | null
    _avg: Credit_purchasesAvgAggregateOutputType | null
    _sum: Credit_purchasesSumAggregateOutputType | null
    _min: Credit_purchasesMinAggregateOutputType | null
    _max: Credit_purchasesMaxAggregateOutputType | null
  }

  export type Credit_purchasesAvgAggregateOutputType = {
    credits: number | null
    price: number | null
  }

  export type Credit_purchasesSumAggregateOutputType = {
    credits: number | null
    price: number | null
  }

  export type Credit_purchasesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    pack_type: $Enums.PackType | null
    credits: number | null
    price: number | null
    purchased_at: Date | null
  }

  export type Credit_purchasesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    pack_type: $Enums.PackType | null
    credits: number | null
    price: number | null
    purchased_at: Date | null
  }

  export type Credit_purchasesCountAggregateOutputType = {
    id: number
    user_id: number
    pack_type: number
    credits: number
    price: number
    purchased_at: number
    _all: number
  }


  export type Credit_purchasesAvgAggregateInputType = {
    credits?: true
    price?: true
  }

  export type Credit_purchasesSumAggregateInputType = {
    credits?: true
    price?: true
  }

  export type Credit_purchasesMinAggregateInputType = {
    id?: true
    user_id?: true
    pack_type?: true
    credits?: true
    price?: true
    purchased_at?: true
  }

  export type Credit_purchasesMaxAggregateInputType = {
    id?: true
    user_id?: true
    pack_type?: true
    credits?: true
    price?: true
    purchased_at?: true
  }

  export type Credit_purchasesCountAggregateInputType = {
    id?: true
    user_id?: true
    pack_type?: true
    credits?: true
    price?: true
    purchased_at?: true
    _all?: true
  }

  export type Credit_purchasesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credit_purchases to aggregate.
     */
    where?: credit_purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credit_purchases to fetch.
     */
    orderBy?: credit_purchasesOrderByWithRelationInput | credit_purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: credit_purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credit_purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credit_purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned credit_purchases
    **/
    _count?: true | Credit_purchasesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Credit_purchasesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Credit_purchasesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Credit_purchasesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Credit_purchasesMaxAggregateInputType
  }

  export type GetCredit_purchasesAggregateType<T extends Credit_purchasesAggregateArgs> = {
        [P in keyof T & keyof AggregateCredit_purchases]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredit_purchases[P]>
      : GetScalarType<T[P], AggregateCredit_purchases[P]>
  }




  export type credit_purchasesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credit_purchasesWhereInput
    orderBy?: credit_purchasesOrderByWithAggregationInput | credit_purchasesOrderByWithAggregationInput[]
    by: Credit_purchasesScalarFieldEnum[] | Credit_purchasesScalarFieldEnum
    having?: credit_purchasesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Credit_purchasesCountAggregateInputType | true
    _avg?: Credit_purchasesAvgAggregateInputType
    _sum?: Credit_purchasesSumAggregateInputType
    _min?: Credit_purchasesMinAggregateInputType
    _max?: Credit_purchasesMaxAggregateInputType
  }

  export type Credit_purchasesGroupByOutputType = {
    id: string
    user_id: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at: Date
    _count: Credit_purchasesCountAggregateOutputType | null
    _avg: Credit_purchasesAvgAggregateOutputType | null
    _sum: Credit_purchasesSumAggregateOutputType | null
    _min: Credit_purchasesMinAggregateOutputType | null
    _max: Credit_purchasesMaxAggregateOutputType | null
  }

  type GetCredit_purchasesGroupByPayload<T extends credit_purchasesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Credit_purchasesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Credit_purchasesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Credit_purchasesGroupByOutputType[P]>
            : GetScalarType<T[P], Credit_purchasesGroupByOutputType[P]>
        }
      >
    >


  export type credit_purchasesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectScalar = {
    id?: boolean
    user_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
  }

  export type credit_purchasesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "pack_type" | "credits" | "price" | "purchased_at", ExtArgs["result"]["credit_purchases"]>
  export type credit_purchasesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type credit_purchasesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type credit_purchasesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $credit_purchasesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "credit_purchases"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      pack_type: $Enums.PackType
      credits: number
      price: number
      purchased_at: Date
    }, ExtArgs["result"]["credit_purchases"]>
    composites: {}
  }

  type credit_purchasesGetPayload<S extends boolean | null | undefined | credit_purchasesDefaultArgs> = $Result.GetResult<Prisma.$credit_purchasesPayload, S>

  type credit_purchasesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<credit_purchasesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Credit_purchasesCountAggregateInputType | true
    }

  export interface credit_purchasesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['credit_purchases'], meta: { name: 'credit_purchases' } }
    /**
     * Find zero or one Credit_purchases that matches the filter.
     * @param {credit_purchasesFindUniqueArgs} args - Arguments to find a Credit_purchases
     * @example
     * // Get one Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends credit_purchasesFindUniqueArgs>(args: SelectSubset<T, credit_purchasesFindUniqueArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credit_purchases that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {credit_purchasesFindUniqueOrThrowArgs} args - Arguments to find a Credit_purchases
     * @example
     * // Get one Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends credit_purchasesFindUniqueOrThrowArgs>(args: SelectSubset<T, credit_purchasesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credit_purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesFindFirstArgs} args - Arguments to find a Credit_purchases
     * @example
     * // Get one Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends credit_purchasesFindFirstArgs>(args?: SelectSubset<T, credit_purchasesFindFirstArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credit_purchases that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesFindFirstOrThrowArgs} args - Arguments to find a Credit_purchases
     * @example
     * // Get one Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends credit_purchasesFindFirstOrThrowArgs>(args?: SelectSubset<T, credit_purchasesFindFirstOrThrowArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credit_purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findMany()
     * 
     * // Get first 10 Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credit_purchasesWithIdOnly = await prisma.credit_purchases.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends credit_purchasesFindManyArgs>(args?: SelectSubset<T, credit_purchasesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credit_purchases.
     * @param {credit_purchasesCreateArgs} args - Arguments to create a Credit_purchases.
     * @example
     * // Create one Credit_purchases
     * const Credit_purchases = await prisma.credit_purchases.create({
     *   data: {
     *     // ... data to create a Credit_purchases
     *   }
     * })
     * 
     */
    create<T extends credit_purchasesCreateArgs>(args: SelectSubset<T, credit_purchasesCreateArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credit_purchases.
     * @param {credit_purchasesCreateManyArgs} args - Arguments to create many Credit_purchases.
     * @example
     * // Create many Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends credit_purchasesCreateManyArgs>(args?: SelectSubset<T, credit_purchasesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credit_purchases and returns the data saved in the database.
     * @param {credit_purchasesCreateManyAndReturnArgs} args - Arguments to create many Credit_purchases.
     * @example
     * // Create many Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credit_purchases and only return the `id`
     * const credit_purchasesWithIdOnly = await prisma.credit_purchases.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends credit_purchasesCreateManyAndReturnArgs>(args?: SelectSubset<T, credit_purchasesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credit_purchases.
     * @param {credit_purchasesDeleteArgs} args - Arguments to delete one Credit_purchases.
     * @example
     * // Delete one Credit_purchases
     * const Credit_purchases = await prisma.credit_purchases.delete({
     *   where: {
     *     // ... filter to delete one Credit_purchases
     *   }
     * })
     * 
     */
    delete<T extends credit_purchasesDeleteArgs>(args: SelectSubset<T, credit_purchasesDeleteArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credit_purchases.
     * @param {credit_purchasesUpdateArgs} args - Arguments to update one Credit_purchases.
     * @example
     * // Update one Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends credit_purchasesUpdateArgs>(args: SelectSubset<T, credit_purchasesUpdateArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credit_purchases.
     * @param {credit_purchasesDeleteManyArgs} args - Arguments to filter Credit_purchases to delete.
     * @example
     * // Delete a few Credit_purchases
     * const { count } = await prisma.credit_purchases.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends credit_purchasesDeleteManyArgs>(args?: SelectSubset<T, credit_purchasesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credit_purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends credit_purchasesUpdateManyArgs>(args: SelectSubset<T, credit_purchasesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credit_purchases and returns the data updated in the database.
     * @param {credit_purchasesUpdateManyAndReturnArgs} args - Arguments to update many Credit_purchases.
     * @example
     * // Update many Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credit_purchases and only return the `id`
     * const credit_purchasesWithIdOnly = await prisma.credit_purchases.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends credit_purchasesUpdateManyAndReturnArgs>(args: SelectSubset<T, credit_purchasesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credit_purchases.
     * @param {credit_purchasesUpsertArgs} args - Arguments to update or create a Credit_purchases.
     * @example
     * // Update or create a Credit_purchases
     * const credit_purchases = await prisma.credit_purchases.upsert({
     *   create: {
     *     // ... data to create a Credit_purchases
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credit_purchases we want to update
     *   }
     * })
     */
    upsert<T extends credit_purchasesUpsertArgs>(args: SelectSubset<T, credit_purchasesUpsertArgs<ExtArgs>>): Prisma__credit_purchasesClient<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credit_purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesCountArgs} args - Arguments to filter Credit_purchases to count.
     * @example
     * // Count the number of Credit_purchases
     * const count = await prisma.credit_purchases.count({
     *   where: {
     *     // ... the filter for the Credit_purchases we want to count
     *   }
     * })
    **/
    count<T extends credit_purchasesCountArgs>(
      args?: Subset<T, credit_purchasesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Credit_purchasesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credit_purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Credit_purchasesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Credit_purchasesAggregateArgs>(args: Subset<T, Credit_purchasesAggregateArgs>): Prisma.PrismaPromise<GetCredit_purchasesAggregateType<T>>

    /**
     * Group by Credit_purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {credit_purchasesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends credit_purchasesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: credit_purchasesGroupByArgs['orderBy'] }
        : { orderBy?: credit_purchasesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, credit_purchasesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredit_purchasesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the credit_purchases model
   */
  readonly fields: credit_purchasesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for credit_purchases.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__credit_purchasesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the credit_purchases model
   */
  interface credit_purchasesFieldRefs {
    readonly id: FieldRef<"credit_purchases", 'String'>
    readonly user_id: FieldRef<"credit_purchases", 'String'>
    readonly pack_type: FieldRef<"credit_purchases", 'PackType'>
    readonly credits: FieldRef<"credit_purchases", 'Int'>
    readonly price: FieldRef<"credit_purchases", 'Float'>
    readonly purchased_at: FieldRef<"credit_purchases", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * credit_purchases findUnique
   */
  export type credit_purchasesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter, which credit_purchases to fetch.
     */
    where: credit_purchasesWhereUniqueInput
  }

  /**
   * credit_purchases findUniqueOrThrow
   */
  export type credit_purchasesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter, which credit_purchases to fetch.
     */
    where: credit_purchasesWhereUniqueInput
  }

  /**
   * credit_purchases findFirst
   */
  export type credit_purchasesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter, which credit_purchases to fetch.
     */
    where?: credit_purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credit_purchases to fetch.
     */
    orderBy?: credit_purchasesOrderByWithRelationInput | credit_purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credit_purchases.
     */
    cursor?: credit_purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credit_purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credit_purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credit_purchases.
     */
    distinct?: Credit_purchasesScalarFieldEnum | Credit_purchasesScalarFieldEnum[]
  }

  /**
   * credit_purchases findFirstOrThrow
   */
  export type credit_purchasesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter, which credit_purchases to fetch.
     */
    where?: credit_purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credit_purchases to fetch.
     */
    orderBy?: credit_purchasesOrderByWithRelationInput | credit_purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for credit_purchases.
     */
    cursor?: credit_purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credit_purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credit_purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of credit_purchases.
     */
    distinct?: Credit_purchasesScalarFieldEnum | Credit_purchasesScalarFieldEnum[]
  }

  /**
   * credit_purchases findMany
   */
  export type credit_purchasesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter, which credit_purchases to fetch.
     */
    where?: credit_purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of credit_purchases to fetch.
     */
    orderBy?: credit_purchasesOrderByWithRelationInput | credit_purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing credit_purchases.
     */
    cursor?: credit_purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` credit_purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` credit_purchases.
     */
    skip?: number
    distinct?: Credit_purchasesScalarFieldEnum | Credit_purchasesScalarFieldEnum[]
  }

  /**
   * credit_purchases create
   */
  export type credit_purchasesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * The data needed to create a credit_purchases.
     */
    data: XOR<credit_purchasesCreateInput, credit_purchasesUncheckedCreateInput>
  }

  /**
   * credit_purchases createMany
   */
  export type credit_purchasesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many credit_purchases.
     */
    data: credit_purchasesCreateManyInput | credit_purchasesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * credit_purchases createManyAndReturn
   */
  export type credit_purchasesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * The data used to create many credit_purchases.
     */
    data: credit_purchasesCreateManyInput | credit_purchasesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * credit_purchases update
   */
  export type credit_purchasesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * The data needed to update a credit_purchases.
     */
    data: XOR<credit_purchasesUpdateInput, credit_purchasesUncheckedUpdateInput>
    /**
     * Choose, which credit_purchases to update.
     */
    where: credit_purchasesWhereUniqueInput
  }

  /**
   * credit_purchases updateMany
   */
  export type credit_purchasesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update credit_purchases.
     */
    data: XOR<credit_purchasesUpdateManyMutationInput, credit_purchasesUncheckedUpdateManyInput>
    /**
     * Filter which credit_purchases to update
     */
    where?: credit_purchasesWhereInput
    /**
     * Limit how many credit_purchases to update.
     */
    limit?: number
  }

  /**
   * credit_purchases updateManyAndReturn
   */
  export type credit_purchasesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * The data used to update credit_purchases.
     */
    data: XOR<credit_purchasesUpdateManyMutationInput, credit_purchasesUncheckedUpdateManyInput>
    /**
     * Filter which credit_purchases to update
     */
    where?: credit_purchasesWhereInput
    /**
     * Limit how many credit_purchases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * credit_purchases upsert
   */
  export type credit_purchasesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * The filter to search for the credit_purchases to update in case it exists.
     */
    where: credit_purchasesWhereUniqueInput
    /**
     * In case the credit_purchases found by the `where` argument doesn't exist, create a new credit_purchases with this data.
     */
    create: XOR<credit_purchasesCreateInput, credit_purchasesUncheckedCreateInput>
    /**
     * In case the credit_purchases was found with the provided `where` argument, update it with this data.
     */
    update: XOR<credit_purchasesUpdateInput, credit_purchasesUncheckedUpdateInput>
  }

  /**
   * credit_purchases delete
   */
  export type credit_purchasesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
    /**
     * Filter which credit_purchases to delete.
     */
    where: credit_purchasesWhereUniqueInput
  }

  /**
   * credit_purchases deleteMany
   */
  export type credit_purchasesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which credit_purchases to delete
     */
    where?: credit_purchasesWhereInput
    /**
     * Limit how many credit_purchases to delete.
     */
    limit?: number
  }

  /**
   * credit_purchases without action
   */
  export type credit_purchasesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the credit_purchases
     */
    select?: credit_purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the credit_purchases
     */
    omit?: credit_purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: credit_purchasesInclude<ExtArgs> | null
  }


  /**
   * Model tasks_log
   */

  export type AggregateTasks_log = {
    _count: Tasks_logCountAggregateOutputType | null
    _avg: Tasks_logAvgAggregateOutputType | null
    _sum: Tasks_logSumAggregateOutputType | null
    _min: Tasks_logMinAggregateOutputType | null
    _max: Tasks_logMaxAggregateOutputType | null
  }

  export type Tasks_logAvgAggregateOutputType = {
    credits_spent: number | null
  }

  export type Tasks_logSumAggregateOutputType = {
    credits_spent: number | null
  }

  export type Tasks_logMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    agent_type: string | null
    task_type: string | null
    credits_spent: number | null
    output_type: string | null
    timestamp: Date | null
  }

  export type Tasks_logMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    agent_type: string | null
    task_type: string | null
    credits_spent: number | null
    output_type: string | null
    timestamp: Date | null
  }

  export type Tasks_logCountAggregateOutputType = {
    id: number
    user_id: number
    agent_type: number
    task_type: number
    credits_spent: number
    output_type: number
    timestamp: number
    _all: number
  }


  export type Tasks_logAvgAggregateInputType = {
    credits_spent?: true
  }

  export type Tasks_logSumAggregateInputType = {
    credits_spent?: true
  }

  export type Tasks_logMinAggregateInputType = {
    id?: true
    user_id?: true
    agent_type?: true
    task_type?: true
    credits_spent?: true
    output_type?: true
    timestamp?: true
  }

  export type Tasks_logMaxAggregateInputType = {
    id?: true
    user_id?: true
    agent_type?: true
    task_type?: true
    credits_spent?: true
    output_type?: true
    timestamp?: true
  }

  export type Tasks_logCountAggregateInputType = {
    id?: true
    user_id?: true
    agent_type?: true
    task_type?: true
    credits_spent?: true
    output_type?: true
    timestamp?: true
    _all?: true
  }

  export type Tasks_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tasks_log to aggregate.
     */
    where?: tasks_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks_logs to fetch.
     */
    orderBy?: tasks_logOrderByWithRelationInput | tasks_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tasks_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tasks_logs
    **/
    _count?: true | Tasks_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tasks_logAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tasks_logSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tasks_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tasks_logMaxAggregateInputType
  }

  export type GetTasks_logAggregateType<T extends Tasks_logAggregateArgs> = {
        [P in keyof T & keyof AggregateTasks_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTasks_log[P]>
      : GetScalarType<T[P], AggregateTasks_log[P]>
  }




  export type tasks_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasks_logWhereInput
    orderBy?: tasks_logOrderByWithAggregationInput | tasks_logOrderByWithAggregationInput[]
    by: Tasks_logScalarFieldEnum[] | Tasks_logScalarFieldEnum
    having?: tasks_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tasks_logCountAggregateInputType | true
    _avg?: Tasks_logAvgAggregateInputType
    _sum?: Tasks_logSumAggregateInputType
    _min?: Tasks_logMinAggregateInputType
    _max?: Tasks_logMaxAggregateInputType
  }

  export type Tasks_logGroupByOutputType = {
    id: string
    user_id: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp: Date
    _count: Tasks_logCountAggregateOutputType | null
    _avg: Tasks_logAvgAggregateOutputType | null
    _sum: Tasks_logSumAggregateOutputType | null
    _min: Tasks_logMinAggregateOutputType | null
    _max: Tasks_logMaxAggregateOutputType | null
  }

  type GetTasks_logGroupByPayload<T extends tasks_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tasks_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tasks_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tasks_logGroupByOutputType[P]>
            : GetScalarType<T[P], Tasks_logGroupByOutputType[P]>
        }
      >
    >


  export type tasks_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    agent_type?: boolean
    task_type?: boolean
    credits_spent?: boolean
    output_type?: boolean
    timestamp?: boolean
    agent_results?: boolean | tasks_log$agent_resultsArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    agent_type?: boolean
    task_type?: boolean
    credits_spent?: boolean
    output_type?: boolean
    timestamp?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    agent_type?: boolean
    task_type?: boolean
    credits_spent?: boolean
    output_type?: boolean
    timestamp?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectScalar = {
    id?: boolean
    user_id?: boolean
    agent_type?: boolean
    task_type?: boolean
    credits_spent?: boolean
    output_type?: boolean
    timestamp?: boolean
  }

  export type tasks_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "agent_type" | "task_type" | "credits_spent" | "output_type" | "timestamp", ExtArgs["result"]["tasks_log"]>
  export type tasks_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent_results?: boolean | tasks_log$agent_resultsArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type tasks_logIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type tasks_logIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $tasks_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tasks_log"
    objects: {
      agent_results: Prisma.$agent_resultsPayload<ExtArgs> | null
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      agent_type: string
      task_type: string
      credits_spent: number
      output_type: string
      timestamp: Date
    }, ExtArgs["result"]["tasks_log"]>
    composites: {}
  }

  type tasks_logGetPayload<S extends boolean | null | undefined | tasks_logDefaultArgs> = $Result.GetResult<Prisma.$tasks_logPayload, S>

  type tasks_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tasks_logFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tasks_logCountAggregateInputType | true
    }

  export interface tasks_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tasks_log'], meta: { name: 'tasks_log' } }
    /**
     * Find zero or one Tasks_log that matches the filter.
     * @param {tasks_logFindUniqueArgs} args - Arguments to find a Tasks_log
     * @example
     * // Get one Tasks_log
     * const tasks_log = await prisma.tasks_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tasks_logFindUniqueArgs>(args: SelectSubset<T, tasks_logFindUniqueArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tasks_log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tasks_logFindUniqueOrThrowArgs} args - Arguments to find a Tasks_log
     * @example
     * // Get one Tasks_log
     * const tasks_log = await prisma.tasks_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tasks_logFindUniqueOrThrowArgs>(args: SelectSubset<T, tasks_logFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tasks_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logFindFirstArgs} args - Arguments to find a Tasks_log
     * @example
     * // Get one Tasks_log
     * const tasks_log = await prisma.tasks_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tasks_logFindFirstArgs>(args?: SelectSubset<T, tasks_logFindFirstArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tasks_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logFindFirstOrThrowArgs} args - Arguments to find a Tasks_log
     * @example
     * // Get one Tasks_log
     * const tasks_log = await prisma.tasks_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tasks_logFindFirstOrThrowArgs>(args?: SelectSubset<T, tasks_logFindFirstOrThrowArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks_logs
     * const tasks_logs = await prisma.tasks_log.findMany()
     * 
     * // Get first 10 Tasks_logs
     * const tasks_logs = await prisma.tasks_log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tasks_logWithIdOnly = await prisma.tasks_log.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tasks_logFindManyArgs>(args?: SelectSubset<T, tasks_logFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tasks_log.
     * @param {tasks_logCreateArgs} args - Arguments to create a Tasks_log.
     * @example
     * // Create one Tasks_log
     * const Tasks_log = await prisma.tasks_log.create({
     *   data: {
     *     // ... data to create a Tasks_log
     *   }
     * })
     * 
     */
    create<T extends tasks_logCreateArgs>(args: SelectSubset<T, tasks_logCreateArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks_logs.
     * @param {tasks_logCreateManyArgs} args - Arguments to create many Tasks_logs.
     * @example
     * // Create many Tasks_logs
     * const tasks_log = await prisma.tasks_log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tasks_logCreateManyArgs>(args?: SelectSubset<T, tasks_logCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks_logs and returns the data saved in the database.
     * @param {tasks_logCreateManyAndReturnArgs} args - Arguments to create many Tasks_logs.
     * @example
     * // Create many Tasks_logs
     * const tasks_log = await prisma.tasks_log.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks_logs and only return the `id`
     * const tasks_logWithIdOnly = await prisma.tasks_log.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tasks_logCreateManyAndReturnArgs>(args?: SelectSubset<T, tasks_logCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tasks_log.
     * @param {tasks_logDeleteArgs} args - Arguments to delete one Tasks_log.
     * @example
     * // Delete one Tasks_log
     * const Tasks_log = await prisma.tasks_log.delete({
     *   where: {
     *     // ... filter to delete one Tasks_log
     *   }
     * })
     * 
     */
    delete<T extends tasks_logDeleteArgs>(args: SelectSubset<T, tasks_logDeleteArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tasks_log.
     * @param {tasks_logUpdateArgs} args - Arguments to update one Tasks_log.
     * @example
     * // Update one Tasks_log
     * const tasks_log = await prisma.tasks_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tasks_logUpdateArgs>(args: SelectSubset<T, tasks_logUpdateArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks_logs.
     * @param {tasks_logDeleteManyArgs} args - Arguments to filter Tasks_logs to delete.
     * @example
     * // Delete a few Tasks_logs
     * const { count } = await prisma.tasks_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tasks_logDeleteManyArgs>(args?: SelectSubset<T, tasks_logDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks_logs
     * const tasks_log = await prisma.tasks_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tasks_logUpdateManyArgs>(args: SelectSubset<T, tasks_logUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks_logs and returns the data updated in the database.
     * @param {tasks_logUpdateManyAndReturnArgs} args - Arguments to update many Tasks_logs.
     * @example
     * // Update many Tasks_logs
     * const tasks_log = await prisma.tasks_log.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks_logs and only return the `id`
     * const tasks_logWithIdOnly = await prisma.tasks_log.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tasks_logUpdateManyAndReturnArgs>(args: SelectSubset<T, tasks_logUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tasks_log.
     * @param {tasks_logUpsertArgs} args - Arguments to update or create a Tasks_log.
     * @example
     * // Update or create a Tasks_log
     * const tasks_log = await prisma.tasks_log.upsert({
     *   create: {
     *     // ... data to create a Tasks_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tasks_log we want to update
     *   }
     * })
     */
    upsert<T extends tasks_logUpsertArgs>(args: SelectSubset<T, tasks_logUpsertArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logCountArgs} args - Arguments to filter Tasks_logs to count.
     * @example
     * // Count the number of Tasks_logs
     * const count = await prisma.tasks_log.count({
     *   where: {
     *     // ... the filter for the Tasks_logs we want to count
     *   }
     * })
    **/
    count<T extends tasks_logCountArgs>(
      args?: Subset<T, tasks_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tasks_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tasks_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tasks_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tasks_logAggregateArgs>(args: Subset<T, Tasks_logAggregateArgs>): Prisma.PrismaPromise<GetTasks_logAggregateType<T>>

    /**
     * Group by Tasks_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tasks_logGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tasks_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tasks_logGroupByArgs['orderBy'] }
        : { orderBy?: tasks_logGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tasks_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTasks_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tasks_log model
   */
  readonly fields: tasks_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tasks_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tasks_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent_results<T extends tasks_log$agent_resultsArgs<ExtArgs> = {}>(args?: Subset<T, tasks_log$agent_resultsArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tasks_log model
   */
  interface tasks_logFieldRefs {
    readonly id: FieldRef<"tasks_log", 'String'>
    readonly user_id: FieldRef<"tasks_log", 'String'>
    readonly agent_type: FieldRef<"tasks_log", 'String'>
    readonly task_type: FieldRef<"tasks_log", 'String'>
    readonly credits_spent: FieldRef<"tasks_log", 'Int'>
    readonly output_type: FieldRef<"tasks_log", 'String'>
    readonly timestamp: FieldRef<"tasks_log", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tasks_log findUnique
   */
  export type tasks_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter, which tasks_log to fetch.
     */
    where: tasks_logWhereUniqueInput
  }

  /**
   * tasks_log findUniqueOrThrow
   */
  export type tasks_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter, which tasks_log to fetch.
     */
    where: tasks_logWhereUniqueInput
  }

  /**
   * tasks_log findFirst
   */
  export type tasks_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter, which tasks_log to fetch.
     */
    where?: tasks_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks_logs to fetch.
     */
    orderBy?: tasks_logOrderByWithRelationInput | tasks_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks_logs.
     */
    cursor?: tasks_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks_logs.
     */
    distinct?: Tasks_logScalarFieldEnum | Tasks_logScalarFieldEnum[]
  }

  /**
   * tasks_log findFirstOrThrow
   */
  export type tasks_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter, which tasks_log to fetch.
     */
    where?: tasks_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks_logs to fetch.
     */
    orderBy?: tasks_logOrderByWithRelationInput | tasks_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tasks_logs.
     */
    cursor?: tasks_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tasks_logs.
     */
    distinct?: Tasks_logScalarFieldEnum | Tasks_logScalarFieldEnum[]
  }

  /**
   * tasks_log findMany
   */
  export type tasks_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter, which tasks_logs to fetch.
     */
    where?: tasks_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tasks_logs to fetch.
     */
    orderBy?: tasks_logOrderByWithRelationInput | tasks_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tasks_logs.
     */
    cursor?: tasks_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tasks_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tasks_logs.
     */
    skip?: number
    distinct?: Tasks_logScalarFieldEnum | Tasks_logScalarFieldEnum[]
  }

  /**
   * tasks_log create
   */
  export type tasks_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * The data needed to create a tasks_log.
     */
    data: XOR<tasks_logCreateInput, tasks_logUncheckedCreateInput>
  }

  /**
   * tasks_log createMany
   */
  export type tasks_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tasks_logs.
     */
    data: tasks_logCreateManyInput | tasks_logCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tasks_log createManyAndReturn
   */
  export type tasks_logCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * The data used to create many tasks_logs.
     */
    data: tasks_logCreateManyInput | tasks_logCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tasks_log update
   */
  export type tasks_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * The data needed to update a tasks_log.
     */
    data: XOR<tasks_logUpdateInput, tasks_logUncheckedUpdateInput>
    /**
     * Choose, which tasks_log to update.
     */
    where: tasks_logWhereUniqueInput
  }

  /**
   * tasks_log updateMany
   */
  export type tasks_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tasks_logs.
     */
    data: XOR<tasks_logUpdateManyMutationInput, tasks_logUncheckedUpdateManyInput>
    /**
     * Filter which tasks_logs to update
     */
    where?: tasks_logWhereInput
    /**
     * Limit how many tasks_logs to update.
     */
    limit?: number
  }

  /**
   * tasks_log updateManyAndReturn
   */
  export type tasks_logUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * The data used to update tasks_logs.
     */
    data: XOR<tasks_logUpdateManyMutationInput, tasks_logUncheckedUpdateManyInput>
    /**
     * Filter which tasks_logs to update
     */
    where?: tasks_logWhereInput
    /**
     * Limit how many tasks_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tasks_log upsert
   */
  export type tasks_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * The filter to search for the tasks_log to update in case it exists.
     */
    where: tasks_logWhereUniqueInput
    /**
     * In case the tasks_log found by the `where` argument doesn't exist, create a new tasks_log with this data.
     */
    create: XOR<tasks_logCreateInput, tasks_logUncheckedCreateInput>
    /**
     * In case the tasks_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tasks_logUpdateInput, tasks_logUncheckedUpdateInput>
  }

  /**
   * tasks_log delete
   */
  export type tasks_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
    /**
     * Filter which tasks_log to delete.
     */
    where: tasks_logWhereUniqueInput
  }

  /**
   * tasks_log deleteMany
   */
  export type tasks_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tasks_logs to delete
     */
    where?: tasks_logWhereInput
    /**
     * Limit how many tasks_logs to delete.
     */
    limit?: number
  }

  /**
   * tasks_log.agent_results
   */
  export type tasks_log$agent_resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    where?: agent_resultsWhereInput
  }

  /**
   * tasks_log without action
   */
  export type tasks_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tasks_log
     */
    select?: tasks_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tasks_log
     */
    omit?: tasks_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tasks_logInclude<ExtArgs> | null
  }


  /**
   * Model agent_results
   */

  export type AggregateAgent_results = {
    _count: Agent_resultsCountAggregateOutputType | null
    _min: Agent_resultsMinAggregateOutputType | null
    _max: Agent_resultsMaxAggregateOutputType | null
  }

  export type Agent_resultsMinAggregateOutputType = {
    task_id: string | null
    output_text: string | null
    file_url: string | null
    image_url: string | null
    whatsapp_sent: boolean | null
  }

  export type Agent_resultsMaxAggregateOutputType = {
    task_id: string | null
    output_text: string | null
    file_url: string | null
    image_url: string | null
    whatsapp_sent: boolean | null
  }

  export type Agent_resultsCountAggregateOutputType = {
    task_id: number
    output_text: number
    file_url: number
    image_url: number
    whatsapp_sent: number
    _all: number
  }


  export type Agent_resultsMinAggregateInputType = {
    task_id?: true
    output_text?: true
    file_url?: true
    image_url?: true
    whatsapp_sent?: true
  }

  export type Agent_resultsMaxAggregateInputType = {
    task_id?: true
    output_text?: true
    file_url?: true
    image_url?: true
    whatsapp_sent?: true
  }

  export type Agent_resultsCountAggregateInputType = {
    task_id?: true
    output_text?: true
    file_url?: true
    image_url?: true
    whatsapp_sent?: true
    _all?: true
  }

  export type Agent_resultsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_results to aggregate.
     */
    where?: agent_resultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_results to fetch.
     */
    orderBy?: agent_resultsOrderByWithRelationInput | agent_resultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agent_resultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agent_results
    **/
    _count?: true | Agent_resultsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Agent_resultsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Agent_resultsMaxAggregateInputType
  }

  export type GetAgent_resultsAggregateType<T extends Agent_resultsAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent_results]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent_results[P]>
      : GetScalarType<T[P], AggregateAgent_results[P]>
  }




  export type agent_resultsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agent_resultsWhereInput
    orderBy?: agent_resultsOrderByWithAggregationInput | agent_resultsOrderByWithAggregationInput[]
    by: Agent_resultsScalarFieldEnum[] | Agent_resultsScalarFieldEnum
    having?: agent_resultsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Agent_resultsCountAggregateInputType | true
    _min?: Agent_resultsMinAggregateInputType
    _max?: Agent_resultsMaxAggregateInputType
  }

  export type Agent_resultsGroupByOutputType = {
    task_id: string
    output_text: string | null
    file_url: string | null
    image_url: string | null
    whatsapp_sent: boolean
    _count: Agent_resultsCountAggregateOutputType | null
    _min: Agent_resultsMinAggregateOutputType | null
    _max: Agent_resultsMaxAggregateOutputType | null
  }

  type GetAgent_resultsGroupByPayload<T extends agent_resultsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Agent_resultsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Agent_resultsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Agent_resultsGroupByOutputType[P]>
            : GetScalarType<T[P], Agent_resultsGroupByOutputType[P]>
        }
      >
    >


  export type agent_resultsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    output_text?: boolean
    file_url?: boolean
    image_url?: boolean
    whatsapp_sent?: boolean
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent_results"]>

  export type agent_resultsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    output_text?: boolean
    file_url?: boolean
    image_url?: boolean
    whatsapp_sent?: boolean
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent_results"]>

  export type agent_resultsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    task_id?: boolean
    output_text?: boolean
    file_url?: boolean
    image_url?: boolean
    whatsapp_sent?: boolean
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent_results"]>

  export type agent_resultsSelectScalar = {
    task_id?: boolean
    output_text?: boolean
    file_url?: boolean
    image_url?: boolean
    whatsapp_sent?: boolean
  }

  export type agent_resultsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"task_id" | "output_text" | "file_url" | "image_url" | "whatsapp_sent", ExtArgs["result"]["agent_results"]>
  export type agent_resultsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }
  export type agent_resultsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }
  export type agent_resultsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | tasks_logDefaultArgs<ExtArgs>
  }

  export type $agent_resultsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent_results"
    objects: {
      task: Prisma.$tasks_logPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      task_id: string
      output_text: string | null
      file_url: string | null
      image_url: string | null
      whatsapp_sent: boolean
    }, ExtArgs["result"]["agent_results"]>
    composites: {}
  }

  type agent_resultsGetPayload<S extends boolean | null | undefined | agent_resultsDefaultArgs> = $Result.GetResult<Prisma.$agent_resultsPayload, S>

  type agent_resultsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agent_resultsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Agent_resultsCountAggregateInputType | true
    }

  export interface agent_resultsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent_results'], meta: { name: 'agent_results' } }
    /**
     * Find zero or one Agent_results that matches the filter.
     * @param {agent_resultsFindUniqueArgs} args - Arguments to find a Agent_results
     * @example
     * // Get one Agent_results
     * const agent_results = await prisma.agent_results.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agent_resultsFindUniqueArgs>(args: SelectSubset<T, agent_resultsFindUniqueArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent_results that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agent_resultsFindUniqueOrThrowArgs} args - Arguments to find a Agent_results
     * @example
     * // Get one Agent_results
     * const agent_results = await prisma.agent_results.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agent_resultsFindUniqueOrThrowArgs>(args: SelectSubset<T, agent_resultsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_results that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsFindFirstArgs} args - Arguments to find a Agent_results
     * @example
     * // Get one Agent_results
     * const agent_results = await prisma.agent_results.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agent_resultsFindFirstArgs>(args?: SelectSubset<T, agent_resultsFindFirstArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent_results that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsFindFirstOrThrowArgs} args - Arguments to find a Agent_results
     * @example
     * // Get one Agent_results
     * const agent_results = await prisma.agent_results.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agent_resultsFindFirstOrThrowArgs>(args?: SelectSubset<T, agent_resultsFindFirstOrThrowArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agent_results that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agent_results
     * const agent_results = await prisma.agent_results.findMany()
     * 
     * // Get first 10 Agent_results
     * const agent_results = await prisma.agent_results.findMany({ take: 10 })
     * 
     * // Only select the `task_id`
     * const agent_resultsWithTask_idOnly = await prisma.agent_results.findMany({ select: { task_id: true } })
     * 
     */
    findMany<T extends agent_resultsFindManyArgs>(args?: SelectSubset<T, agent_resultsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent_results.
     * @param {agent_resultsCreateArgs} args - Arguments to create a Agent_results.
     * @example
     * // Create one Agent_results
     * const Agent_results = await prisma.agent_results.create({
     *   data: {
     *     // ... data to create a Agent_results
     *   }
     * })
     * 
     */
    create<T extends agent_resultsCreateArgs>(args: SelectSubset<T, agent_resultsCreateArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agent_results.
     * @param {agent_resultsCreateManyArgs} args - Arguments to create many Agent_results.
     * @example
     * // Create many Agent_results
     * const agent_results = await prisma.agent_results.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agent_resultsCreateManyArgs>(args?: SelectSubset<T, agent_resultsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agent_results and returns the data saved in the database.
     * @param {agent_resultsCreateManyAndReturnArgs} args - Arguments to create many Agent_results.
     * @example
     * // Create many Agent_results
     * const agent_results = await prisma.agent_results.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agent_results and only return the `task_id`
     * const agent_resultsWithTask_idOnly = await prisma.agent_results.createManyAndReturn({
     *   select: { task_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agent_resultsCreateManyAndReturnArgs>(args?: SelectSubset<T, agent_resultsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent_results.
     * @param {agent_resultsDeleteArgs} args - Arguments to delete one Agent_results.
     * @example
     * // Delete one Agent_results
     * const Agent_results = await prisma.agent_results.delete({
     *   where: {
     *     // ... filter to delete one Agent_results
     *   }
     * })
     * 
     */
    delete<T extends agent_resultsDeleteArgs>(args: SelectSubset<T, agent_resultsDeleteArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent_results.
     * @param {agent_resultsUpdateArgs} args - Arguments to update one Agent_results.
     * @example
     * // Update one Agent_results
     * const agent_results = await prisma.agent_results.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agent_resultsUpdateArgs>(args: SelectSubset<T, agent_resultsUpdateArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agent_results.
     * @param {agent_resultsDeleteManyArgs} args - Arguments to filter Agent_results to delete.
     * @example
     * // Delete a few Agent_results
     * const { count } = await prisma.agent_results.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agent_resultsDeleteManyArgs>(args?: SelectSubset<T, agent_resultsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agent_results
     * const agent_results = await prisma.agent_results.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agent_resultsUpdateManyArgs>(args: SelectSubset<T, agent_resultsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agent_results and returns the data updated in the database.
     * @param {agent_resultsUpdateManyAndReturnArgs} args - Arguments to update many Agent_results.
     * @example
     * // Update many Agent_results
     * const agent_results = await prisma.agent_results.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agent_results and only return the `task_id`
     * const agent_resultsWithTask_idOnly = await prisma.agent_results.updateManyAndReturn({
     *   select: { task_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends agent_resultsUpdateManyAndReturnArgs>(args: SelectSubset<T, agent_resultsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent_results.
     * @param {agent_resultsUpsertArgs} args - Arguments to update or create a Agent_results.
     * @example
     * // Update or create a Agent_results
     * const agent_results = await prisma.agent_results.upsert({
     *   create: {
     *     // ... data to create a Agent_results
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent_results we want to update
     *   }
     * })
     */
    upsert<T extends agent_resultsUpsertArgs>(args: SelectSubset<T, agent_resultsUpsertArgs<ExtArgs>>): Prisma__agent_resultsClient<$Result.GetResult<Prisma.$agent_resultsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agent_results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsCountArgs} args - Arguments to filter Agent_results to count.
     * @example
     * // Count the number of Agent_results
     * const count = await prisma.agent_results.count({
     *   where: {
     *     // ... the filter for the Agent_results we want to count
     *   }
     * })
    **/
    count<T extends agent_resultsCountArgs>(
      args?: Subset<T, agent_resultsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Agent_resultsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent_results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Agent_resultsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Agent_resultsAggregateArgs>(args: Subset<T, Agent_resultsAggregateArgs>): Prisma.PrismaPromise<GetAgent_resultsAggregateType<T>>

    /**
     * Group by Agent_results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agent_resultsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends agent_resultsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agent_resultsGroupByArgs['orderBy'] }
        : { orderBy?: agent_resultsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, agent_resultsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgent_resultsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent_results model
   */
  readonly fields: agent_resultsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent_results.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agent_resultsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends tasks_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tasks_logDefaultArgs<ExtArgs>>): Prisma__tasks_logClient<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the agent_results model
   */
  interface agent_resultsFieldRefs {
    readonly task_id: FieldRef<"agent_results", 'String'>
    readonly output_text: FieldRef<"agent_results", 'String'>
    readonly file_url: FieldRef<"agent_results", 'String'>
    readonly image_url: FieldRef<"agent_results", 'String'>
    readonly whatsapp_sent: FieldRef<"agent_results", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * agent_results findUnique
   */
  export type agent_resultsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter, which agent_results to fetch.
     */
    where: agent_resultsWhereUniqueInput
  }

  /**
   * agent_results findUniqueOrThrow
   */
  export type agent_resultsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter, which agent_results to fetch.
     */
    where: agent_resultsWhereUniqueInput
  }

  /**
   * agent_results findFirst
   */
  export type agent_resultsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter, which agent_results to fetch.
     */
    where?: agent_resultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_results to fetch.
     */
    orderBy?: agent_resultsOrderByWithRelationInput | agent_resultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_results.
     */
    cursor?: agent_resultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_results.
     */
    distinct?: Agent_resultsScalarFieldEnum | Agent_resultsScalarFieldEnum[]
  }

  /**
   * agent_results findFirstOrThrow
   */
  export type agent_resultsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter, which agent_results to fetch.
     */
    where?: agent_resultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_results to fetch.
     */
    orderBy?: agent_resultsOrderByWithRelationInput | agent_resultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agent_results.
     */
    cursor?: agent_resultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agent_results.
     */
    distinct?: Agent_resultsScalarFieldEnum | Agent_resultsScalarFieldEnum[]
  }

  /**
   * agent_results findMany
   */
  export type agent_resultsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter, which agent_results to fetch.
     */
    where?: agent_resultsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agent_results to fetch.
     */
    orderBy?: agent_resultsOrderByWithRelationInput | agent_resultsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agent_results.
     */
    cursor?: agent_resultsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agent_results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agent_results.
     */
    skip?: number
    distinct?: Agent_resultsScalarFieldEnum | Agent_resultsScalarFieldEnum[]
  }

  /**
   * agent_results create
   */
  export type agent_resultsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * The data needed to create a agent_results.
     */
    data: XOR<agent_resultsCreateInput, agent_resultsUncheckedCreateInput>
  }

  /**
   * agent_results createMany
   */
  export type agent_resultsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agent_results.
     */
    data: agent_resultsCreateManyInput | agent_resultsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent_results createManyAndReturn
   */
  export type agent_resultsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * The data used to create many agent_results.
     */
    data: agent_resultsCreateManyInput | agent_resultsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_results update
   */
  export type agent_resultsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * The data needed to update a agent_results.
     */
    data: XOR<agent_resultsUpdateInput, agent_resultsUncheckedUpdateInput>
    /**
     * Choose, which agent_results to update.
     */
    where: agent_resultsWhereUniqueInput
  }

  /**
   * agent_results updateMany
   */
  export type agent_resultsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agent_results.
     */
    data: XOR<agent_resultsUpdateManyMutationInput, agent_resultsUncheckedUpdateManyInput>
    /**
     * Filter which agent_results to update
     */
    where?: agent_resultsWhereInput
    /**
     * Limit how many agent_results to update.
     */
    limit?: number
  }

  /**
   * agent_results updateManyAndReturn
   */
  export type agent_resultsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * The data used to update agent_results.
     */
    data: XOR<agent_resultsUpdateManyMutationInput, agent_resultsUncheckedUpdateManyInput>
    /**
     * Filter which agent_results to update
     */
    where?: agent_resultsWhereInput
    /**
     * Limit how many agent_results to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent_results upsert
   */
  export type agent_resultsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * The filter to search for the agent_results to update in case it exists.
     */
    where: agent_resultsWhereUniqueInput
    /**
     * In case the agent_results found by the `where` argument doesn't exist, create a new agent_results with this data.
     */
    create: XOR<agent_resultsCreateInput, agent_resultsUncheckedCreateInput>
    /**
     * In case the agent_results was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agent_resultsUpdateInput, agent_resultsUncheckedUpdateInput>
  }

  /**
   * agent_results delete
   */
  export type agent_resultsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
    /**
     * Filter which agent_results to delete.
     */
    where: agent_resultsWhereUniqueInput
  }

  /**
   * agent_results deleteMany
   */
  export type agent_resultsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent_results to delete
     */
    where?: agent_resultsWhereInput
    /**
     * Limit how many agent_results to delete.
     */
    limit?: number
  }

  /**
   * agent_results without action
   */
  export type agent_resultsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent_results
     */
    select?: agent_resultsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent_results
     */
    omit?: agent_resultsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agent_resultsInclude<ExtArgs> | null
  }


  /**
   * Model whatsapp_messages
   */

  export type AggregateWhatsapp_messages = {
    _count: Whatsapp_messagesCountAggregateOutputType | null
    _min: Whatsapp_messagesMinAggregateOutputType | null
    _max: Whatsapp_messagesMaxAggregateOutputType | null
  }

  export type Whatsapp_messagesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    direction: $Enums.MessageDirection | null
    message_text: string | null
    timestamp: Date | null
  }

  export type Whatsapp_messagesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    direction: $Enums.MessageDirection | null
    message_text: string | null
    timestamp: Date | null
  }

  export type Whatsapp_messagesCountAggregateOutputType = {
    id: number
    user_id: number
    direction: number
    message_text: number
    timestamp: number
    _all: number
  }


  export type Whatsapp_messagesMinAggregateInputType = {
    id?: true
    user_id?: true
    direction?: true
    message_text?: true
    timestamp?: true
  }

  export type Whatsapp_messagesMaxAggregateInputType = {
    id?: true
    user_id?: true
    direction?: true
    message_text?: true
    timestamp?: true
  }

  export type Whatsapp_messagesCountAggregateInputType = {
    id?: true
    user_id?: true
    direction?: true
    message_text?: true
    timestamp?: true
    _all?: true
  }

  export type Whatsapp_messagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which whatsapp_messages to aggregate.
     */
    where?: whatsapp_messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whatsapp_messages to fetch.
     */
    orderBy?: whatsapp_messagesOrderByWithRelationInput | whatsapp_messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: whatsapp_messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whatsapp_messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whatsapp_messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned whatsapp_messages
    **/
    _count?: true | Whatsapp_messagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Whatsapp_messagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Whatsapp_messagesMaxAggregateInputType
  }

  export type GetWhatsapp_messagesAggregateType<T extends Whatsapp_messagesAggregateArgs> = {
        [P in keyof T & keyof AggregateWhatsapp_messages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhatsapp_messages[P]>
      : GetScalarType<T[P], AggregateWhatsapp_messages[P]>
  }




  export type whatsapp_messagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: whatsapp_messagesWhereInput
    orderBy?: whatsapp_messagesOrderByWithAggregationInput | whatsapp_messagesOrderByWithAggregationInput[]
    by: Whatsapp_messagesScalarFieldEnum[] | Whatsapp_messagesScalarFieldEnum
    having?: whatsapp_messagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Whatsapp_messagesCountAggregateInputType | true
    _min?: Whatsapp_messagesMinAggregateInputType
    _max?: Whatsapp_messagesMaxAggregateInputType
  }

  export type Whatsapp_messagesGroupByOutputType = {
    id: string
    user_id: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp: Date
    _count: Whatsapp_messagesCountAggregateOutputType | null
    _min: Whatsapp_messagesMinAggregateOutputType | null
    _max: Whatsapp_messagesMaxAggregateOutputType | null
  }

  type GetWhatsapp_messagesGroupByPayload<T extends whatsapp_messagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Whatsapp_messagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Whatsapp_messagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Whatsapp_messagesGroupByOutputType[P]>
            : GetScalarType<T[P], Whatsapp_messagesGroupByOutputType[P]>
        }
      >
    >


  export type whatsapp_messagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectScalar = {
    id?: boolean
    user_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
  }

  export type whatsapp_messagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "direction" | "message_text" | "timestamp", ExtArgs["result"]["whatsapp_messages"]>
  export type whatsapp_messagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type whatsapp_messagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type whatsapp_messagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $whatsapp_messagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "whatsapp_messages"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      direction: $Enums.MessageDirection
      message_text: string
      timestamp: Date
    }, ExtArgs["result"]["whatsapp_messages"]>
    composites: {}
  }

  type whatsapp_messagesGetPayload<S extends boolean | null | undefined | whatsapp_messagesDefaultArgs> = $Result.GetResult<Prisma.$whatsapp_messagesPayload, S>

  type whatsapp_messagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<whatsapp_messagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Whatsapp_messagesCountAggregateInputType | true
    }

  export interface whatsapp_messagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['whatsapp_messages'], meta: { name: 'whatsapp_messages' } }
    /**
     * Find zero or one Whatsapp_messages that matches the filter.
     * @param {whatsapp_messagesFindUniqueArgs} args - Arguments to find a Whatsapp_messages
     * @example
     * // Get one Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends whatsapp_messagesFindUniqueArgs>(args: SelectSubset<T, whatsapp_messagesFindUniqueArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Whatsapp_messages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {whatsapp_messagesFindUniqueOrThrowArgs} args - Arguments to find a Whatsapp_messages
     * @example
     * // Get one Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends whatsapp_messagesFindUniqueOrThrowArgs>(args: SelectSubset<T, whatsapp_messagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Whatsapp_messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesFindFirstArgs} args - Arguments to find a Whatsapp_messages
     * @example
     * // Get one Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends whatsapp_messagesFindFirstArgs>(args?: SelectSubset<T, whatsapp_messagesFindFirstArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Whatsapp_messages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesFindFirstOrThrowArgs} args - Arguments to find a Whatsapp_messages
     * @example
     * // Get one Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends whatsapp_messagesFindFirstOrThrowArgs>(args?: SelectSubset<T, whatsapp_messagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Whatsapp_messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findMany()
     * 
     * // Get first 10 Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whatsapp_messagesWithIdOnly = await prisma.whatsapp_messages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends whatsapp_messagesFindManyArgs>(args?: SelectSubset<T, whatsapp_messagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Whatsapp_messages.
     * @param {whatsapp_messagesCreateArgs} args - Arguments to create a Whatsapp_messages.
     * @example
     * // Create one Whatsapp_messages
     * const Whatsapp_messages = await prisma.whatsapp_messages.create({
     *   data: {
     *     // ... data to create a Whatsapp_messages
     *   }
     * })
     * 
     */
    create<T extends whatsapp_messagesCreateArgs>(args: SelectSubset<T, whatsapp_messagesCreateArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Whatsapp_messages.
     * @param {whatsapp_messagesCreateManyArgs} args - Arguments to create many Whatsapp_messages.
     * @example
     * // Create many Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends whatsapp_messagesCreateManyArgs>(args?: SelectSubset<T, whatsapp_messagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Whatsapp_messages and returns the data saved in the database.
     * @param {whatsapp_messagesCreateManyAndReturnArgs} args - Arguments to create many Whatsapp_messages.
     * @example
     * // Create many Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Whatsapp_messages and only return the `id`
     * const whatsapp_messagesWithIdOnly = await prisma.whatsapp_messages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends whatsapp_messagesCreateManyAndReturnArgs>(args?: SelectSubset<T, whatsapp_messagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Whatsapp_messages.
     * @param {whatsapp_messagesDeleteArgs} args - Arguments to delete one Whatsapp_messages.
     * @example
     * // Delete one Whatsapp_messages
     * const Whatsapp_messages = await prisma.whatsapp_messages.delete({
     *   where: {
     *     // ... filter to delete one Whatsapp_messages
     *   }
     * })
     * 
     */
    delete<T extends whatsapp_messagesDeleteArgs>(args: SelectSubset<T, whatsapp_messagesDeleteArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Whatsapp_messages.
     * @param {whatsapp_messagesUpdateArgs} args - Arguments to update one Whatsapp_messages.
     * @example
     * // Update one Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends whatsapp_messagesUpdateArgs>(args: SelectSubset<T, whatsapp_messagesUpdateArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Whatsapp_messages.
     * @param {whatsapp_messagesDeleteManyArgs} args - Arguments to filter Whatsapp_messages to delete.
     * @example
     * // Delete a few Whatsapp_messages
     * const { count } = await prisma.whatsapp_messages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends whatsapp_messagesDeleteManyArgs>(args?: SelectSubset<T, whatsapp_messagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Whatsapp_messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends whatsapp_messagesUpdateManyArgs>(args: SelectSubset<T, whatsapp_messagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Whatsapp_messages and returns the data updated in the database.
     * @param {whatsapp_messagesUpdateManyAndReturnArgs} args - Arguments to update many Whatsapp_messages.
     * @example
     * // Update many Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Whatsapp_messages and only return the `id`
     * const whatsapp_messagesWithIdOnly = await prisma.whatsapp_messages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends whatsapp_messagesUpdateManyAndReturnArgs>(args: SelectSubset<T, whatsapp_messagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Whatsapp_messages.
     * @param {whatsapp_messagesUpsertArgs} args - Arguments to update or create a Whatsapp_messages.
     * @example
     * // Update or create a Whatsapp_messages
     * const whatsapp_messages = await prisma.whatsapp_messages.upsert({
     *   create: {
     *     // ... data to create a Whatsapp_messages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Whatsapp_messages we want to update
     *   }
     * })
     */
    upsert<T extends whatsapp_messagesUpsertArgs>(args: SelectSubset<T, whatsapp_messagesUpsertArgs<ExtArgs>>): Prisma__whatsapp_messagesClient<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Whatsapp_messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesCountArgs} args - Arguments to filter Whatsapp_messages to count.
     * @example
     * // Count the number of Whatsapp_messages
     * const count = await prisma.whatsapp_messages.count({
     *   where: {
     *     // ... the filter for the Whatsapp_messages we want to count
     *   }
     * })
    **/
    count<T extends whatsapp_messagesCountArgs>(
      args?: Subset<T, whatsapp_messagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Whatsapp_messagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Whatsapp_messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Whatsapp_messagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Whatsapp_messagesAggregateArgs>(args: Subset<T, Whatsapp_messagesAggregateArgs>): Prisma.PrismaPromise<GetWhatsapp_messagesAggregateType<T>>

    /**
     * Group by Whatsapp_messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whatsapp_messagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends whatsapp_messagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: whatsapp_messagesGroupByArgs['orderBy'] }
        : { orderBy?: whatsapp_messagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, whatsapp_messagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhatsapp_messagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the whatsapp_messages model
   */
  readonly fields: whatsapp_messagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for whatsapp_messages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__whatsapp_messagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the whatsapp_messages model
   */
  interface whatsapp_messagesFieldRefs {
    readonly id: FieldRef<"whatsapp_messages", 'String'>
    readonly user_id: FieldRef<"whatsapp_messages", 'String'>
    readonly direction: FieldRef<"whatsapp_messages", 'MessageDirection'>
    readonly message_text: FieldRef<"whatsapp_messages", 'String'>
    readonly timestamp: FieldRef<"whatsapp_messages", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * whatsapp_messages findUnique
   */
  export type whatsapp_messagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter, which whatsapp_messages to fetch.
     */
    where: whatsapp_messagesWhereUniqueInput
  }

  /**
   * whatsapp_messages findUniqueOrThrow
   */
  export type whatsapp_messagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter, which whatsapp_messages to fetch.
     */
    where: whatsapp_messagesWhereUniqueInput
  }

  /**
   * whatsapp_messages findFirst
   */
  export type whatsapp_messagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter, which whatsapp_messages to fetch.
     */
    where?: whatsapp_messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whatsapp_messages to fetch.
     */
    orderBy?: whatsapp_messagesOrderByWithRelationInput | whatsapp_messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for whatsapp_messages.
     */
    cursor?: whatsapp_messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whatsapp_messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whatsapp_messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of whatsapp_messages.
     */
    distinct?: Whatsapp_messagesScalarFieldEnum | Whatsapp_messagesScalarFieldEnum[]
  }

  /**
   * whatsapp_messages findFirstOrThrow
   */
  export type whatsapp_messagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter, which whatsapp_messages to fetch.
     */
    where?: whatsapp_messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whatsapp_messages to fetch.
     */
    orderBy?: whatsapp_messagesOrderByWithRelationInput | whatsapp_messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for whatsapp_messages.
     */
    cursor?: whatsapp_messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whatsapp_messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whatsapp_messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of whatsapp_messages.
     */
    distinct?: Whatsapp_messagesScalarFieldEnum | Whatsapp_messagesScalarFieldEnum[]
  }

  /**
   * whatsapp_messages findMany
   */
  export type whatsapp_messagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter, which whatsapp_messages to fetch.
     */
    where?: whatsapp_messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whatsapp_messages to fetch.
     */
    orderBy?: whatsapp_messagesOrderByWithRelationInput | whatsapp_messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing whatsapp_messages.
     */
    cursor?: whatsapp_messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whatsapp_messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whatsapp_messages.
     */
    skip?: number
    distinct?: Whatsapp_messagesScalarFieldEnum | Whatsapp_messagesScalarFieldEnum[]
  }

  /**
   * whatsapp_messages create
   */
  export type whatsapp_messagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * The data needed to create a whatsapp_messages.
     */
    data: XOR<whatsapp_messagesCreateInput, whatsapp_messagesUncheckedCreateInput>
  }

  /**
   * whatsapp_messages createMany
   */
  export type whatsapp_messagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many whatsapp_messages.
     */
    data: whatsapp_messagesCreateManyInput | whatsapp_messagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * whatsapp_messages createManyAndReturn
   */
  export type whatsapp_messagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * The data used to create many whatsapp_messages.
     */
    data: whatsapp_messagesCreateManyInput | whatsapp_messagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * whatsapp_messages update
   */
  export type whatsapp_messagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * The data needed to update a whatsapp_messages.
     */
    data: XOR<whatsapp_messagesUpdateInput, whatsapp_messagesUncheckedUpdateInput>
    /**
     * Choose, which whatsapp_messages to update.
     */
    where: whatsapp_messagesWhereUniqueInput
  }

  /**
   * whatsapp_messages updateMany
   */
  export type whatsapp_messagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update whatsapp_messages.
     */
    data: XOR<whatsapp_messagesUpdateManyMutationInput, whatsapp_messagesUncheckedUpdateManyInput>
    /**
     * Filter which whatsapp_messages to update
     */
    where?: whatsapp_messagesWhereInput
    /**
     * Limit how many whatsapp_messages to update.
     */
    limit?: number
  }

  /**
   * whatsapp_messages updateManyAndReturn
   */
  export type whatsapp_messagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * The data used to update whatsapp_messages.
     */
    data: XOR<whatsapp_messagesUpdateManyMutationInput, whatsapp_messagesUncheckedUpdateManyInput>
    /**
     * Filter which whatsapp_messages to update
     */
    where?: whatsapp_messagesWhereInput
    /**
     * Limit how many whatsapp_messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * whatsapp_messages upsert
   */
  export type whatsapp_messagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * The filter to search for the whatsapp_messages to update in case it exists.
     */
    where: whatsapp_messagesWhereUniqueInput
    /**
     * In case the whatsapp_messages found by the `where` argument doesn't exist, create a new whatsapp_messages with this data.
     */
    create: XOR<whatsapp_messagesCreateInput, whatsapp_messagesUncheckedCreateInput>
    /**
     * In case the whatsapp_messages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<whatsapp_messagesUpdateInput, whatsapp_messagesUncheckedUpdateInput>
  }

  /**
   * whatsapp_messages delete
   */
  export type whatsapp_messagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
    /**
     * Filter which whatsapp_messages to delete.
     */
    where: whatsapp_messagesWhereUniqueInput
  }

  /**
   * whatsapp_messages deleteMany
   */
  export type whatsapp_messagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which whatsapp_messages to delete
     */
    where?: whatsapp_messagesWhereInput
    /**
     * Limit how many whatsapp_messages to delete.
     */
    limit?: number
  }

  /**
   * whatsapp_messages without action
   */
  export type whatsapp_messagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whatsapp_messages
     */
    select?: whatsapp_messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the whatsapp_messages
     */
    omit?: whatsapp_messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: whatsapp_messagesInclude<ExtArgs> | null
  }


  /**
   * Model admin_activity_logs
   */

  export type AggregateAdmin_activity_logs = {
    _count: Admin_activity_logsCountAggregateOutputType | null
    _min: Admin_activity_logsMinAggregateOutputType | null
    _max: Admin_activity_logsMaxAggregateOutputType | null
  }

  export type Admin_activity_logsMinAggregateOutputType = {
    id: string | null
    admin_id: string | null
    action_type: string | null
    target_id: string | null
    timestamp: Date | null
  }

  export type Admin_activity_logsMaxAggregateOutputType = {
    id: string | null
    admin_id: string | null
    action_type: string | null
    target_id: string | null
    timestamp: Date | null
  }

  export type Admin_activity_logsCountAggregateOutputType = {
    id: number
    admin_id: number
    action_type: number
    target_id: number
    timestamp: number
    _all: number
  }


  export type Admin_activity_logsMinAggregateInputType = {
    id?: true
    admin_id?: true
    action_type?: true
    target_id?: true
    timestamp?: true
  }

  export type Admin_activity_logsMaxAggregateInputType = {
    id?: true
    admin_id?: true
    action_type?: true
    target_id?: true
    timestamp?: true
  }

  export type Admin_activity_logsCountAggregateInputType = {
    id?: true
    admin_id?: true
    action_type?: true
    target_id?: true
    timestamp?: true
    _all?: true
  }

  export type Admin_activity_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin_activity_logs to aggregate.
     */
    where?: admin_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admin_activity_logs to fetch.
     */
    orderBy?: admin_activity_logsOrderByWithRelationInput | admin_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: admin_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admin_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admin_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admin_activity_logs
    **/
    _count?: true | Admin_activity_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Admin_activity_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Admin_activity_logsMaxAggregateInputType
  }

  export type GetAdmin_activity_logsAggregateType<T extends Admin_activity_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin_activity_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin_activity_logs[P]>
      : GetScalarType<T[P], AggregateAdmin_activity_logs[P]>
  }




  export type admin_activity_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: admin_activity_logsWhereInput
    orderBy?: admin_activity_logsOrderByWithAggregationInput | admin_activity_logsOrderByWithAggregationInput[]
    by: Admin_activity_logsScalarFieldEnum[] | Admin_activity_logsScalarFieldEnum
    having?: admin_activity_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Admin_activity_logsCountAggregateInputType | true
    _min?: Admin_activity_logsMinAggregateInputType
    _max?: Admin_activity_logsMaxAggregateInputType
  }

  export type Admin_activity_logsGroupByOutputType = {
    id: string
    admin_id: string
    action_type: string
    target_id: string
    timestamp: Date
    _count: Admin_activity_logsCountAggregateOutputType | null
    _min: Admin_activity_logsMinAggregateOutputType | null
    _max: Admin_activity_logsMaxAggregateOutputType | null
  }

  type GetAdmin_activity_logsGroupByPayload<T extends admin_activity_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Admin_activity_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Admin_activity_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Admin_activity_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Admin_activity_logsGroupByOutputType[P]>
        }
      >
    >


  export type admin_activity_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin_activity_logs"]>

  export type admin_activity_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin_activity_logs"]>

  export type admin_activity_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin_activity_logs"]>

  export type admin_activity_logsSelectScalar = {
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
  }

  export type admin_activity_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "admin_id" | "action_type" | "target_id" | "timestamp", ExtArgs["result"]["admin_activity_logs"]>
  export type admin_activity_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type admin_activity_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type admin_activity_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $admin_activity_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin_activity_logs"
    objects: {
      admin: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      admin_id: string
      action_type: string
      target_id: string
      timestamp: Date
    }, ExtArgs["result"]["admin_activity_logs"]>
    composites: {}
  }

  type admin_activity_logsGetPayload<S extends boolean | null | undefined | admin_activity_logsDefaultArgs> = $Result.GetResult<Prisma.$admin_activity_logsPayload, S>

  type admin_activity_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<admin_activity_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Admin_activity_logsCountAggregateInputType | true
    }

  export interface admin_activity_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin_activity_logs'], meta: { name: 'admin_activity_logs' } }
    /**
     * Find zero or one Admin_activity_logs that matches the filter.
     * @param {admin_activity_logsFindUniqueArgs} args - Arguments to find a Admin_activity_logs
     * @example
     * // Get one Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends admin_activity_logsFindUniqueArgs>(args: SelectSubset<T, admin_activity_logsFindUniqueArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin_activity_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {admin_activity_logsFindUniqueOrThrowArgs} args - Arguments to find a Admin_activity_logs
     * @example
     * // Get one Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends admin_activity_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, admin_activity_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin_activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsFindFirstArgs} args - Arguments to find a Admin_activity_logs
     * @example
     * // Get one Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends admin_activity_logsFindFirstArgs>(args?: SelectSubset<T, admin_activity_logsFindFirstArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin_activity_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsFindFirstOrThrowArgs} args - Arguments to find a Admin_activity_logs
     * @example
     * // Get one Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends admin_activity_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, admin_activity_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admin_activity_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findMany()
     * 
     * // Get first 10 Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const admin_activity_logsWithIdOnly = await prisma.admin_activity_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends admin_activity_logsFindManyArgs>(args?: SelectSubset<T, admin_activity_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin_activity_logs.
     * @param {admin_activity_logsCreateArgs} args - Arguments to create a Admin_activity_logs.
     * @example
     * // Create one Admin_activity_logs
     * const Admin_activity_logs = await prisma.admin_activity_logs.create({
     *   data: {
     *     // ... data to create a Admin_activity_logs
     *   }
     * })
     * 
     */
    create<T extends admin_activity_logsCreateArgs>(args: SelectSubset<T, admin_activity_logsCreateArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admin_activity_logs.
     * @param {admin_activity_logsCreateManyArgs} args - Arguments to create many Admin_activity_logs.
     * @example
     * // Create many Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends admin_activity_logsCreateManyArgs>(args?: SelectSubset<T, admin_activity_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admin_activity_logs and returns the data saved in the database.
     * @param {admin_activity_logsCreateManyAndReturnArgs} args - Arguments to create many Admin_activity_logs.
     * @example
     * // Create many Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admin_activity_logs and only return the `id`
     * const admin_activity_logsWithIdOnly = await prisma.admin_activity_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends admin_activity_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, admin_activity_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin_activity_logs.
     * @param {admin_activity_logsDeleteArgs} args - Arguments to delete one Admin_activity_logs.
     * @example
     * // Delete one Admin_activity_logs
     * const Admin_activity_logs = await prisma.admin_activity_logs.delete({
     *   where: {
     *     // ... filter to delete one Admin_activity_logs
     *   }
     * })
     * 
     */
    delete<T extends admin_activity_logsDeleteArgs>(args: SelectSubset<T, admin_activity_logsDeleteArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin_activity_logs.
     * @param {admin_activity_logsUpdateArgs} args - Arguments to update one Admin_activity_logs.
     * @example
     * // Update one Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends admin_activity_logsUpdateArgs>(args: SelectSubset<T, admin_activity_logsUpdateArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admin_activity_logs.
     * @param {admin_activity_logsDeleteManyArgs} args - Arguments to filter Admin_activity_logs to delete.
     * @example
     * // Delete a few Admin_activity_logs
     * const { count } = await prisma.admin_activity_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends admin_activity_logsDeleteManyArgs>(args?: SelectSubset<T, admin_activity_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admin_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends admin_activity_logsUpdateManyArgs>(args: SelectSubset<T, admin_activity_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admin_activity_logs and returns the data updated in the database.
     * @param {admin_activity_logsUpdateManyAndReturnArgs} args - Arguments to update many Admin_activity_logs.
     * @example
     * // Update many Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admin_activity_logs and only return the `id`
     * const admin_activity_logsWithIdOnly = await prisma.admin_activity_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends admin_activity_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, admin_activity_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin_activity_logs.
     * @param {admin_activity_logsUpsertArgs} args - Arguments to update or create a Admin_activity_logs.
     * @example
     * // Update or create a Admin_activity_logs
     * const admin_activity_logs = await prisma.admin_activity_logs.upsert({
     *   create: {
     *     // ... data to create a Admin_activity_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin_activity_logs we want to update
     *   }
     * })
     */
    upsert<T extends admin_activity_logsUpsertArgs>(args: SelectSubset<T, admin_activity_logsUpsertArgs<ExtArgs>>): Prisma__admin_activity_logsClient<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admin_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsCountArgs} args - Arguments to filter Admin_activity_logs to count.
     * @example
     * // Count the number of Admin_activity_logs
     * const count = await prisma.admin_activity_logs.count({
     *   where: {
     *     // ... the filter for the Admin_activity_logs we want to count
     *   }
     * })
    **/
    count<T extends admin_activity_logsCountArgs>(
      args?: Subset<T, admin_activity_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Admin_activity_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Admin_activity_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Admin_activity_logsAggregateArgs>(args: Subset<T, Admin_activity_logsAggregateArgs>): Prisma.PrismaPromise<GetAdmin_activity_logsAggregateType<T>>

    /**
     * Group by Admin_activity_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {admin_activity_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends admin_activity_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: admin_activity_logsGroupByArgs['orderBy'] }
        : { orderBy?: admin_activity_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, admin_activity_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdmin_activity_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin_activity_logs model
   */
  readonly fields: admin_activity_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin_activity_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__admin_activity_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin_activity_logs model
   */
  interface admin_activity_logsFieldRefs {
    readonly id: FieldRef<"admin_activity_logs", 'String'>
    readonly admin_id: FieldRef<"admin_activity_logs", 'String'>
    readonly action_type: FieldRef<"admin_activity_logs", 'String'>
    readonly target_id: FieldRef<"admin_activity_logs", 'String'>
    readonly timestamp: FieldRef<"admin_activity_logs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * admin_activity_logs findUnique
   */
  export type admin_activity_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which admin_activity_logs to fetch.
     */
    where: admin_activity_logsWhereUniqueInput
  }

  /**
   * admin_activity_logs findUniqueOrThrow
   */
  export type admin_activity_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which admin_activity_logs to fetch.
     */
    where: admin_activity_logsWhereUniqueInput
  }

  /**
   * admin_activity_logs findFirst
   */
  export type admin_activity_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which admin_activity_logs to fetch.
     */
    where?: admin_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admin_activity_logs to fetch.
     */
    orderBy?: admin_activity_logsOrderByWithRelationInput | admin_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admin_activity_logs.
     */
    cursor?: admin_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admin_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admin_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admin_activity_logs.
     */
    distinct?: Admin_activity_logsScalarFieldEnum | Admin_activity_logsScalarFieldEnum[]
  }

  /**
   * admin_activity_logs findFirstOrThrow
   */
  export type admin_activity_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which admin_activity_logs to fetch.
     */
    where?: admin_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admin_activity_logs to fetch.
     */
    orderBy?: admin_activity_logsOrderByWithRelationInput | admin_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admin_activity_logs.
     */
    cursor?: admin_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admin_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admin_activity_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admin_activity_logs.
     */
    distinct?: Admin_activity_logsScalarFieldEnum | Admin_activity_logsScalarFieldEnum[]
  }

  /**
   * admin_activity_logs findMany
   */
  export type admin_activity_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter, which admin_activity_logs to fetch.
     */
    where?: admin_activity_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admin_activity_logs to fetch.
     */
    orderBy?: admin_activity_logsOrderByWithRelationInput | admin_activity_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admin_activity_logs.
     */
    cursor?: admin_activity_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admin_activity_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admin_activity_logs.
     */
    skip?: number
    distinct?: Admin_activity_logsScalarFieldEnum | Admin_activity_logsScalarFieldEnum[]
  }

  /**
   * admin_activity_logs create
   */
  export type admin_activity_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a admin_activity_logs.
     */
    data: XOR<admin_activity_logsCreateInput, admin_activity_logsUncheckedCreateInput>
  }

  /**
   * admin_activity_logs createMany
   */
  export type admin_activity_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admin_activity_logs.
     */
    data: admin_activity_logsCreateManyInput | admin_activity_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin_activity_logs createManyAndReturn
   */
  export type admin_activity_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * The data used to create many admin_activity_logs.
     */
    data: admin_activity_logsCreateManyInput | admin_activity_logsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * admin_activity_logs update
   */
  export type admin_activity_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a admin_activity_logs.
     */
    data: XOR<admin_activity_logsUpdateInput, admin_activity_logsUncheckedUpdateInput>
    /**
     * Choose, which admin_activity_logs to update.
     */
    where: admin_activity_logsWhereUniqueInput
  }

  /**
   * admin_activity_logs updateMany
   */
  export type admin_activity_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admin_activity_logs.
     */
    data: XOR<admin_activity_logsUpdateManyMutationInput, admin_activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which admin_activity_logs to update
     */
    where?: admin_activity_logsWhereInput
    /**
     * Limit how many admin_activity_logs to update.
     */
    limit?: number
  }

  /**
   * admin_activity_logs updateManyAndReturn
   */
  export type admin_activity_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * The data used to update admin_activity_logs.
     */
    data: XOR<admin_activity_logsUpdateManyMutationInput, admin_activity_logsUncheckedUpdateManyInput>
    /**
     * Filter which admin_activity_logs to update
     */
    where?: admin_activity_logsWhereInput
    /**
     * Limit how many admin_activity_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * admin_activity_logs upsert
   */
  export type admin_activity_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the admin_activity_logs to update in case it exists.
     */
    where: admin_activity_logsWhereUniqueInput
    /**
     * In case the admin_activity_logs found by the `where` argument doesn't exist, create a new admin_activity_logs with this data.
     */
    create: XOR<admin_activity_logsCreateInput, admin_activity_logsUncheckedCreateInput>
    /**
     * In case the admin_activity_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<admin_activity_logsUpdateInput, admin_activity_logsUncheckedUpdateInput>
  }

  /**
   * admin_activity_logs delete
   */
  export type admin_activity_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
    /**
     * Filter which admin_activity_logs to delete.
     */
    where: admin_activity_logsWhereUniqueInput
  }

  /**
   * admin_activity_logs deleteMany
   */
  export type admin_activity_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin_activity_logs to delete
     */
    where?: admin_activity_logsWhereInput
    /**
     * Limit how many admin_activity_logs to delete.
     */
    limit?: number
  }

  /**
   * admin_activity_logs without action
   */
  export type admin_activity_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin_activity_logs
     */
    select?: admin_activity_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin_activity_logs
     */
    omit?: admin_activity_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: admin_activity_logsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    subscription_plan: 'subscription_plan',
    credits_balance: 'credits_balance',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SubscriptionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    plan_type: 'plan_type',
    status: 'status',
    start_date: 'start_date',
    end_date: 'end_date',
    method: 'method',
    amount: 'amount'
  };

  export type SubscriptionsScalarFieldEnum = (typeof SubscriptionsScalarFieldEnum)[keyof typeof SubscriptionsScalarFieldEnum]


  export const Credit_purchasesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    pack_type: 'pack_type',
    credits: 'credits',
    price: 'price',
    purchased_at: 'purchased_at'
  };

  export type Credit_purchasesScalarFieldEnum = (typeof Credit_purchasesScalarFieldEnum)[keyof typeof Credit_purchasesScalarFieldEnum]


  export const Tasks_logScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    agent_type: 'agent_type',
    task_type: 'task_type',
    credits_spent: 'credits_spent',
    output_type: 'output_type',
    timestamp: 'timestamp'
  };

  export type Tasks_logScalarFieldEnum = (typeof Tasks_logScalarFieldEnum)[keyof typeof Tasks_logScalarFieldEnum]


  export const Agent_resultsScalarFieldEnum: {
    task_id: 'task_id',
    output_text: 'output_text',
    file_url: 'file_url',
    image_url: 'image_url',
    whatsapp_sent: 'whatsapp_sent'
  };

  export type Agent_resultsScalarFieldEnum = (typeof Agent_resultsScalarFieldEnum)[keyof typeof Agent_resultsScalarFieldEnum]


  export const Whatsapp_messagesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    direction: 'direction',
    message_text: 'message_text',
    timestamp: 'timestamp'
  };

  export type Whatsapp_messagesScalarFieldEnum = (typeof Whatsapp_messagesScalarFieldEnum)[keyof typeof Whatsapp_messagesScalarFieldEnum]


  export const Admin_activity_logsScalarFieldEnum: {
    id: 'id',
    admin_id: 'admin_id',
    action_type: 'action_type',
    target_id: 'target_id',
    timestamp: 'timestamp'
  };

  export type Admin_activity_logsScalarFieldEnum = (typeof Admin_activity_logsScalarFieldEnum)[keyof typeof Admin_activity_logsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PlanType'
   */
  export type EnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType'>
    


  /**
   * Reference to a field of type 'PlanType[]'
   */
  export type ListEnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType[]'>
    


  /**
   * Reference to a field of type 'PackType'
   */
  export type EnumPackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackType'>
    


  /**
   * Reference to a field of type 'PackType[]'
   */
  export type ListEnumPackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'MessageDirection'
   */
  export type EnumMessageDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageDirection'>
    


  /**
   * Reference to a field of type 'MessageDirection[]'
   */
  export type ListEnumMessageDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageDirection[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    role?: EnumUserRoleFilter<"users"> | $Enums.UserRole
    subscription_plan?: StringNullableFilter<"users"> | string | null
    credits_balance?: IntFilter<"users"> | number
    created_at?: DateTimeFilter<"users"> | Date | string
    admin_activities?: Admin_activity_logsListRelationFilter
    credit_purchases?: Credit_purchasesListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
    tasks_log?: Tasks_logListRelationFilter
    whatsapp_messages?: Whatsapp_messagesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    subscription_plan?: SortOrderInput | SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    admin_activities?: admin_activity_logsOrderByRelationAggregateInput
    credit_purchases?: credit_purchasesOrderByRelationAggregateInput
    subscriptions?: subscriptionsOrderByRelationAggregateInput
    tasks_log?: tasks_logOrderByRelationAggregateInput
    whatsapp_messages?: whatsapp_messagesOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    role?: EnumUserRoleFilter<"users"> | $Enums.UserRole
    subscription_plan?: StringNullableFilter<"users"> | string | null
    credits_balance?: IntFilter<"users"> | number
    created_at?: DateTimeFilter<"users"> | Date | string
    admin_activities?: Admin_activity_logsListRelationFilter
    credit_purchases?: Credit_purchasesListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
    tasks_log?: Tasks_logListRelationFilter
    whatsapp_messages?: Whatsapp_messagesListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    subscription_plan?: SortOrderInput | SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    role?: EnumUserRoleWithAggregatesFilter<"users"> | $Enums.UserRole
    subscription_plan?: StringNullableWithAggregatesFilter<"users"> | string | null
    credits_balance?: IntWithAggregatesFilter<"users"> | number
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type subscriptionsWhereInput = {
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    id?: UuidFilter<"subscriptions"> | string
    user_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    user_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
    _count?: subscriptionsCountOrderByAggregateInput
    _avg?: subscriptionsAvgOrderByAggregateInput
    _max?: subscriptionsMaxOrderByAggregateInput
    _min?: subscriptionsMinOrderByAggregateInput
    _sum?: subscriptionsSumOrderByAggregateInput
  }

  export type subscriptionsScalarWhereWithAggregatesInput = {
    AND?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    OR?: subscriptionsScalarWhereWithAggregatesInput[]
    NOT?: subscriptionsScalarWhereWithAggregatesInput | subscriptionsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"subscriptions"> | string
    user_id?: UuidWithAggregatesFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeWithAggregatesFilter<"subscriptions"> | $Enums.PlanType
    status?: StringWithAggregatesFilter<"subscriptions"> | string
    start_date?: DateTimeWithAggregatesFilter<"subscriptions"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"subscriptions"> | Date | string
    method?: StringWithAggregatesFilter<"subscriptions"> | string
    amount?: IntWithAggregatesFilter<"subscriptions"> | number
  }

  export type credit_purchasesWhereInput = {
    AND?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    OR?: credit_purchasesWhereInput[]
    NOT?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    id?: UuidFilter<"credit_purchases"> | string
    user_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type credit_purchasesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type credit_purchasesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    OR?: credit_purchasesWhereInput[]
    NOT?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    user_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type credit_purchasesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
    _count?: credit_purchasesCountOrderByAggregateInput
    _avg?: credit_purchasesAvgOrderByAggregateInput
    _max?: credit_purchasesMaxOrderByAggregateInput
    _min?: credit_purchasesMinOrderByAggregateInput
    _sum?: credit_purchasesSumOrderByAggregateInput
  }

  export type credit_purchasesScalarWhereWithAggregatesInput = {
    AND?: credit_purchasesScalarWhereWithAggregatesInput | credit_purchasesScalarWhereWithAggregatesInput[]
    OR?: credit_purchasesScalarWhereWithAggregatesInput[]
    NOT?: credit_purchasesScalarWhereWithAggregatesInput | credit_purchasesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"credit_purchases"> | string
    user_id?: UuidWithAggregatesFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeWithAggregatesFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntWithAggregatesFilter<"credit_purchases"> | number
    price?: FloatWithAggregatesFilter<"credit_purchases"> | number
    purchased_at?: DateTimeWithAggregatesFilter<"credit_purchases"> | Date | string
  }

  export type tasks_logWhereInput = {
    AND?: tasks_logWhereInput | tasks_logWhereInput[]
    OR?: tasks_logWhereInput[]
    NOT?: tasks_logWhereInput | tasks_logWhereInput[]
    id?: UuidFilter<"tasks_log"> | string
    user_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    task_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    output_type?: StringFilter<"tasks_log"> | string
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
    agent_results?: XOR<Agent_resultsNullableScalarRelationFilter, agent_resultsWhereInput> | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type tasks_logOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    agent_type?: SortOrder
    task_type?: SortOrder
    credits_spent?: SortOrder
    output_type?: SortOrder
    timestamp?: SortOrder
    agent_results?: agent_resultsOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
  }

  export type tasks_logWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tasks_logWhereInput | tasks_logWhereInput[]
    OR?: tasks_logWhereInput[]
    NOT?: tasks_logWhereInput | tasks_logWhereInput[]
    user_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    task_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    output_type?: StringFilter<"tasks_log"> | string
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
    agent_results?: XOR<Agent_resultsNullableScalarRelationFilter, agent_resultsWhereInput> | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type tasks_logOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    agent_type?: SortOrder
    task_type?: SortOrder
    credits_spent?: SortOrder
    output_type?: SortOrder
    timestamp?: SortOrder
    _count?: tasks_logCountOrderByAggregateInput
    _avg?: tasks_logAvgOrderByAggregateInput
    _max?: tasks_logMaxOrderByAggregateInput
    _min?: tasks_logMinOrderByAggregateInput
    _sum?: tasks_logSumOrderByAggregateInput
  }

  export type tasks_logScalarWhereWithAggregatesInput = {
    AND?: tasks_logScalarWhereWithAggregatesInput | tasks_logScalarWhereWithAggregatesInput[]
    OR?: tasks_logScalarWhereWithAggregatesInput[]
    NOT?: tasks_logScalarWhereWithAggregatesInput | tasks_logScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"tasks_log"> | string
    user_id?: UuidWithAggregatesFilter<"tasks_log"> | string
    agent_type?: StringWithAggregatesFilter<"tasks_log"> | string
    task_type?: StringWithAggregatesFilter<"tasks_log"> | string
    credits_spent?: IntWithAggregatesFilter<"tasks_log"> | number
    output_type?: StringWithAggregatesFilter<"tasks_log"> | string
    timestamp?: DateTimeWithAggregatesFilter<"tasks_log"> | Date | string
  }

  export type agent_resultsWhereInput = {
    AND?: agent_resultsWhereInput | agent_resultsWhereInput[]
    OR?: agent_resultsWhereInput[]
    NOT?: agent_resultsWhereInput | agent_resultsWhereInput[]
    task_id?: UuidFilter<"agent_results"> | string
    output_text?: StringNullableFilter<"agent_results"> | string | null
    file_url?: StringNullableFilter<"agent_results"> | string | null
    image_url?: StringNullableFilter<"agent_results"> | string | null
    whatsapp_sent?: BoolFilter<"agent_results"> | boolean
    task?: XOR<Tasks_logScalarRelationFilter, tasks_logWhereInput>
  }

  export type agent_resultsOrderByWithRelationInput = {
    task_id?: SortOrder
    output_text?: SortOrderInput | SortOrder
    file_url?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    whatsapp_sent?: SortOrder
    task?: tasks_logOrderByWithRelationInput
  }

  export type agent_resultsWhereUniqueInput = Prisma.AtLeast<{
    task_id?: string
    AND?: agent_resultsWhereInput | agent_resultsWhereInput[]
    OR?: agent_resultsWhereInput[]
    NOT?: agent_resultsWhereInput | agent_resultsWhereInput[]
    output_text?: StringNullableFilter<"agent_results"> | string | null
    file_url?: StringNullableFilter<"agent_results"> | string | null
    image_url?: StringNullableFilter<"agent_results"> | string | null
    whatsapp_sent?: BoolFilter<"agent_results"> | boolean
    task?: XOR<Tasks_logScalarRelationFilter, tasks_logWhereInput>
  }, "task_id">

  export type agent_resultsOrderByWithAggregationInput = {
    task_id?: SortOrder
    output_text?: SortOrderInput | SortOrder
    file_url?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    whatsapp_sent?: SortOrder
    _count?: agent_resultsCountOrderByAggregateInput
    _max?: agent_resultsMaxOrderByAggregateInput
    _min?: agent_resultsMinOrderByAggregateInput
  }

  export type agent_resultsScalarWhereWithAggregatesInput = {
    AND?: agent_resultsScalarWhereWithAggregatesInput | agent_resultsScalarWhereWithAggregatesInput[]
    OR?: agent_resultsScalarWhereWithAggregatesInput[]
    NOT?: agent_resultsScalarWhereWithAggregatesInput | agent_resultsScalarWhereWithAggregatesInput[]
    task_id?: UuidWithAggregatesFilter<"agent_results"> | string
    output_text?: StringNullableWithAggregatesFilter<"agent_results"> | string | null
    file_url?: StringNullableWithAggregatesFilter<"agent_results"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"agent_results"> | string | null
    whatsapp_sent?: BoolWithAggregatesFilter<"agent_results"> | boolean
  }

  export type whatsapp_messagesWhereInput = {
    AND?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    OR?: whatsapp_messagesWhereInput[]
    NOT?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    id?: UuidFilter<"whatsapp_messages"> | string
    user_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type whatsapp_messagesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
    user?: usersOrderByWithRelationInput
  }

  export type whatsapp_messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    OR?: whatsapp_messagesWhereInput[]
    NOT?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    user_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type whatsapp_messagesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
    _count?: whatsapp_messagesCountOrderByAggregateInput
    _max?: whatsapp_messagesMaxOrderByAggregateInput
    _min?: whatsapp_messagesMinOrderByAggregateInput
  }

  export type whatsapp_messagesScalarWhereWithAggregatesInput = {
    AND?: whatsapp_messagesScalarWhereWithAggregatesInput | whatsapp_messagesScalarWhereWithAggregatesInput[]
    OR?: whatsapp_messagesScalarWhereWithAggregatesInput[]
    NOT?: whatsapp_messagesScalarWhereWithAggregatesInput | whatsapp_messagesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"whatsapp_messages"> | string
    user_id?: UuidWithAggregatesFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionWithAggregatesFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringWithAggregatesFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeWithAggregatesFilter<"whatsapp_messages"> | Date | string
  }

  export type admin_activity_logsWhereInput = {
    AND?: admin_activity_logsWhereInput | admin_activity_logsWhereInput[]
    OR?: admin_activity_logsWhereInput[]
    NOT?: admin_activity_logsWhereInput | admin_activity_logsWhereInput[]
    id?: UuidFilter<"admin_activity_logs"> | string
    admin_id?: UuidFilter<"admin_activity_logs"> | string
    action_type?: StringFilter<"admin_activity_logs"> | string
    target_id?: StringFilter<"admin_activity_logs"> | string
    timestamp?: DateTimeFilter<"admin_activity_logs"> | Date | string
    admin?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type admin_activity_logsOrderByWithRelationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
    admin?: usersOrderByWithRelationInput
  }

  export type admin_activity_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: admin_activity_logsWhereInput | admin_activity_logsWhereInput[]
    OR?: admin_activity_logsWhereInput[]
    NOT?: admin_activity_logsWhereInput | admin_activity_logsWhereInput[]
    admin_id?: UuidFilter<"admin_activity_logs"> | string
    action_type?: StringFilter<"admin_activity_logs"> | string
    target_id?: StringFilter<"admin_activity_logs"> | string
    timestamp?: DateTimeFilter<"admin_activity_logs"> | Date | string
    admin?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type admin_activity_logsOrderByWithAggregationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
    _count?: admin_activity_logsCountOrderByAggregateInput
    _max?: admin_activity_logsMaxOrderByAggregateInput
    _min?: admin_activity_logsMinOrderByAggregateInput
  }

  export type admin_activity_logsScalarWhereWithAggregatesInput = {
    AND?: admin_activity_logsScalarWhereWithAggregatesInput | admin_activity_logsScalarWhereWithAggregatesInput[]
    OR?: admin_activity_logsScalarWhereWithAggregatesInput[]
    NOT?: admin_activity_logsScalarWhereWithAggregatesInput | admin_activity_logsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"admin_activity_logs"> | string
    admin_id?: UuidWithAggregatesFilter<"admin_activity_logs"> | string
    action_type?: StringWithAggregatesFilter<"admin_activity_logs"> | string
    target_id?: StringWithAggregatesFilter<"admin_activity_logs"> | string
    timestamp?: DateTimeWithAggregatesFilter<"admin_activity_logs"> | Date | string
  }

  export type usersCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type subscriptionsCreateInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
    user: usersCreateNestedOneWithoutSubscriptionsInput
  }

  export type subscriptionsUncheckedCreateInput = {
    id?: string
    user_id: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    user?: usersUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type subscriptionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsCreateManyInput = {
    id?: string
    user_id: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type credit_purchasesCreateInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
    user: usersCreateNestedOneWithoutCredit_purchasesInput
  }

  export type credit_purchasesUncheckedCreateInput = {
    id?: string
    user_id: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutCredit_purchasesNestedInput
  }

  export type credit_purchasesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesCreateManyInput = {
    id?: string
    user_id: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tasks_logCreateInput = {
    id?: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
    agent_results?: agent_resultsCreateNestedOneWithoutTaskInput
    user: usersCreateNestedOneWithoutTasks_logInput
  }

  export type tasks_logUncheckedCreateInput = {
    id?: string
    user_id: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
    agent_results?: agent_resultsUncheckedCreateNestedOneWithoutTaskInput
  }

  export type tasks_logUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: agent_resultsUpdateOneWithoutTaskNestedInput
    user?: usersUpdateOneRequiredWithoutTasks_logNestedInput
  }

  export type tasks_logUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: agent_resultsUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type tasks_logCreateManyInput = {
    id?: string
    user_id: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
  }

  export type tasks_logUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tasks_logUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type agent_resultsCreateInput = {
    output_text?: string | null
    file_url?: string | null
    image_url?: string | null
    whatsapp_sent?: boolean
    task: tasks_logCreateNestedOneWithoutAgent_resultsInput
  }

  export type agent_resultsUncheckedCreateInput = {
    task_id: string
    output_text?: string | null
    file_url?: string | null
    image_url?: string | null
    whatsapp_sent?: boolean
  }

  export type agent_resultsUpdateInput = {
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
    task?: tasks_logUpdateOneRequiredWithoutAgent_resultsNestedInput
  }

  export type agent_resultsUncheckedUpdateInput = {
    task_id?: StringFieldUpdateOperationsInput | string
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type agent_resultsCreateManyInput = {
    task_id: string
    output_text?: string | null
    file_url?: string | null
    image_url?: string | null
    whatsapp_sent?: boolean
  }

  export type agent_resultsUpdateManyMutationInput = {
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type agent_resultsUncheckedUpdateManyInput = {
    task_id?: StringFieldUpdateOperationsInput | string
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type whatsapp_messagesCreateInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
    user: usersCreateNestedOneWithoutWhatsapp_messagesInput
  }

  export type whatsapp_messagesUncheckedCreateInput = {
    id?: string
    user_id: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutWhatsapp_messagesNestedInput
  }

  export type whatsapp_messagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesCreateManyInput = {
    id?: string
    user_id: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsCreateInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
    admin: usersCreateNestedOneWithoutAdmin_activitiesInput
  }

  export type admin_activity_logsUncheckedCreateInput = {
    id?: string
    admin_id: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type admin_activity_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: usersUpdateOneRequiredWithoutAdmin_activitiesNestedInput
  }

  export type admin_activity_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsCreateManyInput = {
    id?: string
    admin_id: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type admin_activity_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Admin_activity_logsListRelationFilter = {
    every?: admin_activity_logsWhereInput
    some?: admin_activity_logsWhereInput
    none?: admin_activity_logsWhereInput
  }

  export type Credit_purchasesListRelationFilter = {
    every?: credit_purchasesWhereInput
    some?: credit_purchasesWhereInput
    none?: credit_purchasesWhereInput
  }

  export type SubscriptionsListRelationFilter = {
    every?: subscriptionsWhereInput
    some?: subscriptionsWhereInput
    none?: subscriptionsWhereInput
  }

  export type Tasks_logListRelationFilter = {
    every?: tasks_logWhereInput
    some?: tasks_logWhereInput
    none?: tasks_logWhereInput
  }

  export type Whatsapp_messagesListRelationFilter = {
    every?: whatsapp_messagesWhereInput
    some?: whatsapp_messagesWhereInput
    none?: whatsapp_messagesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type admin_activity_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type credit_purchasesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type subscriptionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tasks_logOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type whatsapp_messagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    credits_balance?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    credits_balance?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
  }

  export type subscriptionsAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type subscriptionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
  }

  export type subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
  }

  export type subscriptionsSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type EnumPackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PackType | EnumPackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPackTypeFilter<$PrismaModel> | $Enums.PackType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type credit_purchasesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
  }

  export type credit_purchasesAvgOrderByAggregateInput = {
    credits?: SortOrder
    price?: SortOrder
  }

  export type credit_purchasesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
  }

  export type credit_purchasesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
  }

  export type credit_purchasesSumOrderByAggregateInput = {
    credits?: SortOrder
    price?: SortOrder
  }

  export type EnumPackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackType | EnumPackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPackTypeWithAggregatesFilter<$PrismaModel> | $Enums.PackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackTypeFilter<$PrismaModel>
    _max?: NestedEnumPackTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type Agent_resultsNullableScalarRelationFilter = {
    is?: agent_resultsWhereInput | null
    isNot?: agent_resultsWhereInput | null
  }

  export type tasks_logCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    agent_type?: SortOrder
    task_type?: SortOrder
    credits_spent?: SortOrder
    output_type?: SortOrder
    timestamp?: SortOrder
  }

  export type tasks_logAvgOrderByAggregateInput = {
    credits_spent?: SortOrder
  }

  export type tasks_logMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    agent_type?: SortOrder
    task_type?: SortOrder
    credits_spent?: SortOrder
    output_type?: SortOrder
    timestamp?: SortOrder
  }

  export type tasks_logMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    agent_type?: SortOrder
    task_type?: SortOrder
    credits_spent?: SortOrder
    output_type?: SortOrder
    timestamp?: SortOrder
  }

  export type tasks_logSumOrderByAggregateInput = {
    credits_spent?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Tasks_logScalarRelationFilter = {
    is?: tasks_logWhereInput
    isNot?: tasks_logWhereInput
  }

  export type agent_resultsCountOrderByAggregateInput = {
    task_id?: SortOrder
    output_text?: SortOrder
    file_url?: SortOrder
    image_url?: SortOrder
    whatsapp_sent?: SortOrder
  }

  export type agent_resultsMaxOrderByAggregateInput = {
    task_id?: SortOrder
    output_text?: SortOrder
    file_url?: SortOrder
    image_url?: SortOrder
    whatsapp_sent?: SortOrder
  }

  export type agent_resultsMinOrderByAggregateInput = {
    task_id?: SortOrder
    output_text?: SortOrder
    file_url?: SortOrder
    image_url?: SortOrder
    whatsapp_sent?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumMessageDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageDirectionFilter<$PrismaModel> | $Enums.MessageDirection
  }

  export type whatsapp_messagesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
  }

  export type whatsapp_messagesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
  }

  export type whatsapp_messagesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumMessageDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageDirectionWithAggregatesFilter<$PrismaModel> | $Enums.MessageDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageDirectionFilter<$PrismaModel>
    _max?: NestedEnumMessageDirectionFilter<$PrismaModel>
  }

  export type admin_activity_logsCountOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
  }

  export type admin_activity_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
  }

  export type admin_activity_logsMinOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
  }

  export type admin_activity_logsCreateNestedManyWithoutAdminInput = {
    create?: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput> | admin_activity_logsCreateWithoutAdminInput[] | admin_activity_logsUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: admin_activity_logsCreateOrConnectWithoutAdminInput | admin_activity_logsCreateOrConnectWithoutAdminInput[]
    createMany?: admin_activity_logsCreateManyAdminInputEnvelope
    connect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
  }

  export type credit_purchasesCreateNestedManyWithoutUserInput = {
    create?: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput> | credit_purchasesCreateWithoutUserInput[] | credit_purchasesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutUserInput | credit_purchasesCreateOrConnectWithoutUserInput[]
    createMany?: credit_purchasesCreateManyUserInputEnvelope
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
  }

  export type subscriptionsCreateNestedManyWithoutUserInput = {
    create?: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput> | subscriptionsCreateWithoutUserInput[] | subscriptionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUserInput | subscriptionsCreateOrConnectWithoutUserInput[]
    createMany?: subscriptionsCreateManyUserInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type tasks_logCreateNestedManyWithoutUserInput = {
    create?: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput> | tasks_logCreateWithoutUserInput[] | tasks_logUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutUserInput | tasks_logCreateOrConnectWithoutUserInput[]
    createMany?: tasks_logCreateManyUserInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type whatsapp_messagesCreateNestedManyWithoutUserInput = {
    create?: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput> | whatsapp_messagesCreateWithoutUserInput[] | whatsapp_messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutUserInput | whatsapp_messagesCreateOrConnectWithoutUserInput[]
    createMany?: whatsapp_messagesCreateManyUserInputEnvelope
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
  }

  export type admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput> | admin_activity_logsCreateWithoutAdminInput[] | admin_activity_logsUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: admin_activity_logsCreateOrConnectWithoutAdminInput | admin_activity_logsCreateOrConnectWithoutAdminInput[]
    createMany?: admin_activity_logsCreateManyAdminInputEnvelope
    connect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
  }

  export type credit_purchasesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput> | credit_purchasesCreateWithoutUserInput[] | credit_purchasesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutUserInput | credit_purchasesCreateOrConnectWithoutUserInput[]
    createMany?: credit_purchasesCreateManyUserInputEnvelope
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
  }

  export type subscriptionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput> | subscriptionsCreateWithoutUserInput[] | subscriptionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUserInput | subscriptionsCreateOrConnectWithoutUserInput[]
    createMany?: subscriptionsCreateManyUserInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type tasks_logUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput> | tasks_logCreateWithoutUserInput[] | tasks_logUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutUserInput | tasks_logCreateOrConnectWithoutUserInput[]
    createMany?: tasks_logCreateManyUserInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput> | whatsapp_messagesCreateWithoutUserInput[] | whatsapp_messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutUserInput | whatsapp_messagesCreateOrConnectWithoutUserInput[]
    createMany?: whatsapp_messagesCreateManyUserInputEnvelope
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type admin_activity_logsUpdateManyWithoutAdminNestedInput = {
    create?: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput> | admin_activity_logsCreateWithoutAdminInput[] | admin_activity_logsUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: admin_activity_logsCreateOrConnectWithoutAdminInput | admin_activity_logsCreateOrConnectWithoutAdminInput[]
    upsert?: admin_activity_logsUpsertWithWhereUniqueWithoutAdminInput | admin_activity_logsUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: admin_activity_logsCreateManyAdminInputEnvelope
    set?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    disconnect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    delete?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    connect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    update?: admin_activity_logsUpdateWithWhereUniqueWithoutAdminInput | admin_activity_logsUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: admin_activity_logsUpdateManyWithWhereWithoutAdminInput | admin_activity_logsUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: admin_activity_logsScalarWhereInput | admin_activity_logsScalarWhereInput[]
  }

  export type credit_purchasesUpdateManyWithoutUserNestedInput = {
    create?: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput> | credit_purchasesCreateWithoutUserInput[] | credit_purchasesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutUserInput | credit_purchasesCreateOrConnectWithoutUserInput[]
    upsert?: credit_purchasesUpsertWithWhereUniqueWithoutUserInput | credit_purchasesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credit_purchasesCreateManyUserInputEnvelope
    set?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    disconnect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    delete?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    update?: credit_purchasesUpdateWithWhereUniqueWithoutUserInput | credit_purchasesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credit_purchasesUpdateManyWithWhereWithoutUserInput | credit_purchasesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
  }

  export type subscriptionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput> | subscriptionsCreateWithoutUserInput[] | subscriptionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUserInput | subscriptionsCreateOrConnectWithoutUserInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutUserInput | subscriptionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: subscriptionsCreateManyUserInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutUserInput | subscriptionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutUserInput | subscriptionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type tasks_logUpdateManyWithoutUserNestedInput = {
    create?: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput> | tasks_logCreateWithoutUserInput[] | tasks_logUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutUserInput | tasks_logCreateOrConnectWithoutUserInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutUserInput | tasks_logUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tasks_logCreateManyUserInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutUserInput | tasks_logUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutUserInput | tasks_logUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type whatsapp_messagesUpdateManyWithoutUserNestedInput = {
    create?: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput> | whatsapp_messagesCreateWithoutUserInput[] | whatsapp_messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutUserInput | whatsapp_messagesCreateOrConnectWithoutUserInput[]
    upsert?: whatsapp_messagesUpsertWithWhereUniqueWithoutUserInput | whatsapp_messagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: whatsapp_messagesCreateManyUserInputEnvelope
    set?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    disconnect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    delete?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    update?: whatsapp_messagesUpdateWithWhereUniqueWithoutUserInput | whatsapp_messagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: whatsapp_messagesUpdateManyWithWhereWithoutUserInput | whatsapp_messagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
  }

  export type admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput> | admin_activity_logsCreateWithoutAdminInput[] | admin_activity_logsUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: admin_activity_logsCreateOrConnectWithoutAdminInput | admin_activity_logsCreateOrConnectWithoutAdminInput[]
    upsert?: admin_activity_logsUpsertWithWhereUniqueWithoutAdminInput | admin_activity_logsUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: admin_activity_logsCreateManyAdminInputEnvelope
    set?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    disconnect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    delete?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    connect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
    update?: admin_activity_logsUpdateWithWhereUniqueWithoutAdminInput | admin_activity_logsUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: admin_activity_logsUpdateManyWithWhereWithoutAdminInput | admin_activity_logsUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: admin_activity_logsScalarWhereInput | admin_activity_logsScalarWhereInput[]
  }

  export type credit_purchasesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput> | credit_purchasesCreateWithoutUserInput[] | credit_purchasesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutUserInput | credit_purchasesCreateOrConnectWithoutUserInput[]
    upsert?: credit_purchasesUpsertWithWhereUniqueWithoutUserInput | credit_purchasesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: credit_purchasesCreateManyUserInputEnvelope
    set?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    disconnect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    delete?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    update?: credit_purchasesUpdateWithWhereUniqueWithoutUserInput | credit_purchasesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: credit_purchasesUpdateManyWithWhereWithoutUserInput | credit_purchasesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
  }

  export type subscriptionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput> | subscriptionsCreateWithoutUserInput[] | subscriptionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutUserInput | subscriptionsCreateOrConnectWithoutUserInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutUserInput | subscriptionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: subscriptionsCreateManyUserInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutUserInput | subscriptionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutUserInput | subscriptionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type tasks_logUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput> | tasks_logCreateWithoutUserInput[] | tasks_logUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutUserInput | tasks_logCreateOrConnectWithoutUserInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutUserInput | tasks_logUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tasks_logCreateManyUserInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutUserInput | tasks_logUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutUserInput | tasks_logUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput> | whatsapp_messagesCreateWithoutUserInput[] | whatsapp_messagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutUserInput | whatsapp_messagesCreateOrConnectWithoutUserInput[]
    upsert?: whatsapp_messagesUpsertWithWhereUniqueWithoutUserInput | whatsapp_messagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: whatsapp_messagesCreateManyUserInputEnvelope
    set?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    disconnect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    delete?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    update?: whatsapp_messagesUpdateWithWhereUniqueWithoutUserInput | whatsapp_messagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: whatsapp_messagesUpdateManyWithWhereWithoutUserInput | whatsapp_messagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSubscriptionsInput
    connect?: usersWhereUniqueInput
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type usersUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutSubscriptionsInput
    upsert?: usersUpsertWithoutSubscriptionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutSubscriptionsInput, usersUpdateWithoutSubscriptionsInput>, usersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type usersCreateNestedOneWithoutCredit_purchasesInput = {
    create?: XOR<usersCreateWithoutCredit_purchasesInput, usersUncheckedCreateWithoutCredit_purchasesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCredit_purchasesInput
    connect?: usersWhereUniqueInput
  }

  export type EnumPackTypeFieldUpdateOperationsInput = {
    set?: $Enums.PackType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutCredit_purchasesNestedInput = {
    create?: XOR<usersCreateWithoutCredit_purchasesInput, usersUncheckedCreateWithoutCredit_purchasesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCredit_purchasesInput
    upsert?: usersUpsertWithoutCredit_purchasesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCredit_purchasesInput, usersUpdateWithoutCredit_purchasesInput>, usersUncheckedUpdateWithoutCredit_purchasesInput>
  }

  export type agent_resultsCreateNestedOneWithoutTaskInput = {
    create?: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
    connectOrCreate?: agent_resultsCreateOrConnectWithoutTaskInput
    connect?: agent_resultsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutTasks_logInput = {
    create?: XOR<usersCreateWithoutTasks_logInput, usersUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_logInput
    connect?: usersWhereUniqueInput
  }

  export type agent_resultsUncheckedCreateNestedOneWithoutTaskInput = {
    create?: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
    connectOrCreate?: agent_resultsCreateOrConnectWithoutTaskInput
    connect?: agent_resultsWhereUniqueInput
  }

  export type agent_resultsUpdateOneWithoutTaskNestedInput = {
    create?: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
    connectOrCreate?: agent_resultsCreateOrConnectWithoutTaskInput
    upsert?: agent_resultsUpsertWithoutTaskInput
    disconnect?: agent_resultsWhereInput | boolean
    delete?: agent_resultsWhereInput | boolean
    connect?: agent_resultsWhereUniqueInput
    update?: XOR<XOR<agent_resultsUpdateToOneWithWhereWithoutTaskInput, agent_resultsUpdateWithoutTaskInput>, agent_resultsUncheckedUpdateWithoutTaskInput>
  }

  export type usersUpdateOneRequiredWithoutTasks_logNestedInput = {
    create?: XOR<usersCreateWithoutTasks_logInput, usersUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: usersCreateOrConnectWithoutTasks_logInput
    upsert?: usersUpsertWithoutTasks_logInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTasks_logInput, usersUpdateWithoutTasks_logInput>, usersUncheckedUpdateWithoutTasks_logInput>
  }

  export type agent_resultsUncheckedUpdateOneWithoutTaskNestedInput = {
    create?: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
    connectOrCreate?: agent_resultsCreateOrConnectWithoutTaskInput
    upsert?: agent_resultsUpsertWithoutTaskInput
    disconnect?: agent_resultsWhereInput | boolean
    delete?: agent_resultsWhereInput | boolean
    connect?: agent_resultsWhereUniqueInput
    update?: XOR<XOR<agent_resultsUpdateToOneWithWhereWithoutTaskInput, agent_resultsUpdateWithoutTaskInput>, agent_resultsUncheckedUpdateWithoutTaskInput>
  }

  export type tasks_logCreateNestedOneWithoutAgent_resultsInput = {
    create?: XOR<tasks_logCreateWithoutAgent_resultsInput, tasks_logUncheckedCreateWithoutAgent_resultsInput>
    connectOrCreate?: tasks_logCreateOrConnectWithoutAgent_resultsInput
    connect?: tasks_logWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type tasks_logUpdateOneRequiredWithoutAgent_resultsNestedInput = {
    create?: XOR<tasks_logCreateWithoutAgent_resultsInput, tasks_logUncheckedCreateWithoutAgent_resultsInput>
    connectOrCreate?: tasks_logCreateOrConnectWithoutAgent_resultsInput
    upsert?: tasks_logUpsertWithoutAgent_resultsInput
    connect?: tasks_logWhereUniqueInput
    update?: XOR<XOR<tasks_logUpdateToOneWithWhereWithoutAgent_resultsInput, tasks_logUpdateWithoutAgent_resultsInput>, tasks_logUncheckedUpdateWithoutAgent_resultsInput>
  }

  export type usersCreateNestedOneWithoutWhatsapp_messagesInput = {
    create?: XOR<usersCreateWithoutWhatsapp_messagesInput, usersUncheckedCreateWithoutWhatsapp_messagesInput>
    connectOrCreate?: usersCreateOrConnectWithoutWhatsapp_messagesInput
    connect?: usersWhereUniqueInput
  }

  export type EnumMessageDirectionFieldUpdateOperationsInput = {
    set?: $Enums.MessageDirection
  }

  export type usersUpdateOneRequiredWithoutWhatsapp_messagesNestedInput = {
    create?: XOR<usersCreateWithoutWhatsapp_messagesInput, usersUncheckedCreateWithoutWhatsapp_messagesInput>
    connectOrCreate?: usersCreateOrConnectWithoutWhatsapp_messagesInput
    upsert?: usersUpsertWithoutWhatsapp_messagesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutWhatsapp_messagesInput, usersUpdateWithoutWhatsapp_messagesInput>, usersUncheckedUpdateWithoutWhatsapp_messagesInput>
  }

  export type usersCreateNestedOneWithoutAdmin_activitiesInput = {
    create?: XOR<usersCreateWithoutAdmin_activitiesInput, usersUncheckedCreateWithoutAdmin_activitiesInput>
    connectOrCreate?: usersCreateOrConnectWithoutAdmin_activitiesInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutAdmin_activitiesNestedInput = {
    create?: XOR<usersCreateWithoutAdmin_activitiesInput, usersUncheckedCreateWithoutAdmin_activitiesInput>
    connectOrCreate?: usersCreateOrConnectWithoutAdmin_activitiesInput
    upsert?: usersUpsertWithoutAdmin_activitiesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAdmin_activitiesInput, usersUpdateWithoutAdmin_activitiesInput>, usersUncheckedUpdateWithoutAdmin_activitiesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type NestedEnumPackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PackType | EnumPackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPackTypeFilter<$PrismaModel> | $Enums.PackType
  }

  export type NestedEnumPackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackType | EnumPackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackType[] | ListEnumPackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPackTypeWithAggregatesFilter<$PrismaModel> | $Enums.PackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackTypeFilter<$PrismaModel>
    _max?: NestedEnumPackTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumMessageDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageDirectionFilter<$PrismaModel> | $Enums.MessageDirection
  }

  export type NestedEnumMessageDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageDirectionWithAggregatesFilter<$PrismaModel> | $Enums.MessageDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageDirectionFilter<$PrismaModel>
    _max?: NestedEnumMessageDirectionFilter<$PrismaModel>
  }

  export type admin_activity_logsCreateWithoutAdminInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type admin_activity_logsUncheckedCreateWithoutAdminInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type admin_activity_logsCreateOrConnectWithoutAdminInput = {
    where: admin_activity_logsWhereUniqueInput
    create: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput>
  }

  export type admin_activity_logsCreateManyAdminInputEnvelope = {
    data: admin_activity_logsCreateManyAdminInput | admin_activity_logsCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type credit_purchasesCreateWithoutUserInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesUncheckedCreateWithoutUserInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesCreateOrConnectWithoutUserInput = {
    where: credit_purchasesWhereUniqueInput
    create: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput>
  }

  export type credit_purchasesCreateManyUserInputEnvelope = {
    data: credit_purchasesCreateManyUserInput | credit_purchasesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type subscriptionsCreateWithoutUserInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsUncheckedCreateWithoutUserInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsCreateOrConnectWithoutUserInput = {
    where: subscriptionsWhereUniqueInput
    create: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput>
  }

  export type subscriptionsCreateManyUserInputEnvelope = {
    data: subscriptionsCreateManyUserInput | subscriptionsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type tasks_logCreateWithoutUserInput = {
    id?: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
    agent_results?: agent_resultsCreateNestedOneWithoutTaskInput
  }

  export type tasks_logUncheckedCreateWithoutUserInput = {
    id?: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
    agent_results?: agent_resultsUncheckedCreateNestedOneWithoutTaskInput
  }

  export type tasks_logCreateOrConnectWithoutUserInput = {
    where: tasks_logWhereUniqueInput
    create: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput>
  }

  export type tasks_logCreateManyUserInputEnvelope = {
    data: tasks_logCreateManyUserInput | tasks_logCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type whatsapp_messagesCreateWithoutUserInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesUncheckedCreateWithoutUserInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesCreateOrConnectWithoutUserInput = {
    where: whatsapp_messagesWhereUniqueInput
    create: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput>
  }

  export type whatsapp_messagesCreateManyUserInputEnvelope = {
    data: whatsapp_messagesCreateManyUserInput | whatsapp_messagesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type admin_activity_logsUpsertWithWhereUniqueWithoutAdminInput = {
    where: admin_activity_logsWhereUniqueInput
    update: XOR<admin_activity_logsUpdateWithoutAdminInput, admin_activity_logsUncheckedUpdateWithoutAdminInput>
    create: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput>
  }

  export type admin_activity_logsUpdateWithWhereUniqueWithoutAdminInput = {
    where: admin_activity_logsWhereUniqueInput
    data: XOR<admin_activity_logsUpdateWithoutAdminInput, admin_activity_logsUncheckedUpdateWithoutAdminInput>
  }

  export type admin_activity_logsUpdateManyWithWhereWithoutAdminInput = {
    where: admin_activity_logsScalarWhereInput
    data: XOR<admin_activity_logsUpdateManyMutationInput, admin_activity_logsUncheckedUpdateManyWithoutAdminInput>
  }

  export type admin_activity_logsScalarWhereInput = {
    AND?: admin_activity_logsScalarWhereInput | admin_activity_logsScalarWhereInput[]
    OR?: admin_activity_logsScalarWhereInput[]
    NOT?: admin_activity_logsScalarWhereInput | admin_activity_logsScalarWhereInput[]
    id?: UuidFilter<"admin_activity_logs"> | string
    admin_id?: UuidFilter<"admin_activity_logs"> | string
    action_type?: StringFilter<"admin_activity_logs"> | string
    target_id?: StringFilter<"admin_activity_logs"> | string
    timestamp?: DateTimeFilter<"admin_activity_logs"> | Date | string
  }

  export type credit_purchasesUpsertWithWhereUniqueWithoutUserInput = {
    where: credit_purchasesWhereUniqueInput
    update: XOR<credit_purchasesUpdateWithoutUserInput, credit_purchasesUncheckedUpdateWithoutUserInput>
    create: XOR<credit_purchasesCreateWithoutUserInput, credit_purchasesUncheckedCreateWithoutUserInput>
  }

  export type credit_purchasesUpdateWithWhereUniqueWithoutUserInput = {
    where: credit_purchasesWhereUniqueInput
    data: XOR<credit_purchasesUpdateWithoutUserInput, credit_purchasesUncheckedUpdateWithoutUserInput>
  }

  export type credit_purchasesUpdateManyWithWhereWithoutUserInput = {
    where: credit_purchasesScalarWhereInput
    data: XOR<credit_purchasesUpdateManyMutationInput, credit_purchasesUncheckedUpdateManyWithoutUserInput>
  }

  export type credit_purchasesScalarWhereInput = {
    AND?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
    OR?: credit_purchasesScalarWhereInput[]
    NOT?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
    id?: UuidFilter<"credit_purchases"> | string
    user_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
  }

  export type subscriptionsUpsertWithWhereUniqueWithoutUserInput = {
    where: subscriptionsWhereUniqueInput
    update: XOR<subscriptionsUpdateWithoutUserInput, subscriptionsUncheckedUpdateWithoutUserInput>
    create: XOR<subscriptionsCreateWithoutUserInput, subscriptionsUncheckedCreateWithoutUserInput>
  }

  export type subscriptionsUpdateWithWhereUniqueWithoutUserInput = {
    where: subscriptionsWhereUniqueInput
    data: XOR<subscriptionsUpdateWithoutUserInput, subscriptionsUncheckedUpdateWithoutUserInput>
  }

  export type subscriptionsUpdateManyWithWhereWithoutUserInput = {
    where: subscriptionsScalarWhereInput
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyWithoutUserInput>
  }

  export type subscriptionsScalarWhereInput = {
    AND?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    OR?: subscriptionsScalarWhereInput[]
    NOT?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    id?: UuidFilter<"subscriptions"> | string
    user_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
  }

  export type tasks_logUpsertWithWhereUniqueWithoutUserInput = {
    where: tasks_logWhereUniqueInput
    update: XOR<tasks_logUpdateWithoutUserInput, tasks_logUncheckedUpdateWithoutUserInput>
    create: XOR<tasks_logCreateWithoutUserInput, tasks_logUncheckedCreateWithoutUserInput>
  }

  export type tasks_logUpdateWithWhereUniqueWithoutUserInput = {
    where: tasks_logWhereUniqueInput
    data: XOR<tasks_logUpdateWithoutUserInput, tasks_logUncheckedUpdateWithoutUserInput>
  }

  export type tasks_logUpdateManyWithWhereWithoutUserInput = {
    where: tasks_logScalarWhereInput
    data: XOR<tasks_logUpdateManyMutationInput, tasks_logUncheckedUpdateManyWithoutUserInput>
  }

  export type tasks_logScalarWhereInput = {
    AND?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
    OR?: tasks_logScalarWhereInput[]
    NOT?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
    id?: UuidFilter<"tasks_log"> | string
    user_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    task_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    output_type?: StringFilter<"tasks_log"> | string
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
  }

  export type whatsapp_messagesUpsertWithWhereUniqueWithoutUserInput = {
    where: whatsapp_messagesWhereUniqueInput
    update: XOR<whatsapp_messagesUpdateWithoutUserInput, whatsapp_messagesUncheckedUpdateWithoutUserInput>
    create: XOR<whatsapp_messagesCreateWithoutUserInput, whatsapp_messagesUncheckedCreateWithoutUserInput>
  }

  export type whatsapp_messagesUpdateWithWhereUniqueWithoutUserInput = {
    where: whatsapp_messagesWhereUniqueInput
    data: XOR<whatsapp_messagesUpdateWithoutUserInput, whatsapp_messagesUncheckedUpdateWithoutUserInput>
  }

  export type whatsapp_messagesUpdateManyWithWhereWithoutUserInput = {
    where: whatsapp_messagesScalarWhereInput
    data: XOR<whatsapp_messagesUpdateManyMutationInput, whatsapp_messagesUncheckedUpdateManyWithoutUserInput>
  }

  export type whatsapp_messagesScalarWhereInput = {
    AND?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
    OR?: whatsapp_messagesScalarWhereInput[]
    NOT?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
    id?: UuidFilter<"whatsapp_messages"> | string
    user_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
  }

  export type usersCreateWithoutSubscriptionsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutSubscriptionsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutSubscriptionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
  }

  export type usersUpsertWithoutSubscriptionsInput = {
    update: XOR<usersUpdateWithoutSubscriptionsInput, usersUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<usersCreateWithoutSubscriptionsInput, usersUncheckedCreateWithoutSubscriptionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutSubscriptionsInput, usersUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type usersUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutCredit_purchasesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutCredit_purchasesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutCredit_purchasesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCredit_purchasesInput, usersUncheckedCreateWithoutCredit_purchasesInput>
  }

  export type usersUpsertWithoutCredit_purchasesInput = {
    update: XOR<usersUpdateWithoutCredit_purchasesInput, usersUncheckedUpdateWithoutCredit_purchasesInput>
    create: XOR<usersCreateWithoutCredit_purchasesInput, usersUncheckedCreateWithoutCredit_purchasesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCredit_purchasesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCredit_purchasesInput, usersUncheckedUpdateWithoutCredit_purchasesInput>
  }

  export type usersUpdateWithoutCredit_purchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutCredit_purchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type agent_resultsCreateWithoutTaskInput = {
    output_text?: string | null
    file_url?: string | null
    image_url?: string | null
    whatsapp_sent?: boolean
  }

  export type agent_resultsUncheckedCreateWithoutTaskInput = {
    output_text?: string | null
    file_url?: string | null
    image_url?: string | null
    whatsapp_sent?: boolean
  }

  export type agent_resultsCreateOrConnectWithoutTaskInput = {
    where: agent_resultsWhereUniqueInput
    create: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
  }

  export type usersCreateWithoutTasks_logInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutTasks_logInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutTasks_logInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTasks_logInput, usersUncheckedCreateWithoutTasks_logInput>
  }

  export type agent_resultsUpsertWithoutTaskInput = {
    update: XOR<agent_resultsUpdateWithoutTaskInput, agent_resultsUncheckedUpdateWithoutTaskInput>
    create: XOR<agent_resultsCreateWithoutTaskInput, agent_resultsUncheckedCreateWithoutTaskInput>
    where?: agent_resultsWhereInput
  }

  export type agent_resultsUpdateToOneWithWhereWithoutTaskInput = {
    where?: agent_resultsWhereInput
    data: XOR<agent_resultsUpdateWithoutTaskInput, agent_resultsUncheckedUpdateWithoutTaskInput>
  }

  export type agent_resultsUpdateWithoutTaskInput = {
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type agent_resultsUncheckedUpdateWithoutTaskInput = {
    output_text?: NullableStringFieldUpdateOperationsInput | string | null
    file_url?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp_sent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type usersUpsertWithoutTasks_logInput = {
    update: XOR<usersUpdateWithoutTasks_logInput, usersUncheckedUpdateWithoutTasks_logInput>
    create: XOR<usersCreateWithoutTasks_logInput, usersUncheckedCreateWithoutTasks_logInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTasks_logInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTasks_logInput, usersUncheckedUpdateWithoutTasks_logInput>
  }

  export type usersUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type tasks_logCreateWithoutAgent_resultsInput = {
    id?: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
    user: usersCreateNestedOneWithoutTasks_logInput
  }

  export type tasks_logUncheckedCreateWithoutAgent_resultsInput = {
    id?: string
    user_id: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
  }

  export type tasks_logCreateOrConnectWithoutAgent_resultsInput = {
    where: tasks_logWhereUniqueInput
    create: XOR<tasks_logCreateWithoutAgent_resultsInput, tasks_logUncheckedCreateWithoutAgent_resultsInput>
  }

  export type tasks_logUpsertWithoutAgent_resultsInput = {
    update: XOR<tasks_logUpdateWithoutAgent_resultsInput, tasks_logUncheckedUpdateWithoutAgent_resultsInput>
    create: XOR<tasks_logCreateWithoutAgent_resultsInput, tasks_logUncheckedCreateWithoutAgent_resultsInput>
    where?: tasks_logWhereInput
  }

  export type tasks_logUpdateToOneWithWhereWithoutAgent_resultsInput = {
    where?: tasks_logWhereInput
    data: XOR<tasks_logUpdateWithoutAgent_resultsInput, tasks_logUncheckedUpdateWithoutAgent_resultsInput>
  }

  export type tasks_logUpdateWithoutAgent_resultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutTasks_logNestedInput
  }

  export type tasks_logUncheckedUpdateWithoutAgent_resultsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateWithoutWhatsapp_messagesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutWhatsapp_messagesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutWhatsapp_messagesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutWhatsapp_messagesInput, usersUncheckedCreateWithoutWhatsapp_messagesInput>
  }

  export type usersUpsertWithoutWhatsapp_messagesInput = {
    update: XOR<usersUpdateWithoutWhatsapp_messagesInput, usersUncheckedUpdateWithoutWhatsapp_messagesInput>
    create: XOR<usersCreateWithoutWhatsapp_messagesInput, usersUncheckedCreateWithoutWhatsapp_messagesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutWhatsapp_messagesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutWhatsapp_messagesInput, usersUncheckedUpdateWithoutWhatsapp_messagesInput>
  }

  export type usersUpdateWithoutWhatsapp_messagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutWhatsapp_messagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateWithoutAdmin_activitiesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    credit_purchases?: credit_purchasesCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutAdmin_activitiesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutUserInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutUserInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutUserInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutAdmin_activitiesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAdmin_activitiesInput, usersUncheckedCreateWithoutAdmin_activitiesInput>
  }

  export type usersUpsertWithoutAdmin_activitiesInput = {
    update: XOR<usersUpdateWithoutAdmin_activitiesInput, usersUncheckedUpdateWithoutAdmin_activitiesInput>
    create: XOR<usersCreateWithoutAdmin_activitiesInput, usersUncheckedCreateWithoutAdmin_activitiesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAdmin_activitiesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAdmin_activitiesInput, usersUncheckedUpdateWithoutAdmin_activitiesInput>
  }

  export type usersUpdateWithoutAdmin_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credit_purchases?: credit_purchasesUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutAdmin_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutUserNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutUserNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutUserNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type admin_activity_logsCreateManyAdminInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type credit_purchasesCreateManyUserInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type subscriptionsCreateManyUserInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type tasks_logCreateManyUserInput = {
    id?: string
    agent_type: string
    task_type: string
    credits_spent: number
    output_type: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesCreateManyUserInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type admin_activity_logsUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action_type?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type subscriptionsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type tasks_logUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: agent_resultsUpdateOneWithoutTaskNestedInput
  }

  export type tasks_logUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: agent_resultsUncheckedUpdateOneWithoutTaskNestedInput
  }

  export type tasks_logUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    task_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    output_type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}

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
 * Model profile
 * 
 */
export type profile = $Result.DefaultSelection<Prisma.$profilePayload>
/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
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
  professional: 'professional'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const PackType: {
  PACK_100: 'PACK_100',
  PACK_200: 'PACK_200',
  PACK_400: 'PACK_400'
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
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
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
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
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
   * `prisma.profile`: Exposes CRUD operations for the **profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.profileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
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
    profile: 'profile',
    projects: 'projects',
    subscriptions: 'subscriptions',
    credit_purchases: 'credit_purchases',
    tasks_log: 'tasks_log',
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
      modelProps: "profile" | "projects" | "subscriptions" | "credit_purchases" | "tasks_log" | "whatsapp_messages" | "admin_activity_logs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      profile: {
        payload: Prisma.$profilePayload<ExtArgs>
        fields: Prisma.profileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.profileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.profileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          findFirst: {
            args: Prisma.profileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.profileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          findMany: {
            args: Prisma.profileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          create: {
            args: Prisma.profileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          createMany: {
            args: Prisma.profileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.profileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          delete: {
            args: Prisma.profileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          update: {
            args: Prisma.profileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          deleteMany: {
            args: Prisma.profileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.profileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.profileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>[]
          }
          upsert: {
            args: Prisma.profileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$profilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.profileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.profileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.projectsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.projectsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
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
    profile?: profileOmit
    projects?: projectsOmit
    subscriptions?: subscriptionsOmit
    credit_purchases?: credit_purchasesOmit
    tasks_log?: tasks_logOmit
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
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    admin_activities: number
    credit_purchases: number
    projects: number
    subscriptions: number
    tasks_log: number
    whatsapp_messages: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_activities?: boolean | ProfileCountOutputTypeCountAdmin_activitiesArgs
    credit_purchases?: boolean | ProfileCountOutputTypeCountCredit_purchasesArgs
    projects?: boolean | ProfileCountOutputTypeCountProjectsArgs
    subscriptions?: boolean | ProfileCountOutputTypeCountSubscriptionsArgs
    tasks_log?: boolean | ProfileCountOutputTypeCountTasks_logArgs
    whatsapp_messages?: boolean | ProfileCountOutputTypeCountWhatsapp_messagesArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountAdmin_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: admin_activity_logsWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountCredit_purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: credit_purchasesWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: subscriptionsWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountTasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasks_logWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountWhatsapp_messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: whatsapp_messagesWhereInput
  }


  /**
   * Count Type ProjectsCountOutputType
   */

  export type ProjectsCountOutputType = {
    tasks_log: number
  }

  export type ProjectsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks_log?: boolean | ProjectsCountOutputTypeCountTasks_logArgs
  }

  // Custom InputTypes
  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectsCountOutputType
     */
    select?: ProjectsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectsCountOutputType without action
   */
  export type ProjectsCountOutputTypeCountTasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tasks_logWhereInput
  }


  /**
   * Models
   */

  /**
   * Model profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    credits_balance: number | null
  }

  export type ProfileSumAggregateOutputType = {
    credits_balance: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    ip_address: string | null
    subscription_plan: string | null
    credits_balance: number | null
    created_at: Date | null
    stripeSubscriptionId: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    ip_address: string | null
    subscription_plan: string | null
    credits_balance: number | null
    created_at: Date | null
    stripeSubscriptionId: string | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    ip_address: number
    subscription_plan: number
    credits_balance: number
    created_at: number
    stripeSubscriptionId: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    credits_balance?: true
  }

  export type ProfileSumAggregateInputType = {
    credits_balance?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    ip_address?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
    stripeSubscriptionId?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    ip_address?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
    stripeSubscriptionId?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    ip_address?: true
    subscription_plan?: true
    credits_balance?: true
    created_at?: true
    stripeSubscriptionId?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profile to aggregate.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type profileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: profileWhereInput
    orderBy?: profileOrderByWithAggregationInput | profileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: profileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    email: string
    name: string
    role: $Enums.UserRole
    ip_address: string
    subscription_plan: string | null
    credits_balance: number
    created_at: Date
    stripeSubscriptionId: string | null
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends profileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type profileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    ip_address?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
    stripeSubscriptionId?: boolean
    admin_activities?: boolean | profile$admin_activitiesArgs<ExtArgs>
    credit_purchases?: boolean | profile$credit_purchasesArgs<ExtArgs>
    projects?: boolean | profile$projectsArgs<ExtArgs>
    subscriptions?: boolean | profile$subscriptionsArgs<ExtArgs>
    tasks_log?: boolean | profile$tasks_logArgs<ExtArgs>
    whatsapp_messages?: boolean | profile$whatsapp_messagesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type profileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    ip_address?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
    stripeSubscriptionId?: boolean
  }, ExtArgs["result"]["profile"]>

  export type profileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    ip_address?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
    stripeSubscriptionId?: boolean
  }, ExtArgs["result"]["profile"]>

  export type profileSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    ip_address?: boolean
    subscription_plan?: boolean
    credits_balance?: boolean
    created_at?: boolean
    stripeSubscriptionId?: boolean
  }

  export type profileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "role" | "ip_address" | "subscription_plan" | "credits_balance" | "created_at" | "stripeSubscriptionId", ExtArgs["result"]["profile"]>
  export type profileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_activities?: boolean | profile$admin_activitiesArgs<ExtArgs>
    credit_purchases?: boolean | profile$credit_purchasesArgs<ExtArgs>
    projects?: boolean | profile$projectsArgs<ExtArgs>
    subscriptions?: boolean | profile$subscriptionsArgs<ExtArgs>
    tasks_log?: boolean | profile$tasks_logArgs<ExtArgs>
    whatsapp_messages?: boolean | profile$whatsapp_messagesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type profileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type profileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $profilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "profile"
    objects: {
      admin_activities: Prisma.$admin_activity_logsPayload<ExtArgs>[]
      credit_purchases: Prisma.$credit_purchasesPayload<ExtArgs>[]
      projects: Prisma.$projectsPayload<ExtArgs>[]
      subscriptions: Prisma.$subscriptionsPayload<ExtArgs>[]
      tasks_log: Prisma.$tasks_logPayload<ExtArgs>[]
      whatsapp_messages: Prisma.$whatsapp_messagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.UserRole
      ip_address: string
      subscription_plan: string | null
      credits_balance: number
      created_at: Date
      stripeSubscriptionId: string | null
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type profileGetPayload<S extends boolean | null | undefined | profileDefaultArgs> = $Result.GetResult<Prisma.$profilePayload, S>

  type profileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<profileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface profileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['profile'], meta: { name: 'profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {profileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends profileFindUniqueArgs>(args: SelectSubset<T, profileFindUniqueArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {profileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends profileFindUniqueOrThrowArgs>(args: SelectSubset<T, profileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends profileFindFirstArgs>(args?: SelectSubset<T, profileFindFirstArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends profileFindFirstOrThrowArgs>(args?: SelectSubset<T, profileFindFirstOrThrowArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends profileFindManyArgs>(args?: SelectSubset<T, profileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {profileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends profileCreateArgs>(args: SelectSubset<T, profileCreateArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {profileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends profileCreateManyArgs>(args?: SelectSubset<T, profileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {profileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends profileCreateManyAndReturnArgs>(args?: SelectSubset<T, profileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {profileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends profileDeleteArgs>(args: SelectSubset<T, profileDeleteArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {profileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends profileUpdateArgs>(args: SelectSubset<T, profileUpdateArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {profileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends profileDeleteManyArgs>(args?: SelectSubset<T, profileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends profileUpdateManyArgs>(args: SelectSubset<T, profileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {profileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
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
    updateManyAndReturn<T extends profileUpdateManyAndReturnArgs>(args: SelectSubset<T, profileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {profileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends profileUpsertArgs>(args: SelectSubset<T, profileUpsertArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends profileCountArgs>(
      args?: Subset<T, profileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {profileGroupByArgs} args - Group by arguments.
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
      T extends profileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: profileGroupByArgs['orderBy'] }
        : { orderBy?: profileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, profileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the profile model
   */
  readonly fields: profileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__profileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin_activities<T extends profile$admin_activitiesArgs<ExtArgs> = {}>(args?: Subset<T, profile$admin_activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$admin_activity_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credit_purchases<T extends profile$credit_purchasesArgs<ExtArgs> = {}>(args?: Subset<T, profile$credit_purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$credit_purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends profile$projectsArgs<ExtArgs> = {}>(args?: Subset<T, profile$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscriptions<T extends profile$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, profile$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$subscriptionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks_log<T extends profile$tasks_logArgs<ExtArgs> = {}>(args?: Subset<T, profile$tasks_logArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    whatsapp_messages<T extends profile$whatsapp_messagesArgs<ExtArgs> = {}>(args?: Subset<T, profile$whatsapp_messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$whatsapp_messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the profile model
   */
  interface profileFieldRefs {
    readonly id: FieldRef<"profile", 'String'>
    readonly email: FieldRef<"profile", 'String'>
    readonly name: FieldRef<"profile", 'String'>
    readonly role: FieldRef<"profile", 'UserRole'>
    readonly ip_address: FieldRef<"profile", 'String'>
    readonly subscription_plan: FieldRef<"profile", 'String'>
    readonly credits_balance: FieldRef<"profile", 'Int'>
    readonly created_at: FieldRef<"profile", 'DateTime'>
    readonly stripeSubscriptionId: FieldRef<"profile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * profile findUnique
   */
  export type profileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile findUniqueOrThrow
   */
  export type profileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile findFirst
   */
  export type profileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile findFirstOrThrow
   */
  export type profileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profile to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile findMany
   */
  export type profileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter, which profiles to fetch.
     */
    where?: profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of profiles to fetch.
     */
    orderBy?: profileOrderByWithRelationInput | profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing profiles.
     */
    cursor?: profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * profile create
   */
  export type profileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The data needed to create a profile.
     */
    data: XOR<profileCreateInput, profileUncheckedCreateInput>
  }

  /**
   * profile createMany
   */
  export type profileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many profiles.
     */
    data: profileCreateManyInput | profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * profile createManyAndReturn
   */
  export type profileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * The data used to create many profiles.
     */
    data: profileCreateManyInput | profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * profile update
   */
  export type profileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The data needed to update a profile.
     */
    data: XOR<profileUpdateInput, profileUncheckedUpdateInput>
    /**
     * Choose, which profile to update.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile updateMany
   */
  export type profileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update profiles.
     */
    data: XOR<profileUpdateManyMutationInput, profileUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
  }

  /**
   * profile updateManyAndReturn
   */
  export type profileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * The data used to update profiles.
     */
    data: XOR<profileUpdateManyMutationInput, profileUncheckedUpdateManyInput>
    /**
     * Filter which profiles to update
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to update.
     */
    limit?: number
  }

  /**
   * profile upsert
   */
  export type profileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * The filter to search for the profile to update in case it exists.
     */
    where: profileWhereUniqueInput
    /**
     * In case the profile found by the `where` argument doesn't exist, create a new profile with this data.
     */
    create: XOR<profileCreateInput, profileUncheckedCreateInput>
    /**
     * In case the profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<profileUpdateInput, profileUncheckedUpdateInput>
  }

  /**
   * profile delete
   */
  export type profileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
    /**
     * Filter which profile to delete.
     */
    where: profileWhereUniqueInput
  }

  /**
   * profile deleteMany
   */
  export type profileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which profiles to delete
     */
    where?: profileWhereInput
    /**
     * Limit how many profiles to delete.
     */
    limit?: number
  }

  /**
   * profile.admin_activities
   */
  export type profile$admin_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * profile.credit_purchases
   */
  export type profile$credit_purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * profile.projects
   */
  export type profile$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    cursor?: projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * profile.subscriptions
   */
  export type profile$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * profile.tasks_log
   */
  export type profile$tasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * profile.whatsapp_messages
   */
  export type profile$whatsapp_messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * profile without action
   */
  export type profileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the profile
     */
    select?: profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the profile
     */
    omit?: profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: profileInclude<ExtArgs> | null
  }


  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: string | null
    profile_id: string | null
    createId: string | null
    name: string | null
    description: string | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    createId: string | null
    name: string | null
    description: string | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    profile_id: number
    createId: number
    name: number
    description: number
    _all: number
  }


  export type ProjectsMinAggregateInputType = {
    id?: true
    profile_id?: true
    createId?: true
    name?: true
    description?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    profile_id?: true
    createId?: true
    name?: true
    description?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    profile_id?: true
    createId?: true
    name?: true
    description?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    id: string
    profile_id: string
    createId: string
    name: string
    description: string
    _count: ProjectsCountAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    createId?: boolean
    name?: boolean
    description?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
    tasks_log?: boolean | projects$tasks_logArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    createId?: boolean
    name?: boolean
    description?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    createId?: boolean
    name?: boolean
    description?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>

  export type projectsSelectScalar = {
    id?: boolean
    profile_id?: boolean
    createId?: boolean
    name?: boolean
    description?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "createId" | "name" | "description", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
    tasks_log?: boolean | projects$tasks_logArgs<ExtArgs>
    _count?: boolean | ProjectsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type projectsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type projectsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }

  export type $projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs>
      tasks_log: Prisma.$tasks_logPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
      createId: string
      name: string
      description: string
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {projectsCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends projectsCreateManyAndReturnArgs>(args?: SelectSubset<T, projectsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {projectsUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectsWithIdOnly = await prisma.projects.updateManyAndReturn({
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
    updateManyAndReturn<T extends projectsUpdateManyAndReturnArgs>(args: SelectSubset<T, projectsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
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
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks_log<T extends projects$tasks_logArgs<ExtArgs> = {}>(args?: Subset<T, projects$tasks_logArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tasks_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly id: FieldRef<"projects", 'String'>
    readonly profile_id: FieldRef<"projects", 'String'>
    readonly createId: FieldRef<"projects", 'String'>
    readonly name: FieldRef<"projects", 'String'>
    readonly description: FieldRef<"projects", 'String'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects createManyAndReturn
   */
  export type projectsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects updateManyAndReturn
   */
  export type projectsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects.tasks_log
   */
  export type projects$tasks_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
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
    profile_id: string | null
    plan_type: $Enums.PlanType | null
    status: string | null
    start_date: Date | null
    end_date: Date | null
    method: string | null
    amount: number | null
  }

  export type SubscriptionsMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    plan_type: $Enums.PlanType | null
    status: string | null
    start_date: Date | null
    end_date: Date | null
    method: string | null
    amount: number | null
  }

  export type SubscriptionsCountAggregateOutputType = {
    id: number
    profile_id: number
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
    profile_id?: true
    plan_type?: true
    status?: true
    start_date?: true
    end_date?: true
    method?: true
    amount?: true
  }

  export type SubscriptionsMaxAggregateInputType = {
    id?: true
    profile_id?: true
    plan_type?: true
    status?: true
    start_date?: true
    end_date?: true
    method?: true
    amount?: true
  }

  export type SubscriptionsCountAggregateInputType = {
    id?: true
    profile_id?: true
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
    profile_id: string
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
    profile_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscriptions"]>

  export type subscriptionsSelectScalar = {
    id?: boolean
    profile_id?: boolean
    plan_type?: boolean
    status?: boolean
    start_date?: boolean
    end_date?: boolean
    method?: boolean
    amount?: boolean
  }

  export type subscriptionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "plan_type" | "status" | "start_date" | "end_date" | "method" | "amount", ExtArgs["result"]["subscriptions"]>
  export type subscriptionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type subscriptionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type subscriptionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }

  export type $subscriptionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "subscriptions"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
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
    profile<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly profile_id: FieldRef<"subscriptions", 'String'>
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
    profile_id: string | null
    pack_type: $Enums.PackType | null
    credits: number | null
    price: number | null
    purchased_at: Date | null
  }

  export type Credit_purchasesMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    pack_type: $Enums.PackType | null
    credits: number | null
    price: number | null
    purchased_at: Date | null
  }

  export type Credit_purchasesCountAggregateOutputType = {
    id: number
    profile_id: number
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
    profile_id?: true
    pack_type?: true
    credits?: true
    price?: true
    purchased_at?: true
  }

  export type Credit_purchasesMaxAggregateInputType = {
    id?: true
    profile_id?: true
    pack_type?: true
    credits?: true
    price?: true
    purchased_at?: true
  }

  export type Credit_purchasesCountAggregateInputType = {
    id?: true
    profile_id?: true
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
    profile_id: string
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
    profile_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credit_purchases"]>

  export type credit_purchasesSelectScalar = {
    id?: boolean
    profile_id?: boolean
    pack_type?: boolean
    credits?: boolean
    price?: boolean
    purchased_at?: boolean
  }

  export type credit_purchasesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "pack_type" | "credits" | "price" | "purchased_at", ExtArgs["result"]["credit_purchases"]>
  export type credit_purchasesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type credit_purchasesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type credit_purchasesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }

  export type $credit_purchasesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "credit_purchases"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
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
    profile<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly profile_id: FieldRef<"credit_purchases", 'String'>
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
    profile_id: string | null
    agent_type: string | null
    credits_spent: number | null
    timestamp: Date | null
    agent_results: string | null
    project_id: string | null
  }

  export type Tasks_logMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    agent_type: string | null
    credits_spent: number | null
    timestamp: Date | null
    agent_results: string | null
    project_id: string | null
  }

  export type Tasks_logCountAggregateOutputType = {
    id: number
    profile_id: number
    agent_type: number
    credits_spent: number
    timestamp: number
    agent_results: number
    project_id: number
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
    profile_id?: true
    agent_type?: true
    credits_spent?: true
    timestamp?: true
    agent_results?: true
    project_id?: true
  }

  export type Tasks_logMaxAggregateInputType = {
    id?: true
    profile_id?: true
    agent_type?: true
    credits_spent?: true
    timestamp?: true
    agent_results?: true
    project_id?: true
  }

  export type Tasks_logCountAggregateInputType = {
    id?: true
    profile_id?: true
    agent_type?: true
    credits_spent?: true
    timestamp?: true
    agent_results?: true
    project_id?: true
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
    profile_id: string
    agent_type: string
    credits_spent: number
    timestamp: Date
    agent_results: string
    project_id: string
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
    profile_id?: boolean
    agent_type?: boolean
    credits_spent?: boolean
    timestamp?: boolean
    agent_results?: boolean
    project_id?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    agent_type?: boolean
    credits_spent?: boolean
    timestamp?: boolean
    agent_results?: boolean
    project_id?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    agent_type?: boolean
    credits_spent?: boolean
    timestamp?: boolean
    agent_results?: boolean
    project_id?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tasks_log"]>

  export type tasks_logSelectScalar = {
    id?: boolean
    profile_id?: boolean
    agent_type?: boolean
    credits_spent?: boolean
    timestamp?: boolean
    agent_results?: boolean
    project_id?: boolean
  }

  export type tasks_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "agent_type" | "credits_spent" | "timestamp" | "agent_results" | "project_id", ExtArgs["result"]["tasks_log"]>
  export type tasks_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }
  export type tasks_logIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }
  export type tasks_logIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
    project?: boolean | projectsDefaultArgs<ExtArgs>
  }

  export type $tasks_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tasks_log"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs>
      project: Prisma.$projectsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
      agent_type: string
      credits_spent: number
      timestamp: Date
      agent_results: string
      project_id: string
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
    profile<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends projectsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, projectsDefaultArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly profile_id: FieldRef<"tasks_log", 'String'>
    readonly agent_type: FieldRef<"tasks_log", 'String'>
    readonly credits_spent: FieldRef<"tasks_log", 'Int'>
    readonly timestamp: FieldRef<"tasks_log", 'DateTime'>
    readonly agent_results: FieldRef<"tasks_log", 'String'>
    readonly project_id: FieldRef<"tasks_log", 'String'>
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
   * Model whatsapp_messages
   */

  export type AggregateWhatsapp_messages = {
    _count: Whatsapp_messagesCountAggregateOutputType | null
    _min: Whatsapp_messagesMinAggregateOutputType | null
    _max: Whatsapp_messagesMaxAggregateOutputType | null
  }

  export type Whatsapp_messagesMinAggregateOutputType = {
    id: string | null
    profile_id: string | null
    direction: $Enums.MessageDirection | null
    message_text: string | null
    timestamp: Date | null
  }

  export type Whatsapp_messagesMaxAggregateOutputType = {
    id: string | null
    profile_id: string | null
    direction: $Enums.MessageDirection | null
    message_text: string | null
    timestamp: Date | null
  }

  export type Whatsapp_messagesCountAggregateOutputType = {
    id: number
    profile_id: number
    direction: number
    message_text: number
    timestamp: number
    _all: number
  }


  export type Whatsapp_messagesMinAggregateInputType = {
    id?: true
    profile_id?: true
    direction?: true
    message_text?: true
    timestamp?: true
  }

  export type Whatsapp_messagesMaxAggregateInputType = {
    id?: true
    profile_id?: true
    direction?: true
    message_text?: true
    timestamp?: true
  }

  export type Whatsapp_messagesCountAggregateInputType = {
    id?: true
    profile_id?: true
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
    profile_id: string
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
    profile_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profile_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["whatsapp_messages"]>

  export type whatsapp_messagesSelectScalar = {
    id?: boolean
    profile_id?: boolean
    direction?: boolean
    message_text?: boolean
    timestamp?: boolean
  }

  export type whatsapp_messagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profile_id" | "direction" | "message_text" | "timestamp", ExtArgs["result"]["whatsapp_messages"]>
  export type whatsapp_messagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type whatsapp_messagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type whatsapp_messagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | profileDefaultArgs<ExtArgs>
  }

  export type $whatsapp_messagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "whatsapp_messages"
    objects: {
      profile: Prisma.$profilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profile_id: string
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
    profile<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly profile_id: FieldRef<"whatsapp_messages", 'String'>
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
    admin?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin_activity_logs"]>

  export type admin_activity_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
    admin?: boolean | profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin_activity_logs"]>

  export type admin_activity_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    action_type?: boolean
    target_id?: boolean
    timestamp?: boolean
    admin?: boolean | profileDefaultArgs<ExtArgs>
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
    admin?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type admin_activity_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | profileDefaultArgs<ExtArgs>
  }
  export type admin_activity_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | profileDefaultArgs<ExtArgs>
  }

  export type $admin_activity_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin_activity_logs"
    objects: {
      admin: Prisma.$profilePayload<ExtArgs>
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
    admin<T extends profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, profileDefaultArgs<ExtArgs>>): Prisma__profileClient<$Result.GetResult<Prisma.$profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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


  export const ProfileScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    ip_address: 'ip_address',
    subscription_plan: 'subscription_plan',
    credits_balance: 'credits_balance',
    created_at: 'created_at',
    stripeSubscriptionId: 'stripeSubscriptionId'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
    createId: 'createId',
    name: 'name',
    description: 'description'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const SubscriptionsScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
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
    profile_id: 'profile_id',
    pack_type: 'pack_type',
    credits: 'credits',
    price: 'price',
    purchased_at: 'purchased_at'
  };

  export type Credit_purchasesScalarFieldEnum = (typeof Credit_purchasesScalarFieldEnum)[keyof typeof Credit_purchasesScalarFieldEnum]


  export const Tasks_logScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
    agent_type: 'agent_type',
    credits_spent: 'credits_spent',
    timestamp: 'timestamp',
    agent_results: 'agent_results',
    project_id: 'project_id'
  };

  export type Tasks_logScalarFieldEnum = (typeof Tasks_logScalarFieldEnum)[keyof typeof Tasks_logScalarFieldEnum]


  export const Whatsapp_messagesScalarFieldEnum: {
    id: 'id',
    profile_id: 'profile_id',
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


  export type profileWhereInput = {
    AND?: profileWhereInput | profileWhereInput[]
    OR?: profileWhereInput[]
    NOT?: profileWhereInput | profileWhereInput[]
    id?: UuidFilter<"profile"> | string
    email?: StringFilter<"profile"> | string
    name?: StringFilter<"profile"> | string
    role?: EnumUserRoleFilter<"profile"> | $Enums.UserRole
    ip_address?: StringFilter<"profile"> | string
    subscription_plan?: StringNullableFilter<"profile"> | string | null
    credits_balance?: IntFilter<"profile"> | number
    created_at?: DateTimeFilter<"profile"> | Date | string
    stripeSubscriptionId?: StringNullableFilter<"profile"> | string | null
    admin_activities?: Admin_activity_logsListRelationFilter
    credit_purchases?: Credit_purchasesListRelationFilter
    projects?: ProjectsListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
    tasks_log?: Tasks_logListRelationFilter
    whatsapp_messages?: Whatsapp_messagesListRelationFilter
  }

  export type profileOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    ip_address?: SortOrder
    subscription_plan?: SortOrderInput | SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    admin_activities?: admin_activity_logsOrderByRelationAggregateInput
    credit_purchases?: credit_purchasesOrderByRelationAggregateInput
    projects?: projectsOrderByRelationAggregateInput
    subscriptions?: subscriptionsOrderByRelationAggregateInput
    tasks_log?: tasks_logOrderByRelationAggregateInput
    whatsapp_messages?: whatsapp_messagesOrderByRelationAggregateInput
  }

  export type profileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: profileWhereInput | profileWhereInput[]
    OR?: profileWhereInput[]
    NOT?: profileWhereInput | profileWhereInput[]
    name?: StringFilter<"profile"> | string
    role?: EnumUserRoleFilter<"profile"> | $Enums.UserRole
    ip_address?: StringFilter<"profile"> | string
    subscription_plan?: StringNullableFilter<"profile"> | string | null
    credits_balance?: IntFilter<"profile"> | number
    created_at?: DateTimeFilter<"profile"> | Date | string
    stripeSubscriptionId?: StringNullableFilter<"profile"> | string | null
    admin_activities?: Admin_activity_logsListRelationFilter
    credit_purchases?: Credit_purchasesListRelationFilter
    projects?: ProjectsListRelationFilter
    subscriptions?: SubscriptionsListRelationFilter
    tasks_log?: Tasks_logListRelationFilter
    whatsapp_messages?: Whatsapp_messagesListRelationFilter
  }, "id" | "email">

  export type profileOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    ip_address?: SortOrder
    subscription_plan?: SortOrderInput | SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    _count?: profileCountOrderByAggregateInput
    _avg?: profileAvgOrderByAggregateInput
    _max?: profileMaxOrderByAggregateInput
    _min?: profileMinOrderByAggregateInput
    _sum?: profileSumOrderByAggregateInput
  }

  export type profileScalarWhereWithAggregatesInput = {
    AND?: profileScalarWhereWithAggregatesInput | profileScalarWhereWithAggregatesInput[]
    OR?: profileScalarWhereWithAggregatesInput[]
    NOT?: profileScalarWhereWithAggregatesInput | profileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"profile"> | string
    email?: StringWithAggregatesFilter<"profile"> | string
    name?: StringWithAggregatesFilter<"profile"> | string
    role?: EnumUserRoleWithAggregatesFilter<"profile"> | $Enums.UserRole
    ip_address?: StringWithAggregatesFilter<"profile"> | string
    subscription_plan?: StringNullableWithAggregatesFilter<"profile"> | string | null
    credits_balance?: IntWithAggregatesFilter<"profile"> | number
    created_at?: DateTimeWithAggregatesFilter<"profile"> | Date | string
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"profile"> | string | null
  }

  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    id?: UuidFilter<"projects"> | string
    profile_id?: UuidFilter<"projects"> | string
    createId?: StringFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
    tasks_log?: Tasks_logListRelationFilter
  }

  export type projectsOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    createId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    profile?: profileOrderByWithRelationInput
    tasks_log?: tasks_logOrderByRelationAggregateInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    createId?: string
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    profile_id?: UuidFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
    tasks_log?: Tasks_logListRelationFilter
  }, "id" | "createId">

  export type projectsOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    createId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: projectsCountOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"projects"> | string
    profile_id?: UuidWithAggregatesFilter<"projects"> | string
    createId?: StringWithAggregatesFilter<"projects"> | string
    name?: StringWithAggregatesFilter<"projects"> | string
    description?: StringWithAggregatesFilter<"projects"> | string
  }

  export type subscriptionsWhereInput = {
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    id?: UuidFilter<"subscriptions"> | string
    profile_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }

  export type subscriptionsOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
    profile?: profileOrderByWithRelationInput
  }

  export type subscriptionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: subscriptionsWhereInput | subscriptionsWhereInput[]
    OR?: subscriptionsWhereInput[]
    NOT?: subscriptionsWhereInput | subscriptionsWhereInput[]
    profile_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }, "id">

  export type subscriptionsOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
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
    profile_id?: UuidWithAggregatesFilter<"subscriptions"> | string
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
    profile_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }

  export type credit_purchasesOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
    profile?: profileOrderByWithRelationInput
  }

  export type credit_purchasesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    OR?: credit_purchasesWhereInput[]
    NOT?: credit_purchasesWhereInput | credit_purchasesWhereInput[]
    profile_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }, "id">

  export type credit_purchasesOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
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
    profile_id?: UuidWithAggregatesFilter<"credit_purchases"> | string
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
    profile_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
    agent_results?: StringFilter<"tasks_log"> | string
    project_id?: StringFilter<"tasks_log"> | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
    project?: XOR<ProjectsScalarRelationFilter, projectsWhereInput>
  }

  export type tasks_logOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    agent_type?: SortOrder
    credits_spent?: SortOrder
    timestamp?: SortOrder
    agent_results?: SortOrder
    project_id?: SortOrder
    profile?: profileOrderByWithRelationInput
    project?: projectsOrderByWithRelationInput
  }

  export type tasks_logWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: tasks_logWhereInput | tasks_logWhereInput[]
    OR?: tasks_logWhereInput[]
    NOT?: tasks_logWhereInput | tasks_logWhereInput[]
    profile_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
    agent_results?: StringFilter<"tasks_log"> | string
    project_id?: StringFilter<"tasks_log"> | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
    project?: XOR<ProjectsScalarRelationFilter, projectsWhereInput>
  }, "id">

  export type tasks_logOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    agent_type?: SortOrder
    credits_spent?: SortOrder
    timestamp?: SortOrder
    agent_results?: SortOrder
    project_id?: SortOrder
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
    profile_id?: UuidWithAggregatesFilter<"tasks_log"> | string
    agent_type?: StringWithAggregatesFilter<"tasks_log"> | string
    credits_spent?: IntWithAggregatesFilter<"tasks_log"> | number
    timestamp?: DateTimeWithAggregatesFilter<"tasks_log"> | Date | string
    agent_results?: StringWithAggregatesFilter<"tasks_log"> | string
    project_id?: StringWithAggregatesFilter<"tasks_log"> | string
  }

  export type whatsapp_messagesWhereInput = {
    AND?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    OR?: whatsapp_messagesWhereInput[]
    NOT?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    id?: UuidFilter<"whatsapp_messages"> | string
    profile_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }

  export type whatsapp_messagesOrderByWithRelationInput = {
    id?: SortOrder
    profile_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
    profile?: profileOrderByWithRelationInput
  }

  export type whatsapp_messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    OR?: whatsapp_messagesWhereInput[]
    NOT?: whatsapp_messagesWhereInput | whatsapp_messagesWhereInput[]
    profile_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }, "id">

  export type whatsapp_messagesOrderByWithAggregationInput = {
    id?: SortOrder
    profile_id?: SortOrder
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
    profile_id?: UuidWithAggregatesFilter<"whatsapp_messages"> | string
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
    admin?: XOR<ProfileScalarRelationFilter, profileWhereInput>
  }

  export type admin_activity_logsOrderByWithRelationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    action_type?: SortOrder
    target_id?: SortOrder
    timestamp?: SortOrder
    admin?: profileOrderByWithRelationInput
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
    admin?: XOR<ProfileScalarRelationFilter, profileWhereInput>
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

  export type profileCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type profileCreateManyInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
  }

  export type profileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type profileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type projectsCreateInput = {
    id?: string
    createId: string
    name: string
    description: string
    profile: profileCreateNestedOneWithoutProjectsInput
    tasks_log?: tasks_logCreateNestedManyWithoutProjectInput
  }

  export type projectsUncheckedCreateInput = {
    id?: string
    profile_id: string
    createId: string
    name: string
    description: string
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProjectInput
  }

  export type projectsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneRequiredWithoutProjectsNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProjectNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type projectsCreateManyInput = {
    id?: string
    profile_id: string
    createId: string
    name: string
    description: string
  }

  export type projectsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type projectsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type subscriptionsCreateInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
    profile: profileCreateNestedOneWithoutSubscriptionsInput
  }

  export type subscriptionsUncheckedCreateInput = {
    id?: string
    profile_id: string
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
    profile?: profileUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type subscriptionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsCreateManyInput = {
    id?: string
    profile_id: string
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
    profile_id?: StringFieldUpdateOperationsInput | string
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
    profile: profileCreateNestedOneWithoutCredit_purchasesInput
  }

  export type credit_purchasesUncheckedCreateInput = {
    id?: string
    profile_id: string
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
    profile?: profileUpdateOneRequiredWithoutCredit_purchasesNestedInput
  }

  export type credit_purchasesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesCreateManyInput = {
    id?: string
    profile_id: string
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
    profile_id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tasks_logCreateInput = {
    id?: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    profile: profileCreateNestedOneWithoutTasks_logInput
    project: projectsCreateNestedOneWithoutTasks_logInput
  }

  export type tasks_logUncheckedCreateInput = {
    id?: string
    profile_id: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    project_id: string
  }

  export type tasks_logUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneRequiredWithoutTasks_logNestedInput
    project?: projectsUpdateOneRequiredWithoutTasks_logNestedInput
  }

  export type tasks_logUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
  }

  export type tasks_logCreateManyInput = {
    id?: string
    profile_id: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    project_id: string
  }

  export type tasks_logUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
  }

  export type tasks_logUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
  }

  export type whatsapp_messagesCreateInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
    profile: profileCreateNestedOneWithoutWhatsapp_messagesInput
  }

  export type whatsapp_messagesUncheckedCreateInput = {
    id?: string
    profile_id: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: profileUpdateOneRequiredWithoutWhatsapp_messagesNestedInput
  }

  export type whatsapp_messagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesCreateManyInput = {
    id?: string
    profile_id: string
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
    profile_id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type admin_activity_logsCreateInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
    admin: profileCreateNestedOneWithoutAdmin_activitiesInput
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
    admin?: profileUpdateOneRequiredWithoutAdmin_activitiesNestedInput
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

  export type ProjectsListRelationFilter = {
    every?: projectsWhereInput
    some?: projectsWhereInput
    none?: projectsWhereInput
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

  export type projectsOrderByRelationAggregateInput = {
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

  export type profileCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    ip_address?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    stripeSubscriptionId?: SortOrder
  }

  export type profileAvgOrderByAggregateInput = {
    credits_balance?: SortOrder
  }

  export type profileMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    ip_address?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    stripeSubscriptionId?: SortOrder
  }

  export type profileMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    ip_address?: SortOrder
    subscription_plan?: SortOrder
    credits_balance?: SortOrder
    created_at?: SortOrder
    stripeSubscriptionId?: SortOrder
  }

  export type profileSumOrderByAggregateInput = {
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

  export type ProfileScalarRelationFilter = {
    is?: profileWhereInput
    isNot?: profileWhereInput
  }

  export type projectsCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    createId?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    createId?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    createId?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type subscriptionsCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
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
    profile_id?: SortOrder
    plan_type?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    method?: SortOrder
    amount?: SortOrder
  }

  export type subscriptionsMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
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
    profile_id?: SortOrder
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
    profile_id?: SortOrder
    pack_type?: SortOrder
    credits?: SortOrder
    price?: SortOrder
    purchased_at?: SortOrder
  }

  export type credit_purchasesMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
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

  export type ProjectsScalarRelationFilter = {
    is?: projectsWhereInput
    isNot?: projectsWhereInput
  }

  export type tasks_logCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    agent_type?: SortOrder
    credits_spent?: SortOrder
    timestamp?: SortOrder
    agent_results?: SortOrder
    project_id?: SortOrder
  }

  export type tasks_logAvgOrderByAggregateInput = {
    credits_spent?: SortOrder
  }

  export type tasks_logMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    agent_type?: SortOrder
    credits_spent?: SortOrder
    timestamp?: SortOrder
    agent_results?: SortOrder
    project_id?: SortOrder
  }

  export type tasks_logMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    agent_type?: SortOrder
    credits_spent?: SortOrder
    timestamp?: SortOrder
    agent_results?: SortOrder
    project_id?: SortOrder
  }

  export type tasks_logSumOrderByAggregateInput = {
    credits_spent?: SortOrder
  }

  export type EnumMessageDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageDirection | EnumMessageDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageDirection[] | ListEnumMessageDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageDirectionFilter<$PrismaModel> | $Enums.MessageDirection
  }

  export type whatsapp_messagesCountOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
  }

  export type whatsapp_messagesMaxOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
    direction?: SortOrder
    message_text?: SortOrder
    timestamp?: SortOrder
  }

  export type whatsapp_messagesMinOrderByAggregateInput = {
    id?: SortOrder
    profile_id?: SortOrder
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

  export type credit_purchasesCreateNestedManyWithoutProfileInput = {
    create?: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput> | credit_purchasesCreateWithoutProfileInput[] | credit_purchasesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutProfileInput | credit_purchasesCreateOrConnectWithoutProfileInput[]
    createMany?: credit_purchasesCreateManyProfileInputEnvelope
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
  }

  export type projectsCreateNestedManyWithoutProfileInput = {
    create?: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput> | projectsCreateWithoutProfileInput[] | projectsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutProfileInput | projectsCreateOrConnectWithoutProfileInput[]
    createMany?: projectsCreateManyProfileInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type subscriptionsCreateNestedManyWithoutProfileInput = {
    create?: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput> | subscriptionsCreateWithoutProfileInput[] | subscriptionsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutProfileInput | subscriptionsCreateOrConnectWithoutProfileInput[]
    createMany?: subscriptionsCreateManyProfileInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type tasks_logCreateNestedManyWithoutProfileInput = {
    create?: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput> | tasks_logCreateWithoutProfileInput[] | tasks_logUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProfileInput | tasks_logCreateOrConnectWithoutProfileInput[]
    createMany?: tasks_logCreateManyProfileInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type whatsapp_messagesCreateNestedManyWithoutProfileInput = {
    create?: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput> | whatsapp_messagesCreateWithoutProfileInput[] | whatsapp_messagesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutProfileInput | whatsapp_messagesCreateOrConnectWithoutProfileInput[]
    createMany?: whatsapp_messagesCreateManyProfileInputEnvelope
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
  }

  export type admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<admin_activity_logsCreateWithoutAdminInput, admin_activity_logsUncheckedCreateWithoutAdminInput> | admin_activity_logsCreateWithoutAdminInput[] | admin_activity_logsUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: admin_activity_logsCreateOrConnectWithoutAdminInput | admin_activity_logsCreateOrConnectWithoutAdminInput[]
    createMany?: admin_activity_logsCreateManyAdminInputEnvelope
    connect?: admin_activity_logsWhereUniqueInput | admin_activity_logsWhereUniqueInput[]
  }

  export type credit_purchasesUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput> | credit_purchasesCreateWithoutProfileInput[] | credit_purchasesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutProfileInput | credit_purchasesCreateOrConnectWithoutProfileInput[]
    createMany?: credit_purchasesCreateManyProfileInputEnvelope
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
  }

  export type projectsUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput> | projectsCreateWithoutProfileInput[] | projectsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutProfileInput | projectsCreateOrConnectWithoutProfileInput[]
    createMany?: projectsCreateManyProfileInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type subscriptionsUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput> | subscriptionsCreateWithoutProfileInput[] | subscriptionsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutProfileInput | subscriptionsCreateOrConnectWithoutProfileInput[]
    createMany?: subscriptionsCreateManyProfileInputEnvelope
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
  }

  export type tasks_logUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput> | tasks_logCreateWithoutProfileInput[] | tasks_logUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProfileInput | tasks_logCreateOrConnectWithoutProfileInput[]
    createMany?: tasks_logCreateManyProfileInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput> | whatsapp_messagesCreateWithoutProfileInput[] | whatsapp_messagesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutProfileInput | whatsapp_messagesCreateOrConnectWithoutProfileInput[]
    createMany?: whatsapp_messagesCreateManyProfileInputEnvelope
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

  export type credit_purchasesUpdateManyWithoutProfileNestedInput = {
    create?: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput> | credit_purchasesCreateWithoutProfileInput[] | credit_purchasesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutProfileInput | credit_purchasesCreateOrConnectWithoutProfileInput[]
    upsert?: credit_purchasesUpsertWithWhereUniqueWithoutProfileInput | credit_purchasesUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: credit_purchasesCreateManyProfileInputEnvelope
    set?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    disconnect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    delete?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    update?: credit_purchasesUpdateWithWhereUniqueWithoutProfileInput | credit_purchasesUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: credit_purchasesUpdateManyWithWhereWithoutProfileInput | credit_purchasesUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
  }

  export type projectsUpdateManyWithoutProfileNestedInput = {
    create?: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput> | projectsCreateWithoutProfileInput[] | projectsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutProfileInput | projectsCreateOrConnectWithoutProfileInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutProfileInput | projectsUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: projectsCreateManyProfileInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutProfileInput | projectsUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutProfileInput | projectsUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type subscriptionsUpdateManyWithoutProfileNestedInput = {
    create?: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput> | subscriptionsCreateWithoutProfileInput[] | subscriptionsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutProfileInput | subscriptionsCreateOrConnectWithoutProfileInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutProfileInput | subscriptionsUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: subscriptionsCreateManyProfileInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutProfileInput | subscriptionsUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutProfileInput | subscriptionsUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type tasks_logUpdateManyWithoutProfileNestedInput = {
    create?: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput> | tasks_logCreateWithoutProfileInput[] | tasks_logUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProfileInput | tasks_logCreateOrConnectWithoutProfileInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutProfileInput | tasks_logUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: tasks_logCreateManyProfileInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutProfileInput | tasks_logUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutProfileInput | tasks_logUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type whatsapp_messagesUpdateManyWithoutProfileNestedInput = {
    create?: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput> | whatsapp_messagesCreateWithoutProfileInput[] | whatsapp_messagesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutProfileInput | whatsapp_messagesCreateOrConnectWithoutProfileInput[]
    upsert?: whatsapp_messagesUpsertWithWhereUniqueWithoutProfileInput | whatsapp_messagesUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: whatsapp_messagesCreateManyProfileInputEnvelope
    set?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    disconnect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    delete?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    update?: whatsapp_messagesUpdateWithWhereUniqueWithoutProfileInput | whatsapp_messagesUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: whatsapp_messagesUpdateManyWithWhereWithoutProfileInput | whatsapp_messagesUpdateManyWithWhereWithoutProfileInput[]
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

  export type credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput> | credit_purchasesCreateWithoutProfileInput[] | credit_purchasesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: credit_purchasesCreateOrConnectWithoutProfileInput | credit_purchasesCreateOrConnectWithoutProfileInput[]
    upsert?: credit_purchasesUpsertWithWhereUniqueWithoutProfileInput | credit_purchasesUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: credit_purchasesCreateManyProfileInputEnvelope
    set?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    disconnect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    delete?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    connect?: credit_purchasesWhereUniqueInput | credit_purchasesWhereUniqueInput[]
    update?: credit_purchasesUpdateWithWhereUniqueWithoutProfileInput | credit_purchasesUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: credit_purchasesUpdateManyWithWhereWithoutProfileInput | credit_purchasesUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
  }

  export type projectsUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput> | projectsCreateWithoutProfileInput[] | projectsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutProfileInput | projectsCreateOrConnectWithoutProfileInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutProfileInput | projectsUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: projectsCreateManyProfileInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutProfileInput | projectsUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutProfileInput | projectsUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type subscriptionsUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput> | subscriptionsCreateWithoutProfileInput[] | subscriptionsUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: subscriptionsCreateOrConnectWithoutProfileInput | subscriptionsCreateOrConnectWithoutProfileInput[]
    upsert?: subscriptionsUpsertWithWhereUniqueWithoutProfileInput | subscriptionsUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: subscriptionsCreateManyProfileInputEnvelope
    set?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    disconnect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    delete?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    connect?: subscriptionsWhereUniqueInput | subscriptionsWhereUniqueInput[]
    update?: subscriptionsUpdateWithWhereUniqueWithoutProfileInput | subscriptionsUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: subscriptionsUpdateManyWithWhereWithoutProfileInput | subscriptionsUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
  }

  export type tasks_logUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput> | tasks_logCreateWithoutProfileInput[] | tasks_logUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProfileInput | tasks_logCreateOrConnectWithoutProfileInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutProfileInput | tasks_logUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: tasks_logCreateManyProfileInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutProfileInput | tasks_logUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutProfileInput | tasks_logUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput> | whatsapp_messagesCreateWithoutProfileInput[] | whatsapp_messagesUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: whatsapp_messagesCreateOrConnectWithoutProfileInput | whatsapp_messagesCreateOrConnectWithoutProfileInput[]
    upsert?: whatsapp_messagesUpsertWithWhereUniqueWithoutProfileInput | whatsapp_messagesUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: whatsapp_messagesCreateManyProfileInputEnvelope
    set?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    disconnect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    delete?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    connect?: whatsapp_messagesWhereUniqueInput | whatsapp_messagesWhereUniqueInput[]
    update?: whatsapp_messagesUpdateWithWhereUniqueWithoutProfileInput | whatsapp_messagesUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: whatsapp_messagesUpdateManyWithWhereWithoutProfileInput | whatsapp_messagesUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
  }

  export type profileCreateNestedOneWithoutProjectsInput = {
    create?: XOR<profileCreateWithoutProjectsInput, profileUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: profileCreateOrConnectWithoutProjectsInput
    connect?: profileWhereUniqueInput
  }

  export type tasks_logCreateNestedManyWithoutProjectInput = {
    create?: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput> | tasks_logCreateWithoutProjectInput[] | tasks_logUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProjectInput | tasks_logCreateOrConnectWithoutProjectInput[]
    createMany?: tasks_logCreateManyProjectInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type tasks_logUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput> | tasks_logCreateWithoutProjectInput[] | tasks_logUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProjectInput | tasks_logCreateOrConnectWithoutProjectInput[]
    createMany?: tasks_logCreateManyProjectInputEnvelope
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
  }

  export type profileUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<profileCreateWithoutProjectsInput, profileUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: profileCreateOrConnectWithoutProjectsInput
    upsert?: profileUpsertWithoutProjectsInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutProjectsInput, profileUpdateWithoutProjectsInput>, profileUncheckedUpdateWithoutProjectsInput>
  }

  export type tasks_logUpdateManyWithoutProjectNestedInput = {
    create?: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput> | tasks_logCreateWithoutProjectInput[] | tasks_logUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProjectInput | tasks_logCreateOrConnectWithoutProjectInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutProjectInput | tasks_logUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: tasks_logCreateManyProjectInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutProjectInput | tasks_logUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutProjectInput | tasks_logUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type tasks_logUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput> | tasks_logCreateWithoutProjectInput[] | tasks_logUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: tasks_logCreateOrConnectWithoutProjectInput | tasks_logCreateOrConnectWithoutProjectInput[]
    upsert?: tasks_logUpsertWithWhereUniqueWithoutProjectInput | tasks_logUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: tasks_logCreateManyProjectInputEnvelope
    set?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    disconnect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    delete?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    connect?: tasks_logWhereUniqueInput | tasks_logWhereUniqueInput[]
    update?: tasks_logUpdateWithWhereUniqueWithoutProjectInput | tasks_logUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: tasks_logUpdateManyWithWhereWithoutProjectInput | tasks_logUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
  }

  export type profileCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<profileCreateWithoutSubscriptionsInput, profileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: profileCreateOrConnectWithoutSubscriptionsInput
    connect?: profileWhereUniqueInput
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type profileUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<profileCreateWithoutSubscriptionsInput, profileUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: profileCreateOrConnectWithoutSubscriptionsInput
    upsert?: profileUpsertWithoutSubscriptionsInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutSubscriptionsInput, profileUpdateWithoutSubscriptionsInput>, profileUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type profileCreateNestedOneWithoutCredit_purchasesInput = {
    create?: XOR<profileCreateWithoutCredit_purchasesInput, profileUncheckedCreateWithoutCredit_purchasesInput>
    connectOrCreate?: profileCreateOrConnectWithoutCredit_purchasesInput
    connect?: profileWhereUniqueInput
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

  export type profileUpdateOneRequiredWithoutCredit_purchasesNestedInput = {
    create?: XOR<profileCreateWithoutCredit_purchasesInput, profileUncheckedCreateWithoutCredit_purchasesInput>
    connectOrCreate?: profileCreateOrConnectWithoutCredit_purchasesInput
    upsert?: profileUpsertWithoutCredit_purchasesInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutCredit_purchasesInput, profileUpdateWithoutCredit_purchasesInput>, profileUncheckedUpdateWithoutCredit_purchasesInput>
  }

  export type profileCreateNestedOneWithoutTasks_logInput = {
    create?: XOR<profileCreateWithoutTasks_logInput, profileUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: profileCreateOrConnectWithoutTasks_logInput
    connect?: profileWhereUniqueInput
  }

  export type projectsCreateNestedOneWithoutTasks_logInput = {
    create?: XOR<projectsCreateWithoutTasks_logInput, projectsUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: projectsCreateOrConnectWithoutTasks_logInput
    connect?: projectsWhereUniqueInput
  }

  export type profileUpdateOneRequiredWithoutTasks_logNestedInput = {
    create?: XOR<profileCreateWithoutTasks_logInput, profileUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: profileCreateOrConnectWithoutTasks_logInput
    upsert?: profileUpsertWithoutTasks_logInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutTasks_logInput, profileUpdateWithoutTasks_logInput>, profileUncheckedUpdateWithoutTasks_logInput>
  }

  export type projectsUpdateOneRequiredWithoutTasks_logNestedInput = {
    create?: XOR<projectsCreateWithoutTasks_logInput, projectsUncheckedCreateWithoutTasks_logInput>
    connectOrCreate?: projectsCreateOrConnectWithoutTasks_logInput
    upsert?: projectsUpsertWithoutTasks_logInput
    connect?: projectsWhereUniqueInput
    update?: XOR<XOR<projectsUpdateToOneWithWhereWithoutTasks_logInput, projectsUpdateWithoutTasks_logInput>, projectsUncheckedUpdateWithoutTasks_logInput>
  }

  export type profileCreateNestedOneWithoutWhatsapp_messagesInput = {
    create?: XOR<profileCreateWithoutWhatsapp_messagesInput, profileUncheckedCreateWithoutWhatsapp_messagesInput>
    connectOrCreate?: profileCreateOrConnectWithoutWhatsapp_messagesInput
    connect?: profileWhereUniqueInput
  }

  export type EnumMessageDirectionFieldUpdateOperationsInput = {
    set?: $Enums.MessageDirection
  }

  export type profileUpdateOneRequiredWithoutWhatsapp_messagesNestedInput = {
    create?: XOR<profileCreateWithoutWhatsapp_messagesInput, profileUncheckedCreateWithoutWhatsapp_messagesInput>
    connectOrCreate?: profileCreateOrConnectWithoutWhatsapp_messagesInput
    upsert?: profileUpsertWithoutWhatsapp_messagesInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutWhatsapp_messagesInput, profileUpdateWithoutWhatsapp_messagesInput>, profileUncheckedUpdateWithoutWhatsapp_messagesInput>
  }

  export type profileCreateNestedOneWithoutAdmin_activitiesInput = {
    create?: XOR<profileCreateWithoutAdmin_activitiesInput, profileUncheckedCreateWithoutAdmin_activitiesInput>
    connectOrCreate?: profileCreateOrConnectWithoutAdmin_activitiesInput
    connect?: profileWhereUniqueInput
  }

  export type profileUpdateOneRequiredWithoutAdmin_activitiesNestedInput = {
    create?: XOR<profileCreateWithoutAdmin_activitiesInput, profileUncheckedCreateWithoutAdmin_activitiesInput>
    connectOrCreate?: profileCreateOrConnectWithoutAdmin_activitiesInput
    upsert?: profileUpsertWithoutAdmin_activitiesInput
    connect?: profileWhereUniqueInput
    update?: XOR<XOR<profileUpdateToOneWithWhereWithoutAdmin_activitiesInput, profileUpdateWithoutAdmin_activitiesInput>, profileUncheckedUpdateWithoutAdmin_activitiesInput>
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

  export type credit_purchasesCreateWithoutProfileInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesUncheckedCreateWithoutProfileInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type credit_purchasesCreateOrConnectWithoutProfileInput = {
    where: credit_purchasesWhereUniqueInput
    create: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput>
  }

  export type credit_purchasesCreateManyProfileInputEnvelope = {
    data: credit_purchasesCreateManyProfileInput | credit_purchasesCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type projectsCreateWithoutProfileInput = {
    id?: string
    createId: string
    name: string
    description: string
    tasks_log?: tasks_logCreateNestedManyWithoutProjectInput
  }

  export type projectsUncheckedCreateWithoutProfileInput = {
    id?: string
    createId: string
    name: string
    description: string
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProjectInput
  }

  export type projectsCreateOrConnectWithoutProfileInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput>
  }

  export type projectsCreateManyProfileInputEnvelope = {
    data: projectsCreateManyProfileInput | projectsCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type subscriptionsCreateWithoutProfileInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsUncheckedCreateWithoutProfileInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type subscriptionsCreateOrConnectWithoutProfileInput = {
    where: subscriptionsWhereUniqueInput
    create: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput>
  }

  export type subscriptionsCreateManyProfileInputEnvelope = {
    data: subscriptionsCreateManyProfileInput | subscriptionsCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type tasks_logCreateWithoutProfileInput = {
    id?: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    project: projectsCreateNestedOneWithoutTasks_logInput
  }

  export type tasks_logUncheckedCreateWithoutProfileInput = {
    id?: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    project_id: string
  }

  export type tasks_logCreateOrConnectWithoutProfileInput = {
    where: tasks_logWhereUniqueInput
    create: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput>
  }

  export type tasks_logCreateManyProfileInputEnvelope = {
    data: tasks_logCreateManyProfileInput | tasks_logCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type whatsapp_messagesCreateWithoutProfileInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesUncheckedCreateWithoutProfileInput = {
    id?: string
    direction: $Enums.MessageDirection
    message_text: string
    timestamp?: Date | string
  }

  export type whatsapp_messagesCreateOrConnectWithoutProfileInput = {
    where: whatsapp_messagesWhereUniqueInput
    create: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput>
  }

  export type whatsapp_messagesCreateManyProfileInputEnvelope = {
    data: whatsapp_messagesCreateManyProfileInput | whatsapp_messagesCreateManyProfileInput[]
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

  export type credit_purchasesUpsertWithWhereUniqueWithoutProfileInput = {
    where: credit_purchasesWhereUniqueInput
    update: XOR<credit_purchasesUpdateWithoutProfileInput, credit_purchasesUncheckedUpdateWithoutProfileInput>
    create: XOR<credit_purchasesCreateWithoutProfileInput, credit_purchasesUncheckedCreateWithoutProfileInput>
  }

  export type credit_purchasesUpdateWithWhereUniqueWithoutProfileInput = {
    where: credit_purchasesWhereUniqueInput
    data: XOR<credit_purchasesUpdateWithoutProfileInput, credit_purchasesUncheckedUpdateWithoutProfileInput>
  }

  export type credit_purchasesUpdateManyWithWhereWithoutProfileInput = {
    where: credit_purchasesScalarWhereInput
    data: XOR<credit_purchasesUpdateManyMutationInput, credit_purchasesUncheckedUpdateManyWithoutProfileInput>
  }

  export type credit_purchasesScalarWhereInput = {
    AND?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
    OR?: credit_purchasesScalarWhereInput[]
    NOT?: credit_purchasesScalarWhereInput | credit_purchasesScalarWhereInput[]
    id?: UuidFilter<"credit_purchases"> | string
    profile_id?: UuidFilter<"credit_purchases"> | string
    pack_type?: EnumPackTypeFilter<"credit_purchases"> | $Enums.PackType
    credits?: IntFilter<"credit_purchases"> | number
    price?: FloatFilter<"credit_purchases"> | number
    purchased_at?: DateTimeFilter<"credit_purchases"> | Date | string
  }

  export type projectsUpsertWithWhereUniqueWithoutProfileInput = {
    where: projectsWhereUniqueInput
    update: XOR<projectsUpdateWithoutProfileInput, projectsUncheckedUpdateWithoutProfileInput>
    create: XOR<projectsCreateWithoutProfileInput, projectsUncheckedCreateWithoutProfileInput>
  }

  export type projectsUpdateWithWhereUniqueWithoutProfileInput = {
    where: projectsWhereUniqueInput
    data: XOR<projectsUpdateWithoutProfileInput, projectsUncheckedUpdateWithoutProfileInput>
  }

  export type projectsUpdateManyWithWhereWithoutProfileInput = {
    where: projectsScalarWhereInput
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyWithoutProfileInput>
  }

  export type projectsScalarWhereInput = {
    AND?: projectsScalarWhereInput | projectsScalarWhereInput[]
    OR?: projectsScalarWhereInput[]
    NOT?: projectsScalarWhereInput | projectsScalarWhereInput[]
    id?: UuidFilter<"projects"> | string
    profile_id?: UuidFilter<"projects"> | string
    createId?: StringFilter<"projects"> | string
    name?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
  }

  export type subscriptionsUpsertWithWhereUniqueWithoutProfileInput = {
    where: subscriptionsWhereUniqueInput
    update: XOR<subscriptionsUpdateWithoutProfileInput, subscriptionsUncheckedUpdateWithoutProfileInput>
    create: XOR<subscriptionsCreateWithoutProfileInput, subscriptionsUncheckedCreateWithoutProfileInput>
  }

  export type subscriptionsUpdateWithWhereUniqueWithoutProfileInput = {
    where: subscriptionsWhereUniqueInput
    data: XOR<subscriptionsUpdateWithoutProfileInput, subscriptionsUncheckedUpdateWithoutProfileInput>
  }

  export type subscriptionsUpdateManyWithWhereWithoutProfileInput = {
    where: subscriptionsScalarWhereInput
    data: XOR<subscriptionsUpdateManyMutationInput, subscriptionsUncheckedUpdateManyWithoutProfileInput>
  }

  export type subscriptionsScalarWhereInput = {
    AND?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    OR?: subscriptionsScalarWhereInput[]
    NOT?: subscriptionsScalarWhereInput | subscriptionsScalarWhereInput[]
    id?: UuidFilter<"subscriptions"> | string
    profile_id?: UuidFilter<"subscriptions"> | string
    plan_type?: EnumPlanTypeFilter<"subscriptions"> | $Enums.PlanType
    status?: StringFilter<"subscriptions"> | string
    start_date?: DateTimeFilter<"subscriptions"> | Date | string
    end_date?: DateTimeFilter<"subscriptions"> | Date | string
    method?: StringFilter<"subscriptions"> | string
    amount?: IntFilter<"subscriptions"> | number
  }

  export type tasks_logUpsertWithWhereUniqueWithoutProfileInput = {
    where: tasks_logWhereUniqueInput
    update: XOR<tasks_logUpdateWithoutProfileInput, tasks_logUncheckedUpdateWithoutProfileInput>
    create: XOR<tasks_logCreateWithoutProfileInput, tasks_logUncheckedCreateWithoutProfileInput>
  }

  export type tasks_logUpdateWithWhereUniqueWithoutProfileInput = {
    where: tasks_logWhereUniqueInput
    data: XOR<tasks_logUpdateWithoutProfileInput, tasks_logUncheckedUpdateWithoutProfileInput>
  }

  export type tasks_logUpdateManyWithWhereWithoutProfileInput = {
    where: tasks_logScalarWhereInput
    data: XOR<tasks_logUpdateManyMutationInput, tasks_logUncheckedUpdateManyWithoutProfileInput>
  }

  export type tasks_logScalarWhereInput = {
    AND?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
    OR?: tasks_logScalarWhereInput[]
    NOT?: tasks_logScalarWhereInput | tasks_logScalarWhereInput[]
    id?: UuidFilter<"tasks_log"> | string
    profile_id?: UuidFilter<"tasks_log"> | string
    agent_type?: StringFilter<"tasks_log"> | string
    credits_spent?: IntFilter<"tasks_log"> | number
    timestamp?: DateTimeFilter<"tasks_log"> | Date | string
    agent_results?: StringFilter<"tasks_log"> | string
    project_id?: StringFilter<"tasks_log"> | string
  }

  export type whatsapp_messagesUpsertWithWhereUniqueWithoutProfileInput = {
    where: whatsapp_messagesWhereUniqueInput
    update: XOR<whatsapp_messagesUpdateWithoutProfileInput, whatsapp_messagesUncheckedUpdateWithoutProfileInput>
    create: XOR<whatsapp_messagesCreateWithoutProfileInput, whatsapp_messagesUncheckedCreateWithoutProfileInput>
  }

  export type whatsapp_messagesUpdateWithWhereUniqueWithoutProfileInput = {
    where: whatsapp_messagesWhereUniqueInput
    data: XOR<whatsapp_messagesUpdateWithoutProfileInput, whatsapp_messagesUncheckedUpdateWithoutProfileInput>
  }

  export type whatsapp_messagesUpdateManyWithWhereWithoutProfileInput = {
    where: whatsapp_messagesScalarWhereInput
    data: XOR<whatsapp_messagesUpdateManyMutationInput, whatsapp_messagesUncheckedUpdateManyWithoutProfileInput>
  }

  export type whatsapp_messagesScalarWhereInput = {
    AND?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
    OR?: whatsapp_messagesScalarWhereInput[]
    NOT?: whatsapp_messagesScalarWhereInput | whatsapp_messagesScalarWhereInput[]
    id?: UuidFilter<"whatsapp_messages"> | string
    profile_id?: UuidFilter<"whatsapp_messages"> | string
    direction?: EnumMessageDirectionFilter<"whatsapp_messages"> | $Enums.MessageDirection
    message_text?: StringFilter<"whatsapp_messages"> | string
    timestamp?: DateTimeFilter<"whatsapp_messages"> | Date | string
  }

  export type profileCreateWithoutProjectsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutProjectsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutProjectsInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutProjectsInput, profileUncheckedCreateWithoutProjectsInput>
  }

  export type tasks_logCreateWithoutProjectInput = {
    id?: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    profile: profileCreateNestedOneWithoutTasks_logInput
  }

  export type tasks_logUncheckedCreateWithoutProjectInput = {
    id?: string
    profile_id: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
  }

  export type tasks_logCreateOrConnectWithoutProjectInput = {
    where: tasks_logWhereUniqueInput
    create: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput>
  }

  export type tasks_logCreateManyProjectInputEnvelope = {
    data: tasks_logCreateManyProjectInput | tasks_logCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type profileUpsertWithoutProjectsInput = {
    update: XOR<profileUpdateWithoutProjectsInput, profileUncheckedUpdateWithoutProjectsInput>
    create: XOR<profileCreateWithoutProjectsInput, profileUncheckedCreateWithoutProjectsInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutProjectsInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutProjectsInput, profileUncheckedUpdateWithoutProjectsInput>
  }

  export type profileUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type tasks_logUpsertWithWhereUniqueWithoutProjectInput = {
    where: tasks_logWhereUniqueInput
    update: XOR<tasks_logUpdateWithoutProjectInput, tasks_logUncheckedUpdateWithoutProjectInput>
    create: XOR<tasks_logCreateWithoutProjectInput, tasks_logUncheckedCreateWithoutProjectInput>
  }

  export type tasks_logUpdateWithWhereUniqueWithoutProjectInput = {
    where: tasks_logWhereUniqueInput
    data: XOR<tasks_logUpdateWithoutProjectInput, tasks_logUncheckedUpdateWithoutProjectInput>
  }

  export type tasks_logUpdateManyWithWhereWithoutProjectInput = {
    where: tasks_logScalarWhereInput
    data: XOR<tasks_logUpdateManyMutationInput, tasks_logUncheckedUpdateManyWithoutProjectInput>
  }

  export type profileCreateWithoutSubscriptionsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutSubscriptionsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutSubscriptionsInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutSubscriptionsInput, profileUncheckedCreateWithoutSubscriptionsInput>
  }

  export type profileUpsertWithoutSubscriptionsInput = {
    update: XOR<profileUpdateWithoutSubscriptionsInput, profileUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<profileCreateWithoutSubscriptionsInput, profileUncheckedCreateWithoutSubscriptionsInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutSubscriptionsInput, profileUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type profileUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type profileCreateWithoutCredit_purchasesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutCredit_purchasesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutCredit_purchasesInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutCredit_purchasesInput, profileUncheckedCreateWithoutCredit_purchasesInput>
  }

  export type profileUpsertWithoutCredit_purchasesInput = {
    update: XOR<profileUpdateWithoutCredit_purchasesInput, profileUncheckedUpdateWithoutCredit_purchasesInput>
    create: XOR<profileCreateWithoutCredit_purchasesInput, profileUncheckedCreateWithoutCredit_purchasesInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutCredit_purchasesInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutCredit_purchasesInput, profileUncheckedUpdateWithoutCredit_purchasesInput>
  }

  export type profileUpdateWithoutCredit_purchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutCredit_purchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type profileCreateWithoutTasks_logInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutTasks_logInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutTasks_logInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutTasks_logInput, profileUncheckedCreateWithoutTasks_logInput>
  }

  export type projectsCreateWithoutTasks_logInput = {
    id?: string
    createId: string
    name: string
    description: string
    profile: profileCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutTasks_logInput = {
    id?: string
    profile_id: string
    createId: string
    name: string
    description: string
  }

  export type projectsCreateOrConnectWithoutTasks_logInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutTasks_logInput, projectsUncheckedCreateWithoutTasks_logInput>
  }

  export type profileUpsertWithoutTasks_logInput = {
    update: XOR<profileUpdateWithoutTasks_logInput, profileUncheckedUpdateWithoutTasks_logInput>
    create: XOR<profileCreateWithoutTasks_logInput, profileUncheckedCreateWithoutTasks_logInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutTasks_logInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutTasks_logInput, profileUncheckedUpdateWithoutTasks_logInput>
  }

  export type profileUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type projectsUpsertWithoutTasks_logInput = {
    update: XOR<projectsUpdateWithoutTasks_logInput, projectsUncheckedUpdateWithoutTasks_logInput>
    create: XOR<projectsCreateWithoutTasks_logInput, projectsUncheckedCreateWithoutTasks_logInput>
    where?: projectsWhereInput
  }

  export type projectsUpdateToOneWithWhereWithoutTasks_logInput = {
    where?: projectsWhereInput
    data: XOR<projectsUpdateWithoutTasks_logInput, projectsUncheckedUpdateWithoutTasks_logInput>
  }

  export type projectsUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutTasks_logInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type profileCreateWithoutWhatsapp_messagesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutWhatsapp_messagesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    admin_activities?: admin_activity_logsUncheckedCreateNestedManyWithoutAdminInput
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutWhatsapp_messagesInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutWhatsapp_messagesInput, profileUncheckedCreateWithoutWhatsapp_messagesInput>
  }

  export type profileUpsertWithoutWhatsapp_messagesInput = {
    update: XOR<profileUpdateWithoutWhatsapp_messagesInput, profileUncheckedUpdateWithoutWhatsapp_messagesInput>
    create: XOR<profileCreateWithoutWhatsapp_messagesInput, profileUncheckedCreateWithoutWhatsapp_messagesInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutWhatsapp_messagesInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutWhatsapp_messagesInput, profileUncheckedUpdateWithoutWhatsapp_messagesInput>
  }

  export type profileUpdateWithoutWhatsapp_messagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutWhatsapp_messagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    admin_activities?: admin_activity_logsUncheckedUpdateManyWithoutAdminNestedInput
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type profileCreateWithoutAdmin_activitiesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    credit_purchases?: credit_purchasesCreateNestedManyWithoutProfileInput
    projects?: projectsCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesCreateNestedManyWithoutProfileInput
  }

  export type profileUncheckedCreateWithoutAdmin_activitiesInput = {
    id: string
    email: string
    name: string
    role?: $Enums.UserRole
    ip_address?: string
    subscription_plan?: string | null
    credits_balance?: number
    created_at?: Date | string
    stripeSubscriptionId?: string | null
    credit_purchases?: credit_purchasesUncheckedCreateNestedManyWithoutProfileInput
    projects?: projectsUncheckedCreateNestedManyWithoutProfileInput
    subscriptions?: subscriptionsUncheckedCreateNestedManyWithoutProfileInput
    tasks_log?: tasks_logUncheckedCreateNestedManyWithoutProfileInput
    whatsapp_messages?: whatsapp_messagesUncheckedCreateNestedManyWithoutProfileInput
  }

  export type profileCreateOrConnectWithoutAdmin_activitiesInput = {
    where: profileWhereUniqueInput
    create: XOR<profileCreateWithoutAdmin_activitiesInput, profileUncheckedCreateWithoutAdmin_activitiesInput>
  }

  export type profileUpsertWithoutAdmin_activitiesInput = {
    update: XOR<profileUpdateWithoutAdmin_activitiesInput, profileUncheckedUpdateWithoutAdmin_activitiesInput>
    create: XOR<profileCreateWithoutAdmin_activitiesInput, profileUncheckedCreateWithoutAdmin_activitiesInput>
    where?: profileWhereInput
  }

  export type profileUpdateToOneWithWhereWithoutAdmin_activitiesInput = {
    where?: profileWhereInput
    data: XOR<profileUpdateWithoutAdmin_activitiesInput, profileUncheckedUpdateWithoutAdmin_activitiesInput>
  }

  export type profileUpdateWithoutAdmin_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    credit_purchases?: credit_purchasesUpdateManyWithoutProfileNestedInput
    projects?: projectsUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUpdateManyWithoutProfileNestedInput
  }

  export type profileUncheckedUpdateWithoutAdmin_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ip_address?: StringFieldUpdateOperationsInput | string
    subscription_plan?: NullableStringFieldUpdateOperationsInput | string | null
    credits_balance?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    credit_purchases?: credit_purchasesUncheckedUpdateManyWithoutProfileNestedInput
    projects?: projectsUncheckedUpdateManyWithoutProfileNestedInput
    subscriptions?: subscriptionsUncheckedUpdateManyWithoutProfileNestedInput
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProfileNestedInput
    whatsapp_messages?: whatsapp_messagesUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type admin_activity_logsCreateManyAdminInput = {
    id?: string
    action_type: string
    target_id: string
    timestamp?: Date | string
  }

  export type credit_purchasesCreateManyProfileInput = {
    id?: string
    pack_type: $Enums.PackType
    credits: number
    price: number
    purchased_at?: Date | string
  }

  export type projectsCreateManyProfileInput = {
    id?: string
    createId: string
    name: string
    description: string
  }

  export type subscriptionsCreateManyProfileInput = {
    id?: string
    plan_type: $Enums.PlanType
    status: string
    start_date: Date | string
    end_date: Date | string
    method: string
    amount?: number
  }

  export type tasks_logCreateManyProfileInput = {
    id?: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
    project_id: string
  }

  export type whatsapp_messagesCreateManyProfileInput = {
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

  export type credit_purchasesUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type credit_purchasesUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    pack_type?: EnumPackTypeFieldUpdateOperationsInput | $Enums.PackType
    credits?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    purchased_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tasks_log?: tasks_logUpdateManyWithoutProjectNestedInput
  }

  export type projectsUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tasks_log?: tasks_logUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type projectsUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    createId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type subscriptionsUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type subscriptionsUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan_type?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    method?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type tasks_logUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    project?: projectsUpdateOneRequiredWithoutTasks_logNestedInput
  }

  export type tasks_logUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
  }

  export type tasks_logUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    project_id?: StringFieldUpdateOperationsInput | string
  }

  export type whatsapp_messagesUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type whatsapp_messagesUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    direction?: EnumMessageDirectionFieldUpdateOperationsInput | $Enums.MessageDirection
    message_text?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tasks_logCreateManyProjectInput = {
    id?: string
    profile_id: string
    agent_type: string
    credits_spent: number
    timestamp?: Date | string
    agent_results: string
  }

  export type tasks_logUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
    profile?: profileUpdateOneRequiredWithoutTasks_logNestedInput
  }

  export type tasks_logUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
  }

  export type tasks_logUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    profile_id?: StringFieldUpdateOperationsInput | string
    agent_type?: StringFieldUpdateOperationsInput | string
    credits_spent?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    agent_results?: StringFieldUpdateOperationsInput | string
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
/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ChatInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.createMany(input as any))),

        create: procedure.input($Schema.ChatInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.create(input as any))),

        deleteMany: procedure.input($Schema.ChatInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.deleteMany(input as any))),

        delete: procedure.input($Schema.ChatInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.delete(input as any))),

        findFirst: procedure.input($Schema.ChatInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.findFirst(input as any))),

        findMany: procedure.input($Schema.ChatInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.findMany(input as any))),

        findUnique: procedure.input($Schema.ChatInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).chat.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChatInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.updateMany(input as any))),

        update: procedure.input($Schema.ChatInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).chat.update(input as any))),

        count: procedure.input($Schema.ChatInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).chat.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChatCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChatCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatGetPayload<T>, Context>) => Promise<Prisma.ChatGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChatDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChatDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatGetPayload<T>, Context>) => Promise<Prisma.ChatGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChatFindFirstArgs, TData = Prisma.ChatGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChatFindManyArgs, TData = Array<Prisma.ChatGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ChatFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChatGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChatFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChatGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChatGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChatFindUniqueArgs, TData = Prisma.ChatGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChatFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChatGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChatFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChatFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChatGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChatGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChatUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChatUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChatUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChatGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChatGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChatUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChatUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChatGetPayload<T>, Context>) => Promise<Prisma.ChatGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ChatCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ChatCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ChatCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ChatCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ChatCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ChatCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChatCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

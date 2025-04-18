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

        createMany: procedure.input($Schema.ServiceInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.createMany(input as any))),

        create: procedure.input($Schema.ServiceInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.create(input as any))),

        deleteMany: procedure.input($Schema.ServiceInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.deleteMany(input as any))),

        delete: procedure.input($Schema.ServiceInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.delete(input as any))),

        findFirst: procedure.input($Schema.ServiceInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.findFirst(input as any))),

        findMany: procedure.input($Schema.ServiceInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.findMany(input as any))),

        findUnique: procedure.input($Schema.ServiceInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).service.findUnique(input as any))),

        updateMany: procedure.input($Schema.ServiceInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.updateMany(input as any))),

        update: procedure.input($Schema.ServiceInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).service.update(input as any))),

        count: procedure.input($Schema.ServiceInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).service.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ServiceCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ServiceCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceGetPayload<T>, Context>) => Promise<Prisma.ServiceGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ServiceDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ServiceDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceGetPayload<T>, Context>) => Promise<Prisma.ServiceGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ServiceFindFirstArgs, TData = Prisma.ServiceGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ServiceFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ServiceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ServiceFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ServiceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ServiceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ServiceFindManyArgs, TData = Array<Prisma.ServiceGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ServiceFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ServiceGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ServiceFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ServiceGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ServiceGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ServiceFindUniqueArgs, TData = Prisma.ServiceGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ServiceFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ServiceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ServiceFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ServiceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ServiceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ServiceUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ServiceUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceGetPayload<T>, Context>) => Promise<Prisma.ServiceGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ServiceCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ServiceCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ServiceCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ServiceCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ServiceCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ServiceCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ServiceCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ServiceCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

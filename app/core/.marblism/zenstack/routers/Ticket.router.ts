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

        createMany: procedure.input($Schema.TicketInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.createMany(input as any))),

        create: procedure.input($Schema.TicketInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.create(input as any))),

        deleteMany: procedure.input($Schema.TicketInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.deleteMany(input as any))),

        delete: procedure.input($Schema.TicketInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.delete(input as any))),

        findFirst: procedure.input($Schema.TicketInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).ticket.findFirst(input as any))),

        findMany: procedure.input($Schema.TicketInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).ticket.findMany(input as any))),

        findUnique: procedure.input($Schema.TicketInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).ticket.findUnique(input as any))),

        updateMany: procedure.input($Schema.TicketInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.updateMany(input as any))),

        update: procedure.input($Schema.TicketInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).ticket.update(input as any))),

        count: procedure.input($Schema.TicketInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).ticket.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TicketCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TicketCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TicketGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TicketGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TicketGetPayload<T>, Context>) => Promise<Prisma.TicketGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TicketDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TicketDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TicketGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TicketGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TicketGetPayload<T>, Context>) => Promise<Prisma.TicketGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TicketFindFirstArgs, TData = Prisma.TicketGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TicketFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TicketGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TicketFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TicketFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TicketGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TicketGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TicketFindManyArgs, TData = Array<Prisma.TicketGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TicketFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TicketGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TicketFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TicketFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TicketGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TicketGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TicketFindUniqueArgs, TData = Prisma.TicketGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TicketFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TicketGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TicketFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TicketFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TicketGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TicketGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TicketUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TicketUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TicketUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TicketGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TicketGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TicketUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TicketUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TicketGetPayload<T>, Context>) => Promise<Prisma.TicketGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TicketCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TicketCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TicketCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TicketCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TicketCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TicketCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TicketCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TicketCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

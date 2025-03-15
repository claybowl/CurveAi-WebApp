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

        createMany: procedure.input($Schema.MembershipTierInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.createMany(input as any))),

        create: procedure.input($Schema.MembershipTierInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.create(input as any))),

        deleteMany: procedure.input($Schema.MembershipTierInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.deleteMany(input as any))),

        delete: procedure.input($Schema.MembershipTierInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.delete(input as any))),

        findFirst: procedure.input($Schema.MembershipTierInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).membershipTier.findFirst(input as any))),

        findMany: procedure.input($Schema.MembershipTierInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).membershipTier.findMany(input as any))),

        findUnique: procedure.input($Schema.MembershipTierInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).membershipTier.findUnique(input as any))),

        updateMany: procedure.input($Schema.MembershipTierInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.updateMany(input as any))),

        update: procedure.input($Schema.MembershipTierInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).membershipTier.update(input as any))),

        count: procedure.input($Schema.MembershipTierInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).membershipTier.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.MembershipTierCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.MembershipTierCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MembershipTierGetPayload<T>, Context>) => Promise<Prisma.MembershipTierGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.MembershipTierDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.MembershipTierDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MembershipTierGetPayload<T>, Context>) => Promise<Prisma.MembershipTierGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.MembershipTierFindFirstArgs, TData = Prisma.MembershipTierGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.MembershipTierFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MembershipTierGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MembershipTierFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MembershipTierFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MembershipTierGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MembershipTierGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.MembershipTierFindManyArgs, TData = Array<Prisma.MembershipTierGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.MembershipTierFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.MembershipTierGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MembershipTierFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MembershipTierFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.MembershipTierGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.MembershipTierGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.MembershipTierFindUniqueArgs, TData = Prisma.MembershipTierGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MembershipTierFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MembershipTierGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MembershipTierFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MembershipTierFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MembershipTierGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MembershipTierGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.MembershipTierUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.MembershipTierUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MembershipTierUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MembershipTierUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MembershipTierUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MembershipTierGetPayload<T>, Context>) => Promise<Prisma.MembershipTierGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.MembershipTierCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MembershipTierCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.MembershipTierCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.MembershipTierCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.MembershipTierCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.MembershipTierCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.MembershipTierCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MembershipTierCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

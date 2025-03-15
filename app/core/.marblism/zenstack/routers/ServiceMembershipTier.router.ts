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

        createMany: procedure.input($Schema.ServiceMembershipTierInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.createMany(input as any))),

        create: procedure.input($Schema.ServiceMembershipTierInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.create(input as any))),

        deleteMany: procedure.input($Schema.ServiceMembershipTierInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.deleteMany(input as any))),

        delete: procedure.input($Schema.ServiceMembershipTierInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.delete(input as any))),

        findFirst: procedure.input($Schema.ServiceMembershipTierInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).serviceMembershipTier.findFirst(input as any))),

        findMany: procedure.input($Schema.ServiceMembershipTierInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).serviceMembershipTier.findMany(input as any))),

        findUnique: procedure.input($Schema.ServiceMembershipTierInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).serviceMembershipTier.findUnique(input as any))),

        updateMany: procedure.input($Schema.ServiceMembershipTierInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.updateMany(input as any))),

        update: procedure.input($Schema.ServiceMembershipTierInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).serviceMembershipTier.update(input as any))),

        count: procedure.input($Schema.ServiceMembershipTierInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).serviceMembershipTier.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ServiceMembershipTierCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ServiceMembershipTierCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceMembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceMembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceMembershipTierGetPayload<T>, Context>) => Promise<Prisma.ServiceMembershipTierGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ServiceMembershipTierDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ServiceMembershipTierDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceMembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceMembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceMembershipTierGetPayload<T>, Context>) => Promise<Prisma.ServiceMembershipTierGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ServiceMembershipTierFindFirstArgs, TData = Prisma.ServiceMembershipTierGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ServiceMembershipTierGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceMembershipTierFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ServiceMembershipTierGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ServiceMembershipTierGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ServiceMembershipTierFindManyArgs, TData = Array<Prisma.ServiceMembershipTierGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ServiceMembershipTierGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceMembershipTierFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ServiceMembershipTierGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ServiceMembershipTierGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ServiceMembershipTierFindUniqueArgs, TData = Prisma.ServiceMembershipTierGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ServiceMembershipTierGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ServiceMembershipTierFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ServiceMembershipTierFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ServiceMembershipTierGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ServiceMembershipTierGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ServiceMembershipTierUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ServiceMembershipTierUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ServiceMembershipTierUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ServiceMembershipTierGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ServiceMembershipTierGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ServiceMembershipTierUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ServiceMembershipTierUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ServiceMembershipTierGetPayload<T>, Context>) => Promise<Prisma.ServiceMembershipTierGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ServiceMembershipTierCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ServiceMembershipTierCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ServiceMembershipTierCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ServiceMembershipTierCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ServiceMembershipTierCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ServiceMembershipTierCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ServiceMembershipTierCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ServiceMembershipTierCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

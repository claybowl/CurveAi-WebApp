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

        createMany: procedure.input($Schema.AssessmentInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.createMany(input as any))),

        create: procedure.input($Schema.AssessmentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.create(input as any))),

        deleteMany: procedure.input($Schema.AssessmentInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.deleteMany(input as any))),

        delete: procedure.input($Schema.AssessmentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.delete(input as any))),

        findFirst: procedure.input($Schema.AssessmentInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).assessment.findFirst(input as any))),

        findMany: procedure.input($Schema.AssessmentInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).assessment.findMany(input as any))),

        findUnique: procedure.input($Schema.AssessmentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).assessment.findUnique(input as any))),

        updateMany: procedure.input($Schema.AssessmentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.updateMany(input as any))),

        update: procedure.input($Schema.AssessmentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).assessment.update(input as any))),

        count: procedure.input($Schema.AssessmentInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).assessment.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AssessmentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AssessmentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AssessmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AssessmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AssessmentGetPayload<T>, Context>) => Promise<Prisma.AssessmentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AssessmentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AssessmentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AssessmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AssessmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AssessmentGetPayload<T>, Context>) => Promise<Prisma.AssessmentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AssessmentFindFirstArgs, TData = Prisma.AssessmentGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.AssessmentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AssessmentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AssessmentFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AssessmentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AssessmentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AssessmentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AssessmentFindManyArgs, TData = Array<Prisma.AssessmentGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.AssessmentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AssessmentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AssessmentFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.AssessmentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AssessmentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AssessmentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AssessmentFindUniqueArgs, TData = Prisma.AssessmentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AssessmentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AssessmentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AssessmentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AssessmentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AssessmentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AssessmentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AssessmentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AssessmentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AssessmentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AssessmentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AssessmentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AssessmentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AssessmentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AssessmentGetPayload<T>, Context>) => Promise<Prisma.AssessmentGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.AssessmentCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AssessmentCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.AssessmentCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.AssessmentCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.AssessmentCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.AssessmentCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.AssessmentCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.AssessmentCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

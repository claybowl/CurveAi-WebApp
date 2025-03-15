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

        createMany: procedure.input($Schema.ConsultationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.createMany(input as any))),

        create: procedure.input($Schema.ConsultationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.create(input as any))),

        deleteMany: procedure.input($Schema.ConsultationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.deleteMany(input as any))),

        delete: procedure.input($Schema.ConsultationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.delete(input as any))),

        findFirst: procedure.input($Schema.ConsultationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).consultation.findFirst(input as any))),

        findMany: procedure.input($Schema.ConsultationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).consultation.findMany(input as any))),

        findUnique: procedure.input($Schema.ConsultationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).consultation.findUnique(input as any))),

        updateMany: procedure.input($Schema.ConsultationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.updateMany(input as any))),

        update: procedure.input($Schema.ConsultationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).consultation.update(input as any))),

        count: procedure.input($Schema.ConsultationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).consultation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ConsultationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ConsultationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConsultationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConsultationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConsultationGetPayload<T>, Context>) => Promise<Prisma.ConsultationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ConsultationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ConsultationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConsultationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConsultationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConsultationGetPayload<T>, Context>) => Promise<Prisma.ConsultationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ConsultationFindFirstArgs, TData = Prisma.ConsultationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ConsultationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ConsultationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConsultationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ConsultationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ConsultationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ConsultationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ConsultationFindManyArgs, TData = Array<Prisma.ConsultationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ConsultationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ConsultationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConsultationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ConsultationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ConsultationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ConsultationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ConsultationFindUniqueArgs, TData = Prisma.ConsultationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ConsultationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ConsultationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConsultationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ConsultationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ConsultationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ConsultationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ConsultationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ConsultationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConsultationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConsultationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConsultationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConsultationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConsultationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConsultationGetPayload<T>, Context>) => Promise<Prisma.ConsultationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ConsultationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ConsultationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ConsultationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ConsultationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ConsultationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ConsultationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ConsultationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ConsultationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}

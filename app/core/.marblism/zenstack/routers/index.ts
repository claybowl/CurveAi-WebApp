/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createMembershipTierRouter from "./MembershipTier.router";
import createResourceRouter from "./Resource.router";
import createAssessmentRouter from "./Assessment.router";
import createConsultationRouter from "./Consultation.router";
import createMessageRouter from "./Message.router";
import createTicketRouter from "./Ticket.router";
import createChatRouter from "./Chat.router";
import createServiceRouter from "./Service.router";
import createServiceMembershipTierRouter from "./ServiceMembershipTier.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as MembershipTierClientType } from "./MembershipTier.router";
import { ClientType as ResourceClientType } from "./Resource.router";
import { ClientType as AssessmentClientType } from "./Assessment.router";
import { ClientType as ConsultationClientType } from "./Consultation.router";
import { ClientType as MessageClientType } from "./Message.router";
import { ClientType as TicketClientType } from "./Ticket.router";
import { ClientType as ChatClientType } from "./Chat.router";
import { ClientType as ServiceClientType } from "./Service.router";
import { ClientType as ServiceMembershipTierClientType } from "./ServiceMembershipTier.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        membershipTier: createMembershipTierRouter(router, procedure),
        resource: createResourceRouter(router, procedure),
        assessment: createAssessmentRouter(router, procedure),
        consultation: createConsultationRouter(router, procedure),
        message: createMessageRouter(router, procedure),
        ticket: createTicketRouter(router, procedure),
        chat: createChatRouter(router, procedure),
        service: createServiceRouter(router, procedure),
        serviceMembershipTier: createServiceMembershipTierRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    membershipTier: MembershipTierClientType<AppRouter>;
    resource: ResourceClientType<AppRouter>;
    assessment: AssessmentClientType<AppRouter>;
    consultation: ConsultationClientType<AppRouter>;
    message: MessageClientType<AppRouter>;
    ticket: TicketClientType<AppRouter>;
    chat: ChatClientType<AppRouter>;
    service: ServiceClientType<AppRouter>;
    serviceMembershipTier: ServiceMembershipTierClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}

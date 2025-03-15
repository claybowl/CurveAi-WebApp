import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('16aa8242-a100-4b91-be8c-02261c11fa88', '1Raul_Willms@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv11223ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('aff09a61-4fcd-4fc3-9b58-4006559c1a9d', '9Kaci.Crona@gmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv12345abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e5ce5899-701d-4795-b7a8-4b599c66d01c', '17Santina_Price@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv44556jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9ab6e8b4-ea49-4311-b986-77c67e2ea738', '33Garland_Schuster92@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv67890def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4e85322b-f04c-4f85-9d91-edb056d37afc', '41Twila.Buckridge@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv44556jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('151e45c3-6973-4000-a4ce-f27df3e8ad9f', '49Raoul5@gmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv77889mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('31f29d3c-bf83-49e5-8400-ac99b4862694', '57Nellie.Schimmel2@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv12345abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e11a4406-5147-41e4-97eb-486a9883e8a6', '65Hillard77@yahoo.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv44556jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('7e071a2e-d1d5-4d58-9508-03cb30ebf084', '73Zaria87@hotmail.com', 'Michael White', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv77889mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('3a033da7-4c0a-4517-995f-9f1bf7bf44e9', 'Access personalized AI consultations with our expert team.', '16aa8242-a100-4b91-be8c-02261c11fa88');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('237c9b7e-126f-4533-90ac-85095a75c0a4', 'Access personalized AI consultations with our expert team.', '4e85322b-f04c-4f85-9d91-edb056d37afc');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('1212c22f-aa58-4a9b-8d36-36cf264fe8e2', 'Access personalized AI consultations with our expert team.', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('95458ecc-6a0f-4070-9179-2130d0995da7', 'Unlock exclusive AI insights with our premium subscription.', 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e63e4612-75c3-4aa0-84bc-3a8eb1eabc85', 'Unlock exclusive AI insights with our premium subscription.', '7e071a2e-d1d5-4d58-9508-03cb30ebf084');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('22059c2e-62ab-42f8-b1e2-23fd61b022d7', 'Experience the future of AI with our tailored solutions.', '7e071a2e-d1d5-4d58-9508-03cb30ebf084');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('84690a52-0130-4d3f-96d3-4d6a6335f4dc', 'Unlock exclusive AI insights with our premium subscription.', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('e2e78d97-730e-43a0-bf86-b77a47d51989', 'Join our community and transform your AI capabilities.', '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('f4ff1f24-5ee5-4ba1-bb6b-94e3b824b421', 'Experience the future of AI with our tailored solutions.', 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "PwaSubscription" ("id", "content", "userId") VALUES ('90b23f23-1ee3-45a8-9821-7c1dec212022', 'Stay ahead with cuttingedge AI resources and tools.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('098c713c-822f-4824-977b-152db09c473b', 'Gamma Wave', '99month', 'Priority customer support', 'Perfect for small businesses wanting to leverage AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('f79575e9-2598-45c2-b195-93cd89be92f1', 'Alpha Wave', '19month', 'Access to exclusive AI tools', 'Perfect for small businesses wanting to leverage AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('8bec8a01-09b9-4c76-9e1e-f49bd06d1e01', 'Delta Wave', '79month', 'Monthly consultation sessions', 'Ideal for beginners looking to explore AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('fff83e28-dcf2-4fdc-b7a3-5decdf33589f', 'Theta Wave', '79month', 'Custom AI integration services', 'Ideal for beginners looking to explore AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('31f5cb0d-b656-468d-8a58-689208663ac0', 'Gamma Wave', '19month', 'Monthly consultation sessions', 'Ideal for beginners looking to explore AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('642eac1e-7551-4309-94fc-4fb15165cc7e', 'Beta Wave', '99month', 'Advanced AI readiness reports', 'Designed for medium enterprises with growing AI needs.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('ce9b5a4e-fbc2-4e23-b102-ac111f8cb856', 'Beta Wave', '59month', 'Access to exclusive AI tools', 'Comprehensive package for AI enthusiasts and experts.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('f32532a9-52e0-4a16-8855-4fb0cb650880', 'Theta Wave', '99month', 'Access to exclusive AI tools', 'Perfect for small businesses wanting to leverage AI.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('3323ea13-b104-462e-a83f-c1a2350b21ab', 'Alpha Wave', '19month', 'Custom AI integration services', 'Designed for medium enterprises with growing AI needs.');
INSERT INTO "MembershipTier" ("id", "name", "price", "benefits", "description") VALUES ('8bf07183-cd90-4abd-8149-c8a490a8adfb', 'Gamma Wave', '59month', 'Access to exclusive AI tools', 'Comprehensive package for AI enthusiasts and experts.');

INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('734038b8-b730-4201-8ae4-dd8b0a655ce4', 'Deep Dive into Neural Networks', 'Examining the potential impact of AI on various business sectors and future trends.', 'Machine Learning', 'Advanced', '098c713c-822f-4824-977b-152db09c473b');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('fe563b1b-26dd-42ba-b167-598cdb564142', 'Understanding AI Ethics', 'A beginners guide to the fundamental concepts of machine learning and its applications.', 'Neural Networks', 'All Levels', '642eac1e-7551-4309-94fc-4fb15165cc7e');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('83dd5161-5925-4e65-8633-34d3fd645da9', 'Introduction to Machine Learning', 'A beginners guide to the fundamental concepts of machine learning and its applications.', 'Healthcare', 'All Levels', 'f79575e9-2598-45c2-b195-93cd89be92f1');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('92178560-6d39-48d2-971b-34fe929d26d7', 'The Future of AI in Business', 'A beginners guide to the fundamental concepts of machine learning and its applications.', 'Ethics', 'Expert', 'ce9b5a4e-fbc2-4e23-b102-ac111f8cb856');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('64d66ad7-8624-4df1-8ea5-414c5c2f3613', 'Introduction to Machine Learning', 'An indepth look at neural networks their architecture and how they function.', 'Business', 'Advanced', 'f79575e9-2598-45c2-b195-93cd89be92f1');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('35e53902-401f-4d6a-b60f-c08f7a790310', 'Introduction to Machine Learning', 'Examining the potential impact of AI on various business sectors and future trends.', 'Healthcare', 'Advanced', 'fff83e28-dcf2-4fdc-b7a3-5decdf33589f');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('593d0db6-9e93-4cef-be2c-aa9e0836b586', 'The Future of AI in Business', 'This article explores the ethical considerations surrounding AI development and deployment.', 'Neural Networks', 'Beginner', '8bf07183-cd90-4abd-8149-c8a490a8adfb');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('a92ecccf-4e19-4e31-805d-442da7f4358b', 'AI in Healthcare Opportunities and Challenges', 'Examining the potential impact of AI on various business sectors and future trends.', 'Ethics', 'Beginner', '3323ea13-b104-462e-a83f-c1a2350b21ab');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('24d2c5eb-9d37-4e8e-8f20-b86b42d4b0a1', 'Deep Dive into Neural Networks', 'This article explores the ethical considerations surrounding AI development and deployment.', 'Healthcare', 'Beginner', 'fff83e28-dcf2-4fdc-b7a3-5decdf33589f');
INSERT INTO "Resource" ("id", "title", "content", "topic", "difficultyLevel", "membershipTierId") VALUES ('2d33b5c9-5d72-4bb3-a0ec-7e5911bad4df', 'Understanding AI Ethics', 'An analysis of how AI is transforming the healthcare industry and the challenges it faces.', 'Machine Learning', 'Beginner', '3323ea13-b104-462e-a83f-c1a2350b21ab');

INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('38b613d1-f0ed-490e-8fce-2a5fff4163a4', 867, 'pending', 'Basic knowledge requires more training.', '31f29d3c-bf83-49e5-8400-ac99b4862694');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('10bcc69a-244e-48e7-8dfe-738842d02358', 606, 'inprogress', 'Basic knowledge requires more training.', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('4e2abc7d-ab2b-4564-8199-10261a658472', 877, 'completed', 'Excellent readiness for AI deployment.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('76a332a3-7576-4e2c-91d6-092f78b28c19', 856, 'completed', 'Excellent readiness for AI deployment.', 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('ba02d555-9614-43a3-8ecc-c5dcf889a1b5', 633, 'pending', 'Great understanding of AI concepts.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('7929655e-ba2b-4998-bae1-7fd3db18a1c8', 659, 'pending', 'Great understanding of AI concepts.', '16aa8242-a100-4b91-be8c-02261c11fa88');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('accf0a1f-2997-4f2f-b3cf-24ace38215f3', 655, 'completed', 'Excellent readiness for AI deployment.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('8f955cb5-bbea-4918-a6cd-e016431d1ca3', 392, 'pending', 'Excellent readiness for AI deployment.', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('fa5b3b5f-f68b-4474-8b72-6f4d565e0683', 109, 'completed', 'Needs improvement in AI integration.', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Assessment" ("id", "score", "status", "feedback", "userId") VALUES ('ecacf589-bf00-4801-a217-a0f966a00d08', 2, 'pending', 'Basic knowledge requires more training.', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');

INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('5e3faedf-2d15-4c26-9065-92ff37ad2ca6', 'Completed', '2025-01-29T02:38:35.663Z', 'Client requested additional information on AI integration.', 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d', 'ba02d555-9614-43a3-8ecc-c5dcf889a1b5', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('5bec2cbc-65e5-4ebb-abba-984639b93e86', 'Cancelled', '2024-08-23T23:47:09.889Z', 'Rescheduled due to clients availability.', '4e85322b-f04c-4f85-9d91-edb056d37afc', 'fa5b3b5f-f68b-4474-8b72-6f4d565e0683', '16aa8242-a100-4b91-be8c-02261c11fa88');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('0560eaad-c97b-4b0b-82a1-38d81563453e', 'Pending', '2025-10-18T09:34:03.184Z', 'Awaiting client response to proposed AI solutions.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '7929655e-ba2b-4998-bae1-7fd3db18a1c8', '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('f03671c9-9cf9-425a-bcc9-822a5b9a2887', 'In Progress', '2024-06-29T07:38:53.151Z', 'Initial assessment indicates potential for AI optimization.', '16aa8242-a100-4b91-be8c-02261c11fa88', '38b613d1-f0ed-490e-8fce-2a5fff4163a4', 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('d7b47fcf-f03e-4fac-86c0-be088c8f81d2', 'Cancelled', '2024-10-20T02:49:34.880Z', 'Consultation completed successfully with positive feedback.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ecacf589-bf00-4801-a217-a0f966a00d08', '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('21494a55-264e-4c39-8226-631d87346e7b', 'Completed', '2025-02-21T00:20:21.192Z', 'Consultation completed successfully with positive feedback.', '9ab6e8b4-ea49-4311-b986-77c67e2ea738', '7929655e-ba2b-4998-bae1-7fd3db18a1c8', '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('eaf8f9d2-f26e-4e3d-84b1-67295ac9c571', 'Completed', '2024-05-18T07:54:22.812Z', 'Awaiting client response to proposed AI solutions.', '7e071a2e-d1d5-4d58-9508-03cb30ebf084', 'ecacf589-bf00-4801-a217-a0f966a00d08', 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('32889c0a-6681-43fb-a13a-c57c9a996805', 'Completed', '2025-07-14T03:30:01.308Z', 'Consultation completed successfully with positive feedback.', '16aa8242-a100-4b91-be8c-02261c11fa88', '76a332a3-7576-4e2c-91d6-092f78b28c19', 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('6e29ba64-8e69-4265-a6f2-a4506b97bcac', 'Scheduled', '2024-10-05T18:41:46.059Z', 'Initial assessment indicates potential for AI optimization.', '151e45c3-6973-4000-a4ce-f27df3e8ad9f', '4e2abc7d-ab2b-4564-8199-10261a658472', '4e85322b-f04c-4f85-9d91-edb056d37afc');
INSERT INTO "Consultation" ("id", "status", "scheduledAt", "notes", "userId", "assessmentId", "consultantId") VALUES ('a438cae4-1dcb-4eaf-a102-b7a764241e76', 'In Progress', '2024-03-07T04:36:35.108Z', 'Initial assessment indicates potential for AI optimization.', '31f29d3c-bf83-49e5-8400-ac99b4862694', 'accf0a1f-2997-4f2f-b3cf-24ace38215f3', 'e11a4406-5147-41e4-97eb-486a9883e8a6');

INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('1b455bdd-7922-4013-96b1-779a15dbb9a8', 'Im having trouble accessing the AI Readiness Assessment page.', 'inquiry', 'a438cae4-1dcb-4eaf-a102-b7a764241e76', '31f29d3c-bf83-49e5-8400-ac99b4862694');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('380fdda5-50d1-4037-ab5c-433af19f8e4d', 'Im having trouble accessing the AI Readiness Assessment page.', 'issue', 'eaf8f9d2-f26e-4e3d-84b1-67295ac9c571', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('1cf1911e-8196-4441-bb89-b952264d2b64', 'Im having trouble accessing the AI Readiness Assessment page.', 'issue', '5bec2cbc-65e5-4ebb-abba-984639b93e86', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('1af7e340-7b06-46be-9a1a-88c3c0b9c68c', 'How often do you update the AI models used in the chatbot', 'feedback', '21494a55-264e-4c39-8226-631d87346e7b', '16aa8242-a100-4b91-be8c-02261c11fa88');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('9bd7e387-36f2-4366-91e6-3eb1d96edbf6', 'Could you provide more details on the personalized consulting services', 'inquiry', '5bec2cbc-65e5-4ebb-abba-984639b93e86', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('409da0de-5b92-436d-a0f0-b6727b032191', 'What are the differences between the Alpha and Beta membership tiers', 'issue', '5e3faedf-2d15-4c26-9065-92ff37ad2ca6', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('1699c7d4-b01b-4282-863c-40b8428d3baf', 'Im having trouble accessing the AI Readiness Assessment page.', 'feedback', 'eaf8f9d2-f26e-4e3d-84b1-67295ac9c571', '7e071a2e-d1d5-4d58-9508-03cb30ebf084');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('042c4868-5fc3-401b-ad17-bc08b85cc7ad', 'Could you provide more details on the personalized consulting services', 'inquiry', '21494a55-264e-4c39-8226-631d87346e7b', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('9a3a80b9-26ea-41c4-8b64-427a4f2bc975', 'Could you provide more details on the personalized consulting services', 'inquiry', 'd7b47fcf-f03e-4fac-86c0-be088c8f81d2', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');
INSERT INTO "Message" ("id", "content", "type", "consultationId", "senderId") VALUES ('8122317c-5d04-40db-9081-47ad7ba6f635', 'Could you provide more details on the personalized consulting services', 'feedback', 'eaf8f9d2-f26e-4e3d-84b1-67295ac9c571', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');

INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('71882ed5-73cc-4a1d-83ba-f40cac73224d', 'Membership Upgrade Inquiry', 'Open', 'Medium', '16aa8242-a100-4b91-be8c-02261c11fa88');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('270fa14f-e398-4821-850b-2a7f886b4b10', 'AI Consultation Request', 'In Progress', 'Medium', '4e85322b-f04c-4f85-9d91-edb056d37afc');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('3d4759e8-545f-48d6-906c-8b3bea25032b', 'OpenAI Chatbot Issue', 'Closed', 'Normal', '151e45c3-6973-4000-a4ce-f27df3e8ad9f');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('2f20bb2a-96fa-49aa-b8d6-25b270cf641e', 'OpenAI Chatbot Issue', 'Resolved', 'Medium', '7e071a2e-d1d5-4d58-9508-03cb30ebf084');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('422bbf63-9e23-46d8-b0c2-5c7c02b8c066', 'OpenAI Chatbot Issue', 'Open', 'Normal', '7e071a2e-d1d5-4d58-9508-03cb30ebf084');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('d6b21ece-4c11-4615-a5ab-3305726ff151', 'OpenAI Chatbot Issue', 'Closed', 'Medium', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('205b47a6-08e3-4864-bb1f-4c7598f1a1df', 'Technical Support Needed', 'Closed', 'High', '4e85322b-f04c-4f85-9d91-edb056d37afc');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('c7f22b51-772e-480f-9434-1b543e8d4dca', 'Membership Upgrade Inquiry', 'Resolved', 'Normal', 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('75ff21df-9516-420d-a3ab-a03e62052fa9', 'Technical Support Needed', 'Closed', 'Urgent', 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "Ticket" ("id", "subject", "status", "priority", "userId") VALUES ('983cee46-b2ab-40e7-a94a-7bb5f4a19e32', 'OpenAI Chatbot Issue', 'In Progress', 'Normal', 'e5ce5899-701d-4795-b7a8-4b599c66d01c');

INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('588e90cf-29f6-4e12-ad70-7a35cf36877a', 'Claude2', 'What are the ethical considerations of using AI in healthcare', '{"neque":"tepesco","totidem":"claudeo","creta":"tabula","cerno":"allatus"}'::jsonb, '151e45c3-6973-4000-a4ce-f27df3e8ad9f');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('a1568c60-b17f-4459-ab87-66dc82a2c5f9', 'GPT3.5turbo', 'What are the latest trends in AI development', '{"vitiosus":"acceptus","amita":"substantia","appono":"coepi","curso":"cinis"}'::jsonb, 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('7c679703-e8ea-4a1b-85d9-a69a1f7cb20e', 'GPT4', 'Explain the difference between supervised and unsupervised learning.', '{"tabesco":"stabilis","atrox":"demens","custodia":"virtus","sperno":"sublime","armarium":"varius"}'::jsonb, 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('ef02b1ff-9bcb-4ffd-bec3-78dcdba5ae92', 'GPT4', 'What are the ethical considerations of using AI in healthcare', '{"vigilo":"tertius","adulescens":"solitudo","temporibus":"cupressus"}'::jsonb, '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('3354bb33-bb8f-4fb6-9284-3848907dcec0', 'Claude2', 'What are the ethical considerations of using AI in healthcare', '{"sequi":"comedo","confido":"distinctio","colligo":"defluo","deorsum":"amplexus"}'::jsonb, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('b0a9ea70-4636-4c81-94d7-706a200abe33', 'GPT4', 'How does natural language processing work', '{"animadverto":"coruscus","turpis":"arto","comis":"comburo","vicissitudo":"omnis"}'::jsonb, 'e11a4406-5147-41e4-97eb-486a9883e8a6');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('f5af9da9-32fc-4ad3-939a-2f398d448dd5', 'BERT', 'How does natural language processing work', '{"ait":"callide","arguo":"decretum","architecto":"sustineo","patrocinor":"cursim"}'::jsonb, 'aff09a61-4fcd-4fc3-9b58-4006559c1a9d');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('4f954258-571e-4c6c-bb1d-4d150150667a', 'BERT', 'What are the ethical considerations of using AI in healthcare', '{"utpote":"tum","ascit":"cura","bestia":"carbo"}'::jsonb, '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('f9d35b5e-8920-452d-83a5-8268caa695ac', 'GPT3.5turbo', 'How can AI improve customer service in retail', '{"decor":"accommodo","brevis":"certus","amissio":"ars","caritas":"caritas","appositus":"labore"}'::jsonb, '9ab6e8b4-ea49-4311-b986-77c67e2ea738');
INSERT INTO "Chat" ("id", "modelType", "content", "preferences", "userId") VALUES ('30f200e6-3408-474e-82be-b73dd9f827fe', 'GPT3.5turbo', 'How does natural language processing work', '{"capio":"taedium","verto":"ascisco","adimpleo":"verecundia","bellicus":"audacia","cupiditate":"vester"}'::jsonb, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('3f211679-47cf-4ac1-a25e-df43434be58c', 'Custom AI Model Development', 'Development of bespoke AI models to solve specific challenges.', '300', 'Training');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('6f1cd0e2-15d0-46a4-8d2e-d932d22b5da1', 'AI Integration Service', 'A comprehensive workshop to develop AI strategies tailored to your business needs.', '750', 'Consultation');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('4036ebc4-1a0e-4c06-9950-dfbfd452e6cf', 'Custom AI Model Development', 'A comprehensive workshop to develop AI strategies tailored to your business needs.', '500', 'Integration');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('2dc0a3ca-8a3e-4c6e-9ebf-333665f39075', 'Machine Learning Bootcamp', 'An intensive bootcamp to learn the fundamentals of machine learning.', '500', 'Consultation');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('ff4db94d-6963-439f-8620-faa2c0c6dc56', 'Machine Learning Bootcamp', 'Service to integrate AI solutions seamlessly into existing systems.', '1000', 'Consultation');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('aa6f6a72-cd62-4a6f-b0ef-f42eda9668ff', 'Data Analysis Consultation', 'A comprehensive workshop to develop AI strategies tailored to your business needs.', '1000', 'Development');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('27908792-e05b-48c6-bae9-199cb8b0b7b3', 'Custom AI Model Development', 'Service to integrate AI solutions seamlessly into existing systems.', '750', 'Training');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('1e1cde80-c747-4302-96a7-9faea521a534', 'AI Integration Service', 'Development of bespoke AI models to solve specific challenges.', '1500', 'Integration');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('240e4a71-20ea-4082-97c3-44f6aa9b2bc9', 'Custom AI Model Development', 'A comprehensive workshop to develop AI strategies tailored to your business needs.', '1000', 'Training');
INSERT INTO "Service" ("id", "name", "description", "price", "type") VALUES ('605d1196-8145-41a2-acc5-a364ad0e306c', 'Custom AI Model Development', 'An intensive bootcamp to learn the fundamentals of machine learning.', '750', 'Training');

INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('605d1196-8145-41a2-acc5-a364ad0e306c', 'fff83e28-dcf2-4fdc-b7a3-5decdf33589f', '72ddc2a7-8ccc-45d2-aa63-9afad1af5c48');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('6f1cd0e2-15d0-46a4-8d2e-d932d22b5da1', '098c713c-822f-4824-977b-152db09c473b', '66231b35-ee5d-4ad1-ad8a-c0e3ae1613d2');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('1e1cde80-c747-4302-96a7-9faea521a534', 'f79575e9-2598-45c2-b195-93cd89be92f1', 'a423656d-1d1a-4c8a-814c-9d3e382286d8');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('27908792-e05b-48c6-bae9-199cb8b0b7b3', '098c713c-822f-4824-977b-152db09c473b', 'bcda9b80-baa6-4c5e-bde6-db7e3917723d');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('605d1196-8145-41a2-acc5-a364ad0e306c', 'fff83e28-dcf2-4fdc-b7a3-5decdf33589f', 'c34dc14f-ced8-4cdf-8bf2-9cf86dfa16fe');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('27908792-e05b-48c6-bae9-199cb8b0b7b3', '31f5cb0d-b656-468d-8a58-689208663ac0', 'f832a48d-c570-4fb7-a478-4c3884be3009');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('2dc0a3ca-8a3e-4c6e-9ebf-333665f39075', 'f32532a9-52e0-4a16-8855-4fb0cb650880', 'f460af34-80a9-447c-95c3-a9a23f685611');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('1e1cde80-c747-4302-96a7-9faea521a534', '098c713c-822f-4824-977b-152db09c473b', 'b2fe1aac-4c2a-4778-9ee5-d5a96595c686');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('240e4a71-20ea-4082-97c3-44f6aa9b2bc9', 'fff83e28-dcf2-4fdc-b7a3-5decdf33589f', '4b66c755-094b-4ce3-a87a-5c6a1cda8641');
INSERT INTO "ServiceMembershipTier" ("serviceId", "membershipTierId", "id") VALUES ('6f1cd0e2-15d0-46a4-8d2e-d932d22b5da1', '098c713c-822f-4824-977b-152db09c473b', 'a4290f45-c556-420a-8c96-80beb2051159');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })

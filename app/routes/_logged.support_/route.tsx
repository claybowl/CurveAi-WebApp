import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  Badge,
  Button,
  Card,
  Form,
  Input,
  List,
  Modal,
  Space,
  Tabs,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

export default function SupportPage() {
  const { user } = useUserContext()
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Queries
  const { data: tickets, refetch: refetchTickets } =
    Api.supportTicket.findMany.useQuery({
      where: { userEmail: user?.email || '' },
    })

  const { data: conversations, refetch: refetchConversations } =
    Api.chatConversation.findMany.useQuery({
      where: {
        isPublic: true,
      },
      include: {
        participants: {
          include: { user: true },
        },
        messages: {
          include: { participant: { include: { user: true } } },
        },
      },
    })

  const { data: admins } = Api.user.findMany.useQuery({
    where: { globalRole: 'ADMIN' },
  })

  // Mutations
  const createTicket = Api.supportTicket.create.useMutation()
  const createMessage = Api.chatMessage.create.useMutation()
  const createConversation = Api.chatConversation.create.useMutation()

  const [messageText, setMessageText] = useState('')

  const handleSendMessage = async () => {
    try {
      if (!messageText.trim()) return

      await createMessage.mutateAsync({
        data: {
          content: messageText,
          isPublic: true,
          userId: user?.id,
          conversationId: conversations?.[0]?.id,
        },
      })

      setMessageText('')
      message.success('Message sent')
      await refetchConversations()
    } catch (error) {
      message.error('Failed to send message')
    }
  }

  // FAQ Data
  const faqItems = [
    {
      question: 'How do I get started?',
      answer:
        'You can begin by creating an account and exploring our services.',
    },
    {
      question: 'What are the membership tiers?',
      answer:
        'We offer different tiers with varying benefits. Visit our memberships page for details.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can create a support ticket or use the chat feature on this page.',
    },
  ]

  const handleTicketSubmit = async (values: any) => {
    try {
      await createTicket.mutateAsync({
        data: {
          subject: values.subject,
          description: values.description,
          userEmail: user?.email || '',
          userId: user?.id,
        },
      })
      message.success('Ticket created successfully')
      setIsTicketModalOpen(false)
      form.resetFields()
      refetchTickets()
    } catch (error) {
      message.error('Failed to create ticket')
    }
  }

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <i className="las la-ticket-alt"></i> Support Tickets
        </span>
      ),
      children: (
        <div>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" onClick={() => setIsTicketModalOpen(true)}>
              <i className="las la-plus"></i> Create New Ticket
            </Button>
            <List
              dataSource={tickets}
              renderItem={ticket => (
                <List.Item>
                  <Card style={{ width: '100%' }}>
                    <Space>
                      <Badge
                        status={
                          ticket.status === 'OPEN' ? 'processing' : 'success'
                        }
                        text={ticket.status}
                      />
                      <Text strong>{ticket.subject}</Text>
                    </Space>
                    <Paragraph>{ticket.description}</Paragraph>
                    <Text type="secondary">
                      Created: {dayjs(ticket.createdAt).format('MMMM D, YYYY')}
                    </Text>
                  </Card>
                </List.Item>
              )}
            />
          </Space>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <i className="las la-comments"></i> Public Chat
        </span>
      ),
      children: (
        <Card>
          <Space
            direction="vertical"
            style={{ width: '100%', marginBottom: 16 }}
          >
            <Text>Available Admins:</Text>
            <Space wrap>
              {admins?.map(admin => (
                <Badge key={admin.id} status="success" text={admin.name} />
              ))}
            </Space>
          </Space>
          <div
            style={{ height: '400px', overflowY: 'auto', marginBottom: '16px' }}
          >
            <List
              dataSource={conversations}
              renderItem={conversation => (
                <List.Item>
                  <Card style={{ width: '100%' }}>
                    {conversation.messages?.map(message => (
                      <div
                        key={message.id}
                        style={{
                          textAlign:
                            message.participant.userId === user?.id
                              ? 'right'
                              : 'left',
                          margin: '8px 0',
                        }}
                      >
                        <Text strong>
                          {message.participant.user?.globalRole === 'ADMIN' ? (
                            <Badge
                              status="success"
                              text={message.participant.user?.name}
                            />
                          ) : (
                            message.participant.user?.name
                          )}
                          :{' '}
                        </Text>
                        <Text>{message.content}</Text>
                      </div>
                    ))}
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Type your message..."
              onPressEnter={handleSendMessage}
              style={{ width: 'calc(100% - 100px)' }}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              icon={<i className="las la-paper-plane" />}
              style={{ width: '100px' }}
            >
              Send
            </Button>
          </Space.Compact>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <i className="las la-question-circle"></i> FAQ
        </span>
      ),
      children: (
        <List
          dataSource={faqItems}
          renderItem={item => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <Text strong>{item.question}</Text>
                <Paragraph>{item.answer}</Paragraph>
              </Card>
            </List.Item>
          )}
        />
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-headset"></i> Support Center
        </Title>
        <Paragraph>
          Welcome to our support center. Here you can submit tickets, chat with
          our team, and find answers to frequently asked questions.
        </Paragraph>

        <Tabs items={tabItems} />

        <Modal
          title="Create Support Ticket"
          open={isTicketModalOpen}
          onCancel={() => setIsTicketModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleTicketSubmit} layout="vertical">
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please enter a description' },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Ticket
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

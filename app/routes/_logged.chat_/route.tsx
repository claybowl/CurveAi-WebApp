import {
  Typography,
  Select,
  Button,
  Input,
  Card,
  Space,
  Divider,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ChatInterfacePage() {
  const { user } = useUserContext()
  const [selectedModel, setSelectedModel] = useState<string>('openai')
  const [messageText, setMessageText] = useState<string>('')
  const [preferences, setPreferences] = useState({
    temperature: 0.7,
    maxTokens: 1000,
  })

  // Fetch user's chat history
  const { data: chats, refetch } = Api.chat.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const createChat = Api.chat.create.useMutation()
  const deleteChat = Api.chat.delete.useMutation()
  const generateText = Api.ai.generateText.useMutation()

  const handleSendMessage = async () => {
    try {
      if (!messageText.trim()) return

      const response = await generateText.mutateAsync({
        prompt: messageText,
        provider: selectedModel as 'openai' | 'gemini',
      })

      await createChat.mutateAsync({
        data: {
          modelType: selectedModel,
          content: `User: ${messageText}\nAI: ${response.answer}`,
          preferences,
          userId: user?.id || '',
        },
      })

      setMessageText('')
      refetch()
      message.success('Message sent successfully')
    } catch (error) {
      message.error('Failed to send message')
    }
  }

  const handleExportChat = (chatContent: string) => {
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export-${dayjs().format('YYYY-MM-DD')}.txt`
    a.click()
  }

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat.mutateAsync({ where: { id: chatId } })
      refetch()
      message.success('Chat deleted successfully')
    } catch (error) {
      message.error('Failed to delete chat')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-robot" /> AI Chat Interface
        </Title>
        <Paragraph>
          Interact with different AI models, save your conversations, and
          customize your chat experience.
        </Paragraph>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '20px',
          }}
        >
          {/* Settings Panel */}
          <Card
            title={
              <>
                <i className="las la-cog" /> Settings
              </>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>AI Model</Text>
                <Select
                  style={{ width: '100%' }}
                  value={selectedModel}
                  onChange={setSelectedModel}
                  options={[
                    { value: 'openai', label: 'OpenAI' },
                    { value: 'gemini', label: 'Gemini' },
                  ]}
                />
              </div>

              <div>
                <Text strong>Temperature</Text>
                <Select
                  style={{ width: '100%' }}
                  value={preferences.temperature}
                  onChange={value =>
                    setPreferences(prev => ({ ...prev, temperature: value }))
                  }
                  options={[
                    { value: 0.3, label: 'More Focused' },
                    { value: 0.7, label: 'Balanced' },
                    { value: 1, label: 'More Creative' },
                  ]}
                />
              </div>
            </Space>
          </Card>

          {/* Chat Interface */}
          <Card
            title={
              <>
                <i className="las la-comments" /> Chat
              </>
            }
          >
            <div
              style={{
                height: '400px',
                overflowY: 'auto',
                marginBottom: '20px',
              }}
            >
              {chats?.map(chat => (
                <Card
                  key={chat.id}
                  size="small"
                  style={{ marginBottom: '10px' }}
                  extra={
                    <Space>
                      <Button
                        icon={<i className="las la-file-export" />}
                        onClick={() => handleExportChat(chat.content || '')}
                      />
                      <Button
                        danger
                        icon={<i className="las la-trash" />}
                        onClick={() => handleDeleteChat(chat.id)}
                      />
                    </Space>
                  }
                >
                  <Text>{chat.content}</Text>
                  <Divider />
                  <Text type="secondary">
                    {dayjs(chat.createdAt).format('YYYY-MM-DD HH:mm')} -{' '}
                    {chat.modelType}
                  </Text>
                </Card>
              ))}
            </div>

            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                placeholder="Type your message..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ width: 'calc(100% - 100px)' }}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                loading={generateText.isLoading}
                icon={<i className="las la-paper-plane" />}
                style={{ width: '100px', height: 'auto' }}
              >
                Send
              </Button>
            </Space.Compact>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}

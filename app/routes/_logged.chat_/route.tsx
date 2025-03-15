import {
  Typography,
  Select,
  Button,
  Input,
  Card,
  Space,
  Divider,
  message,
  Slider,
  Tabs,
  Radio,
  Collapse,
  Tag,
  Avatar,
  Tooltip,
  Drawer,
  Popover,
  Switch,
} from 'antd'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  SendOutlined,
  SettingOutlined,
  DeleteOutlined,
  ExportOutlined,
  SaveOutlined,
  CopyOutlined,
  UploadOutlined,
  FileTextOutlined,
  UserOutlined,
  RobotOutlined,
  InfoCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  ReloadOutlined,
  CloseOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { twMerge } from 'tailwind-merge'

// Define available models with metadata
const AI_MODELS = [
  { 
    id: 'openai-gpt-4o', 
    name: 'GPT-4o', 
    provider: 'openai',
    icon: '🧠',
    description: 'OpenAI\'s most powerful and multimodal model',
    contextLength: 128000,
  },
  { 
    id: 'openai-gpt-3.5', 
    name: 'GPT-3.5 Turbo', 
    provider: 'openai',
    icon: '🔄',
    description: 'Fast and efficient for most tasks',
    contextLength: 16000,
  },
  { 
    id: 'gemini-pro', 
    name: 'Gemini Pro', 
    provider: 'gemini',
    icon: '🌀',
    description: 'Google\'s largest and most capable AI model',
    contextLength: 32000,
  },
  { 
    id: 'anthropic-claude', 
    name: 'Claude 3', 
    provider: 'anthropic',
    icon: '🎭',
    description: 'Excellent for complex reasoning and creativity',
    contextLength: 100000,
  },
  { 
    id: 'meta-llama', 
    name: 'Llama 3', 
    provider: 'meta',
    icon: '🦙',
    description: 'Open source model with good performance',
    contextLength: 8000,
  },
];

// Pre-defined prompts/templates
const PROMPT_TEMPLATES = [
  {
    title: "Explain a Concept",
    prompt: "Explain [concept] in simple terms as if I'm a beginner."
  },
  {
    title: "Code Review",
    prompt: "Review this code and suggest improvements:\n```\n// Paste code here\n```"
  },
  {
    title: "Summarize Text",
    prompt: "Summarize the following text in 3-5 bullet points:\n\n"
  },
  {
    title: "Business Plan Outline",
    prompt: "Create a business plan outline for a [type] business."
  },
  {
    title: "Compare and Contrast",
    prompt: "Compare and contrast [item 1] and [item 2]."
  },
];

// Define message type for chat history
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  createdAt: Date;
}

export default function ChatInterfacePage() {
  const { user } = useUserContext()
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
  const [messageText, setMessageText] = useState('')
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false)
  const [templateDrawerOpen, setTemplateDrawerOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [conversations, setConversations] = useState<Record<string, Conversation>>({})
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Advanced settings
  const [advancedSettings, setAdvancedSettings] = useState({
    temperature: 0.7,
    maxTokens: 1024,
    topP: 1.0,
    presencePenalty: 0,
    frequencyPenalty: 0,
    useStreaming: true,
    systemPrompt: "You are a helpful AI assistant. Provide clear, concise, and accurate information.",
  })
  
  // Local chat state for real-time display
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([])
  
  // Upload state
  const { uploadFile, isUploading } = useUploadPublic()
  const [attachments, setAttachments] = useState<string[]>([])
  
  // Fetch user's chat history
  const { data: chats, refetch } = Api.chat.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })
  
  // Setup local conversations from DB
  useEffect(() => {
    if (chats?.length) {
      const conversationsMap: Record<string, Conversation> = {}
      
      chats.forEach(chat => {
        // Parse content to messages if possible
        let messages: ChatMessage[] = []
        try {
          if (chat.content) {
            // Try to convert existing chat format to new structured format
            const lines = chat.content.split('\n')
            let currentRole: 'user' | 'assistant' = 'user'
            let currentContent = ''
            
            lines.forEach(line => {
              if (line.startsWith('User:')) {
                if (currentContent) {
                  messages.push({
                    role: currentRole,
                    content: currentContent.trim(),
                    timestamp: new Date(chat.createdAt)
                  })
                }
                currentRole = 'user'
                currentContent = line.replace('User:', '').trim()
              } else if (line.startsWith('AI:')) {
                if (currentContent) {
                  messages.push({
                    role: currentRole,
                    content: currentContent.trim(),
                    timestamp: new Date(chat.createdAt)
                  })
                }
                currentRole = 'assistant'
                currentContent = line.replace('AI:', '').trim()
              } else {
                currentContent += '\n' + line
              }
            })
            
            if (currentContent) {
              messages.push({
                role: currentRole,
                content: currentContent.trim(),
                timestamp: new Date(chat.createdAt)
              })
            }
          }
        } catch (e) {
          console.error("Failed to parse chat content", e)
          // Fallback to original format
          messages = [
            {
              role: 'user',
              content: chat.content || '',
              timestamp: new Date(chat.createdAt)
            }
          ]
        }
        
        // Create conversation object
        conversationsMap[chat.id] = {
          id: chat.id,
          title: getConversationTitle(messages),
          messages,
          model: chat.modelType || AI_MODELS[0].id,
          createdAt: new Date(chat.createdAt)
        }
      })
      
      setConversations(conversationsMap)
      
      // Set active conversation to the most recent one if none selected
      if (!activeConversation && chats.length > 0) {
        setActiveConversation(chats[0].id)
        setLocalMessages(conversationsMap[chats[0].id]?.messages || [])
        if (conversationsMap[chats[0].id]?.model) {
          setSelectedModel(conversationsMap[chats[0].id].model)
        }
      }
    }
  }, [chats, activeConversation])
  
  // Get model metadata by ID
  const getModelById = (modelId: string) => {
    return AI_MODELS.find(model => model.id === modelId) || AI_MODELS[0]
  }
  
  // Auto scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [localMessages])
  
  // Mutations
  const createChat = Api.chat.create.useMutation()
  const updateChat = Api.chat.update.useMutation()
  const deleteChat = Api.chat.delete.useMutation()
  const generateText = Api.ai.generateText.useMutation()
  
  // Helper to estimate title from conversation
  function getConversationTitle(messages: ChatMessage[]): string {
    if (!messages.length) return "New Conversation"
    
    // Get the first user message
    const firstUserMessage = messages.find(m => m.role === 'user')
    if (!firstUserMessage) return "New Conversation"
    
    // Truncate to first 30 characters
    const title = firstUserMessage.content.split('\n')[0].trim()
    return title.length > 30 ? title.substring(0, 27) + '...' : title
  }
  
  // Create a new conversation
  const handleNewConversation = () => {
    // Generate a temporary ID
    const tempId = `temp-${Date.now()}`
    
    // Create new conversation
    const newConversation: Conversation = {
      id: tempId,
      title: "New Conversation",
      messages: [],
      model: selectedModel,
      createdAt: new Date()
    }
    
    // Add system message if defined
    if (advancedSettings.systemPrompt) {
      newConversation.messages.push({
        role: 'system',
        content: advancedSettings.systemPrompt,
        timestamp: new Date()
      })
    }
    
    // Update state
    setConversations(prev => ({
      ...prev,
      [tempId]: newConversation
    }))
    
    setActiveConversation(tempId)
    setLocalMessages(newConversation.messages)
    setMessageText('')
  }
  
  const handleSendMessage = async () => {
    try {
      if (!messageText.trim()) return
      
      // Get current conversation or create new one
      let conversationId = activeConversation
      let conversationObj = activeConversation ? {...conversations[activeConversation]} : null
      
      if (!conversationObj) {
        // Create new conversation if none active
        handleNewConversation()
        conversationId = `temp-${Date.now()}`
        conversationObj = conversations[conversationId]
      }
      
      // Add user message to local state immediately for responsive UI
      const userMessage: ChatMessage = {
        role: 'user',
        content: messageText,
        timestamp: new Date()
      }
      
      const updatedMessages = [...localMessages, userMessage]
      setLocalMessages(updatedMessages)
      setMessageText('')
      
      // Get model provider
      const model = getModelById(selectedModel)
      
      // Call API to generate response
      const response = await generateText.mutateAsync({
        prompt: messageText,
        provider: model.provider as 'openai' | 'gemini',
        attachmentUrls: attachments,
        // Include history for context (just last few messages)
        history: updatedMessages.slice(-6).map(m => `${m.role}: ${m.content}`),
        // Send advanced settings
        temperature: advancedSettings.temperature,
        maxTokens: advancedSettings.maxTokens,
      })
      
      // Add AI response to messages
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.answer,
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, assistantMessage]
      setLocalMessages(finalMessages)
      
      // Format messages for storage
      const formattedContent = finalMessages
        .filter(m => m.role !== 'system') // Don't store system messages in content
        .map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
        .join('\n\n')
      
      // Save conversation to database
      if (conversationId?.startsWith('temp-')) {
        // Create new chat in database
        const result = await createChat.mutateAsync({
          data: {
            modelType: selectedModel,
            content: formattedContent,
            preferences: advancedSettings,
            userId: user?.id || '',
          },
        })
        
        // Update local state with real ID
        if (result) {
          const newConversations = {...conversations}
          delete newConversations[conversationId]
          
          newConversations[result.id] = {
            id: result.id,
            title: getConversationTitle(finalMessages),
            messages: finalMessages,
            model: selectedModel,
            createdAt: new Date(result.createdAt)
          }
          
          setConversations(newConversations)
          setActiveConversation(result.id)
        }
      } else if (conversationId) {
        // Update existing chat
        await updateChat.mutateAsync({
          where: { id: conversationId },
          data: {
            content: formattedContent,
            modelType: selectedModel,
          },
        })
        
        // Update local state
        setConversations(prev => ({
          ...prev,
          [conversationId]: {
            ...prev[conversationId],
            title: getConversationTitle(finalMessages),
            messages: finalMessages,
            model: selectedModel,
          }
        }))
      }
      
      // Clear attachments after sending
      setAttachments([])
      
      // Refresh chats from server
      refetch()
    } catch (error) {
      console.error(error)
      message.error('Failed to send message: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }
  
  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return
    
    try {
      const file = files[0]
      const result = await uploadFile(file)
      
      if (result.url) {
        setAttachments(prev => [...prev, result.url])
        message.success(`Uploaded ${file.name}`)
      }
    } catch (error) {
      message.error('Failed to upload file')
    }
    
    // Reset input
    event.target.value = ''
  }
  
  const handleExportChat = (chatId: string) => {
    const chat = conversations[chatId]
    if (!chat) return
    
    // Format messages for export
    const exportContent = chat.messages
      .map(m => `# ${m.role.toUpperCase()}\n${m.content}\n`)
      .join('\n---\n\n')
    
    const exportData = [
      `# Conversation Export - ${chat.title}`,
      `Date: ${dayjs(chat.createdAt).format('YYYY-MM-DD HH:mm')}`,
      `Model: ${chat.model}`,
      '\n\n',
      exportContent
    ].join('\n')
    
    const blob = new Blob([exportData], { type: 'text/markdown' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${dayjs().format('YYYY-MM-DD')}.md`
    a.click()
  }
  
  const handleDeleteChat = async (chatId: string) => {
    try {
      // If it's a temporary chat, just remove from state
      if (chatId.startsWith('temp-')) {
        const newConversations = {...conversations}
        delete newConversations[chatId]
        setConversations(newConversations)
        
        // Set active to most recent if this was active
        if (activeConversation === chatId) {
          const sortedIds = Object.keys(newConversations).sort(
            (a, b) => new Date(newConversations[b].createdAt).getTime() - 
                      new Date(newConversations[a].createdAt).getTime()
          )
          setActiveConversation(sortedIds[0] || null)
          setLocalMessages(sortedIds[0] ? newConversations[sortedIds[0]].messages : [])
        }
        
        return
      }
      
      // Otherwise delete from database
      await deleteChat.mutateAsync({ where: { id: chatId } })
      
      // Update local state
      const newConversations = {...conversations}
      delete newConversations[chatId]
      setConversations(newConversations)
      
      // Set active to most recent if this was active
      if (activeConversation === chatId) {
        const sortedIds = Object.keys(newConversations).sort(
          (a, b) => new Date(newConversations[b].createdAt).getTime() - 
                    new Date(newConversations[a].createdAt).getTime()
        )
        setActiveConversation(sortedIds[0] || null)
        setLocalMessages(sortedIds[0] ? newConversations[sortedIds[0]].messages : [])
      }
      
      message.success('Chat deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete chat')
    }
  }
  
  // Copy message content to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => message.success('Copied to clipboard'))
      .catch(() => message.error('Failed to copy'))
  }
  
  // Apply a prompt template
  const applyTemplate = (template: string) => {
    setMessageText(template)
    setTemplateDrawerOpen(false)
  }
  
  // Get conversation list sorted by date
  const sortedConversationIds = Object.keys(conversations).sort(
    (a, b) => 
      new Date(conversations[b].createdAt).getTime() - 
      new Date(conversations[a].createdAt).getTime()
  )
  
  return (
    <PageLayout layout="full-width">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar: Conversation List */}
        <div className={twMerge(
          "bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-72"
        )}>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Title level={5} className={sidebarCollapsed ? "hidden" : ""}>Conversations</Title>
            <div className="flex space-x-2">
              <Button 
                type="text" 
                icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleNewConversation}
                className={sidebarCollapsed ? "" : ""}
              >
                {sidebarCollapsed ? "" : "New Chat"}
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pt-1">
            {sortedConversationIds.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {sidebarCollapsed ? "..." : "No conversations yet"}
              </div>
            ) : (
              sortedConversationIds.map(chatId => (
                <div 
                  key={chatId}
                  className={twMerge(
                    "cursor-pointer border-b border-gray-100 transition-all",
                    activeConversation === chatId ? "bg-blue-50" : "hover:bg-gray-100",
                    sidebarCollapsed ? "py-3 px-2" : "p-2"
                  )}
                  onClick={() => {
                    setActiveConversation(chatId)
                    setLocalMessages(conversations[chatId].messages)
                    setSelectedModel(conversations[chatId].model)
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center truncate">
                      {sidebarCollapsed ? (
                        <div className="text-lg">{getModelById(conversations[chatId].model).icon}</div>
                      ) : (
                        <>
                          <div className="text-lg mr-2">{getModelById(conversations[chatId].model).icon}</div>
                          <Text ellipsis className="max-w-[160px]">{conversations[chatId].title}</Text>
                        </>
                      )}
                    </div>
                    
                    {!sidebarCollapsed && (
                      <div className="flex space-x-1">
                        <Button 
                          type="text" 
                          size="small" 
                          icon={<ExportOutlined />} 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExportChat(chatId)
                          }} 
                        />
                        <Button 
                          type="text" 
                          size="small" 
                          danger 
                          icon={<DeleteOutlined />} 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteChat(chatId)
                          }} 
                        />
                      </div>
                    )}
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="text-xs text-gray-500 mt-1">
                      {dayjs(conversations[chatId].createdAt).format('MMM D, YYYY')}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header with model selection */}
          <div className="px-6 py-3 border-b border-gray-200 bg-white flex justify-between items-center">
            <div className="flex-1">
              <Title level={4} className="m-0">AI Chat Interface</Title>
              <Text type="secondary">Selected model: {getModelById(selectedModel).name}</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setTemplateDrawerOpen(true)}
                icon={<FileTextOutlined />}
              >
                Templates
              </Button>
              <Select
                style={{ width: 180 }}
                value={selectedModel}
                onChange={setSelectedModel}
                options={AI_MODELS.map(model => ({
                  value: model.id,
                  label: (
                    <div className="flex items-center">
                      <span className="mr-2">{model.icon}</span>
                      <span>{model.name}</span>
                    </div>
                  )
                }))}
              />
              <Tooltip title="Chat Settings">
                <Button 
                  type="default" 
                  shape="circle" 
                  icon={<SettingOutlined />} 
                  onClick={() => setSettingsDrawerOpen(true)}
                />
              </Tooltip>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
            {localMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-4">💬</div>
                <Title level={4}>Start a New Conversation</Title>
                <Paragraph className="mb-6 text-gray-500 max-w-md">
                  Select a model and type a message to begin chatting with AI.
                  Try asking a question or use a template to get started.
                </Paragraph>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                  {PROMPT_TEMPLATES.slice(0, 4).map((template, idx) => (
                    <Card 
                      key={idx} 
                      hoverable 
                      size="small"
                      className="cursor-pointer"
                      onClick={() => applyTemplate(template.prompt)}
                    >
                      <Text strong>{template.title}</Text>
                      <Paragraph ellipsis={{ rows: 2 }} className="text-xs text-gray-500">
                        {template.prompt}
                      </Paragraph>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {localMessages.filter(msg => msg.role !== 'system').map((message, index) => (
                  <div 
                    key={index}
                    className={twMerge(
                      "flex",
                      message.role === 'user' ? "justify-end" : "justify-start",
                    )}
                  >
                    <Card 
                      className={twMerge(
                        "max-w-[85%]",
                        message.role === 'user' ? "bg-blue-50 border-blue-100" : "bg-white"
                      )}
                      bordered
                      size="small"
                      style={{ borderRadius: '1.2rem' }}
                      extra={
                        <Space>
                          <Tooltip title="Copy">
                            <Button 
                              type="text" 
                              size="small" 
                              icon={<CopyOutlined />} 
                              onClick={() => copyToClipboard(message.content)}
                            />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar 
                          icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                          className={message.role === 'user' ? "bg-blue-500" : "bg-purple-500"}
                        />
                        <div className="flex-1 overflow-hidden">
                          <div className="font-semibold text-sm mb-1">
                            {message.role === 'user' ? 'You' : 'AI Assistant'}
                          </div>
                          <div className="prose max-w-none">
                            {message.role === 'assistant' ? (
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            ) : (
                              <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {dayjs(message.timestamp).format('h:mm A')}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="max-w-3xl mx-auto">
              {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachments.map((url, index) => (
                    <Tag 
                      key={index}
                      closable
                      onClose={() => setAttachments(a => a.filter((_, i) => i !== index))}
                    >
                      {url.split('/').pop()}
                    </Tag>
                  ))}
                </div>
              )}
              
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <TextArea
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    autoSize={{ minRows: 1, maxRows: 10 }}
                    onKeyDown={e => {
                      // Send on Ctrl/Cmd + Enter
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="rounded-xl"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Press Ctrl+Enter to send
                  </div>
                </div>
                
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => document.getElementById('file-upload')?.click()}
                  loading={isUploading}
                />
                
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  loading={generateText.isLoading}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Advanced Settings Drawer */}
        <Drawer
          title="Chat Settings"
          placement="right"
          onClose={() => setSettingsDrawerOpen(false)}
          open={settingsDrawerOpen}
          width={400}
        >
          <div className="space-y-6">
            <div>
              <Text strong>Model Information</Text>
              <Card size="small" className="mt-2">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">{getModelById(selectedModel).icon}</span>
                  <Text strong>{getModelById(selectedModel).name}</Text>
                </div>
                <Text type="secondary">{getModelById(selectedModel).description}</Text>
                <Divider className="my-2" />
                <div className="text-sm">
                  <div>Provider: {getModelById(selectedModel).provider}</div>
                  <div>Context Length: {getModelById(selectedModel).contextLength.toLocaleString()} tokens</div>
                </div>
              </Card>
            </div>
            
            <Collapse defaultActiveKey={['1']} ghost>
              <Collapse.Panel header="System Prompt" key="1">
                <div className="space-y-2">
                  <Text type="secondary">
                    This message sets the behavior of the AI assistant.
                  </Text>
                  <TextArea
                    value={advancedSettings.systemPrompt}
                    onChange={e => setAdvancedSettings(prev => ({
                      ...prev,
                      systemPrompt: e.target.value
                    }))}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Enter a system prompt..."
                  />
                </div>
              </Collapse.Panel>
              
              <Collapse.Panel header="Temperature" key="2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text>Temperature: {advancedSettings.temperature}</Text>
                    <Radio.Group 
                      value={advancedSettings.temperature}
                      onChange={e => setAdvancedSettings(prev => ({
                        ...prev,
                        temperature: e.target.value
                      }))}
                      size="small"
                    >
                      <Radio.Button value={0.2}>Precise</Radio.Button>
                      <Radio.Button value={0.7}>Balanced</Radio.Button>
                      <Radio.Button value={1.0}>Creative</Radio.Button>
                    </Radio.Group>
                  </div>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={advancedSettings.temperature}
                    onChange={value => setAdvancedSettings(prev => ({
                      ...prev,
                      temperature: value
                    }))}
                  />
                  <Text type="secondary">
                    Lower values produce more predictable outputs, higher values produce more creative outputs.
                  </Text>
                </div>
              </Collapse.Panel>
              
              <Collapse.Panel header="Advanced Generation Parameters" key="3">
                <div className="space-y-4">
                  <div>
                    <Text>Max Tokens: {advancedSettings.maxTokens}</Text>
                    <Slider
                      min={100}
                      max={4000}
                      step={100}
                      value={advancedSettings.maxTokens}
                      onChange={value => setAdvancedSettings(prev => ({
                        ...prev,
                        maxTokens: value
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Text>Top P: {advancedSettings.topP}</Text>
                    <Slider
                      min={0.1}
                      max={1}
                      step={0.1}
                      value={advancedSettings.topP}
                      onChange={value => setAdvancedSettings(prev => ({
                        ...prev,
                        topP: value
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Text>Presence Penalty: {advancedSettings.presencePenalty}</Text>
                    <Slider
                      min={-2}
                      max={2}
                      step={0.1}
                      value={advancedSettings.presencePenalty}
                      onChange={value => setAdvancedSettings(prev => ({
                        ...prev,
                        presencePenalty: value
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Text>Frequency Penalty: {advancedSettings.frequencyPenalty}</Text>
                    <Slider
                      min={-2}
                      max={2}
                      step={0.1}
                      value={advancedSettings.frequencyPenalty}
                      onChange={value => setAdvancedSettings(prev => ({
                        ...prev,
                        frequencyPenalty: value
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Text>Streaming Response</Text>
                    <Switch
                      checked={advancedSettings.useStreaming}
                      onChange={checked => setAdvancedSettings(prev => ({
                        ...prev,
                        useStreaming: checked
                      }))}
                    />
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </Drawer>
        
        {/* Templates Drawer */}
        <Drawer
          title="Prompt Templates"
          placement="right"
          onClose={() => setTemplateDrawerOpen(false)}
          open={templateDrawerOpen}
          width={400}
        >
          <div className="space-y-4">
            {PROMPT_TEMPLATES.map((template, idx) => (
              <Card 
                key={idx} 
                hoverable 
                size="small"
                className="cursor-pointer"
                onClick={() => applyTemplate(template.prompt)}
              >
                <Text strong>{template.title}</Text>
                <Paragraph className="text-sm text-gray-600 whitespace-pre-wrap mt-1">
                  {template.prompt}
                </Paragraph>
              </Card>
            ))}
          </div>
        </Drawer>
      </div>
    </PageLayout>
  )
}
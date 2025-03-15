import { Typography, Card, Row, Col, Button, List, Avatar } from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const [chatInput, setChatInput] = useState('')

  // Fetch featured services
  const { data: services } = Api.service.findMany.useQuery({
    where: { type: 'FEATURED' },
    take: 3,
  })

  // Fetch membership tiers
  const { data: membershipTiers } = Api.membershipTier.findMany.useQuery({})

  // AI Chat mutation
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const handleChatSubmit = async () => {
    if (!chatInput) return
    const response = await generateText({ prompt: chatInput })
    // You would typically show this in a chat interface
    console.log(response.answer)
    setChatInput('')
  }

  // Mock testimonials (in real app, these would come from the API)
  const testimonials = [
    {
      author: 'John Doe',
      content: 'This AI platform has transformed our business operations.',
      avatar: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    },
    {
      author: 'Jane Smith',
      content: 'The AI Readiness Assessment was eye-opening.',
      avatar: 'https://i.imgur.com/ZdJSK3Y.jpeg',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-robot"></i> AI Solutions Platform
          </Title>
          <Paragraph>
            Unlock the power of AI for your business with our comprehensive
            suite of services
          </Paragraph>
        </div>

        {/* Featured Services */}
        <Title level={2}>
          <i className="las la-star"></i> Featured Services
        </Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 48 }}>
          {services?.map(service => (
            <Col xs={24} sm={12} md={8} key={service.id}>
              <Card
                hoverable
                title={
                  <>
                    <i className="las la-cog"></i> {service.name}
                  </>
                }
              >
                <Paragraph>{service.description}</Paragraph>
                <Text type="secondary">Price: {service.price}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Membership Tiers */}
        <Title level={2}>
          <i className="las la-crown"></i> Membership Tiers
        </Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 48 }}>
          {membershipTiers?.map(tier => (
            <Col xs={24} sm={12} md={8} key={tier.id}>
              <Card
                hoverable
                title={
                  <>
                    <i className="las la-gem"></i> {tier.name}
                  </>
                }
              >
                <Paragraph>{tier.description}</Paragraph>
                <Text strong>Price: {tier.price}</Text>
                <div style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    onClick={() => navigate('/memberships')}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick AI Chat */}
        <Title level={2}>
          <i className="las la-comments"></i> Quick AI Assistant
        </Title>
        <Card style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <input
              style={{ flex: 1, padding: '8px' }}
              placeholder="Ask me anything..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
            />
            <Button type="primary" onClick={handleChatSubmit}>
              <i className="las la-paper-plane"></i> Send
            </Button>
          </div>
        </Card>

        {/* AI Readiness Assessment CTA */}
        <Card
          style={{"marginBottom":48,"textAlign":"center","background":"#fffff"}}
        >
          <Title level={3}>
            <i className="las la-clipboard-check"></i> Take the AI Readiness
            Assessment
          </Title>
          <Paragraph>
            Evaluate your organization's AI readiness and get personalized
            recommendations
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/assessment')}
          >
            Start Assessment
          </Button>
        </Card>

        {/* Testimonials */}
        <Title level={2}>
          <i className="las la-quote-right"></i> Success Stories
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={testimonials}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.author}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
    </PageLayout>
  )
}

import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ServicesPage() {
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch services with their membership tiers
  const { data: services, isLoading } = Api.service.findMany.useQuery({
    include: {
      serviceMembershipTiers: {
        include: {
          membershipTier: true,
        },
      },
    },
  })

  // Create support ticket for custom solutions
  const { mutateAsync: createTicket } = Api.supportTicket.create.useMutation()

  const handleCustomRequest = async (values: {
    subject: string
    description: string
    email: string
  }) => {
    try {
      await createTicket({
        data: {
          subject: values.subject,
          description: values.description,
          userEmail: values.email,
          status: 'OPEN',
        },
      })
      message.success('Your custom solution request has been submitted!')
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Failed to submit request. Please try again.')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>
            <i className="las la-robot" style={{ marginRight: 8 }} />
            AI Services
          </Title>
          <Paragraph>
            Discover our range of AI-powered solutions designed to transform
            your business
          </Paragraph>
        </div>

        {/* Available Services */}
        <Row gutter={[24, 24]}>
          {services?.map(service => (
            <Col xs={24} sm={12} lg={8} key={service.id}>
              <Card
                hoverable
                style={{ height: '100%' }}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => navigate('/consultations')}
                    icon={<i className="las la-calendar-check" />}
                  >
                    Schedule Consultation
                  </Button>,
                ]}
              >
                <Title level={4}>
                  <i className="las la-cog" style={{ marginRight: 8 }} />
                  {service.name}
                </Title>
                <Paragraph>{service.description}</Paragraph>
                <Text strong>
                  <i className="las la-tag" style={{ marginRight: 8 }} />
                  Price: {service.price || 'Contact for pricing'}
                </Text>
                <br />
                <Text type="secondary">
                  <i
                    className="las la-layer-group"
                    style={{ marginRight: 8 }}
                  />
                  Type: {service.type}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Custom Solutions Section */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Card>
            <Title level={3}>
              <i className="las la-lightbulb" style={{ marginRight: 8 }} />
              Need a Custom Solution?
            </Title>
            <Paragraph>
              We can create tailored AI solutions to meet your specific
              requirements
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<i className="las la-paper-plane" />}
              onClick={() => setIsModalVisible(true)}
            >
              Request Custom Solution
            </Button>
          </Card>
        </div>

        {/* Custom Solution Request Modal */}
        <Modal
          title="Request Custom AI Solution"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCustomRequest}>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input prefix={<i className="las la-heading" />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<i className="las la-envelope" />} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please describe your needs' },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

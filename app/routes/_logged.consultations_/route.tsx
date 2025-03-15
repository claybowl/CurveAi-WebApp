import {
  Typography,
  Card,
  Button,
  Table,
  Modal,
  Form,
  DatePicker,
  Input,
  Tabs,
  Empty,
  List,
  Space,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ConsultationHubPage() {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch consultations
  const { data: consultations, refetch } = Api.consultation.findMany.useQuery(
    user
      ? {
          where: { userId: user.id },
          include: { consultant: true, messages: true },
        }
      : undefined,
  )

  // Fetch assessments for scheduling
  const { data: assessments } = Api.assessment.findMany.useQuery(
    user
      ? {
          where: { userId: user.id },
        }
      : undefined,
  )

  // Create consultation mutation
  const { mutateAsync: createConsultation } =
    Api.consultation.create.useMutation()

  // Handle consultation scheduling
  const handleSchedule = async (values: any) => {
    if (!user?.id) {
      return
    }

    try {
      await createConsultation({
        data: {
          userId: user.id,
          assessmentId: values.assessmentId,
          consultantId: values.consultantId,
          scheduledAt: values.scheduledAt,
          status: 'SCHEDULED',
          notes: values.notes,
        },
      })
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Error scheduling consultation:', error)
    }
  }

  const consultationColumns = [
    {
      title: 'Date',
      dataIndex: 'scheduledAt',
      key: 'scheduledAt',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY h:mm A'),
    },
    {
      title: 'Consultant',
      dataIndex: 'consultant',
      key: 'consultant',
      render: (consultant: any) => consultant?.name || 'Not assigned',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Title level={2}>
            <i className="las la-comments"></i> Consultation Hub
          </Title>
          <Text>Schedule and manage your AI consultation sessions</Text>
        </div>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <i className="las la-calendar"></i> Consultations
                </span>
              ),
              children: (
                <Card>
                  <div style={{ marginBottom: 16, textAlign: 'right' }}>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                      <i className="las la-plus"></i> Schedule Consultation
                    </Button>
                  </div>
                  <Table
                    dataSource={consultations}
                    columns={consultationColumns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <i className="las la-file-alt"></i> Materials
                </span>
              ),
              children: (
                <Card>
                  {consultations?.length ? (
                    <List
                      itemLayout="horizontal"
                      dataSource={consultations}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<i className="las la-file-pdf la-2x"></i>}
                            title={`Consultation Materials - ${dayjs(
                              item.scheduledAt,
                            ).format('MMMM D, YYYY')}`}
                            description={item.notes}
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty description="No consultation materials available" />
                  )}
                </Card>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                  <i className="las la-comment-dots"></i> Chat History
                </span>
              ),
              children: (
                <Card>
                  {consultations?.length ? (
                    consultations?.map(consultation => (
                      <Card key={consultation.id} style={{ marginBottom: 16 }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Text strong>
                            Session Date:{' '}
                            {dayjs(consultation.scheduledAt).format(
                              'MMMM D, YYYY',
                            )}
                          </Text>
                          {consultation.messages?.map(message => (
                            <Card
                              key={message.id}
                              size="small"
                              style={{ marginBottom: 8 }}
                            >
                              <Text>{message.content}</Text>
                            </Card>
                          ))}
                        </Space>
                      </Card>
                    ))
                  ) : (
                    <Empty description="No chat history available" />
                  )}
                </Card>
              ),
            },
          ]}
        />

        <Modal
          title="Schedule Consultation"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSchedule} layout="vertical">
            <Form.Item
              name="assessmentId"
              label="Select Assessment"
              rules={[
                { required: true, message: 'Please select an assessment' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="scheduledAt"
              label="Select Date & Time"
              rules={[
                { required: true, message: 'Please select date and time' },
              ]}
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Schedule Consultation
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}

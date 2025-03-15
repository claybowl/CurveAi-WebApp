import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Button,
  Tag,
  Space,
  Statistic,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const navigate = useNavigate()

  // Fetch data
  const { data: users } = Api.user.findMany.useQuery({})
  const { data: assessments } = Api.assessment.findMany.useQuery({
    include: { user: true },
  })
  const { data: resources } = Api.resource.findMany.useQuery({})
  const { data: consultations } = Api.consultation.findMany.useQuery({
    include: { user: true, consultant: true },
  })
  const { data: chats } = Api.chat.findMany.useQuery({
    include: { user: true },
  })

  // Table columns
  const userColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'VERIFIED' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/users/${record.id}`)}>
            <i className="las la-edit"></i> Edit
          </Button>
        </Space>
      ),
    },
  ]

  const assessmentColumns = [
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'userName',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => score?.toString() || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'COMPLETED' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>Admin Dashboard</Title>
        <Text>Manage users, content, and monitor platform activities</Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={users?.length || 0}
                prefix={<i className="las la-users"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Assessments"
                value={assessments?.length || 0}
                prefix={<i className="las la-clipboard-list"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Resources"
                value={resources?.length || 0}
                prefix={<i className="las la-book"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Consultations"
                value={consultations?.length || 0}
                prefix={<i className="las la-calendar"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-users"></i> User Management
                </>
              }
              extra={
                <Button type="primary" onClick={() => navigate('/users/new')}>
                  <i className="las la-plus"></i> Add User
                </Button>
              }
            >
              <Table
                columns={userColumns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-clipboard-list"></i> Recent Assessments
                </>
              }
            >
              <Table
                columns={assessmentColumns}
                dataSource={assessments}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-robot"></i> Chatbot Interactions
                </>
              }
            >
              <Table
                columns={[
                  {
                    title: 'User',
                    dataIndex: ['user', 'name'],
                    key: 'userName',
                  },
                  { title: 'Content', dataIndex: 'content', key: 'content' },
                  {
                    title: 'Date',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (date: string) =>
                      dayjs(date).format('YYYY-MM-DD HH:mm'),
                  },
                ]}
                dataSource={chats}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

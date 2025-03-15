import { Typography, Card, Row, Col, Statistic, List, Button, Tag } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MemberDashboardPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()

  // Fetch membership tier data
  const { data: membershipTiers } = Api.membershipTier.findMany.useQuery({})

  // Fetch user's consultations
  const { data: consultations } = Api.consultation.findMany.useQuery({
    where: { userId: user?.id },
    include: { consultant: true },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch support tickets
  const { data: tickets } = Api.ticket.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-user-circle" style={{ marginRight: 8 }}></i>
          Member Dashboard
        </Title>
        <Text type="secondary">
          Welcome back! Manage your membership, track consultations, and access
          support.
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {/* Membership Status */}
          <Col xs={24} md={12}>
            <Card
              title={
                <span>
                  <i className="las la-crown" style={{ marginRight: 8 }}></i>
                  Membership Status
                </span>
              }
            >
              <Statistic
                title="Current Plan"
                value={membershipTiers?.[0]?.name || 'Free'}
                prefix={<i className="las la-star"></i>}
              />
              <Button
                type="primary"
                style={{ marginTop: 16 }}
                onClick={() => navigate('/memberships')}
              >
                Manage Subscription
              </Button>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col xs={24} md={12}>
            <Card
              title={
                <span>
                  <i className="las la-bolt" style={{ marginRight: 8 }}></i>
                  Quick Actions
                </span>
              }
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Button
                    block
                    icon={<i className="las la-comments"></i>}
                    onClick={() => navigate('/chat')}
                  >
                    Dev Chat
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<i className="las la-calendar-check"></i>}
                    onClick={() => navigate('/consultations')}
                  >
                    Book Consultation
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<i className="las la-book"></i>}
                    onClick={() => navigate('/resources')}
                  >
                    Resources
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    block
                    icon={<i className="las la-question-circle"></i>}
                    onClick={() => navigate('/support')}
                  >
                    Support
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Recent Consultations */}
          <Col xs={24} lg={14}>
            <Card
              title={
                <span>
                  <i className="las la-history" style={{ marginRight: 8 }}></i>
                  Recent Consultations
                </span>
              }
            >
              <List
                dataSource={consultations?.slice(0, 5)}
                renderItem={consultation => (
                  <List.Item>
                    <List.Item.Meta
                      title={`Consultation with ${consultation.consultant?.name}`}
                      description={dayjs(consultation.createdAt).format(
                        'MMM D, YYYY',
                      )}
                    />
                    <Tag
                      color={
                        consultation.status === 'COMPLETED' ? 'green' : 'blue'
                      }
                    >
                      {consultation.status}
                    </Tag>
                  </List.Item>
                )}
                locale={{ emptyText: 'No consultations yet' }}
              />
            </Card>
          </Col>

          {/* Support Tickets */}
          <Col xs={24} lg={10}>
            <Card
              title={
                <span>
                  <i
                    className="las la-ticket-alt"
                    style={{ marginRight: 8 }}
                  ></i>
                  Support Tickets
                </span>
              }
            >
              <List
                dataSource={tickets?.slice(0, 5)}
                renderItem={ticket => (
                  <List.Item>
                    <List.Item.Meta
                      title={ticket.subject}
                      description={dayjs(ticket.createdAt).format(
                        'MMM D, YYYY',
                      )}
                    />
                    <Tag color={ticket.status === 'OPEN' ? 'gold' : 'green'}>
                      {ticket.status}
                    </Tag>
                  </List.Item>
                )}
                locale={{ emptyText: 'No support tickets' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}

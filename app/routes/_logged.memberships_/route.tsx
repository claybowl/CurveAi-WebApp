import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function MembershipsPage() {
  const { user } = useUserContext()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Fetch membership tiers
  const { data: membershipTiers, isLoading } =
    Api.membershipTier.findMany.useQuery({
      include: {
        resources: true,
        serviceMembershipTiers: {
          include: {
            service: true,
          },
        },
      },
    })

  // Create payment link mutation
  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const handleUpgrade = async (tierId: string) => {
    try {
      const paymentLink = await createPaymentLink({ productId: tierId })
      window.location.href = paymentLink.url
    } catch (error) {
      message.error('Failed to process upgrade request')
    }
  }

  const showBenefitsModal = (tierId: string) => {
    setSelectedTier(tierId)
    setIsModalVisible(true)
  }

  const selectedTierData = membershipTiers?.find(
    tier => tier.id === selectedTier,
  )

  const columns = [
    {
      title: 'Tier',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => (
        <Text>
          <i className="las la-dollar-sign" /> {price}
        </Text>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="primary"
            icon={<i className="las la-arrow-up" />}
            onClick={() => handleUpgrade(record.id)}
          >
            Upgrade
          </Button>
          <Button
            icon={<i className="las la-list" />}
            onClick={() => showBenefitsModal(record.id)}
          >
            Benefits
          </Button>
        </div>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title level={2}>
              <i className="las la-crown" /> Membership Tiers
            </Title>
            <Text type="secondary">
              Compare our membership tiers and choose the one that best fits
              your needs
            </Text>
          </Col>

          <Col span={24}>
            <Card loading={isLoading}>
              <Table
                dataSource={membershipTiers}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title={`Benefits - ${selectedTierData?.name}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedTierData && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <Text strong>Included Resources:</Text>
                <div style={{ marginTop: 8 }}>
                  {selectedTierData.resources?.map(resource => (
                    <Tag key={resource.id} color="blue" style={{ margin: 4 }}>
                      <i className="las la-book" /> {resource.title}
                    </Tag>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <Text strong>Available Services:</Text>
                <div style={{ marginTop: 8 }}>
                  {selectedTierData.serviceMembershipTiers?.map(smt => (
                    <Tag key={smt.id} color="green" style={{ margin: 4 }}>
                      <i className="las la-check-circle" /> {smt.service?.name}
                    </Tag>
                  ))}
                </div>
              </div>

              {selectedTierData.benefits && (
                <div>
                  <Text strong>Additional Benefits:</Text>
                  <Text>{selectedTierData.benefits}</Text>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </PageLayout>
  )
}

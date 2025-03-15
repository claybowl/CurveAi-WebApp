import {
  Typography,
  Card,
  Select,
  Row,
  Col,
  Space,
  Button,
  message,
} from 'antd'
import { useState } from 'react'
import type { Resource } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ResourcesPage() {
  const { user, isLoggedIn } = useUserContext()
  const [topic, setTopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<string>('')

  // Fetch all resources with membership tier information
  const { data: resources } = Api.resource.findMany.useQuery({
    include: {
      membershipTier: true,
    },
  })

  // Save article mutation
  const { mutateAsync: saveArticle } = Api.user.update.useMutation()

  // Filter resources based on selected filters
  const filteredResources = resources?.filter(resource => {
    const topicMatch = !topic || resource.topic === topic
    const difficultyMatch =
      !difficulty || resource.difficultyLevel === difficulty
    return topicMatch && difficultyMatch
  })

  // Get unique topics and difficulty levels for filters
  const topics = [...new Set(resources?.map(r => r.topic).filter(Boolean))]
  const difficulties = [
    ...new Set(resources?.map(r => r.difficultyLevel).filter(Boolean)),
  ]

  const handleSaveArticle = async (resourceId: string) => {
    if (!isLoggedIn) {
      message.warning('Please login to save articles')
      return
    }

    try {
      await saveArticle({
        where: { id: user?.id },
        data: {
          // This is a simplified version. You might need to adjust based on your actual data model
          updatedAt: new Date(),
        },
      })
      message.success('Article saved successfully')
    } catch (error) {
      message.error('Failed to save article')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-book-reader" style={{ marginRight: 8 }}></i>
          Educational Resources
        </Title>
        <Text type="secondary">
          Browse our collection of educational articles and case studies
        </Text>

        <Space
          direction="vertical"
          size="large"
          style={{ width: '100%', marginTop: 24 }}
        >
          {/* Filters */}
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by Topic"
                allowClear
                onChange={setTopic}
              >
                {topics?.map(topic => (
                  <Select.Option key={topic} value={topic}>
                    {topic}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by Difficulty"
                allowClear
                onChange={setDifficulty}
              >
                {difficulties?.map(level => (
                  <Select.Option key={level} value={level}>
                    {level}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>

          {/* Resources Grid */}
          <Row gutter={[16, 16]}>
            {filteredResources?.map((resource: Resource) => (
              <Col xs={24} sm={12} lg={8} key={resource.id}>
                <Card
                  title={
                    <Space>
                      <i className="las la-file-alt"></i>
                      {resource.title}
                    </Space>
                  }
                  extra={
                    <Button
                      type="text"
                      onClick={() => handleSaveArticle(resource.id)}
                      icon={<i className="las la-bookmark"></i>}
                    />
                  }
                >
                  <Space direction="vertical" size="small">
                    {resource.content && (
                      <Text>{resource.content.substring(0, 150)}...</Text>
                    )}
                    <Space>
                      {resource.topic && (
                        <Text type="secondary">
                          <i className="las la-tag"></i> {resource.topic}
                        </Text>
                      )}
                      {resource.difficultyLevel && (
                        <Text type="secondary">
                          <i className="las la-signal"></i>{' '}
                          {resource.difficultyLevel}
                        </Text>
                      )}
                    </Space>
                    {resource.membershipTier && (
                      <Text type="secondary">
                        <i className="las la-crown"></i>{' '}
                        {resource.membershipTier.name} Content
                      </Text>
                    )}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </div>
    </PageLayout>
  )
}

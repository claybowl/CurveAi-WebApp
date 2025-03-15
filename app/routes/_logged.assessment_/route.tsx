import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Progress,
  Radio,
  Space,
  Typography,
} from 'antd'
import { useState } from 'react'
const { Title, Paragraph } = Typography

export default function AIAssessmentPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [score, setScore] = useState<number>(0)
  const [showResults, setShowResults] = useState(false)

  const createAssessment = Api.assessment.create.useMutation()
  const createConsultation = Api.consultation.create.useMutation()
  const { data: assessments } = Api.assessment.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  const questions = [
    {
      id: 'Q1',
      question: 'Does your company have a website?',
      type: 'yes_no',
      options: [
        { label: 'Yes', value: 5 },
        { label: 'No', value: 0 },
      ],
      weight: 5,
    },
    {
      id: 'Q2',
      question: 'How big is your team?',
      type: 'multiple_choice',
      options: [
        { label: '1-5', value: 1 },
        { label: '6-20', value: 2 },
        { label: '21-50', value: 3 },
        { label: '51-100', value: 4 },
        { label: '100+', value: 5 },
      ],
      weight: 5,
    },
    {
      id: 'Q3',
      question: 'Which of these tools do you already use in your business?',
      type: 'checkbox_multiple_select',
      options: [
        { label: 'Spreadsheets', value: 1 },
        { label: 'CRM', value: 1 },
        { label: 'Accounting Software', value: 1 },
        { label: 'None of the above', value: 0 },
      ],
      weight: 4,
    },
    {
      id: 'Q4',
      question: 'What industry does your business belong to?',
      type: 'free_text',
      weight: 3,
    },
    {
      id: 'Q5',
      question: 'How familiar are you with AI technologies?',
      type: 'multiple_choice',
      options: [
        { label: 'Very familiar', value: 3 },
        { label: 'Somewhat familiar', value: 2 },
        { label: 'Not familiar at all', value: 1 },
      ],
      weight: 5,
    },
    {
      id: 'Q6',
      question: 'Do you currently automate any business tasks?',
      type: 'multiple_choice',
      options: [
        { label: 'Yes, many tasks', value: 3 },
        { label: 'Yes, a few tasks', value: 2 },
        { label: 'No, we do everything manually', value: 1 },
      ],
      weight: 5,
    },
    {
      id: 'Q7',
      question: 'How do you collect information about your customers?',
      type: 'checkbox_multiple_select',
      options: [
        { label: 'Surveys', value: 1 },
        { label: 'Websites', value: 1 },
        { label: 'Sales Interactions', value: 1 },
        { label: "We don't collect customer information", value: 0 },
      ],
      weight: 4,
    },
    {
      id: 'Q8',
      question: 'Where do you store important business data?',
      type: 'checkbox_multiple_select',
      options: [
        { label: 'Paper records', value: 1 },
        { label: 'Digital files (e.g., Excel)', value: 2 },
        { label: 'Cloud Storage', value: 3 },
        { label: 'Other (please specify)', value: 1 },
      ],
      weight: 4,
    },
    {
      id: 'Q9',
      question: 'How open is your team to trying new technology?',
      type: 'multiple_choice',
      options: [
        { label: 'Very open', value: 4 },
        { label: 'Somewhat open', value: 3 },
        { label: 'Neutral', value: 2 },
        { label: 'Not very open', value: 1 },
      ],
      weight: 5,
    },
    {
      id: 'Q10',
      question: 'Does your business plan include using technology for growth?',
      type: 'multiple_choice',
      options: [
        { label: "Yes, it's a big part!", value: 4 },
        { label: 'Yes, somewhat.', value: 3 },
        { label: "We're considering it.", value: 2 },
        { label: 'No, not at all.', value: 1 },
      ],
      weight: 5,
    },
    {
      id: 'Q11',
      question:
        "What are the biggest challenges you're facing in your business?",
      type: 'checkbox_multiple_select',
      options: [
        { label: 'Customer engagement', value: 1 },
        { label: 'Process efficiency', value: 1 },
        { label: 'Data management', value: 1 },
        { label: 'Financial planning', value: 1 },
        { label: 'Other (please specify)', value: 1 },
      ],
      weight: 4,
    },
    {
      id: 'Q12',
      question: 'What would you like AI to help you achieve?',
      type: 'checkbox_multiple_select',
      options: [
        { label: 'Train employees', value: 1 },
        { label: 'Improve customer service', value: 1 },
        { label: 'Automate tedious tasks', value: 1 },
        { label: 'Gain business insights', value: 1 },
        { label: 'Other (please specify)', value: 1 },
      ],
      weight: 5,
    },
    {
      id: 'Q13',
      question: 'What types of tasks are you hoping to automate with AI?',
      type: 'free_text',
      weight: 5,
    },
    {
      id: 'Q14',
      question: 'What is your top priority in the next 6 months?',
      type: 'free_text',
      weight: 4,
    },
    {
      id: 'Q15',
      question:
        'Please provide an estimate of when you would be available to work with us to add AI to your business.',
      type: 'free_text',
      weight: 3,
    },
  ]

  const calculateScore = (values: Record<string, number>): number => {
    let weightedPoints = 0
    let maxPossiblePoints = 0

    questions.forEach((q, index) => {
      const questionId = `q${index + 1}`
      const answer = values[questionId]

      if (q.type === 'checkbox_multiple_select') {
        // For multiple select, sum up all selected values
        const selectedValues = Array.isArray(answer) ? answer : [answer]
        weightedPoints +=
          selectedValues.reduce((sum, val) => sum + Number(val), 0) * q.weight
        maxPossiblePoints +=
          q.options?.reduce((max, opt) => max + Number(opt.value), 0) * q.weight
      } else if (q.type === 'free_text') {
        // For free text, give full points if answered
        weightedPoints += answer ? q.weight : 0
        maxPossiblePoints += q.weight
      } else {
        // For yes/no and multiple choice
        weightedPoints += Number(answer) * q.weight
        maxPossiblePoints +=
          (q.options ? Math.max(...q.options.map(o => Number(o.value))) : 1) *
          q.weight
      }
    })

    return (weightedPoints / maxPossiblePoints) * 100
  }

  const getFeedback = (score: number): string => {
    if (score >= 75)
      return "Excellent AI readiness! You're well-positioned to implement AI solutions."
    if (score >= 50)
      return 'Good foundation for AI implementation, but some areas need improvement.'
    if (score >= 25)
      return 'Basic AI readiness. Consider strengthening your infrastructure and knowledge.'
    return 'Limited AI readiness. We recommend starting with fundamental improvements.'
  }

  const handleSubmit = async (values: Record<string, number>) => {
    const calculatedScore = calculateScore(values)
    setScore(calculatedScore)
    setShowResults(true)

    try {
      const assessment = await createAssessment.mutateAsync({
        data: {
          score: calculatedScore,
          status: 'COMPLETED',
          feedback: getFeedback(calculatedScore),
          userId: user?.id || '',
        },
      })

      if (assessment) {
        Modal.success({
          title: 'Assessment Saved Successfully',
          content: 'Your AI readiness assessment has been saved.',
          okText: 'Close',
        })
      }
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to save assessment results.',
      })
    }
  }

  const requestConsultation = async () => {
    try {
      if (assessments && assessments[0]) {
        await createConsultation.mutateAsync({
          data: {
            status: 'PENDING',
            userId: user?.id || '',
            assessmentId: assessments[0].id,
            consultantId: 'default-consultant-id',
          },
        })

        Modal.success({
          title: 'Consultation Requested',
          content: 'We will contact you soon to schedule your consultation.',
          onOk: () => navigate('/consultations'),
        })
      }
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to request consultation.',
      })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-robot" style={{ marginRight: 8 }}></i>
          AI Readiness Assessment
        </Title>
        <Paragraph>
          Evaluate your organization's readiness for AI implementation by
          completing this questionnaire. Your responses will help us provide
          targeted recommendations.
        </Paragraph>

        {!showResults ? (
          <Card>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              {questions?.map((q, index) => (
                <Form.Item
                  key={index}
                  name={`q${index + 1}`}
                  label={q.question}
                  rules={[
                    { required: true, message: 'Please select an answer' },
                  ]}
                >
                  {q.type === 'checkbox_multiple_select' ? (
                    <Checkbox.Group>
                      <Space direction="vertical">
                        {q.options?.map((opt, optIndex) => (
                          <Checkbox key={optIndex} value={opt.value}>
                            {opt.label}
                          </Checkbox>
                        ))}
                      </Space>
                    </Checkbox.Group>
                  ) : q.type === 'free_text' ? (
                    <Input.TextArea rows={4} />
                  ) : (
                    <Radio.Group>
                      <Space direction="vertical">
                        {q.options?.map((opt, optIndex) => (
                          <Radio key={optIndex} value={opt.value}>
                            {opt.label}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  )}
                </Form.Item>
              ))}
              <Button
                type="primary"
                htmlType="submit"
                icon={<i className="las la-check"></i>}
              >
                Submit Assessment
              </Button>
            </Form>
          </Card>
        ) : (
          <Card>
            <Title level={3}>Your AI Readiness Score</Title>
            <Progress
              type="circle"
              percent={Math.round(score)}
              status={
                score >= 75 ? 'success' : score >= 50 ? 'normal' : 'exception'
              }
            />
            <Paragraph style={{ marginTop: 20 }}>
              {getFeedback(score)}
            </Paragraph>
            <Space>
              <Button
                type="primary"
                onClick={requestConsultation}
                icon={<i className="las la-calendar-check"></i>}
              >
                Request Consultation
              </Button>
              <Button
                onClick={() => {
                  setShowResults(false)
                  form.resetFields()
                }}
                icon={<i className="las la-redo"></i>}
              >
                Retake Assessment
              </Button>
            </Space>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}

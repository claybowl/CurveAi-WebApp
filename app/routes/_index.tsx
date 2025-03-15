import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Problem Identification`,
      description: `We conduct interviews and focus groups to identify specific problems AI can solve for your business.`,
      icon: <i className="las la-search"></i>,
    },
    {
      heading: `Prototype Development`,
      description: `We build low-fidelity AI prototypes focused on automating specific tasks for your business.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Pilot Program`,
      description: `Test our solutions with minimal investment through our pilot program with detailed performance tracking.`,
      icon: <i className="las la-flask"></i>,
    },
    {
      heading: `Success Metrics`,
      description: `Clear measurement of solution effectiveness, usability, and business impact.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Community Focus`,
      description: `Regular workshops and webinars to share knowledge and experience with the local business community.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Sustainable Growth`,
      description: `Solutions designed for iterative improvement and efficient scaling with existing infrastructure.`,
      icon: <i className="las la-seedling"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Clayton Christian`,
      designation: `CTO`,
      content: `Clayton is a machine learning graduate from Tulsa, OK. Loves music, quantitative analysis for financial markets, and machine learning. Entrepreneur. Native Tulsan.`,
      avatar: 'https://i.ibb.co/pPkLM5v/clayton-gucci-suit.webp',
    },
    {
      name: `Austin Belcheff`,
      designation: `CEO`,
      content: `Austin has a business degree from Oklahoma State University, music producer, entrepreneur.`,
      avatar: 'https://i.ibb.co/XFm4zx1/aus-tin.png',
    },
    {
      name: `Heather Hayes`,
      designation: `COO`,
      content: `Heather is a Full-Stack Software Engineer, native Tulsan, experienced project management and coordination. also a graduate of Atlas School.`,
      avatar: 'https://i.ibb.co/sb02Bst/heather.png',
    },
    {
      name: `Brayden Vernon`,
      designation: `CIO`,
      content: `Brayden is a Full-Stack software engineer from Tulsa, Ok. Graduate of Atlas School. Technologist.`,
      avatar: 'https://i.ibb.co/b5F9dnJ/95768087.png',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Alpha Wave`,
      description: `Perfect for businesses starting their AI journey`,
      monthly: 29,
      yearly: 290,
      features: [
        `Access to our basic AI-powered support system`,
        `Limited to 10 concurrent chats at a time`,
        `Limited to 1 hour of AI-powered support per month`,
        `Limited to 1 custom integration per month`,
      ],
    },
    {
      title: `Beta Wave`,
      description: `Ideal for growing businesses ready to implement AI`,
      monthly: 99,
      yearly: 990,
      features: [
        `Access to our advanced AI-powered support system`,
        `Unlimited concurrent chats at a time`,
        `Unlimited hours of AI-powered support per month`,
        `Unlimited custom integrations per month`,
        `Access to our premium support team`,
      ],
      highlight: true,
    },
    {
      title: `Theta Wave`,
      description: `For enterprises seeking full AI transformation`,
      monthly: 499,
      yearly: 4990,
      features: [
        `Access to our enterprise-level AI-powered support system`,
        `Customizable support experience for your business`,
        `Dedicated support team for your business`,
        `Advanced analytics and reporting for your business`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can we implement AI in our business?`,
      answer: `Implementation timeline varies based on your current readiness and goals. Typically, our clients see initial results within 2-3 months.`,
    },
    {
      question: `Do we need technical expertise to use your platform?`,
      answer: `No technical expertise is required. Our platform is designed to guide you through the process, regardless of your technical background.`,
    },
    {
      question: `What kind of support do you provide?`,
      answer: `We offer multi-channel support including direct developer access, AI-powered chatbot assistance, and comprehensive documentation.`,
    },
    {
      question: `Can we upgrade our plan as we grow?`,
      answer: `Yes, you can seamlessly upgrade your plan at any time as your AI needs evolve.`,
    },
  ]

  const steps = [
    {
      heading: `Identify`,
      description: `We work with you to identify specific problems that AI can solve in your business.`,
    },
    {
      heading: `Prototype`,
      description: `We develop and test AI solutions tailored to your specific needs.`,
    },
    {
      heading: `Validate`,
      description: `Through our pilot program, we ensure the solution delivers measurable value.`,
    },
    {
      heading: `Scale`,
      description: `Successfully validated solutions are refined and scaled for broader implementation.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🎯`,
      title: `AI education often targets technical experts only`,
    },
    {
      emoji: `🔄`,
      title: `Rapid AI development creates knowledge gaps`,
    },
    {
      emoji: `💡`,
      title: `Limited examples of AI benefits for small businesses`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Building AI Solutions for Small Businesses`}
        subtitle={`Starting in Tulsa, OK and scaling outward, we create accessible AI tools and solutions for businesses regardless of technical expertise.`}
        buttonText={`Start Your AI Journey`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/ROpiBj-curveaisolutions-AV5z`}
      />
      <LandingSocialProof title={`Trusted By Industry Leaders`} />
      <LandingPainPoints
        title={`Small businesses need accessible AI solutions to stay competitive`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Path to Successful AI Implementation`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need for Successful AI Integration`}
        subtitle={`From assessment to implementation, we provide the tools and expertise for your AI transformation`}
        features={features}
      />
      <LandingTestimonials
        title={`Meet Our Team`}
        subtitle={`Our leadership team brings years of experience in AI implementation and business transformation`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your AI Future`}
        subtitle={`Choose the plan that matches your AI ambitions`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AI Implementation`}
        subtitle={`Get answers to your AI transformation questions`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Lead in the AI Era?`}
        subtitle={`Join successful businesses that are already transforming with AI`}
        buttonText={`Begin Your AI Journey`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}

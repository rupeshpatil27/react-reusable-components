import Timeline from "./component/Timeline";

const App = () => {
  const data = [
    {
      title: "Full-Stack Developer",
      job: "FinTech Startup",
      date: "2019-2021",
      contents: [
        "Developed end-to-end features for a digital wallet application using React, Node.js, and PostgreSQL.",
        "Implemented real-time transaction updates using WebSockets and Redis pub/sub.",
        "Improved application performance by optimizing database queries and reducing API response times by 40%.",
        "Integrated third-party payment gateways including Stripe and PayPal for seamless transactions.",
        "Worked closely with UX designers to create responsive, mobile-first designs.",
      ],
    },
    {
      title: "DevOps Engineer",
      job: "Cloud Services Provider",
      date: "2021-2022",
      contents: [
        "Built CI/CD pipelines using GitLab and Jenkins to streamline deployment processes across microservices.",
        "Managed infrastructure using Terraform and AWS CloudFormation.",
        "Monitored system health and availability using Prometheus and Grafana.",
        "Reduced infrastructure costs by 20% through containerization and auto-scaling with Kubernetes.",
        "Ensured high availability and disaster recovery strategies for critical services.",
      ],
    },
    {
      title: "Machine Learning Engineer",
      job: "Healthcare Tech Company",
      date: "2022-2023",
      contents: [
        "Designed predictive models for early disease detection using Python, scikit-learn, and TensorFlow.",
        "Processed large-scale medical data from multiple sources using Apache Spark and Pandas.",
        "Collaborated with medical experts to fine-tune feature engineering and model evaluation.",
        "Deployed ML models as RESTful APIs using FastAPI and Docker.",
        "Created dashboards to visualize prediction metrics and patient insights with Streamlit and Plotly.",
      ],
    },
    {
      title: "Front-End Developer",
      job: "E-Commerce Platform",
      date: "2023-2024",
      contents: [
        "Built scalable, modular React components using TypeScript and styled-components.",
        "Improved page load speed by 50% through code-splitting and lazy loading strategies.",
        "Integrated payment workflows with Stripe and Apple Pay.",
        "Collaborated in Agile sprints with designers and back-end engineers to release weekly updates.",
        "Implemented accessibility (a11y) best practices to comply with WCAG 2.1 standards.",
      ],
    },
    {
      title: "AI Chatbot Developer",
      job: "Tech Consultancy",
      date: "2024-Present",
      contents: [
        "Developed custom AI chatbots using Rasa and OpenAI APIs for enterprise clients.",
        "Integrated bots with CRM systems like Salesforce and HubSpot via secure REST APIs.",
        "Trained NLP models for intent recognition and entity extraction using spaCy.",
        "Maintained conversation logs and analytics for performance improvement.",
        "Ensured GDPR compliance in data handling and user interactions.",
      ],
    },
  ];

  return (
    <>
      <div className="min-h-[50vh]"></div>
      <div className="sm:px-10 px-5 lg:px-15 min-h-screen pt-20 md:pt-30 z-10">
        <h2 className="font-bold text-3xl md:text-4xl text-center">Timeline</h2>
        <Timeline data={data} />
      </div>
      <div className="min-h-[50vh]"></div>
    </>
  );
};

export default App;

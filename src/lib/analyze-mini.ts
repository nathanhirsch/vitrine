export type Signal = {
  email_id: number;
  email: string;
  theme: string;
  emotion: string;
  intent: string;
};

export type Cluster = {
  cluster_id: number;
  label: string;
  summary: string;
  email_ids: number[];
  product_recommendation: string;
};

export type AnalyzeMiniResult = {
  signals: Signal[];
  clusters: Cluster[];
};

export const DEMO_ANALYZE_RESULT: AnalyzeMiniResult = {
  signals: [
    {
      email_id: 1,
      email:
        "I keep missing important account alerts. The notifications are buried and I only discover issues days later.",
      theme: "Notification reliability",
      emotion: "Frustrated",
      intent: "Wants clearer, prioritized alerts",
    },
    {
      email_id: 2,
      email:
        "The mobile app feels slow when I switch between customer records. I avoid using it on the go now.",
      theme: "Mobile performance",
      emotion: "Disappointed",
      intent: "Needs faster in-app navigation",
    },
    {
      email_id: 3,
      email:
        "Setup was confusing. I had to ask support twice to understand how to connect my data source.",
      theme: "Onboarding friction",
      emotion: "Confused",
      intent: "Needs guided setup assistance",
    },
    {
      email_id: 4,
      email:
        "I love the reporting depth, but exporting weekly summaries to my team takes too many manual steps.",
      theme: "Workflow automation gap",
      emotion: "Positive but blocked",
      intent: "Wants automated recurring exports",
    },
    {
      email_id: 5,
      email:
        "Your support team is great, but I still cannot find where to tune alert thresholds from the dashboard.",
      theme: "Feature discoverability",
      emotion: "Mildly frustrated",
      intent: "Wants easier settings navigation",
    },
  ],
  clusters: [
    {
      cluster_id: 1,
      label: "Critical Signals Hidden",
      summary:
        "Users miss high-priority events because notification controls and visibility are unclear.",
      email_ids: [1, 5],
      product_recommendation:
        "Introduce a centralized alert center with severity levels and guided threshold presets.",
    },
    {
      cluster_id: 2,
      label: "Activation & Efficiency Friction",
      summary:
        "Users struggle with setup and repeated manual work, reducing daily product usage.",
      email_ids: [3, 4],
      product_recommendation:
        "Launch a setup wizard and one-click scheduled exports for common reporting workflows.",
    },
    {
      cluster_id: 3,
      label: "Mobile Experience Risk",
      summary:
        "Slow mobile transitions are creating avoidance behavior and reducing engagement in the field.",
      email_ids: [2],
      product_recommendation:
        "Prioritize mobile performance optimizations for record switching and prefetch key views.",
    },
  ],
};

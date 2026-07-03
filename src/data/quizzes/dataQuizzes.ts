import { QuizQuestion } from '../../types/academy';

// Course 5: NDN-DATA-502 — 6 modules × 3 questions

export const DATA_QUIZZES: QuizQuestion[] = [
  // ── Module 1 ──
  {
    id: "quiz-data-1-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "code_output",
    difficulty: "medium",
    question: "Table events has 50 columns and 10 TB of data. What does this query cost compared to selecting two columns?",
    codeSnippet: `SELECT * FROM ndn.analytics.events LIMIT 10;`,
    options: [
      { key: "A", text: "Almost nothing — LIMIT 10 means only 10 rows are read." },
      { key: "B", text: "The full ~10 TB scan is billed: columnar storage bills by columns READ, and LIMIT does not reduce the scan; selecting two columns would scan a small fraction." },
      { key: "C", text: "Exactly 10 rows × 50 columns of bytes." },
      { key: "D", text: "Queries with LIMIT are free." }
    ],
    correctAnswer: "B",
    explanation: "BigQuery reads the referenced columns in full (modulo partition pruning) before applying LIMIT. SELECT * on wide tables is the classic four-figure billing mistake.",
    technicalResources: [{ name: "On-Demand Pricing", url: "https://cloud.google.com/bigquery/pricing#on_demand_pricing", type: "docs" }]
  },
  {
    id: "quiz-data-1-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which property of a BigQuery dataset is permanent at creation?",
    options: [
      { key: "A", text: "Its description." },
      { key: "B", text: "Its region — and cross-region queries/joins aren't possible, so placement is a day-one architectural decision." },
      { key: "C", text: "Its table count." },
      { key: "D", text: "Its default table expiration." }
    ],
    correctAnswer: "B",
    explanation: "Dataset location is immutable; moving means copying data to a new dataset. Co-locate datasets that must join, and put them near their consumers.",
    technicalResources: [{ name: "Dataset Locations", url: "https://cloud.google.com/bigquery/docs/locations", type: "docs" }]
  },
  {
    id: "quiz-data-1-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Which built-in tool answers 'who scanned the most bytes this week and with which query'?",
    options: [
      { key: "A", text: "The Firebase Console." },
      { key: "B", text: "INFORMATION_SCHEMA.JOBS — queryable job metadata including user, bytes processed, and SQL text." },
      { key: "C", text: "Cloud Trace." },
      { key: "D", text: "It requires a support ticket." }
    ],
    correctAnswer: "B",
    explanation: "The warehouse self-reports: INFORMATION_SCHEMA jobs views make cost auditing an ordinary SQL query.",
    technicalResources: [{ name: "JOBS Views", url: "https://cloud.google.com/bigquery/docs/information-schema-jobs", type: "docs" }]
  },

  // ── Module 2 ──
  {
    id: "quiz-data-2-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "code_output",
    difficulty: "hard",
    question: "What does this query return for each course?",
    codeSnippet: `SELECT student_id, course_id, score\nFROM ndn.academy.quiz_attempts\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY course_id ORDER BY score DESC\n) <= 3;`,
    options: [
      { key: "A", text: "The 3 highest-scoring attempt rows per course, without collapsing other columns — QUALIFY filters directly on the window result." },
      { key: "B", text: "A syntax error: QUALIFY doesn't exist in BigQuery." },
      { key: "C", text: "Three random rows per course." },
      { key: "D", text: "One aggregated row per course with an array of top scores." }
    ],
    correctAnswer: "A",
    explanation: "ROW_NUMBER ranks within each course partition; QUALIFY keeps ranks ≤ 3 with no wrapping subquery. This idiom (rank + QUALIFY) is also the standard dedup pattern.",
    technicalResources: [{ name: "QUALIFY Clause", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#qualify_clause", type: "docs" }]
  },
  {
    id: "quiz-data-2-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does OPTIONS(require_partition_filter = TRUE) on a date-partitioned table enforce?",
    options: [
      { key: "A", text: "All queries must complete within one partition's data." },
      { key: "B", text: "Queries without a partition-column filter fail instead of running — making accidental full-table scans impossible." },
      { key: "C", text: "The table refuses streaming inserts." },
      { key: "D", text: "Partitions expire after 60 days." }
    ],
    correctAnswer: "B",
    explanation: "It's a guardrail: any query that would scan every partition is rejected at parse time. On multi-TB event tables this single option prevents the most expensive class of mistake.",
    technicalResources: [{ name: "Partitioned Tables", url: "https://cloud.google.com/bigquery/docs/partitioned-tables", type: "docs" }]
  },
  {
    id: "quiz-data-2-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "An events table is queried overwhelmingly by date range + user_id, occasionally also filtering event_name. Which physical design is optimal?",
    options: [
      { key: "A", text: "PARTITION BY DATE(event_timestamp), CLUSTER BY user_id, event_name — dates prune partitions; clustering prunes blocks within them, most-selective column first." },
      { key: "B", text: "CLUSTER BY date only." },
      { key: "C", text: "PARTITION BY user_id (one partition per user)." },
      { key: "D", text: "No partitioning — BigQuery optimizes automatically." }
    ],
    correctAnswer: "A",
    explanation: "Partitioning handles the coarse time dimension (and enables require_partition_filter); clustering sorts within partitions by the hot filter columns. Partitioning by high-cardinality user_id isn't supported/sensible.",
    technicalResources: [{ name: "Clustered Tables", url: "https://cloud.google.com/bigquery/docs/clustered-tables", type: "docs" }]
  },

  // ── Module 3 ──
  {
    id: "quiz-data-3-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is 'ELT' (not ETL) the dominant pattern on BigQuery?",
    options: [
      { key: "A", text: "Transformation tools don't exist for GCP." },
      { key: "B", text: "Loading raw data is cheap/free (GCS batch loads), and transforms as versioned in-warehouse SQL are reproducible from raw at any time — the warehouse itself is the transformation engine." },
      { key: "C", text: "ELT avoids all data-quality issues." },
      { key: "D", text: "BigQuery cannot ingest transformed data." }
    ],
    correctAnswer: "B",
    explanation: "Raw-first landing preserves optionality: bugs in transforms are fixable by re-running SQL over immutable raw data. Batch loads from GCS cost nothing, making the pattern economical.",
    technicalResources: [{ name: "Batch Loading", url: "https://cloud.google.com/bigquery/docs/batch-loading-data", type: "docs" }]
  },
  {
    id: "quiz-data-3-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "debugging",
    difficulty: "hard",
    question: "A nightly load job re-ran after a timeout and now yesterday's partition has every row twice. Which design prevents this class of bug?",
    options: [
      { key: "A", text: "Never re-run failed jobs." },
      { key: "B", text: "Idempotent loads: write with WRITE_TRUNCATE scoped to the target date partition, so any re-run replaces rather than appends." },
      { key: "C", text: "Add a DISTINCT to every downstream query forever." },
      { key: "D", text: "Load into a new table each night and update all dashboards." }
    ],
    correctAnswer: "B",
    explanation: "Partition-scoped truncate-and-write makes re-runs safe by construction. Downstream DISTINCT band-aids cost every query forever; the pipeline is the right place to fix it.",
    technicalResources: [{ name: "Write Dispositions", url: "https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet", type: "docs" }]
  },
  {
    id: "quiz-data-3-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "The Firestore-to-BigQuery streaming extension writes a changelog table rather than mirroring current state. Why is that the more valuable design for analytics?",
    options: [
      { key: "A", text: "Changelogs use less storage." },
      { key: "B", text: "Every historical state of every document is preserved — enabling time-series and funnel analysis Firestore itself can't answer; current state is just a view over the log." },
      { key: "C", text: "BigQuery cannot store current-state tables." },
      { key: "D", text: "It avoids needing IAM permissions." }
    ],
    correctAnswer: "B",
    explanation: "Analytics is about change over time. The append-only changelog captures history exactly once, and a QUALIFY-latest view reconstructs 'now' whenever needed.",
    technicalResources: [{ name: "Stream Firestore to BigQuery", url: "https://extensions.dev/extensions/firebase/firestore-bigquery-export", type: "docs" }]
  },

  // ── Module 4 ──
  {
    id: "quiz-data-4-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A pass-prediction model trained on first-week features reports roc_auc = 0.99. Your reaction?",
    options: [
      { key: "A", text: "Celebrate and deploy — it's nearly perfect." },
      { key: "B", text: "Suspect data leakage: audit every feature for information unavailable at prediction time (e.g. total lessons completed over the WHOLE course). Near-perfect scores on human-behavior data are a red flag, not a triumph." },
      { key: "C", text: "Retrain with more epochs to reach 1.0." },
      { key: "D", text: "Switch to a neural network." }
    ],
    correctAnswer: "B",
    explanation: "Leakage — training on the future — is the #1 way to build impressively useless models. The audit question for every feature: 'is this knowable at the moment we'd predict?'",
    technicalResources: [{ name: "ML Data Splits & Leakage", url: "https://developers.google.com/machine-learning/crash-course/overfitting/data-leakage", type: "article" }]
  },
  {
    id: "quiz-data-4-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "With a 90% base pass rate, a model scores accuracy 0.90. What does this tell you?",
    options: [
      { key: "A", text: "The model is excellent." },
      { key: "B", text: "Possibly nothing — always-predict-pass also scores 0.90. Judge with roc_auc and recall on the minority (failing) class, benchmarked against the majority-class baseline." },
      { key: "C", text: "Accuracy is the standard metric, so ship it." },
      { key: "D", text: "The model needs exactly 10% more data." }
    ],
    correctAnswer: "B",
    explanation: "Class imbalance makes accuracy nearly meaningless. For an intervention use case, recall on the failing class is what determines real-world value.",
    technicalResources: [{ name: "ML.EVALUATE", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate", type: "docs" }]
  },
  {
    id: "quiz-data-4-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "code_output",
    difficulty: "medium",
    question: "What does this statement produce?",
    codeSnippet: `SELECT student_id, predicted_passed_probs[OFFSET(1)].prob AS p_pass\nFROM ML.PREDICT(\n  MODEL ndn.ml.pass_predictor,\n  (SELECT * FROM ndn.analytics.current_students_features)\n)\nWHERE predicted_passed_probs[OFFSET(1)].prob < 0.6;`,
    options: [
      { key: "A", text: "It retrains the model on current students." },
      { key: "B", text: "Batch predictions for all current students, filtered to those with pass probability under 60% — an at-risk list ready for intervention workflows." },
      { key: "C", text: "A syntax error: ML.PREDICT can't appear in FROM." },
      { key: "D", text: "The model's evaluation metrics." }
    ],
    correctAnswer: "B",
    explanation: "ML.PREDICT is a table function: score any feature table with plain SQL. Scheduled nightly, this IS production ML serving for batch use cases.",
    technicalResources: [{ name: "ML.PREDICT", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict", type: "docs" }]
  },

  // ── Module 5 ──
  {
    id: "quiz-data-5-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What distinguishes feature drift from prediction drift?",
    options: [
      { key: "A", text: "They are synonyms." },
      { key: "B", text: "Feature drift = input distributions shift vs. training baseline; prediction drift = the model's output distribution shifts. Either signals the model may no longer fit reality." },
      { key: "C", text: "Feature drift only affects neural networks." },
      { key: "D", text: "Prediction drift is always caused by bugs in SQL." }
    ],
    correctAnswer: "B",
    explanation: "Both are proxies for silent degradation, detectable before ground truth arrives. Monitoring both (e.g. PSI > 0.2 alerts) is the early-warning system.",
    technicalResources: [{ name: "Model Monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview", type: "docs" }]
  },
  {
    id: "quiz-data-5-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "Your automated monthly retraining pipeline should deploy the new model only if what condition holds?",
    options: [
      { key: "A", text: "Training completed without SQL errors." },
      { key: "B", text: "It passes the evaluation gate: metrics on held-out recent data meet or beat the current champion (within tolerance) — otherwise alert a human and keep the champion serving." },
      { key: "C", text: "It is newer than the champion." },
      { key: "D", text: "The training data was larger." }
    ],
    correctAnswer: "B",
    explanation: "Ungated retraining automates the shipping of worse models. The gate — challenger vs. champion on fresh held-out data — is what makes automation safe.",
    technicalResources: [{ name: "MLOps Whitepaper", url: "https://cloud.google.com/resources/mlops-whitepaper", type: "article" }]
  },
  {
    id: "quiz-data-5-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should every online prediction be logged (features + score + model version) back to BigQuery?",
    options: [
      { key: "A", text: "Regulations require it in all industries." },
      { key: "B", text: "That one table powers drift detection, live accuracy once outcomes mature, incident forensics ('which version scored this?'), and the next training set." },
      { key: "C", text: "It makes predictions faster via caching." },
      { key: "D", text: "Vertex AI refuses to serve without it." }
    ],
    correctAnswer: "B",
    explanation: "The prediction log is MLOps' central artifact — monitoring, evaluation, and retraining all read from it. Skipping it leaves you blind post-deploy.",
    technicalResources: [{ name: "Vertex Predictions", url: "https://cloud.google.com/vertex-ai/docs/predictions/get-predictions", type: "docs" }]
  },

  // ── Module 6 ──
  {
    id: "quiz-data-6-q1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should Looker Studio dashboards read from a curated reporting dataset of views instead of raw tables?",
    options: [
      { key: "A", text: "Raw tables are invisible to Looker Studio." },
      { key: "B", text: "The view layer absorbs schema changes, defines business logic once, enables narrow IAM for BI access, and points dashboards at cheap pre-aggregated data." },
      { key: "C", text: "Views are always faster than tables." },
      { key: "D", text: "It's required for scheduled email delivery." }
    ],
    correctAnswer: "B",
    explanation: "The reporting layer is a contract: stability for reports, one definition of truth for metrics, least-privilege access, and cost control by serving pre-aggregated grains.",
    technicalResources: [{ name: "Visualize with Looker Studio", url: "https://cloud.google.com/bigquery/docs/visualize-looker-studio", type: "docs" }]
  },
  {
    id: "quiz-data-6-q2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A KPI dashboard for 200 daily viewers fires live BigQuery queries on every filter click, costing real money. The KPI data is ~20 MB, refreshed nightly. Best fix?",
    options: [
      { key: "A", text: "Ask viewers to filter less." },
      { key: "B", text: "Switch the data source to an extract (snapshot with scheduled refresh) — 20 MB fits comfortably; viewer interactions then cost zero query dollars." },
      { key: "C", text: "Give every viewer their own copy of the dashboard." },
      { key: "D", text: "Move the data to Firestore." }
    ],
    correctAnswer: "B",
    explanation: "Extract data sources snapshot up to 100 MB into Looker Studio's own store. Nightly-refresh KPI sets are the textbook case; BI Engine is the alternative when data must stay live.",
    technicalResources: [{ name: "Extract Data Sources", url: "https://support.google.com/looker-studio/answer/9019969", type: "docs" }]
  },
  {
    id: "quiz-data-6-q3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multi_select",
    difficulty: "medium",
    question: "Which elements build TRUST in an executive dashboard? (Select all that apply)",
    options: [
      { key: "A", text: "A freshness stamp bound to MAX(stat_date)." },
      { key: "B", text: "A definitions page documenting each metric's SQL meaning." },
      { key: "C", text: "As many charts as possible on one page." },
      { key: "D", text: "Every chart answering a nameable business question." }
    ],
    correctAnswer: ["A", "B", "D"],
    explanation: "Freshness honesty, defined metrics, and purposeful charts are what end 'your numbers don't match mine' meetings. Chart density does the opposite.",
    technicalResources: [{ name: "Looker Studio Help", url: "https://support.google.com/looker-studio", type: "docs" }]
  }
];

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

  {
    id: "quiz-data-1-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Because BigQuery uses columnar storage, on-demand queries are billed by what?",
    options: [
      { key: "A", text: "Rows returned." },
      { key: "B", text: "Bytes scanned in the referenced columns." },
      { key: "C", text: "Number of queries per day." },
      { key: "D", text: "Result set size." }
    ],
    correctAnswer: "B",
    explanation: "Columnar storage reads only referenced columns, and on-demand pricing bills the bytes scanned — which is why SELECT * is a billing decision.",
    technicalResources: [{ name: "Pricing", url: "https://cloud.google.com/bigquery/pricing", type: "docs" }]
  },
  {
    id: "quiz-data-1-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "code_output",
    difficulty: "medium",
    question: "Does adding LIMIT 10 to a SELECT reduce the bytes scanned?",
    codeSnippet: `SELECT * FROM ndn.analytics.events LIMIT 10;`,
    options: [
      { key: "A", text: "Yes, only 10 rows are read." },
      { key: "B", text: "No — the engine reads the referenced columns in full before applying LIMIT." },
      { key: "C", text: "Only if there's an index." },
      { key: "D", text: "LIMIT makes the query free." }
    ],
    correctAnswer: "B",
    explanation: "LIMIT caps output rows but not the scan; the columns are read fully (modulo partition pruning) before limiting.",
    technicalResources: [{ name: "On-Demand Pricing", url: "https://cloud.google.com/bigquery/pricing#on_demand_pricing", type: "docs" }]
  },
  {
    id: "quiz-data-1-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which dataset property is immutable at creation and affects cross-dataset joins?",
    options: [
      { key: "A", text: "The description." },
      { key: "B", text: "The region/location — you can't join across regions, so placement is a day-one decision." },
      { key: "C", text: "The table count." },
      { key: "D", text: "Default expiration." }
    ],
    correctAnswer: "B",
    explanation: "Dataset location is permanent and queries can't join across regions; co-locate datasets that must join, near their consumers.",
    technicalResources: [{ name: "Dataset Locations", url: "https://cloud.google.com/bigquery/docs/locations", type: "docs" }]
  },
  {
    id: "quiz-data-1-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What are slots in BigQuery?",
    options: [
      { key: "A", text: "Storage buckets." },
      { key: "B", text: "Units of query compute that BigQuery parallelizes work across automatically." },
      { key: "C", text: "IAM roles." },
      { key: "D", text: "Table partitions." }
    ],
    correctAnswer: "B",
    explanation: "Queries compile into stages executed by slots; on-demand gives a shared pool, editions let you reserve capacity.",
    technicalResources: [{ name: "Slots", url: "https://cloud.google.com/bigquery/docs/slots", type: "docs" }]
  },
  {
    id: "quiz-data-1-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the best day-one guardrail against a typo that scans terabytes?",
    options: [
      { key: "A", text: "Hope." },
      { key: "B", text: "Set 'maximum bytes billed' so an over-large query fails instead of billing you." },
      { key: "C", text: "Disable the query editor." },
      { key: "D", text: "Only query on weekends." }
    ],
    correctAnswer: "B",
    explanation: "A maximum-bytes-billed cap makes a runaway query fail rather than surprise-bill you — the single most valuable cost habit.",
    technicalResources: [{ name: "Cost Controls", url: "https://cloud.google.com/bigquery/docs/custom-quotas", type: "docs" }]
  },
  {
    id: "quiz-data-1-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How do you audit which users scanned the most bytes this week?",
    options: [
      { key: "A", text: "Open a support ticket." },
      { key: "B", text: "Query INFORMATION_SCHEMA.JOBS, which exposes each job's user, bytes processed, and SQL." },
      { key: "C", text: "Check Cloud Trace." },
      { key: "D", text: "It's impossible." }
    ],
    correctAnswer: "B",
    explanation: "The warehouse self-reports via INFORMATION_SCHEMA jobs views, making cost auditing an ordinary SQL query.",
    technicalResources: [{ name: "JOBS Views", url: "https://cloud.google.com/bigquery/docs/information-schema-jobs", type: "docs" }]
  },
  {
    id: "quiz-data-1-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Why does BigQuery's cheap storage vs. costly compute justify wide denormalized tables?",
    options: [
      { key: "A", text: "It doesn't; always normalize." },
      { key: "B", text: "Storing a column twice costs pennies, while repeatedly joining at query time costs dollars in scans." },
      { key: "C", text: "Storage is more expensive than compute." },
      { key: "D", text: "Wide tables are illegal." }
    ],
    correctAnswer: "B",
    explanation: "Storage is cheap and auto-tiers; compute (scanning) is the cost center, so denormalizing to avoid repeated joins is economical.",
    technicalResources: [{ name: "Storage Pricing", url: "https://cloud.google.com/bigquery/pricing#storage", type: "docs" }]
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

  {
    id: "quiz-data-2-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does the QUALIFY clause let you do?",
    options: [
      { key: "A", text: "Rename columns." },
      { key: "B", text: "Filter directly on window-function results without a wrapping subquery." },
      { key: "C", text: "Create a table." },
      { key: "D", text: "Grant permissions." }
    ],
    correctAnswer: "B",
    explanation: "QUALIFY filters on window results inline (e.g. keep ROW_NUMBER() ... = 1), which is also the standard dedup idiom.",
    technicalResources: [{ name: "QUALIFY", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#qualify_clause", type: "docs" }]
  },
  {
    id: "quiz-data-2-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does OPTIONS(require_partition_filter = TRUE) enforce on a partitioned table?",
    options: [
      { key: "A", text: "Queries must finish in one partition." },
      { key: "B", text: "Queries lacking a partition-column filter fail, making accidental full-table scans impossible." },
      { key: "C", text: "Streaming inserts are blocked." },
      { key: "D", text: "Partitions expire in 60 days." }
    ],
    correctAnswer: "B",
    explanation: "It's a guardrail: any query that would scan all partitions is rejected at parse time — your best defense on multi-TB event tables.",
    technicalResources: [{ name: "Partitioned Tables", url: "https://cloud.google.com/bigquery/docs/partitioned-tables", type: "docs" }]
  },
  {
    id: "quiz-data-2-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "An events table is queried by date range + user_id, sometimes also event_name. Optimal physical design?",
    options: [
      { key: "A", text: "PARTITION BY DATE(event_timestamp), CLUSTER BY user_id, event_name — most-selective cluster column first." },
      { key: "B", text: "CLUSTER BY date only." },
      { key: "C", text: "PARTITION BY user_id." },
      { key: "D", text: "No partitioning; BigQuery optimizes automatically." }
    ],
    correctAnswer: "A",
    explanation: "Partitioning prunes by date (and enables require_partition_filter); clustering prunes blocks within partitions by the hot filter columns.",
    technicalResources: [{ name: "Clustered Tables", url: "https://cloud.google.com/bigquery/docs/clustered-tables", type: "docs" }]
  },
  {
    id: "quiz-data-2-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What do window functions let you do that GROUP BY does not?",
    options: [
      { key: "A", text: "Nothing different." },
      { key: "B", text: "Aggregate over a peer group (RANK, LAG, running SUM) without collapsing the underlying rows." },
      { key: "C", text: "Delete rows." },
      { key: "D", text: "Create indexes." }
    ],
    correctAnswer: "B",
    explanation: "Window functions compute over a partition while keeping every row — enabling rankings, offsets, and running totals inline.",
    technicalResources: [{ name: "Window Functions", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls", type: "docs" }]
  },
  {
    id: "quiz-data-2-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How does UNNEST relate to an ARRAY column?",
    options: [
      { key: "A", text: "It deletes the array." },
      { key: "B", text: "It expands array elements into joinable rows, so you can filter or aggregate nested data." },
      { key: "C", text: "It compresses the array." },
      { key: "D", text: "It renames the column." }
    ],
    correctAnswer: "B",
    explanation: "ARRAY/STRUCT store nested data; UNNEST turns array elements back into rows, letting one wide nested table replace a star schema.",
    technicalResources: [{ name: "Arrays", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/arrays", type: "docs" }]
  },
  {
    id: "quiz-data-2-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "hard",
    question: "You see 'bytes shuffled' spike on a JOIN stage in execution details. Likely cause and fix?",
    options: [
      { key: "A", text: "Too many columns; add more." },
      { key: "B", text: "You joined before filtering — push the WHERE into a CTE ahead of the join to shrink the join inputs." },
      { key: "C", text: "The table needs an index." },
      { key: "D", text: "Nothing can be done." }
    ],
    correctAnswer: "B",
    explanation: "High shuffle on a join usually means unfiltered inputs. Filtering in a CTE before the join reduces the data shuffled.",
    technicalResources: [{ name: "Query Plan", url: "https://cloud.google.com/bigquery/docs/query-plan-explanation", type: "docs" }]
  },
  {
    id: "quiz-data-2-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is a materialized view good for?",
    options: [
      { key: "A", text: "Storing secrets." },
      { key: "B", text: "Precomputing repeated dashboard aggregates; it auto-refreshes and BigQuery substitutes it into matching queries." },
      { key: "C", text: "Replacing IAM." },
      { key: "D", text: "Encrypting tables." }
    ],
    correctAnswer: "B",
    explanation: "Materialized views precompute and auto-refresh common aggregations, and the optimizer substitutes them into matching queries automatically.",
    technicalResources: [{ name: "Materialized Views", url: "https://cloud.google.com/bigquery/docs/materialized-views-intro", type: "docs" }]
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

  {
    id: "quiz-data-3-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is ELT (not ETL) dominant on BigQuery?",
    options: [
      { key: "A", text: "Transformation tools don't exist for GCP." },
      { key: "B", text: "Loading raw is cheap/free (GCS batch loads), and versioned in-warehouse SQL transforms are reproducible from raw at any time." },
      { key: "C", text: "ELT avoids all data-quality issues." },
      { key: "D", text: "BigQuery can't ingest transformed data." }
    ],
    correctAnswer: "B",
    explanation: "Raw-first landing preserves optionality; transform bugs are fixable by re-running SQL over immutable raw data, and batch loads cost nothing.",
    technicalResources: [{ name: "Batch Loading", url: "https://cloud.google.com/bigquery/docs/batch-loading-data", type: "docs" }]
  },
  {
    id: "quiz-data-3-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Which load format hierarchy is best for correctness and compression?",
    options: [
      { key: "A", text: "CSV > JSON > Parquet." },
      { key: "B", text: "Parquet/Avro > JSONL > CSV, because self-describing schema and types avoid parsing bugs." },
      { key: "C", text: "Only CSV is supported." },
      { key: "D", text: "Format doesn't matter." }
    ],
    correctAnswer: "B",
    explanation: "Parquet/Avro carry schema and types and compress well; CSV is where date-parsing and type bugs breed.",
    technicalResources: [{ name: "Loading Data", url: "https://cloud.google.com/bigquery/docs/loading-data", type: "docs" }]
  },
  {
    id: "quiz-data-3-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "debugging",
    difficulty: "hard",
    question: "A nightly load re-ran after a timeout and doubled yesterday's partition. Which design prevents this?",
    options: [
      { key: "A", text: "Never re-run jobs." },
      { key: "B", text: "Idempotent loads: WRITE_TRUNCATE scoped to the target date partition, so re-runs replace instead of append." },
      { key: "C", text: "Add DISTINCT to every downstream query." },
      { key: "D", text: "Load into a new table nightly." }
    ],
    correctAnswer: "B",
    explanation: "Partition-scoped truncate-and-write makes re-runs safe by construction; downstream DISTINCT band-aids cost every query forever.",
    technicalResources: [{ name: "Write Dispositions", url: "https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-parquet", type: "docs" }]
  },
  {
    id: "quiz-data-3-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why does the Firestore→BigQuery streaming extension write a changelog table rather than mirroring current state?",
    options: [
      { key: "A", text: "It uses less storage." },
      { key: "B", text: "It preserves every historical state, enabling time-series/funnel analysis Firestore itself can't answer; current state is a view over the log." },
      { key: "C", text: "BigQuery can't store current-state tables." },
      { key: "D", text: "It avoids IAM." }
    ],
    correctAnswer: "B",
    explanation: "The append-only changelog captures history exactly once; a QUALIFY-latest view reconstructs 'now' whenever needed.",
    technicalResources: [{ name: "Firestore→BigQuery", url: "https://extensions.dev/extensions/firebase/firestore-bigquery-export", type: "docs" }]
  },
  {
    id: "quiz-data-3-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the point of a GCS landing-zone layout like source/dt=YYYY-MM-DD/?",
    options: [
      { key: "A", text: "It looks tidy." },
      { key: "B", text: "Date-prefixed zones make loads scriptable, idempotent, and reprocessable per day." },
      { key: "C", text: "It encrypts data." },
      { key: "D", text: "It's required by BigQuery." }
    ],
    correctAnswer: "B",
    explanation: "A disciplined date-partitioned landing layout is what makes loads repeatable and lets you reprocess a single day cleanly.",
    technicalResources: [{ name: "GCS Docs", url: "https://cloud.google.com/storage/docs", type: "docs" }]
  },
  {
    id: "quiz-data-3-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What implements the 'T' in ELT on BigQuery?",
    options: [
      { key: "A", text: "A separate Spark cluster." },
      { key: "B", text: "Scheduled queries (or Dataform) that transform raw into clean tables with versioned SQL." },
      { key: "C", text: "Manual copy-paste." },
      { key: "D", text: "The client SDK." }
    ],
    correctAnswer: "B",
    explanation: "Scheduled queries or Dataform run the in-warehouse transforms; raw stays raw and every transform is reproducible from it.",
    technicalResources: [{ name: "Scheduled Queries", url: "https://cloud.google.com/bigquery/docs/scheduling-queries", type: "docs" }]
  },
  {
    id: "quiz-data-3-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why alert on row-count deltas versus a rolling average for pipeline tables?",
    options: [
      { key: "A", text: "To reduce storage." },
      { key: "B", text: "A silent half-empty load keeps dashboards 'working' while being wrong; anomaly checks catch partial loads loudly." },
      { key: "C", text: "It speeds up queries." },
      { key: "D", text: "It's cosmetic." }
    ],
    correctAnswer: "B",
    explanation: "Silent partial loads are the most expensive data bug because everything keeps rendering. Row-count anomaly checks surface them.",
    technicalResources: [{ name: "Dataform", url: "https://cloud.google.com/dataform/docs", type: "docs" }]
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

  {
    id: "quiz-data-4-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the headline capability of BigQuery ML?",
    options: [
      { key: "A", text: "It replaces SQL." },
      { key: "B", text: "It trains and serves ML models where the data lives, using CREATE MODEL and ML.PREDICT in pure SQL." },
      { key: "C", text: "It only visualizes data." },
      { key: "D", text: "It's a notebook environment." }
    ],
    correctAnswer: "B",
    explanation: "BQML trains models in-warehouse via SQL — no export or Python cluster for the first mile of tabular prediction.",
    technicalResources: [{ name: "BQML Intro", url: "https://cloud.google.com/bigquery/docs/bqml-introduction", type: "docs" }]
  },
  {
    id: "quiz-data-4-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A pass-prediction model on first-week features reports roc_auc = 0.99. Your reaction?",
    options: [
      { key: "A", text: "Celebrate and deploy." },
      { key: "B", text: "Suspect data leakage: audit every feature for information unavailable at prediction time — near-perfect scores on human behavior are a red flag." },
      { key: "C", text: "Train more epochs to reach 1.0." },
      { key: "D", text: "Switch to a neural net." }
    ],
    correctAnswer: "B",
    explanation: "Leakage — training on the future — is the #1 way to build useless models. Audit each feature: knowable at the moment you'd predict?",
    technicalResources: [{ name: "Data Leakage", url: "https://developers.google.com/machine-learning/crash-course/overfitting/data-leakage", type: "article" }]
  },
  {
    id: "quiz-data-4-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "hard",
    question: "With a 90% base pass rate, a model scores accuracy 0.90. What does that tell you?",
    options: [
      { key: "A", text: "The model is excellent." },
      { key: "B", text: "Possibly nothing — always-predict-pass also scores 0.90. Judge with roc_auc and recall on the minority class." },
      { key: "C", text: "Accuracy is the standard metric; ship it." },
      { key: "D", text: "It needs 10% more data." }
    ],
    correctAnswer: "B",
    explanation: "Class imbalance makes accuracy near-meaningless. For interventions, recall on the failing class determines real-world value.",
    technicalResources: [{ name: "ML.EVALUATE", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-evaluate", type: "docs" }]
  },
  {
    id: "quiz-data-4-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Which BQML model type is usually the strongest for tabular classification?",
    options: [
      { key: "A", text: "KMEANS." },
      { key: "B", text: "BOOSTED_TREE_CLASSIFIER (XGBoost)." },
      { key: "C", text: "ARIMA_PLUS." },
      { key: "D", text: "LINEAR_REG." }
    ],
    correctAnswer: "B",
    explanation: "Boosted trees typically win on tabular data; LINEAR/LOGISTIC_REG are baselines, KMEANS is clustering, ARIMA_PLUS is forecasting.",
    technicalResources: [{ name: "CREATE MODEL", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create", type: "docs" }]
  },
  {
    id: "quiz-data-4-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "code_output",
    difficulty: "medium",
    question: "What does ML.PREDICT produce in a FROM clause?",
    codeSnippet: `SELECT * FROM ML.PREDICT(MODEL ndn.ml.pass_predictor, (SELECT * FROM features))`,
    options: [
      { key: "A", text: "It retrains the model." },
      { key: "B", text: "Batch predictions for the input rows — ML.PREDICT is a table function you can filter and store." },
      { key: "C", text: "A syntax error." },
      { key: "D", text: "The model's metrics." }
    ],
    correctAnswer: "B",
    explanation: "ML.PREDICT scores any feature table via SQL; scheduled nightly, it IS production batch serving.",
    technicalResources: [{ name: "ML.PREDICT", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-predict", type: "docs" }]
  },
  {
    id: "quiz-data-4-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does ML.EXPLAIN_PREDICT add to a prediction?",
    options: [
      { key: "A", text: "It encrypts the output." },
      { key: "B", text: "Per-row feature attributions, turning a score into an actionable reason (e.g. 'low active days')." },
      { key: "C", text: "It retrains the model." },
      { key: "D", text: "It deletes low-confidence rows." }
    ],
    correctAnswer: "B",
    explanation: "Per-prediction explanations make a score actionable — 'at risk: low active days (−0.4), weak quiz average (−0.3)'.",
    technicalResources: [{ name: "Explainable AI in BQML", url: "https://cloud.google.com/bigquery/docs/xai-overview", type: "docs" }]
  },
  {
    id: "quiz-data-4-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does data_split_method = 'AUTO_SPLIT' do during CREATE MODEL?",
    options: [
      { key: "A", text: "Deletes duplicate rows." },
      { key: "B", text: "Holds out a portion of data for evaluation automatically." },
      { key: "C", text: "Splits the table into partitions." },
      { key: "D", text: "Encrypts the model." }
    ],
    correctAnswer: "B",
    explanation: "AUTO_SPLIT reserves eval data so ML.EVALUATE reports honest held-out metrics rather than training-set performance.",
    technicalResources: [{ name: "CREATE MODEL", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create", type: "docs" }]
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

  {
    id: "quiz-data-5-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the difference between feature drift and prediction drift?",
    options: [
      { key: "A", text: "They are synonyms." },
      { key: "B", text: "Feature drift = input distributions shift vs. training; prediction drift = the model's output distribution shifts." },
      { key: "C", text: "Feature drift only affects neural networks." },
      { key: "D", text: "Prediction drift is always a SQL bug." }
    ],
    correctAnswer: "B",
    explanation: "Both are proxies for silent degradation detectable before ground truth arrives; monitor both (e.g. PSI > 0.2 alerts).",
    technicalResources: [{ name: "Model Monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview", type: "docs" }]
  },
  {
    id: "quiz-data-5-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "An automated monthly retraining pipeline should deploy the new model only when what holds?",
    options: [
      { key: "A", text: "Training finished without SQL errors." },
      { key: "B", text: "It passes an evaluation gate: metrics on held-out recent data meet or beat the champion; otherwise alert a human and keep the champion." },
      { key: "C", text: "It is newer than the champion." },
      { key: "D", text: "The training data was larger." }
    ],
    correctAnswer: "B",
    explanation: "Ungated retraining automates shipping worse models. The champion-vs-challenger gate on fresh held-out data makes automation safe.",
    technicalResources: [{ name: "MLOps Whitepaper", url: "https://cloud.google.com/resources/mlops-whitepaper", type: "article" }]
  },
  {
    id: "quiz-data-5-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why log every online prediction (features + score + model version) back to BigQuery?",
    options: [
      { key: "A", text: "Regulations require it universally." },
      { key: "B", text: "That table powers drift detection, live accuracy once outcomes mature, incident forensics, and the next training set." },
      { key: "C", text: "It makes predictions faster." },
      { key: "D", text: "Vertex refuses to serve without it." }
    ],
    correctAnswer: "B",
    explanation: "The prediction log is MLOps' central artifact — monitoring, evaluation, and retraining all read from it. Skipping it leaves you blind post-deploy.",
    technicalResources: [{ name: "Vertex Predictions", url: "https://cloud.google.com/vertex-ai/docs/predictions/get-predictions", type: "docs" }]
  },
  {
    id: "quiz-data-5-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How do you serve a BQML model with sub-100ms online latency?",
    options: [
      { key: "A", text: "Query BigQuery per request." },
      { key: "B", text: "Export the model and deploy it to a Vertex AI endpoint (which also supports canary traffic splits)." },
      { key: "C", text: "Email predictions." },
      { key: "D", text: "It's impossible." }
    ],
    correctAnswer: "B",
    explanation: "For online serving, export BQML to GCS and deploy on a Vertex endpoint; BigQuery batch serving suits nightly workloads, not per-request latency.",
    technicalResources: [{ name: "Export BQML Models", url: "https://cloud.google.com/bigquery/docs/exporting-models", type: "docs" }]
  },
  {
    id: "quiz-data-5-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "hard",
    question: "What is training/serving skew?",
    options: [
      { key: "A", text: "A network timeout." },
      { key: "B", text: "Features computed differently offline (training) vs online (serving), silently corrupting predictions; one shared feature definition is the cure." },
      { key: "C", text: "A model that overfits." },
      { key: "D", text: "A billing anomaly." }
    ],
    correctAnswer: "B",
    explanation: "When offline and online feature computation diverge, predictions degrade invisibly. A single shared feature definition prevents skew.",
    technicalResources: [{ name: "Vertex Predictions", url: "https://cloud.google.com/vertex-ai/docs/predictions/get-predictions", type: "docs" }]
  },
  {
    id: "quiz-data-5-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What does a PSI (Population Stability Index) above ~0.2 conventionally signal?",
    options: [
      { key: "A", text: "The model improved." },
      { key: "B", text: "Actionable distribution drift between the serving population and the training baseline." },
      { key: "C", text: "A storage limit." },
      { key: "D", text: "Perfect stability." }
    ],
    correctAnswer: "B",
    explanation: "PSI is a bucketed distribution-comparison metric; >0.2 conventionally flags drift worth investigating.",
    technicalResources: [{ name: "Model Monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview", type: "docs" }]
  },
  {
    id: "quiz-data-5-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why is a model described as an asset that 'depreciates'?",
    options: [
      { key: "A", text: "It costs money to store." },
      { key: "B", text: "The world drifts away from its training data over time, so its validity decays and it must be monitored and retrained." },
      { key: "C", text: "Its file size grows." },
      { key: "D", text: "It becomes read-only." }
    ],
    correctAnswer: "B",
    explanation: "Reality drifts from training data, so models degrade silently. MLOps is the engineering that notices (drift/live accuracy) and responds (gated retraining).",
    technicalResources: [{ name: "MLOps Whitepaper", url: "https://cloud.google.com/resources/mlops-whitepaper", type: "article" }]
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
  },
  {
    id: "quiz-data-6-q4",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "Why should BI dashboards read a curated reporting layer of views rather than raw tables?",
    options: [
      { key: "A", text: "Raw tables are invisible to BI tools." },
      { key: "B", text: "The view layer absorbs schema changes, defines business logic once, enables narrow IAM, and points dashboards at cheap pre-aggregated data." },
      { key: "C", text: "Views are always faster than tables." },
      { key: "D", text: "It's required for email delivery." }
    ],
    correctAnswer: "B",
    explanation: "The reporting layer is a contract: stability for reports, one definition of truth, least-privilege access, and cost control via pre-aggregation.",
    technicalResources: [{ name: "Visualize with Looker Studio", url: "https://cloud.google.com/bigquery/docs/visualize-looker-studio", type: "docs" }]
  },
  {
    id: "quiz-data-6-q5",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "architecture_scenario",
    difficulty: "hard",
    question: "A KPI dashboard for 200 daily viewers fires live BigQuery queries on every filter click. The KPI data is ~20 MB, refreshed nightly. Best fix?",
    options: [
      { key: "A", text: "Ask viewers to filter less." },
      { key: "B", text: "Switch to an extract data source (snapshot with scheduled refresh) — 20 MB fits, so interactions cost zero query dollars." },
      { key: "C", text: "Give everyone their own dashboard copy." },
      { key: "D", text: "Move data to Firestore." }
    ],
    correctAnswer: "B",
    explanation: "Extract data sources snapshot up to 100 MB into Looker Studio's store; nightly-refresh KPI sets are the textbook case. BI Engine is the live alternative.",
    technicalResources: [{ name: "Extract Data Sources", url: "https://support.google.com/looker-studio/answer/9019969", type: "docs" }]
  },
  {
    id: "quiz-data-6-q6",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is BI Engine used for?",
    options: [
      { key: "A", text: "Storing secrets." },
      { key: "B", text: "In-memory acceleration reserving capacity for sub-second dashboard queries on hot data." },
      { key: "C", text: "Training ML models." },
      { key: "D", text: "Managing IAM." }
    ],
    correctAnswer: "B",
    explanation: "BI Engine caches hot data in memory so dashboard queries return in sub-second time, when data must stay live rather than extracted.",
    technicalResources: [{ name: "BI Engine", url: "https://cloud.google.com/bigquery/docs/bi-engine-intro", type: "docs" }]
  },
  {
    id: "quiz-data-6-q7",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "What is the value of a freshness stamp bound to MAX(stat_date) on a dashboard?",
    options: [
      { key: "A", text: "It looks decorative." },
      { key: "B", text: "It is the trust signal answering 'is this current?' — and reveals a failed pipeline instead of silently serving stale data as current." },
      { key: "C", text: "It speeds up queries." },
      { key: "D", text: "It enforces IAM." }
    ],
    correctAnswer: "B",
    explanation: "A freshness stamp is a ten-minute addition that permanently answers 'is this current?' and exposes stale data honestly.",
    technicalResources: [{ name: "Looker Studio Help", url: "https://support.google.com/looker-studio", type: "docs" }]
  },
  {
    id: "quiz-data-6-q8",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "How do you provide per-instructor row-level security in the reporting layer?",
    options: [
      { key: "A", text: "Give everyone the same view." },
      { key: "B", text: "Use an authorized view with a SESSION_USER() filter, so readers see only their rows without direct table access." },
      { key: "C", text: "Email filtered CSVs." },
      { key: "D", text: "Disable the dashboard." }
    ],
    correctAnswer: "B",
    explanation: "Authorized views grant access to underlying data readers can't query directly; SESSION_USER() filters implement row-level security.",
    technicalResources: [{ name: "Authorized Views", url: "https://cloud.google.com/bigquery/docs/authorized-views", type: "docs" }]
  },
  {
    id: "quiz-data-6-q9",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "easy",
    question: "Why rename fields to business language in the BI data source rather than at chart level?",
    options: [
      { key: "A", text: "Chart-level renames are faster." },
      { key: "B", text: "The data-source layer is a mini semantic model; naming there propagates to every chart, while chart-level renames drift apart." },
      { key: "C", text: "It changes the underlying SQL." },
      { key: "D", text: "It has no effect." }
    ],
    correctAnswer: "B",
    explanation: "Renaming in the shared data source gives every chart consistent business language; chart-level renames don't propagate and diverge.",
    technicalResources: [{ name: "Looker Studio Help", url: "https://support.google.com/looker-studio", type: "docs" }]
  },
  {
    id: "quiz-data-6-q10",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    type: "multiple_choice",
    difficulty: "medium",
    question: "What is the atomic unit of an executive dashboard?",
    options: [
      { key: "A", text: "A pie chart." },
      { key: "B", text: "A KPI scorecard — a single number with a period-over-period comparison delta." },
      { key: "C", text: "A raw data table." },
      { key: "D", text: "A SQL query box." }
    ],
    correctAnswer: "B",
    explanation: "Scorecards (a headline number plus its delta) are the executive dashboard's building block, backed by pre-aggregated reporting views.",
    technicalResources: [{ name: "Looker Studio", url: "https://cloud.google.com/looker/docs/studio", type: "docs" }]
  }
];

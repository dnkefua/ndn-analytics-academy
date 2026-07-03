import { Lesson } from '../../types/academy';

// Course 5: NDN-DATA-502 — BigQuery Data Warehousing, Analytics & MLOps
// 6 modules × 3 lessons (reading / video / lab)

export const DATA_LESSONS: Lesson[] = [
  // ─────────────────────────────────────────────────────────
  // MODULE 1 — BigQuery Data Warehouse Architecture
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-1-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    order: 1,
    type: "reading",
    title: "Lesson 1.1: Columnar Storage, Slots & the BigQuery Cost Model",
    summary: "Understand why BigQuery is fast (columnar storage + Dremel), how slots schedule work, and how to keep query costs under control.",
    durationMinutes: 30,
    readingMarkdown: `
# Columnar Storage, Slots & the BigQuery Cost Model

BigQuery is a serverless data warehouse that scans terabytes in seconds. Using it well requires understanding *why* it's fast and *what you pay for* — the two are the same mechanism.

## 1. Columnar Storage

Row databases (Postgres, MySQL) store records together — great for "fetch order #123". BigQuery stores **columns** together (Capacitor format) — great for "average revenue across 2 billion rows", because it reads *only the columns you touch*.

Consequences that should change how you write SQL:

\`\`\`sql
-- Scans EVERY column = maximum cost:
SELECT * FROM \`ndn.analytics.events\`;

-- Scans two columns = a fraction of the bytes:
SELECT event_name, user_id FROM \`ndn.analytics.events\`;
\`\`\`

**\`SELECT *\` is a billing decision, not a style choice.** And \`LIMIT 10\` does *not* reduce scan cost — the engine still reads the full columns before limiting.

## 2. The Execution Model: Slots

Queries compile into stages executed by **slots** (units of compute). BigQuery parallelizes across thousands of slots automatically. Two purchasing models:

- **On-demand**: pay per TB scanned (~$6.25/TB); 2,000 shared slots. Right for most teams.
- **Capacity (editions)**: reserve slots for predictable heavy workloads.

## 3. Datasets, Tables & Layout

\`\`\`text
Project (billing boundary)
└── Dataset (region + access boundary, e.g. ndn_analytics_eu)
    ├── Tables (native, columnar)
    ├── Views / Materialized views
    └── Routines (UDFs, stored procedures)
\`\`\`

The dataset's **region is permanent** and queries can't join across regions — decide EU/US placement before loading a single row.

## 4. Cost Guardrails (Set These Today)

\`\`\`sql
-- 1. Always preview cost: the console shows "This query will process X GB" — read it.

-- 2. Hard cap per query:
--    Console → Query settings → Maximum bytes billed
--    (query fails instead of surprise-billing you)

-- 3. Find your expensive queries:
SELECT user_email, total_bytes_processed / POW(10, 12) AS tb_scanned, query
FROM \`region-eu\`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
WHERE creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
ORDER BY total_bytes_processed DESC
LIMIT 10;
\`\`\`

INFORMATION_SCHEMA is your warehouse's own telemetry — cost reviews become a query, not archaeology.

## 5. Storage Economics

Storage is cheap (~$0.02/GB active, half that after 90 untouched days — automatic). Compute is what you optimize. This asymmetry justifies denormalized wide tables: storing a column twice is pennies; joining at query time repeatedly is dollars.
`,
    terminalLanguage: "bash",
    starterCode: `bq query --use_legacy_sql=false --maximum_bytes_billed=1000000000 \\\n  'SELECT event_name, COUNT(*) c FROM ndn.analytics.events GROUP BY 1 ORDER BY c DESC LIMIT 5'`,
    expectedOutput: "Query complete — 640 MB processed (under 1 GB cap)",
    notes: {
      coreConcepts: "Columnar storage means you pay for columns scanned, not rows returned. Slots parallelize automatically; datasets pin region permanently; storage is cheap, scans are the cost center.",
      proTip: "Set 'maximum bytes billed' on every ad-hoc query session — a typo that scans 4 TB should fail, not bill you $25.",
      keyTerms: [
        { term: "Columnar Storage", definition: "Storing each column contiguously so queries read only referenced columns — the source of both speed and the pricing model." },
        { term: "Slot", definition: "BigQuery's unit of query compute, allocated automatically across query stages." },
        { term: "INFORMATION_SCHEMA.JOBS", definition: "Built-in metadata views exposing every job's bytes scanned, user, and SQL for cost auditing." }
      ]
    },
    resources: [
      { name: "BigQuery Architecture Explained", url: "https://cloud.google.com/blog/products/data-analytics/new-blog-series-bigquery-explained-overview", type: "article" },
      { name: "Pricing Docs", url: "https://cloud.google.com/bigquery/pricing", type: "docs" },
      { name: "Cost Controls", url: "https://cloud.google.com/bigquery/docs/custom-quotas", type: "docs" }
    ]
  },
  {
    id: "les-data-1-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    order: 2,
    type: "video",
    title: "Lesson 1.2: Video — What is Google Cloud BigQuery?",
    summary: "An introduction to BigQuery's serverless warehouse model, console workflow, and where it fits in a data platform.",
    durationMinutes: 15,
    videoUrl: "https://www.youtube.com/embed/QNiOyftpv2g",
    videoPoster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

An orientation tour of BigQuery: the console, datasets and tables, running queries, and the serverless pitch.

**Watch for:**
- The no-infrastructure model: no clusters to size, no indexes to build.
- The query editor's byte-scan estimate (your cost preview from Lesson 1.1).
- How public datasets let you practice on billions of rows for free-tier costs.

**Hands-on follow-up:** open the console, find the \`bigquery-public-data\` project, and run one aggregate over a public dataset — note the bytes processed before you click Run.
`,
    notes: {
      coreConcepts: "BigQuery's operational surface is just SQL + the console — all capacity management is Google's problem. Public datasets are a free practice gym.",
      proTip: "Pin the bigquery-public-data project in your console — practicing window functions on real billion-row tables beats toy CSVs every time.",
      keyTerms: [
        { term: "Public Datasets", definition: "Google-hosted open datasets queryable by anyone — you pay only for your query scans (1 TB/month free)." }
      ]
    },
    resources: [
      { name: "BigQuery Sandbox (free)", url: "https://cloud.google.com/bigquery/docs/sandbox", type: "docs" }
    ]
  },
  {
    id: "les-data-1-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-1",
    order: 3,
    type: "lab",
    title: "Lesson 1.3: Practical Lab — Warehouse Bootstrap & Cost Audit",
    summary: "Create datasets with correct regions, load sample data, and run a cost audit via INFORMATION_SCHEMA.",
    durationMinutes: 45,
    readingMarkdown: `
# Practical Lab

Bootstrap your course warehouse: an EU dataset, the academy sample tables loaded from CSV/JSON, byte-billed caps configured, and a cost-audit query over INFORMATION_SCHEMA proving you can answer "what did we scan this week and why".

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "Region choice and cost caps are day-one decisions precisely because they're painful to change later.",
      proTip: "Load the same CSV twice — once with autodetect schema, once with an explicit schema — and diff the results; autodetect's type guesses are a classic silent bug.",
      keyTerms: [
        { term: "Schema Autodetect", definition: "BigQuery's type inference on load — convenient, but explicit schemas are the production standard." }
      ]
    },
    resources: [
      { name: "Loading Data Docs", url: "https://cloud.google.com/bigquery/docs/loading-data", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 2 — Advanced SQL & Optimization
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-2-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    order: 1,
    type: "reading",
    title: "Lesson 2.1: Window Functions, Arrays/Structs, Partitioning & Clustering",
    summary: "Master the four techniques that separate analysts from engineers: window functions, nested data, partition pruning, and clustering.",
    durationMinutes: 40,
    readingMarkdown: `
# Window Functions, Arrays/Structs, Partitioning & Clustering

Four techniques account for most of the gap between "writes SQL" and "engineers analytics on BigQuery".

## 1. Window Functions

Aggregate *without collapsing rows* — each row sees its peer group:

\`\`\`sql
SELECT
  student_id,
  course_id,
  score,
  RANK() OVER (PARTITION BY course_id ORDER BY score DESC) AS course_rank,
  AVG(score) OVER (PARTITION BY course_id)                 AS course_avg,
  score - LAG(score) OVER (PARTITION BY student_id ORDER BY attempted_at) AS improvement
FROM \`ndn.academy.quiz_attempts\`;
\`\`\`

The trio to internalize: ranking (\`RANK\`, \`ROW_NUMBER\`), offsets (\`LAG\`, \`LEAD\`), and running aggregates (\`SUM() OVER (... ROWS BETWEEN ...)\`). The classic dedup idiom:

\`\`\`sql
QUALIFY ROW_NUMBER() OVER (PARTITION BY student_id, quiz_id ORDER BY attempted_at DESC) = 1
\`\`\`

\`QUALIFY\` filters on window results directly — no wrapping subquery.

## 2. Arrays & Structs: Embrace the Nest

BigQuery natively stores repeated (ARRAY) and nested (STRUCT) data — the schema-follows-data philosophy from Firestore, in SQL form:

\`\`\`sql
-- One row per student, with an array of enrollment structs
SELECT
  student_id,
  ARRAY_AGG(STRUCT(course_id, score, completed_at) ORDER BY completed_at) AS enrollments
FROM \`ndn.academy.enrollments\`
GROUP BY student_id;

-- And back out again: UNNEST turns the array into joinable rows
SELECT s.student_id, e.course_id, e.score
FROM student_rollup AS s, UNNEST(s.enrollments) AS e
WHERE e.score >= 90;
\`\`\`

One wide nested table often replaces a star schema — fewer joins, fewer scans, faster dashboards.

## 3. Partitioning: The Scan Killer

Partitioning splits a table into segments the engine can *skip entirely*:

\`\`\`sql
CREATE TABLE \`ndn.analytics.events\`
PARTITION BY DATE(event_timestamp)
OPTIONS (require_partition_filter = TRUE)
AS SELECT * FROM staging.events;

-- This query scans ~1/365th of the table:
SELECT COUNT(*) FROM \`ndn.analytics.events\`
WHERE DATE(event_timestamp) = '2026-07-01';
\`\`\`

\`require_partition_filter = TRUE\` makes unfiltered full scans *impossible* — your best defense against accidental terabyte queries. Daily date partitioning fits almost all event data.

## 4. Clustering: Order Within Partitions

Clustering physically sorts data inside each partition by up to 4 columns:

\`\`\`sql
CREATE TABLE \`ndn.analytics.events\`
PARTITION BY DATE(event_timestamp)
CLUSTER BY user_id, event_name
AS SELECT * FROM staging.events;
\`\`\`

Filters on clustered columns skip blocks within the partition. Order matters: cluster by your most-filtered column first. Partition = coarse pruning by date; cluster = fine pruning within it. Together they routinely cut scans by 95%+.

## 5. Optimization Checklist

- [ ] No \`SELECT *\` in anything scheduled
- [ ] Partition filter present (and required) on big tables
- [ ] Filters hit clustered columns
- [ ] JOINs: largest table first, filtered *before* the join in a CTE
- [ ] Repeated dashboard aggregates → **materialized view** (auto-refreshed, auto-substituted)
`,
    terminalLanguage: "bash",
    starterCode: `bq query --use_legacy_sql=false \\\n  'SELECT student_id, RANK() OVER (PARTITION BY course_id ORDER BY score DESC) r FROM ndn.academy.quiz_attempts QUALIFY r <= 3'`,
    expectedOutput: "Query complete — 12.4 MB processed (partition pruned: 361/365 segments skipped)",
    notes: {
      coreConcepts: "Window functions aggregate without collapsing; ARRAY/STRUCT nesting replaces star-schema joins; partitioning skips segments; clustering skips blocks within them. QUALIFY is the dedup workhorse.",
      proTip: "On any new event table: PARTITION BY date, CLUSTER BY your top filter column, require_partition_filter=TRUE — this one-line habit is worth thousands in scan costs.",
      keyTerms: [
        { term: "QUALIFY", definition: "BigQuery clause filtering directly on window-function results without a subquery." },
        { term: "Partition Pruning", definition: "The engine skipping entire partitions whose date/range can't match the filter." },
        { term: "Materialized View", definition: "A precomputed, auto-refreshing view BigQuery substitutes into matching queries automatically." }
      ]
    },
    resources: [
      { name: "Window Function Docs", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/window-function-calls", type: "docs" },
      { name: "Partitioned Tables", url: "https://cloud.google.com/bigquery/docs/partitioned-tables", type: "docs" },
      { name: "Clustered Tables", url: "https://cloud.google.com/bigquery/docs/clustered-tables", type: "docs" }
    ]
  },
  {
    id: "les-data-2-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    order: 2,
    type: "video",
    title: "Lesson 2.2: Video — BigQuery from Beginner to Advanced",
    summary: "A fast, complete tour of BigQuery SQL capabilities — a consolidation pass over everything in this module.",
    durationMinutes: 14,
    videoUrl: "https://www.youtube.com/embed/eYBTdiwzJqQ",
    videoPoster: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A compact beginner-to-advanced sweep of BigQuery's SQL surface — watch it *after* the reading and note what clicks differently.

**Watch for:**
- The console workflow tricks (schema tab, query validator, execution details).
- Execution details / query plan: where the engine reports stages and bytes shuffled.
- Any feature you haven't met yet — jot it for self-study.

**Consolidation task:** open the execution details on one of your own queries and identify the most expensive stage — that's the skill that makes optimization concrete instead of theoretical.
`,
    notes: {
      coreConcepts: "The query plan (execution details) turns optimization from folklore into measurement: stages, bytes shuffled, and slot time tell you exactly where cost lives.",
      proTip: "'Bytes shuffled' spiking on a JOIN stage means you joined before filtering — push the WHERE into a CTE ahead of the join.",
      keyTerms: [
        { term: "Query Execution Details", definition: "BigQuery's per-stage breakdown of a completed query: timing, bytes read and shuffled, slot usage." }
      ]
    },
    resources: [
      { name: "Query Plan Explanation", url: "https://cloud.google.com/bigquery/docs/query-plan-explanation", type: "docs" }
    ]
  },
  {
    id: "les-data-2-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-2",
    order: 3,
    type: "lab",
    title: "Lesson 2.3: Practical Lab — Optimize a Slow, Expensive Query",
    summary: "Take a deliberately bad 4-table query and cut its scan bytes by 90%+ with partitioning, clustering, and rewrite techniques.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

You're handed a real-world horror: SELECT *, unpartitioned tables, joins before filters, dedup via GROUP BY on 14 columns. Rebuild the tables (partitioned + clustered), rewrite with CTEs, window functions, and QUALIFY, and document the before/after bytes-processed benchmark.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The before/after benchmark table is the deliverable — optimization claims without measured bytes are opinions.",
      proTip: "Use 'EXPLAIN' thinking: predict which fix will help most, then measure. Being wrong in your prediction is where the learning happens.",
      keyTerms: [
        { term: "Scan Benchmark", definition: "Recorded bytes-processed for a query before and after each optimization step." }
      ]
    },
    resources: [
      { name: "Optimize Query Performance", url: "https://cloud.google.com/bigquery/docs/best-practices-performance-overview", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 3 — Automated Data Ingestion & Pipelines
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-3-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    order: 1,
    type: "reading",
    title: "Lesson 3.1: Batch & Streaming Ingestion — GCS Loads, Firestore Sync, Scheduled ELT",
    summary: "Build ingestion that runs itself: GCS batch loads, Firestore-to-BigQuery sync, the Storage Write API, and scheduled ELT transforms.",
    durationMinutes: 35,
    readingMarkdown: `
# Batch & Streaming Ingestion — GCS Loads, Firestore Sync, Scheduled ELT

A warehouse is only as good as the pipelines feeding it. Modern practice is **ELT**: land raw data cheaply, transform *inside* BigQuery with SQL you can version and test.

## 1. Batch Loads from Cloud Storage (Free!)

Load jobs from GCS cost nothing — they use a shared slot pool:

\`\`\`bash
bq load --source_format=PARQUET \\
  ndn_raw.events_20260701 \\
  gs://ndn-landing/events/dt=2026-07-01/*.parquet
\`\`\`

Format hierarchy: **Parquet/Avro > JSONL > CSV** (self-describing schema, compression, types). CSV is where date-parsing bugs breed.

Or skip loading entirely with an **external table** over GCS for rarely-queried archives — slower queries, zero storage cost, no pipeline.

## 2. Firestore → BigQuery (Your App's Telemetry)

Two production routes:

- **Managed export**: \`gcloud firestore export gs://... --collection-ids=enrollments\`, then a free batch load. Nightly snapshot pattern.
- **Streaming extension**: the "Stream Firestore to BigQuery" extension writes every document change into a BigQuery changelog table in near-real-time, with a view reconstructing current state.

The changelog pattern gives you *history* — every state a document ever had — which is exactly what analytics wants and Firestore itself can't answer.

## 3. Streaming Writes: The Storage Write API

For direct high-throughput streaming (events from your Cloud Run services):

\`\`\`typescript
// Concept: append rows over gRPC with exactly-once semantics
import { managedwriter } from "@google-cloud/bigquery-storage";
// default stream for at-least-once, committed streams for exactly-once
\`\`\`

Rule of thumb: **if data can arrive via GCS batch, batch it** (free, simple). Stream only what dashboards genuinely need fresh within minutes.

## 4. Transform In-Warehouse: Scheduled Queries

\`\`\`sql
-- Scheduled nightly at 02:00 — raw changelog → clean analytics table
CREATE OR REPLACE TABLE \`ndn.analytics.daily_course_stats\`
PARTITION BY stat_date AS
SELECT
  DATE(attempted_at)            AS stat_date,
  course_id,
  COUNT(DISTINCT student_id)    AS active_students,
  AVG(score)                    AS avg_score,
  COUNTIF(score >= 75) / COUNT(*) AS pass_rate
FROM \`ndn.raw.quiz_attempts_changelog\`
QUALIFY ROW_NUMBER() OVER (PARTITION BY attempt_id ORDER BY ingested_at DESC) = 1
GROUP BY 1, 2;
\`\`\`

Scheduled queries (or Dataform for dependency-managed SQL projects) are the T in ELT. Raw stays raw forever; every transform is reproducible from it.

## 5. Pipeline Hygiene

- **Idempotency**: re-running a day's load must not duplicate rows — write to date-partitioned targets with WRITE_TRUNCATE per partition.
- **Late data**: partition by *event* time, not ingest time; reprocess yesterday's partition on a delay.
- **Monitoring**: alert on load-job failures AND on row-count anomalies (a silent half-empty load is worse than a loud failure).
`,
    terminalLanguage: "bash",
    starterCode: `bq load --source_format=PARQUET ndn_raw.events_20260701 gs://ndn-landing/events/dt=2026-07-01/*.parquet\nbq show -j --format=prettyjson $(bq ls -j -n 1 | tail -1 | awk '{print $1}')`,
    expectedOutput: "Load job DONE — 1,284,301 rows, 0 errors",
    notes: {
      coreConcepts: "ELT: land raw (GCS batch loads are free), transform in-warehouse with scheduled SQL. Firestore syncs via export or streaming extension; idempotent partition writes make re-runs safe.",
      proTip: "Alert on row-count deltas vs. the 7-day average for every pipeline table — silent partial loads are the most expensive class of data bug because dashboards keep 'working'.",
      keyTerms: [
        { term: "ELT", definition: "Extract-Load-Transform: land raw data first, transform inside the warehouse with versioned SQL." },
        { term: "Changelog Table", definition: "An append-only record of every document mutation, enabling point-in-time reconstruction and history analytics." },
        { term: "WRITE_TRUNCATE", definition: "Load mode replacing a (partition's) contents — the key to idempotent re-runnable pipelines." }
      ]
    },
    resources: [
      { name: "Loading from GCS", url: "https://cloud.google.com/bigquery/docs/batch-loading-data", type: "docs" },
      { name: "Firestore→BigQuery Extension", url: "https://extensions.dev/extensions/firebase/firestore-bigquery-export", type: "docs" },
      { name: "Scheduled Queries", url: "https://cloud.google.com/bigquery/docs/scheduling-queries", type: "docs" }
    ]
  },
  {
    id: "les-data-3-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    order: 2,
    type: "video",
    title: "Lesson 3.2: Video — Cloud Storage & BigQuery Ingestion in Practice",
    summary: "A worked tour of the GCS-to-BigQuery loading workflow: buckets, formats, load jobs, and verification.",
    durationMinutes: 16,
    videoUrl: "https://www.youtube.com/embed/bQKs7-1e558",
    videoPoster: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

The GCS + BigQuery loading workflow demonstrated end to end — bucket setup through verified loaded tables.

**Watch for:**
- Bucket organization conventions (landing zones, date-partitioned prefixes).
- Where schema specification happens in the load flow and what autodetect risks.
- Verifying a load: row counts and schema inspection after the job.

**Pipeline-thinking task:** sketch your landing bucket layout for the academy's three data sources (app events, quiz attempts, enrollments) with date prefixes.
`,
    notes: {
      coreConcepts: "A disciplined landing-zone layout (source/dt=YYYY-MM-DD/) is what makes loads scriptable, idempotent, and reprocessable.",
      proTip: "Never let producers write directly into a table's 'live' path — land, validate, then load. The staging hop is your data-quality firewall.",
      keyTerms: [
        { term: "Landing Zone", definition: "The GCS area where raw producer data arrives before validation and warehouse loading." }
      ]
    },
    resources: [
      { name: "GCS Documentation", url: "https://cloud.google.com/storage/docs", type: "docs" }
    ]
  },
  {
    id: "les-data-3-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-3",
    order: 3,
    type: "lab",
    title: "Lesson 3.3: Practical Lab — Self-Running Nightly Pipeline",
    summary: "Build the full loop: GCS landing, idempotent partitioned load, scheduled ELT transform, and a row-count anomaly check.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

Assemble a production-shaped pipeline: date-prefixed landing zone, idempotent load into a partitioned raw table (run it twice, prove no duplicates), a scheduled transform building daily_course_stats, and an anomaly-check query for row counts.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "'Run it twice, same result' is the idempotency proof that separates pipelines from scripts.",
      proTip: "Name scheduled queries with a numbered prefix (10_load, 20_transform, 30_check) — future-you needs the execution order visible at a glance.",
      keyTerms: [
        { term: "Anomaly Check", definition: "A scheduled assertion query comparing today's metrics against historical baselines." }
      ]
    },
    resources: [
      { name: "Dataform (SQL pipelines)", url: "https://cloud.google.com/dataform/docs", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 4 — In-Database ML with BigQuery ML
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-4-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    order: 1,
    type: "reading",
    title: "Lesson 4.1: BigQuery ML — Train, Evaluate & Predict in Pure SQL",
    summary: "Train regression, classification, and boosted-tree models with CREATE MODEL; evaluate honestly; serve predictions with ML.PREDICT.",
    durationMinutes: 40,
    readingMarkdown: `
# BigQuery ML — Train, Evaluate & Predict in Pure SQL

BigQuery ML trains models *where the data already lives*. No export, no Python cluster, no MLOps scaffolding for the first mile — just SQL. It won't replace Vertex AI for deep learning, but for tabular prediction it gets you to production value astonishingly fast.

## 1. Train: CREATE MODEL

Predict whether a student will pass a course, from their first-week behavior:

\`\`\`sql
CREATE OR REPLACE MODEL \`ndn.ml.pass_predictor\`
OPTIONS (
  model_type        = 'LOGISTIC_REG',
  input_label_cols  = ['passed'],
  data_split_method = 'AUTO_SPLIT'      -- holds out eval data for you
) AS
SELECT
  first_week_lessons_completed,
  first_week_quiz_avg,
  first_week_active_days,
  prior_courses_completed,
  course_level,
  passed                                 -- the label
FROM \`ndn.analytics.student_first_week_features\`
WHERE cohort_date < '2026-06-01';        -- train on the past only!
\`\`\`

Model menu: \`LINEAR_REG\` (numeric prediction), \`LOGISTIC_REG\` (classification), \`BOOSTED_TREE_CLASSIFIER/REGRESSOR\` (XGBoost — usually the tabular winner), \`KMEANS\` (segmentation), \`ARIMA_PLUS\` (time-series forecasting).

## 2. Evaluate — Honestly

\`\`\`sql
SELECT * FROM ML.EVALUATE(MODEL \`ndn.ml.pass_predictor\`);
-- precision, recall, accuracy, f1_score, log_loss, roc_auc
\`\`\`

Reading the numbers with a 90% pass rate in the data: accuracy 0.90 is *worthless* (predict-always-pass achieves it). Look at **roc_auc** for ranking quality and the **precision/recall tradeoff** at your operating threshold:

\`\`\`sql
SELECT * FROM ML.CONFUSION_MATRIX(MODEL \`ndn.ml.pass_predictor\`, (SELECT ...));
\`\`\`

For an intervention use case (email struggling students), **recall on the failing class** is the metric that matters — missing a struggling student costs more than a false alarm.

## 3. Understand: Feature Attribution

\`\`\`sql
SELECT * FROM ML.GLOBAL_EXPLAIN(MODEL \`ndn.ml.pass_predictor\`);
-- which features drive predictions overall

SELECT * FROM ML.EXPLAIN_PREDICT(MODEL \`ndn.ml.pass_predictor\`,
  (SELECT * FROM new_students), STRUCT(3 AS top_k_features));
-- per-student: WHY this prediction
\`\`\`

Per-prediction explanations turn a score into an actionable sentence: "at risk — low active days (−0.4), weak quiz average (−0.3)."

## 4. Predict: Batch Scoring

\`\`\`sql
CREATE OR REPLACE TABLE \`ndn.analytics.at_risk_students\` AS
SELECT
  student_id,
  predicted_passed_probs[OFFSET(1)].prob AS pass_probability
FROM ML.PREDICT(
  MODEL \`ndn.ml.pass_predictor\`,
  (SELECT * FROM \`ndn.analytics.current_students_features\`)
)
WHERE predicted_passed_probs[OFFSET(1)].prob < 0.6;
\`\`\`

Schedule that nightly (Module 3's machinery) and you have a production ML system: features refresh, predictions land, dashboards and intervention emails consume them.

## 5. The Leakage Trap

The #1 way to build an impressively useless model: training features that **contain the future** (e.g. \`final_quiz_avg\` when predicting course completion). Discipline: every feature must be knowable *at prediction time*. The tell is suspicious perfection — roc_auc 0.99 on tabular human-behavior data means leakage until proven otherwise.
`,
    terminalLanguage: "bash",
    starterCode: `bq query --use_legacy_sql=false 'SELECT roc_auc, precision, recall FROM ML.EVALUATE(MODEL ndn.ml.pass_predictor)'`,
    expectedOutput: "roc_auc: 0.847 | precision: 0.81 | recall: 0.74",
    notes: {
      coreConcepts: "CREATE MODEL trains where data lives; ML.EVALUATE with class-imbalance awareness (roc_auc over accuracy); ML.EXPLAIN_PREDICT makes scores actionable; scheduled ML.PREDICT is production serving. Leakage is the #1 failure.",
      proTip: "Before celebrating any metric, ask: 'could a dumb rule achieve this?' Always benchmark against predict-the-majority-class — it calibrates every other number.",
      keyTerms: [
        { term: "Data Leakage", definition: "Training on information unavailable at prediction time, producing inflated metrics and useless models." },
        { term: "ROC AUC", definition: "Probability the model ranks a random positive above a random negative — robust to class imbalance, unlike accuracy." },
        { term: "ML.EXPLAIN_PREDICT", definition: "Per-row feature attributions explaining why the model scored an instance as it did." }
      ]
    },
    resources: [
      { name: "BigQuery ML Intro", url: "https://cloud.google.com/bigquery/docs/bqml-introduction", type: "docs" },
      { name: "CREATE MODEL Reference", url: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create", type: "docs" },
      { name: "Explainable AI in BQML", url: "https://cloud.google.com/bigquery/docs/xai-overview", type: "docs" }
    ]
  },
  {
    id: "les-data-4-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    order: 2,
    type: "video",
    title: "Lesson 4.2: Video — Hands-On Intro to BigQuery ML",
    summary: "Live training and evaluation of BigQuery ML models — the CREATE MODEL workflow demonstrated on real data.",
    durationMinutes: 18,
    videoUrl: "https://www.youtube.com/embed/1_K7rWb_9FU",
    videoPoster: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

BQML demonstrated hands-on: create, evaluate, predict, iterate.

**Watch for:**
- How fast the iteration loop is — that speed is BQML's entire value proposition.
- The training-info output during CREATE MODEL (loss curves in SQL results!).
- Choices the presenter makes about features and splits — would you make the same ones?

**Critical-eye task:** spot one place in the demo where data leakage *could* creep in if the features were built carelessly — write down the specific column risk.
`,
    notes: {
      coreConcepts: "BQML's superpower is iteration speed: feature idea → trained model → evaluation in minutes, all in the warehouse.",
      proTip: "Use ML.TRAINING_INFO after every training run — a loss curve that's still falling means you can train longer; one that's flat immediately means your features are weak.",
      keyTerms: [
        { term: "ML.TRAINING_INFO", definition: "Per-iteration training metrics (loss, duration) for a BQML model — your training diagnostics in SQL." }
      ]
    },
    resources: [
      { name: "BQML Tutorials", url: "https://cloud.google.com/bigquery/docs/create-machine-learning-model", type: "docs" }
    ]
  },
  {
    id: "les-data-4-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-4",
    order: 3,
    type: "lab",
    title: "Lesson 4.3: Practical Lab — At-Risk Student Predictor",
    summary: "Engineer leakage-free features, train logistic + boosted-tree models, pick a metric-justified winner, and ship scored predictions.",
    durationMinutes: 60,
    readingMarkdown: `
# Practical Lab

Build the module's model for real: a leakage-audited feature table, LOGISTIC_REG and BOOSTED_TREE_CLASSIFIER trained on the same features, an evaluation memo justifying your champion (against the majority-class baseline!), and a scheduled prediction table of at-risk students with per-student explanations.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "The leakage audit and the baseline comparison are the two habits that make this ML engineering rather than SQL incantation.",
      proTip: "Write the leakage audit as a table: feature | knowable at prediction time? | evidence. Reviewers (and graders) reward the paper trail.",
      keyTerms: [
        { term: "Champion Model", definition: "The model selected for production after metric comparison against alternatives and baselines." }
      ]
    },
    resources: [
      { name: "BQML Feature Engineering", url: "https://cloud.google.com/bigquery/docs/preprocess-overview", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 5 — MLOps: Deployment & Monitoring
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-5-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    order: 1,
    type: "reading",
    title: "Lesson 5.1: MLOps — Vertex AI Serving, Drift Detection & Automated Retraining",
    summary: "Export BQML models to Vertex AI endpoints for online serving, monitor feature and prediction drift, and automate retraining safely.",
    durationMinutes: 40,
    readingMarkdown: `
# MLOps — Vertex AI Serving, Drift Detection & Automated Retraining

A trained model is an asset that **depreciates**: the world drifts away from its training data. MLOps is the engineering that notices and responds.

## 1. Batch vs Online Serving

Your Module 4 predictor serves nightly batch — fine for intervention emails. When the *app* needs a score per request (sub-100ms), you need an endpoint:

\`\`\`bash
# Export the BQML model to GCS in TensorFlow SavedModel format
bq extract --model ndn:ml.pass_predictor gs://ndn-models/pass_predictor/v3

# Register and deploy on Vertex AI
gcloud ai models upload --region=europe-west1 \\
  --display-name=pass-predictor-v3 \\
  --artifact-uri=gs://ndn-models/pass_predictor/v3 \\
  --container-image-uri=europe-docker.pkg.dev/vertex-ai/prediction/tf2-cpu.2-15:latest

gcloud ai endpoints deploy-model $ENDPOINT_ID --region=europe-west1 \\
  --model=$MODEL_ID --traffic-split=0=100 --machine-type=n1-standard-2
\`\`\`

Note \`--traffic-split\` — Vertex endpoints support the same canary pattern as Cloud Run: deploy v4 at 10%, compare live metrics, promote or roll back.

## 2. Drift: The Silent Failure

Models rarely fail loudly; they fail by becoming quietly wrong. Two distinct phenomena:

- **Feature drift**: input distributions shift (a new course level launches; holiday behavior).
- **Prediction drift**: output distribution shifts (suddenly 40% of students flagged at-risk).

Monitor both with scheduled SQL against your own serving logs:

\`\`\`sql
-- Population Stability Index-style check on a key feature
WITH baseline AS (
  SELECT APPROX_QUANTILES(first_week_quiz_avg, 10) q
  FROM \`ndn.ml.training_snapshot_v3\`
),
current AS (
  SELECT first_week_quiz_avg FROM \`ndn.serving.feature_log\`
  WHERE logged_at > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
)
SELECT bucket, baseline_pct, current_pct,
       (current_pct - baseline_pct) * LN(current_pct / baseline_pct) AS psi_term
FROM ...;  -- alert when total PSI > 0.2
\`\`\`

Vertex AI **Model Monitoring** automates this (skew + drift alerts against the training baseline) if you'd rather configure than build.

## 3. Ground Truth & Actual Performance

Drift is a proxy; the real question is "is the model still right?" — answerable only when outcomes arrive (the student finishes the course). Build the join:

\`\`\`sql
CREATE OR REPLACE VIEW \`ndn.ml.live_performance\` AS
SELECT DATE(p.predicted_at) AS day,
       AVG(CAST(p.predicted_pass AS INT64) = CAST(o.actually_passed AS INT64) |> AVG) AS accuracy,
       -- (conceptually: rolling accuracy/recall as outcomes mature)
FROM \`ndn.serving.prediction_log\` p
JOIN \`ndn.analytics.course_outcomes\` o USING (student_id, course_id);
\`\`\`

Rolling live metrics vs. training metrics is the honest scoreboard.

## 4. Automated Retraining — With Gates

\`\`\`text
trigger (monthly schedule OR drift alert)
  → retrain on fresh window          (CREATE OR REPLACE MODEL …)
  → ML.EVALUATE on held-out recent data
  → GATE: new roc_auc ≥ champion − 0.01 ?
      yes → export, deploy at 10% traffic, watch 48h, promote
      no  → alert a human, keep champion
\`\`\`

The gate is everything. Retraining *without* evaluation gates automates the shipping of worse models. Keep every model version's training snapshot, metrics, and deployment window in a registry table — when someone asks "why did April's predictions look weird?", you can answer.

## 5. The MLOps Maturity Ladder

1. Manual notebook, manual deploy (where everyone starts)
2. Scheduled batch predictions (your Module 4 lab)
3. Monitored serving with drift alerts (this module)
4. Gated automated retraining (this module's lab)
5. Full CI/CD for pipelines + models (Vertex AI Pipelines — beyond this course)

Most business value ships at rungs 2–4. Don't build rung 5 before rung 3's alerts have ever fired.
`,
    terminalLanguage: "gcloud",
    starterCode: `bq extract --model ndn:ml.pass_predictor gs://ndn-models/pass_predictor/v3\ngcloud ai endpoints list --region=europe-west1`,
    expectedOutput: "Model exported. ENDPOINT: pass-predictor-endpoint (traffic: v3=100%)",
    notes: {
      coreConcepts: "Export BQML → Vertex endpoint for online serving with canary traffic splits. Monitor feature drift (PSI), prediction drift, and matured ground-truth accuracy. Retrain on triggers, but only deploy through evaluation gates.",
      proTip: "Log every online prediction (features + score + model version) back into BigQuery — that single table powers drift checks, live accuracy, and your next training set.",
      keyTerms: [
        { term: "Drift", definition: "Distribution shift in features or predictions relative to the training baseline, degrading model validity." },
        { term: "PSI (Population Stability Index)", definition: "A bucketed distribution-comparison metric; >0.2 conventionally signals actionable drift." },
        { term: "Evaluation Gate", definition: "An automated metric threshold a retrained model must pass before deployment." }
      ]
    },
    resources: [
      { name: "Export BQML Models", url: "https://cloud.google.com/bigquery/docs/exporting-models", type: "docs" },
      { name: "Vertex AI Model Monitoring", url: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview", type: "docs" },
      { name: "MLOps Whitepaper (Google)", url: "https://cloud.google.com/resources/mlops-whitepaper", type: "article" }
    ]
  },
  {
    id: "les-data-5-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    order: 2,
    type: "video",
    title: "Lesson 5.2: Video — Real-Time AI/ML APIs with BigQuery & Vertex",
    summary: "Serving ML from the warehouse to live APIs on GCP — the batch-to-online bridge in practice.",
    durationMinutes: 17,
    videoUrl: "https://www.youtube.com/embed/wKTHUcGDLJE",
    videoPoster: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

A build session connecting warehouse-trained ML to live serving on GCP.

**Watch for:**
- The architecture hop: where the model leaves BigQuery and where features come from at request time.
- Latency budget accounting — which pieces cost the milliseconds.
- How the serving path stays consistent with the training feature definitions (the skew problem).

**Design task:** for the pass-predictor, decide which features you'd precompute nightly vs. compute at request time, and justify each with its freshness requirement.
`,
    notes: {
      coreConcepts: "Training/serving skew — features computed differently offline vs online — is the classic production ML bug; one shared feature definition is the cure.",
      proTip: "Precompute everything that tolerates staleness into a feature table keyed by user — request-time compute should be the exception, not the default.",
      keyTerms: [
        { term: "Training/Serving Skew", definition: "Mismatch between feature computation at training vs. inference time, silently corrupting predictions." }
      ]
    },
    resources: [
      { name: "Vertex AI Predictions", url: "https://cloud.google.com/vertex-ai/docs/predictions/get-predictions", type: "docs" }
    ]
  },
  {
    id: "les-data-5-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-5",
    order: 3,
    type: "lab",
    title: "Lesson 5.3: Practical Lab — Monitored Serving with a Retraining Gate",
    summary: "Deploy the predictor behind an endpoint (or simulated server), log predictions, detect injected drift, and run a gated retrain.",
    durationMinutes: 60,
    readingMarkdown: `
# Practical Lab

Operate your model like production: serve it (Vertex endpoint or a local scoring API), log every prediction to BigQuery, run the PSI drift check against an injected drifted cohort, trigger a retrain, and demonstrate the evaluation gate rejecting a deliberately degraded challenger.

Complete the lab in the **Lab Studio** panel below and submit for grading.
`,
    notes: {
      coreConcepts: "Demonstrating the gate *rejecting* a bad model is the lab's proof — a pipeline that can only say yes isn't a gate.",
      proTip: "Inject drift by filtering your scoring cohort (e.g. only L1 students) rather than fabricating data — realistic drift teaches more than synthetic noise.",
      keyTerms: [
        { term: "Challenger Model", definition: "A newly trained candidate compared against the champion before any traffic shift." }
      ]
    },
    resources: [
      { name: "Model Registry Concepts", url: "https://cloud.google.com/vertex-ai/docs/model-registry/introduction", type: "docs" }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // MODULE 6 — BI & Executive Dashboards
  // ─────────────────────────────────────────────────────────
  {
    id: "les-data-6-1",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    order: 1,
    type: "reading",
    title: "Lesson 6.1: Looker Studio on BigQuery — Fast, Cheap, Trustworthy Dashboards",
    summary: "Connect Looker Studio to BigQuery the right way: curated views, BI Engine acceleration, cost-safe data freshness, and dashboard design that drives decisions.",
    durationMinutes: 35,
    readingMarkdown: `
# Looker Studio on BigQuery — Fast, Cheap, Trustworthy Dashboards

The last mile of the data platform is where credibility is won or lost: a slow, expensive, or subtly-wrong dashboard undoes every module before it.

## 1. Never Point Dashboards at Raw Tables

Create a **reporting layer** — curated, documented views the BI tool is allowed to see:

\`\`\`sql
CREATE OR REPLACE VIEW \`ndn.reporting.course_kpis\` AS
SELECT
  stat_date,
  course_id,
  course_title,
  active_students,
  avg_score,
  pass_rate,
  at_risk_count          -- ← your Module 4 model, surfacing in BI!
FROM \`ndn.analytics.daily_course_stats\`
JOIN \`ndn.analytics.at_risk_rollup\` USING (stat_date, course_id);
\`\`\`

Benefits: schema changes don't break reports (the view absorbs them), business logic (what counts as "active"?) is defined once, and IAM can restrict BI access to the reporting dataset only.

## 2. Connection Modes & Cost

Every viewer interaction can fire real BigQuery queries. Control the blast radius:

- **Owner's credentials**: viewers see data via *your* access — simple, right for internal dashboards.
- **Extract data source**: snapshot up to 100 MB into Looker Studio — zero query cost, scheduled refresh; perfect for small KPI sets.
- **BI Engine**: BigQuery's in-memory acceleration; reserve capacity (e.g. 1–2 GB) for sub-second dashboard queries on hot data.

Cost rule: dashboards query **pre-aggregated** tables (daily grain, not raw events). Your nightly ELT (Module 3) should leave dashboards nothing heavy to do.

## 3. Building the Executive View

One screen, five components, in priority order:

1. **Scorecards** — the 3–4 KPIs with period-over-period deltas (enrollments, pass rate, revenue/CPD credits, at-risk count).
2. **Time series** — the trend behind the headline number.
3. **Breakdown bar/table** — per-course comparison with conditional formatting.
4. **Controls** — date range + course filter, top-left, defaulting to 'last 28 days'.
5. **Freshness stamp** — a text field bound to MAX(stat_date); *the* trust signal.

Design discipline: every chart answers a named question ("Which course leaks students in week 1?"). A chart nobody can phrase the question for gets deleted.

## 4. Trustworthiness Engineering

- **Definitions block**: a hidden page documenting each metric's SQL definition — ends the "your numbers don't match mine" meetings.
- **Row-level security** where needed: per-instructor views via SESSION_USER() filters in an authorized view.
- **Anomaly honesty**: if yesterday's pipeline failed, the freshness stamp shows it — never let a dashboard silently serve stale data as current.

## 5. Beyond Looker Studio

When you outgrow it (semantic modeling, governed self-serve, embedded analytics), the successor is Looker (the platform) with LookML models over the same BigQuery layer. The reporting-view discipline you built here transfers directly — that layer *is* your proto-semantic-model.
`,
    terminalLanguage: "bash",
    starterCode: `bq query --use_legacy_sql=false 'SELECT MAX(stat_date) AS data_through FROM ndn.reporting.course_kpis'`,
    expectedOutput: "data_through: 2026-07-02 (freshness stamp: green)",
    notes: {
      coreConcepts: "BI reads a curated reporting layer, never raw tables. Pre-aggregate in ELT so dashboards are cheap; extract/BI Engine for speed; freshness stamps and definition blocks buy trust.",
      proTip: "Add the freshness scorecard (MAX(stat_date)) to every dashboard's header row — it's ten minutes of work and permanently answers 'is this current?'",
      keyTerms: [
        { term: "Reporting Layer", definition: "The curated dataset of documented views that BI tools are permitted to query." },
        { term: "BI Engine", definition: "BigQuery's in-memory acceleration reservation for sub-second dashboard queries." },
        { term: "Authorized View", definition: "A view granted access to underlying data its readers can't query directly — the row-level-security building block." }
      ]
    },
    resources: [
      { name: "Looker Studio + BigQuery", url: "https://cloud.google.com/bigquery/docs/visualize-looker-studio", type: "docs" },
      { name: "BI Engine Docs", url: "https://cloud.google.com/bigquery/docs/bi-engine-intro", type: "docs" },
      { name: "Authorized Views", url: "https://cloud.google.com/bigquery/docs/authorized-views", type: "docs" }
    ]
  },
  {
    id: "les-data-6-2",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    order: 2,
    type: "video",
    title: "Lesson 6.2: Video — Visualize BigQuery Data with Looker",
    summary: "Official walkthrough of transforming BigQuery data into interactive visualizations and reports.",
    durationMinutes: 14,
    videoUrl: "https://www.youtube.com/embed/Q2JD3_YBaRc",
    videoPoster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    readingMarkdown: `
# Video Briefing

The official tour of connecting BigQuery to Looker-family visualization and building reports on it.

**Watch for:**
- The connector flow and where credentials/mode choices happen (Lesson 6.1's cost lever).
- Dimension vs. metric handling and calculated fields.
- Sharing and scheduling — reports as a product, not a screenshot.

**Build-along:** connect one of your course tables and reproduce a scorecard + time series pair as the video demonstrates.
`,
    notes: {
      coreConcepts: "The connector's data-source layer (dimensions, metrics, calculated fields) is a mini semantic model — invest naming discipline there, and every chart built on it inherits clarity.",
      proTip: "Rename every field in the data source to business language (pass_rate → 'Pass Rate %') before building charts — chart-level renames don't propagate and drift apart.",
      keyTerms: [
        { term: "Calculated Field", definition: "A derived dimension/metric defined in the BI layer with formula syntax." }
      ]
    },
    resources: [
      { name: "Looker Studio Help", url: "https://support.google.com/looker-studio", type: "docs" }
    ]
  },
  {
    id: "les-data-6-3",
    courseId: "course-bigquery-mlops",
    moduleId: "mod-data-6",
    order: 3,
    type: "lab",
    title: "Lesson 6.3: Practical Lab — Executive KPI Dashboard",
    summary: "Ship the full last mile: reporting views, a five-component executive dashboard with freshness stamp, and a definitions page.",
    durationMinutes: 55,
    readingMarkdown: `
# Practical Lab

The course's closing build: create the reporting views (including the at-risk model output), then a shareable executive dashboard — scorecards with deltas, trend, per-course breakdown, controls, freshness stamp — plus the metric-definitions page that makes it defensible.

Complete the lab in the **Lab Studio** panel below and submit your dashboard link for grading.
`,
    notes: {
      coreConcepts: "A dashboard an executive can act on without asking you questions — that's the bar, and the definitions page is what gets you there.",
      proTip: "Show your draft to someone unfamiliar with the data and watch silently where their eyes stall — every hesitation is a labeling or layout fix.",
      keyTerms: [
        { term: "KPI Scorecard", definition: "A single-number visual with comparison delta — the executive dashboard's atomic unit." }
      ]
    },
    resources: [
      { name: "Looker Studio Report Best Practices", url: "https://cloud.google.com/looker/docs/studio", type: "docs" }
    ]
  }
];

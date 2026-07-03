import { Lab, LabSubmission } from '../types/academy';

export interface LabValidationResult {
  score: number;
  status: 'passed' | 'needs_revision';
  feedback: string;
  checklistPassed: boolean;
  repoValid: boolean;
  deployedUrlValid: boolean;
  codeKeywordsValid: boolean;
  reflectionValid: boolean;
}

export const validateLabSubmission = (
  lab: Lab,
  submission: Partial<LabSubmission>,
  checklistCompleted: boolean = true
): LabValidationResult => {
  let score = 100;
  const feedbackMessages: string[] = [];

  // Check required evidence
  if (lab.requiredEvidence.includes("repo_url")) {
    const isGithub = (submission.repoUrl || "").trim().toLowerCase().startsWith("https://github.com/");
    if (!isGithub) {
      score -= 30;
      feedbackMessages.push("Repository URL must be a valid GitHub URL starting with 'https://github.com/'.");
    }
  }

  if (lab.requiredEvidence.includes("deployed_url")) {
    const isHttps = (submission.deployedUrl || "").trim().toLowerCase().startsWith("https://");
    if (!isHttps) {
      score -= 25;
      feedbackMessages.push("Deployed application URL must use secure HTTPS protocols.");
    }
  }

  if (lab.requiredEvidence.includes("reflection")) {
    const refLen = (submission.reflection || "").trim().length;
    if (refLen < 50) {
      score -= 20;
      feedbackMessages.push("Reflection summary must contain at least 50 characters detailing your engineering approach.");
    }
  }

  if (lab.starterCode && lab.requiredEvidence.includes("code")) {
    const submittedCode = (submission.submittedCode || "").trim();
    if (submittedCode.length < 20) {
      score -= 30;
      feedbackMessages.push("Submitted code snippet is incomplete or missing core statements.");
    }
  }

  if (!checklistCompleted) {
    score -= 25;
    feedbackMessages.push("All guided checklist steps must be marked complete prior to final submission.");
  }

  const finalScore = Math.max(0, score);
  const status: 'passed' | 'needs_revision' = finalScore >= 75 ? 'passed' : 'needs_revision';

  const feedbackHeader = status === 'passed'
    ? "✅ Local validation passed! Submission verified against NDN Analytics engineering rubric."
    : "⚠️ Revisions needed before passing evaluation:";

  const feedback = [feedbackHeader, ...feedbackMessages].join("\n• ");

  return {
    score: finalScore,
    status,
    feedback,
    checklistPassed: checklistCompleted,
    repoValid: submission.repoUrl ? submission.repoUrl.startsWith("https://github.com/") : true,
    deployedUrlValid: submission.deployedUrl ? submission.deployedUrl.startsWith("https://") : true,
    codeKeywordsValid: (submission.submittedCode || "").length >= 20,
    reflectionValid: (submission.reflection || "").length >= 50
  };
};

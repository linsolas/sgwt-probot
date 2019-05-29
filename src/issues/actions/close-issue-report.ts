import { Context } from 'probot';
import { distanceInWords } from 'date-fns';
import { getIssue, isActionEnabled } from '../../common/utils';
import { FLAG_ENABLE_ACTION_CLOSE_ISSUE_REPORT } from '../../common/constants';

/**
 * Say hi to the creator of the issue, and indicates that an answer will be given soon...
 * This action should be enabled in `config.yml`, `sgwtProbotNewIssueSayHi: true`.
 */
export async function issueReport(context: Context) {
  if (await isActionEnabled(context, FLAG_ENABLE_ACTION_CLOSE_ISSUE_REPORT)) {
    const issue = await getIssue(context);
    if (issue.data.closed_at) {
      const from = new Date(issue.data.created_at);
      const to = new Date(issue.data.closed_at!);
      const duration = distanceInWords(from, to);
      context.github.issues.createComment(
        context.issue({
          body: `
Time to close the issue: **${duration}**.
`
        })
      );
    }
  }
}

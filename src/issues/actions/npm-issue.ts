import { Context } from 'probot';
import { getIssue, isActionEnabled } from '../../common/utils';
import { FLAG_ENABLE_ACTION_NPM_ISSUE } from '../../common/constants';

/**
 * This action checks if the new issue is somehow related to an npm configuration issue.
 * If this is the case, it indicates that a documentation on DX Portal exists...
 * This action should be enabled in `config.yml`, `sgwtProbotNewIssueNpmIssue: true`.
 */
export async function npmIssue(context: Context) {
  const creator = context.payload.issue.user.login;
  if (await isActionEnabled(context, FLAG_ENABLE_ACTION_NPM_ISSUE)) {
    const issue = await getIssue(context);
    if (issue) {
      const message = issue.data.body;
      if (
        context.payload.issue.indexOf('SGWT Installer fails to install my environment') > -1
        // TODO Check the content of the message to search for npm...
      ) {
        const onBehalf = 'on behalf of';
        let user = creator;
        const pos = message.indexOf(onBehalf);
        if (pos > -1) {
          user = message.substring(
            message.indexOf('@', pos) + 1,
            message.indexOf('.', pos));
        }
        context.github.issues.createComment(
          context.issue({
            body: `
Hello @${user}.

You have created a message that seems to be related to an npm issue, or an npm configuration problem.

Could you please first check that your problem is not already handled in the [Developer Portal documentation](https://developer.sgmarkets.com/resources/web/get-started/npm-issues.html), especially regarding your proxy configuration.

Thanks.
`
          })
        );
      }
    }
  }
}

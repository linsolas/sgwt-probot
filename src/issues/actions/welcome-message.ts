import { Context } from 'probot';
import { getConfig } from '../../common/utils';
import { PARAMETER_ACTION_WELCOME_MESSAGE } from '../../common/constants';

/**
 * Say a welcome message for a user that creates an issue on this repository for the first time.
 * The message is configured in `config.yml`, `sgwtProbotNewIssueWelcomeComment` property.
 */
export async function welcomeMessage(context: Context) {
  const creator = context.payload.issue.user.login;
  const response = await context.github.issues.listForRepo(
    context.repo({
      state: 'all',
      creator
    })
  );
  const count = response.data.filter(data => !data.pull_request).length;
  if (count === 1) {
    const msg = await getConfig(context, PARAMETER_ACTION_WELCOME_MESSAGE);
    context.log(`Message: ${msg}`);
    if (msg) {
      context.github.issues.createComment(
        context.issue({
          body: msg
        })
      );
    }
  }
}

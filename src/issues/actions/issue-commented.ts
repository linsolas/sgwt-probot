import { Context } from 'probot';
import { isActionEnabled, getIssue } from '../../common/utils';
import { FLAG_ENABLE_ACTION_BOT } from '../../common/constants';

/**
 * Say hi to the creator of the issue, and indicates that an answer will be given soon...
 * This action should be enabled in `config.yml`, `sgwtProbotNewIssueSayHi: true`.
 */
export async function issueCommented(context: Context) {
  if (await isActionEnabled(context, FLAG_ENABLE_ACTION_BOT)) {
    const message = context.payload.comment.body;
    const creator = context.payload.comment.user.login;
    if (message.indexOf('/sgwt') > -1) {
      const action = message.substring(message.indexOf('/sgwt') + 5).toLowerCase().trim();
      context.github.issues.createComment(
        context.issue({
          body: `
Hello @${creator}.

You called me to run the action \`${action}\`...
I will take care of this soon :wink:
`
        })
      );
    }
  }
}

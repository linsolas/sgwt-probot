import { Context } from 'probot';
import { isActionEnabled } from '../../common/utils';
import { FLAG_ENABLE_ACTION_SAY_HI } from '../../common/constants';

/**
 * Say hi to the creator of the issue, and indicates that an answer will be given soon...
 * This action should be enabled in `config.yml`, `sgwtProbotNewIssueSayHi: true`.
 */
export async function sayHi(context: Context) {
  const creator = context.payload.issue.user.login;
  if (await isActionEnabled(context, FLAG_ENABLE_ACTION_SAY_HI)) {
    context.github.issues.createComment(
      context.issue({
        body: `
Hello @${creator}.

Thanks for creating a new Support ticket on SGWT.
The team will answer shortly to your issue.
Please check that you filled all the required details, so they will be able to help you efficiently!

Thanks.
`
      })
    );
  }
}

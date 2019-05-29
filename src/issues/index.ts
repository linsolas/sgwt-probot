import { Context } from 'probot';
import { welcomeMessage } from './actions/welcome-message';
import { sayHi } from './actions/say-hi';
import { npmIssue } from './actions/npm-issue';
import { issueReport } from './actions/close-issue-report';
import { issueCommented } from './actions/issue-commented';

/**
 * Runs all the possible actions when a new issue is created.
 */
export async function issueCreated(context: Context) {
  context.log('New issue created, run dedicated actions...');
  Promise.all([
    welcomeMessage(context),
    sayHi(context),
    npmIssue(context)
  ])
  .then(() => context.log('Issue created - Done'))
  .catch(err => context.log(`Error: ${err}`));
}

export async function issueClosed(context: Context) {
  context.log('Issue closed, run dedicated actions...');
  Promise.all([
    issueReport(context)
  ])
  .then(() => context.log('Issue closed - Done'))
  .catch(err => context.log(`Error: ${err}`));
}

export async function issueComment(context: Context) {
  context.log('Issue commented, run dedicated actions...');
  Promise.all([
    issueCommented(context)
  ])
  .then(() => context.log('Issue commented - Done'))
  .catch(err => context.log(`Error: ${err}`));
}

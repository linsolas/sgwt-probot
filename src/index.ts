import { Application } from 'probot';
import { issueCreated, issueClosed, issueComment } from './issues';

export = (app: Application) => {
  app.log('SGWT Probot ready...');
  // Listen to Github Webhooks
  // https://developer.github.com/webhooks/
  app.on('issues.opened', issueCreated);
  app.on('issues.closed', issueClosed);
  app.on('issue_comment', issueComment);
}

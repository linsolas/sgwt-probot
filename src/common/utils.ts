import { Context } from "probot";

/**
 * Get property from the `config.yml` configuration file, `null` if the property or the configuration file does not exist.
 */
export async function getConfig(context: Context, prop: string) {
  try {
    const config = await context.config('config.yml');
    if (config && config[prop]) {
      return config[prop] as string;
    }
  } catch (err) {
    if (err.code !== 404) {
      throw err;
    }
  }
  return null;
}

/**
 * Checks if the action is enabled in the corresponding property of the `config.yml` configuration file.
 */
export async function isActionEnabled(context: Context, prop: string) {
  const enabled = await getConfig(context, prop);
  return typeof enabled !== 'undefined' && enabled;
}

/**
 * Get the full issue information from the context...
 */
export async function getIssue(context: Context) {
  return context.github.issues.get({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.issue.number
  });
}

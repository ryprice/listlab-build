import ListlabApiConfig from 'listlab-api/ListlabApiConfig';

export const buildListlabApiConfig = (args: {
  target: 'local' | 'prod',
  api: 'local' | 'prod',
}): Partial<ListlabApiConfig> => {
  const {target, api} = args;
  const apiBase = api === 'local' ? 'https://api.local.listlab.io' : 'https://api.listlab.io';
  const rootDomain = target === 'local' ? 'local.listlab.io' : 'listlab.io';
  return {
    Env: target,
    WebAddress: `https://www.${rootDomain}`,
    AppAddress: `https://app.${rootDomain}`,
    InternAddress: `https://intern.${rootDomain}`,
    StaticAddress: `https://static.${rootDomain}`,
    RootDomain: rootDomain,
    TaskServiceAddress: `${apiBase}/tasks`,
    AuthServiceAddress: `${apiBase}/sts`,
    UserServiceAddress: `${apiBase}/users`,
    NotificationServiceAddress: `${apiBase}/notifications`,
    CommentServiceAddress: `${apiBase}/comments`,
    ListServiceAddress: `${apiBase}/lists`,
    RootServiceAddress: apiBase,
    TaskSyncWsServiceAddress: `wss://${api === 'local' ? 'api.local.listlab.io' : 'api.listlab.io'}/tasksync`,
  };
};


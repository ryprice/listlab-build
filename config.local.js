if (window.listlabConfig) {
  var withApiConfig = window.listlabConfig;
} else {
  var withApiConfig = {
    Env: 'local',
    WebAddress: 'https://www.local.listlab.io',
    AppAddress: 'https://app.local.listlab.io',
    RootDomain: 'local.listlab.io'
  };
}

withApiConfig.TaskServiceAddress = 'https://api.local.listlab.io/tasks';
withApiConfig.AuthServiceAddress = 'https://api.local.listlab.io/sts';
withApiConfig.UserServiceAddress = 'https://api.local.listlab.io/users';
withApiConfig.NotificationServiceAddress = 'https://api.local.listlab.io/notifications';
withApiConfig.CommentServiceAddress = 'https://api.local.listlab.io/comments';
withApiConfig.ListServiceAddress = 'https://api.local.listlab.io/lists';
withApiConfig.RootServiceAddress = 'https://api.local.listlab.io';
withApiConfig.TaskSyncWsServiceAddress = 'wss://api.local.listlab.io/tasksync';

window.listlabConfig = withApiConfig;

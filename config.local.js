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

withApiConfig.TaskServiceAddress = 'https://api.local.listlab.io:8080/tasks';
withApiConfig.AuthServiceAddress = 'https://api.local.listlab.io:8080/sts';
withApiConfig.UserServiceAddress = 'https://api.local.listlab.io:8080/users';
withApiConfig.NotificationServiceAddress = 'https://api.local.listlab.io:8080/notifications';
withApiConfig.CommentServiceAddress = 'https://api.local.listlab.io:8080/comments';
withApiConfig.ListServiceAddress = 'https://api.local.listlab.io:8080/lists';
withApiConfig.RootServiceAddress = 'https://api.local.listlab.io:8080';
withApiConfig.TaskSyncWsServiceAddress = 'wss://api.local.listlab.io:8088/tasksync';

window.listlabConfig = withApiConfig;

if (window.listlabConfig) {
  var withApiConfig = window.listlabConfig;
} else {
  var withApiConfig = {
    Env: 'prod',
    WebAddress: 'https://www.listlab.io',
    AppAddress: 'https://app.listlab.io',
    RootDomain: 'listlab.io'
  };
}

withApiConfig.TaskServiceAddress = 'https://api.listlab.io/tasks';
withApiConfig.AuthServiceAddress = 'https://api.listlab.io/sts';
withApiConfig.UserServiceAddress = 'https://api.listlab.io/users';
withApiConfig.NotificationServiceAddress = 'https://api.listlab.io/notifications';
withApiConfig.CommentServiceAddress = 'https://api.listlab.io/comments';
withApiConfig.ListServiceAddress = 'https://api.listlab.io/lists';
withApiConfig.RootServiceAddress = 'https://api.listlab.io';

window.listlabConfig = withApiConfig;

var withApiConfig = window.listlabConfig;
withApiConfig.TaskServiceAddress = 'http://api.listlab.io/tasks';
withApiConfig.AuthServiceAddress = 'http://api.listlab.io/sts';
withApiConfig.UserServiceAddress = 'http://api.listlab.io/users';
withApiConfig.NotificationServiceAddress = 'http://api.listlab.io/notifications';
withApiConfig.CommentServiceAddress = 'http://api.listlab.io/comments';
withApiConfig.ListServiceAddress = 'http://api.listlab.io/lists';

window.listlabConfig = withApiConfig;

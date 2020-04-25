var withApiConfig = window.listlabConfig;
withApiConfig.TaskServiceAddress = 'http://api.listlab.local:8080/tasks';
withApiConfig.AuthServiceAddress = 'http://api.listlab.local:8080/sts';
withApiConfig.UserServiceAddress = 'http://api.listlab.local:8080/users';
withApiConfig.NotificationServiceAddress = 'http://api.listlab.local:8080/notifications';
withApiConfig.CommentServiceAddress = 'http://api.listlab.local:8080/comments';
withApiConfig.ListServiceAddress = 'http://api.listlab.local:8080/lists';
withApiConfig.RootServiceAddress = 'http://api.listlab.local:8080';

window.listlabConfig = withApiConfig;

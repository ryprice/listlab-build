var withApiConfig = window.listlabConfig;
withApiConfig.TaskServiceAddress = 'https://api.listlab.local:8080/tasks';
withApiConfig.AuthServiceAddress = 'https://api.listlab.local:8080/sts';
withApiConfig.UserServiceAddress = 'https://api.listlab.local:8080/users';
withApiConfig.NotificationServiceAddress = 'https://api.listlab.local:8080/notifications';
withApiConfig.CommentServiceAddress = 'https://api.listlab.local:8080/comments';
withApiConfig.ListServiceAddress = 'https://api.listlab.local:8080/lists';
withApiConfig.RootServiceAddress = 'https://api.listlab.local:8080';

window.listlabConfig = withApiConfig;

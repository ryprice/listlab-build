var withApiConfig = window.listlabConfig;
withApiConfig.TaskServiceAddress = 'http://api.listlab.local:8086/tasks';
withApiConfig.AuthServiceAddress = 'http://api.listlab.local:8085/sts';
withApiConfig.UserServiceAddress = 'http://api.listlab.local:8084/users';
withApiConfig.NotificationServiceAddress = 'http://api.listlab.local:8083/notifications';
withApiConfig.CommentServiceAddress = 'http://api.listlab.local:8081/comments';
withApiConfig.ListServiceAddress = 'http://api.listlab.local:8082/lists';

window.listlabConfig = withApiConfig;

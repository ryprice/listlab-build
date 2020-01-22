var withApiConfig = window.listlabConfig;
withApiConfig.TaskServiceAddress = 'http://api.listlab.io:8086/tasks';
withApiConfig.AuthServiceAddress = 'http://api.listlab.io:8085/sts';
withApiConfig.UserServiceAddress = 'http://api.listlab.io:8084/users';
withApiConfig.NotificationServiceAddress = 'http://api.listlab.io:8083/notifications';
withApiConfig.CommentServiceAddress = 'http://api.listlab.io:8081/comments';
withApiConfig.ListServiceAddress = 'http://api.listlab.io:8082/lists';

window.listlabConfig = withApiConfig;

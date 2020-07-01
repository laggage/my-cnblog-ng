export const environment = {
  production: true,
  apiBaseUrl: 'https://www.laggage.top:7767',
  endpoints: {
    postEndpoint: `/api/posts`,
    tokenEndpoint: `/auth/login/token`,
    userEndpoint: '/api/users',
    blogEndpoint: '/api/blogs',
    commentEndpoint: '/api/comments'
  },
  painationHeaderKey: 'X-Pagination',
  localStorageTokenKey: 'mycnblog-storage'
};

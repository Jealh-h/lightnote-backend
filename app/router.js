'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/mail', controller.signIn.verify)
  router.post('/api/signin', controller.signIn.signIn);
  router.post('/api/signup', controller.signUp.signUp);
  router.post('/api/upload', controller.upload.upload);
  router.post('/api/sendcode', controller.verify.sendVcode);
  router.post('/api/verifycode', controller.verify.verifyCode);
};

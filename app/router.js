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
  router.post('/api/modifypassword', controller.verify.modifyPassword);
  router.post('/api/upload', controller.upload.upload);
  router.post('/api/sendcode', controller.verify.sendVcode);
  router.post('/api/test', controller.test.test);
  router.post('/api/addnotebook', controller.note.addNoteBook);
  router.post('/api/getnotebook', controller.note.getNoteBook);
  router.post('/api/deletenotebook', controller.note.deleteNotebook);

  router.post('/api/addbill', controller.bill.addbill);
  router.post('/api/getbill', controller.bill.getbill);
};

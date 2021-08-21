'use strict';

const Controller = require('egg').Controller;

class NoteController extends Controller {
    async addNoteBook() {
        const { ctx, service } = this;
        console.log(ctx.request.body);
        const result = await ctx.service.note.addNoteBook();
        ctx.body = result;

    }
    async getNoteBook() {
        const { ctx } = this;
        const result = await ctx.service.note.getNoteBook();
        ctx.body = result;
    }

    async deleteNotebook() {
        const { ctx } = this;
        const result = await ctx.service.note.deleteNotebook();
        ctx.body = result;
    }
}

module.exports = NoteController;

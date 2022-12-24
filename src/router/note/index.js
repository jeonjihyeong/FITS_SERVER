const express=require('express');
const {note}=require('../../controller')
const noteRouter= express.Router();

// 게시글 작성
noteRouter.post('/', note.write);

// 게시글 가져오기
noteRouter.get('/all/:page', note.get);

// 내 노트 가져오기
// noteRouter.get('/my', note.getMy)

// 게시글 view
noteRouter.get('/view/:noteIdx', note.getOne);

// 게시글 수정
noteRouter.put('view/:noteIdx',note.update);

// 게시글 삭제
noteRouter.delete('view/:noteIdx',note.deleteContent)

module.exports= noteRouter
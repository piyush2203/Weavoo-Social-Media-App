
import express from 'express'
import isAuthenticated from '../Middlewares/isAuthenticated.js';
import upload from '../Middlewares/multer.js';

import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost } from '../Controllers/post.comtroller.js';

const router = express.Router();

router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost);
router.route('/all/').get(isAuthenticated, getAllPost);
router.route('/userpost/all').get(isAuthenticated, getUserPost);
router.route('/:id/like').get(isAuthenticated, likePost);
router.route('/:id/dislike').get(isAuthenticated, dislikePost);
router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').post(isAuthenticated, getCommentOfPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);
router.route('/:id/bookmark').get(isAuthenticated, bookmarkPost);


export default router;
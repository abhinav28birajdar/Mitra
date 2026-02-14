import { db } from '../../lib/firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { Post, Comment } from '@app-types/firebase.types';

export const communityService = {
    // Create Post
    createPost: async (userId: string, userName: string, content: string, mediaUrl?: string) => {
        try {
            const postsRef = collection(db, 'posts');
            const postData: Partial<Post> = {
                authorId: userId,
                authorName: userName,
                content,
                mediaUrl: mediaUrl || '',
                likes: [],
                commentCount: 0,
                createdAt: serverTimestamp() as any,
            };
            const docRef = await addDoc(postsRef, postData as Post);
            return { id: docRef.id, ...postData };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Get Feed
    getFeed: async (limitCount: number = 20) => {
        try {
            const q = query(
                collection(db, 'posts'),
                orderBy('createdAt', 'desc'),
                limit(limitCount)
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        } catch (error) {
            console.error('Error fetching feed:', error);
            throw error;
        }
    },

    // Like Toggle
    toggleLike: async (postId: string, userId: string, isLiked: boolean) => {
        try {
            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
            });
        } catch (error) {
            console.error('Error toggling like:', error);
            throw error;
        }
    },

    // Add Comment
    addComment: async (postId: string, userId: string, userName: string, text: string) => {
        try {
            const commentsRef = collection(db, 'comments');
            const commentData: Partial<Comment> = {
                postId,
                authorId: userId,
                authorName: userName,
                content: text,
                likesCount: 0,
                likedBy: [],
                createdAt: serverTimestamp() as any,
            };
            const docRef = await addDoc(commentsRef, commentData as Comment);

            // Update post comment count
            await updateDoc(doc(db, 'posts', postId), {
                commentCount: increment(1)
            });

            return { id: docRef.id, ...commentData };
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    },

    // Get Comments
    getComments: async (postId: string) => {
        try {
            const q = query(
                collection(db, 'comments'),
                where('postId', '==', postId),
                orderBy('createdAt', 'asc')
            );
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
};

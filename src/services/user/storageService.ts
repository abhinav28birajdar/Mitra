import { storage } from '@lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const storageService = {
    /**
     * Upload an image to Firebase Storage
     * @param uri Local URI of the image
     * @param path Storage path (e.g. 'avatars/userId.jpg')
     * @returns Download URL
     */
    uploadImage: async (uri: string, path: string): Promise<string> => {
        try {
            // For React Native, we need to fetch the blob from URI
            const response = await fetch(uri);
            const blob = await response.blob();

            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);

            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
};

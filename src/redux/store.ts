import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from "./slices/profileSlice";
import educationLevelReducer from "./slices/educationLevelSlice"; 
import classReducer from './slices/classSlice'
import firebaseAuthReducer from './slices/firebaseAuthSlice'
import trendingTopicReducer from './slices/trendingTopicSlice'
import subjectReducer from './slices/subjectSlice'
import chapterReducer from './slices/chapterSlice'
import topicReducer from './slices/topicSlice'
import sessionReducer from './slices/sessionSlice';
import chatReducer from './slices/chatSlice'
import chatHistoryReducer from './slices/chatHistorySessionSlice';
import progressReducer from './slices/progressSlice'

// Define the store
const store = configureStore({
    reducer: {
        auth:authReducer,
        profile: profileReducer,
        educationLevels: educationLevelReducer,
        class:classReducer,
        firebaseAuthReducer:firebaseAuthReducer,
        subjects:subjectReducer,
        trendingTopics:trendingTopicReducer,
        chapters:chapterReducer,
        topics:topicReducer,
        session:sessionReducer,
        chat:chatReducer,
        chatHistory:chatHistoryReducer,
        progress:progressReducer
       
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
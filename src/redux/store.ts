import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default local storage
import { persistReducer, persistStore } from 'redux-persist';
import profileReducer from "./slices/profileSlice";
import educationLevelReducer from "./slices/educationLevelSlice"; 
import classReducer from './slices/classSlice';
import firebaseAuthReducer from './slices/firebaseAuthSlice';
import trendingTopicReducer from './slices/trendingTopicSlice';
import subjectReducer from './slices/subjectSlice';
import chapterReducer from './slices/chapterSlice';
import topicReducer from './slices/topicSlice';
import sessionReducer from './slices/sessionSlice';
import chatReducer from './slices/chatSlice';
import chatHistoryReducer from './slices/chatSessionHistorySlice';
import progressReducer from './slices/progressSlice';
import imageUploadReducer from './slices/imageUploadSlice';
import imageSliceReducer from './slices/imageSlice';
import examModuleSliceReducer from './slices/examModuleSlice';
import examAnalysisSliceReducer from './slices/examAnalysisSlice';
import trueFalseSliceReducer from './slices/trueFalseExamSlice';
import mixedQuestionSliceReducer from './slices/mixedQuestionSlice';

// 🔹 Define the persist config for specific slices
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['firebaseAuth', 'profile'], // Persist only these slices
};

// 🔹 Combine reducers
const appReducer = combineReducers({
    firebaseAuth: firebaseAuthReducer,
    profile: profileReducer,
    educationLevels: educationLevelReducer,
    class: classReducer,
    subjects: subjectReducer,
    trendingTopics: trendingTopicReducer,
    chapters: chapterReducer,
    topics: topicReducer,
    session: sessionReducer,
    chat: chatReducer,
    chatHistory: chatHistoryReducer,
    progress: progressReducer,
    imageUpload: imageUploadReducer,
    image: imageSliceReducer,
    examModule: examModuleSliceReducer,
    examAnalysis: examAnalysisSliceReducer,
    trueFalseExam: trueFalseSliceReducer,
    mixedQuestionExam: mixedQuestionSliceReducer,
});

// 🔹 Apply persistReducer only to specific slices
const persistedReducer = persistReducer(persistConfig, appReducer);

// 🔹 Root reducer that resets state on logout (excluding persisted states)
const rootReducer = (state: any, action: any) => {
    if (action.type === 'auth/logout') {
        storage.removeItem('persist:root'); // Clear persisted state
        state = undefined; // Reset the entire state
    }
    return persistedReducer(state, action);
};

// 🔹 Configure store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist
        }),
});

// 🔹 Create persistor
export const persistor = persistStore(store);

// 🔹 Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

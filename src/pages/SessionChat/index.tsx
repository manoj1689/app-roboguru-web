import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { fetchChatHistory } from "../../redux/slices/chatHistorySlice"; // Import the fetchChatHistory thunk
import { RootState, AppDispatch } from '../../redux/store';

const SessionChatComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();

  // Extract query parameters
  const sessionId = searchParams?.get('sessionId') || '';

  // Fetch chat history from Redux state
  const { chatHistory, loading: chatHistoryLoading, error: chatHistoryError } = useSelector(
    (state: RootState) => state.chatHistory // Correct state reference
  );

  // Fetch chat history when sessionId is available
  useEffect(() => {
    if (sessionId) {
      dispatch(fetchChatHistory(sessionId)); // Fetch chat history based on sessionId
    }
  }, [dispatch, sessionId]);

  return (
    <div>
      {sessionId && (
        <div>
          <p><strong>Session ID:</strong> {sessionId}</p>
        </div>
      )}
      
      <h2>Chat History</h2>
      {chatHistoryLoading && <p>Loading chat history...</p>}
      {chatHistoryError && <p style={{ color: 'red' }}>Error: {chatHistoryError}</p>}
      {!chatHistoryLoading && chatHistory?.length === 0 && <p>No chat history available.</p>}

      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        {chatHistory?.map((chat, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p><strong>Request:</strong> {chat.request_message}</p>
            <p><strong>Response:</strong> {chat.response_message}</p>
            <p><small><strong>Timestamp:</strong> {new Date(chat.timestamp).toLocaleString()}</small></p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionChatComponent;

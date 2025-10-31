-- ===== Schema & Tables (no role column) =====
CREATE SCHEMA IF NOT EXISTS chatbot;

CREATE TABLE IF NOT EXISTS chatbot.chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  user_id TEXT,
  channel TEXT DEFAULT 'web',
  started_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot.chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT,
  message TEXT NOT NULL,
  intent TEXT,
  confidence NUMERIC(5,2),
  meta JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chatbot.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chatbot.chat_messages(created_at);

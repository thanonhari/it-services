CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS line_users (
    user_id TEXT PRIMARY KEY,
    display_name TEXT,
    picture_url TEXT,
    status_message TEXT,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
);

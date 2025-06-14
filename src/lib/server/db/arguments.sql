-- cloudflare d1 database
CREATE TABLE arguments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    argument TEXT NOT NULL,
    pdp TEXT,
    status INTEGER NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL
);

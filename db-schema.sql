CREATE TABLE IF NOT EXISTS comments (
id INTEGER PRIMARY KEY AUTOINCREMENT,
-- likes INTEGER REFERENCES like_tallies(id),
user INTEGER REFERENCES users(id),
article INTEGER REFERENCES articles(id),
comment_text TEXT DEFAULT "",
in_reply_to INTEGER DEFAULT -1 REFERENCES comments(id)
);

CREATE TABLE IF NOT EXISTS likes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user INTEGER REFERENCES users(id),
comment INTEGER REFERENCES comments(id));

CREATE TABLE IF NOT EXISTS like_tallies (
id INTEGER PRIMARY KEY AUTOINCREMENT,
comment_id INTEGER REFERENCES comments(id),
like_count INTEGER DEFAULT 0);

CREATE TRIGGER IF NOT EXISTS new_like_trigger
AFTER INSERT ON likes
BEGIN
UPDATE like_tallies SET like_count = (SELECT count(id) FROM likes where comment = NEW.comment) WHERE comment_id = NEW.comment;
END;

CREATE TRIGGER IF NOT EXISTS unlike_trigger
AFTER DELETE ON likes
BEGIN
UPDATE like_tallies SET like_count = (SELECT count(id) FROM likes where comment = NEW.comment) WHERE comment_id = NEW.comment;
END;

CREATE TRIGGER IF NOT EXISTS new_like_tally
AFTER INSERT ON comments
BEGIN
INSERT INTO like_tallies(comment_id, like_count) VALUES (NEW.id, 0);
END;

CREATE TABLE IF NOT EXISTS articles (
id INTEGER PRIMARY KEY AUTOINCREMENT,
data TEXT );

CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT );


-- some default values
INSERT INTO users(username) VALUES ("DEFAULT_USER");
INSERT INTO articles(data) VALUES ("an interesting article, maybe someone will comment on it?");
INSERT INTO comments(id, user, article, comment_text) VALUES (-1, 1, 1, "the singleton root comment");

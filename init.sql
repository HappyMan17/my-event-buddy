CREATE TABLE users (
  user_id UUID NOT NULL,
  user_name VARCHAR(150) NOT NULL,
  nick_name VARCHAR(150) NOT NULL,
  "password" VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  profile_image VARCHAR(150) NOT NULL,
  is_enable BOOLEAN,
  PRIMARY KEY (user_id)
);

CREATE TABLE events (
  event_id UUID NOT NULL,
  user_id UUID NOT NULL,
  event_date DATE NOT NULL,
  event_name VARCHAR(150) NOT NULL,
  "description" TEXT NOT NULL,
  "type" VARCHAR(150) NOT NULL,
  logo TEXT NOT NULL,
  has_activity BOOLEAN,
  has_been_done BOOLEAN,
  PRIMARY KEY (event_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE contacts (
  contact_id UUID NOT NULL,
  user_id UUID NOT NULL,
  friend_id UUID NOT NULL,
  has_associated_event BOOLEAN,
  has_pending_request BOOLEAN,
  PRIMARY KEY (contact_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (friend_id) REFERENCES users (user_id),
  CHECK (user_id <> friend_id), -- Ensure a user cannot be friends with themselves
  UNIQUE (user_id, friend_id) -- Ensure friendships are unique
);

CREATE TABLE activities (
  activity_id UUID NOT NULL,
  event_id UUID NOT NULL,
  user_id UUID NOT NULL, --Creator
  "description" VARCHAR(150) NOT NULL,
  total_activity_value numeric NOT NULL,
  is_by_percentage BOOLEAN,
  has_been_done BOOLEAN,
  PRIMARY KEY (activity_id),
  FOREIGN KEY (event_id) REFERENCES events (event_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE activity_contacts (
  activity_contacts_id UUID NOT NULL,
  activity_id UUID NOT NULL,
  user_id UUID NOT NULL, -- Activity creator
  debtor_id UUID NOT NULL, -- Debtor
  "percentage" real NOT NULL,
  amount real NOT NULL,
  total_to_pay numeric NOT NULL,
  total_paid numeric,
  already_paid BOOLEAN,
  -- UNIQUE (user_id, event_id),
  PRIMARY KEY (activity_contacts_id),
  FOREIGN KEY (activity_id) REFERENCES activities (activity_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (debtor_id) REFERENCES users (user_id)
);

CREATE TABLE event_contacts (
  event_contacts_id UUID NOT NULL,
  event_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  has_pending_request BOOLEAN NOT NULL,
  PRIMARY KEY (event_contacts_id),
  FOREIGN KEY (event_id) REFERENCES events (event_id),
  FOREIGN KEY (contact_id) REFERENCES contacts (contact_id)
);

CREATE TABLE types (
  type_id SERIAL,
  type_name VARCHAR(150),
  PRIMARY KEY (type_id)
);

CREATE TABLE requests (
  request_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  "type" SERIAL NOT NULL,
  accepted BOOLEAN,
  done BOOLEAN,
  PRIMARY KEY (request_id),
  FOREIGN KEY (contact_id) REFERENCES contacts (contact_id),
  FOREIGN KEY ("type") REFERENCES types (type_id)
);

CREATE TABLE payment_history (
  payment_history_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  event_id UUID NOT NULL,
  activity_id UUID NOT NULL,
  PRIMARY KEY (payment_history_id),
  FOREIGN KEY (contact_id) REFERENCES contacts (contact_id),
  FOREIGN KEY (event_id) REFERENCES events (event_id),
  FOREIGN KEY (activity_id) REFERENCES activities (activity_id)
);

-- CREATE TABLE user_event (
--   user_event_id UUID NOT NULL,
--   user_id UUID NOT NULL,
--   event_id UUID NOT NULL,
--   PRIMARY KEY (user_event_id),
--   UNIQUE (user_id, event_id),
--   FOREIGN KEY (user_id) REFERENCES "user" (user_id),
--   FOREIGN KEY (event_id) REFERENCES "event" (event_id)
-- );

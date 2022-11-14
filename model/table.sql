CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    cpf varchar(11) NOT NULL,
    name varchar(30),
    email varchar(50)
);

CREATE TABLE account (
    ID SERIAL PRIMARY KEY,
    num integer NOT NULL,
    balance integer DEFAULT 0
);

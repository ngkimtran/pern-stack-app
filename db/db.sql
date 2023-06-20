-- for help \?
-- list database \l

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK (price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants ( name, location, price_range) VALUES ('mcDonalds', 'New York', 3);



-----

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants (id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (8, 'Carl', 'restaurant was awesome', 5);
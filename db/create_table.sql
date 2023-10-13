

-- Таблица для типов ресурсов
CREATE TABLE resources_schema.resource_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    max_speed INTEGER NOT NULL
);
-- Таблица для  ресурсов
CREATE TABLE resources_schema.resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    current_speed INTEGER,
    resource_type_id INT,
    FOREIGN KEY (resource_type_id) REFERENCES resources_schema.resource_types(id) ON DELETE RESTRICT ON UPDATE CASCADE
);



-- Таблица для типов ресурсов
CREATE TABLE resources_schema.resource_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    max_speed DECIMAL(5, 2) NOT NULL
);
-- Таблица для  ресурсов
CREATE TABLE resources_schema.resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    current_speed DECIMAL(5, 2),
    resource_type_id INT,
    FOREIGN KEY (resource_type_id) REFERENCES resources_schema.resource_types(id)
);

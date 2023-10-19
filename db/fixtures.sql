-- Фикстуры для таблицы resources_schema.resource_types
INSERT INTO resources_schema.resource_types (name, max_speed) VALUES ('Type1', 100);
INSERT INTO resources_schema.resource_types (name, max_speed) VALUES ('Type2', 120);
INSERT INTO resources_schema.resource_types (name, max_speed) VALUES ('Type3', 150);

-- Фикстуры для таблицы resources_schema.resources
INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES ('Resource1', 50, 1);
INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES ('Resource2', 80, 2);
INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES ('Resource3', 100, 3);

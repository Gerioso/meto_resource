from ports.resource_type_port import ResourceTypePort

class ResourceTypeAdapter(ResourceTypePort):
    def __init__(self, database_port):
        self.database_port = database_port

    def create_resource_type(self, name, max_speed):
        query = "INSERT INTO resources_schema.resource_types (name, max_speed) VALUES (%s, %s) RETURNING id"
        params = (name, max_speed)
        return self.database_port.execute_query(query, params)[0]

    def get_resource_type(self, resource_type_id):
        query = "SELECT * FROM resources_schema.resource_types WHERE id = %s"
        params = (resource_type_id,)
        return self.database_port.execute_query(query, params)

    def update_resource_type(self, resource_type_id, name, max_speed):
        query = "UPDATE resources_schema.resource_types SET name = %s, max_speed = %s WHERE id = %s"
        params = (name, max_speed, resource_type_id)
        self.database_port.execute_query(query, params)

    def delete_resource_type(self, resource_type_id):
        query = "DELETE FROM resources_schema.resource_types WHERE id = %s"
        params = (resource_type_id,)
        self.database_port.execute_query(query, params)
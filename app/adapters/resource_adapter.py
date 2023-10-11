from ports.resource_port import ResourcePort

class ResourceAdapter(ResourcePort):
    def __init__(self, database_port):
        self.database_port = database_port

    def create_resource(self, name, current_speed, resource_type_id):
        query = "INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES (%s, %s, %s) RETURNING id"
        params = (name, current_speed, resource_type_id)
        return self.database_port.execute_query(query, params)[0]

    def get_resource(self, resource_id):
        query = "SELECT * FROM resources_schema.resources WHERE id = %s"
        params = (resource_id,)
        return self.database_port.execute_query(query, params)

    def update_resource(self, resource_id, name, current_speed, resource_type_id):
        query = "UPDATE resources_schema.resources SET name = %s, current_speed = %s, resource_type_id = %s WHERE id = %s"
        params = (name, current_speed, resource_type_id, resource_id)
        self.database_port.execute_query(query, params)

    def delete_resource(self, resource_id):
        query = "DELETE FROM resources_schema.resources WHERE id = %s"
        params = (resource_id,)
        self.database_port.execute_query(query, params)
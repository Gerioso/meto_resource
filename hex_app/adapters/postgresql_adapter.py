import psycopg2
import json
from ..ports.database_manader_port import DatabasePort

class DatabaseAdapter(DatabasePort):
    def __init__(self, database, user, password, host, port):
        self.database = database
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.connection = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(
                database=self.database,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
        except psycopg2.Error as error:
            print("Error while connecting to PostgreSQL:", error)
            raise

    def close(self):
        if self.connection:
            self.connection.close()

    def execute(self, query, params=None, command_type="select"):
        cursor = self.connection.cursor()

        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            self.connection.commit()
            result = None
            if command_type == "select":
                result = (cursor.fetchall(), True)
            elif command_type == "insert":
                result = ({'message': f'Object with Name {cursor.fetchone()[0]} created successfully'}, True)
            elif command_type == "delete":
                result = ({'message': 'Object type deleted successfully'}, True)
            else:
                result = ({'message': 'Command executed successfully'}, True)
            return result
        except psycopg2.Error as error:
            print("Error executing query:", error)
            self.connection.rollback()
            return {'error': 'An error occurred during execution'}, False
        finally:
            cursor.close()


    def get_all_resource_types(self):
        query = "select * from resources_schema.resource_types"
        return self.execute(query)

    def create_resource_type(self, name, max_speed):
        query = "INSERT INTO resources_schema.resource_types (name, max_speed) VALUES (%s, %s) RETURNING name"
        params = (name, max_speed)
        return self.execute(query, params, "insert")

    def get_resource_type(self, resource_type_id):
        query = "SELECT * FROM resources_schema.resource_types WHERE id = %s"
        params = (resource_type_id,)
        result =  self.execute(query, params)
        return json.dumps(result)

    def update_resource_type(self, resource_type_id, name, max_speed):
        query = "UPDATE resources_schema.resource_types SET name = %s, max_speed = %s WHERE id = %s"
        params = (name, max_speed, resource_type_id)
        return self.execute(query, params, "update")
        
    # if any resource exist type is live
    def delete_resource_type(self, type_ids):
        query = """
            DELETE FROM resources_schema.resource_types
            WHERE id = ANY(%s)
            AND NOT EXISTS (SELECT 1 FROM resources_schema.resources WHERE resource_type_id = ANY(%s))
            """
        params = (type_ids, type_ids)
        return self.execute(query, params, "delete")
        


    def get_all_resources(self):
        query = "SELECT * FROM resources_schema.resources"
        return self.execute(query)


    def create_resource(self, name, current_speed, resource_type_id):
        query = "INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES (%s, %s, %s) RETURNING id"
        params = (name, current_speed, resource_type_id)
        return self.execute(query, params, "insert")

    def get_resource(self, resource_id):
        query = """
            SELECT r.*, rt.name as resource_type_name, rt.max_speed as resource_type_max_speed
            FROM resources_schema.resources r
            JOIN resources_schema.resource_types rt ON r.resource_type_id = rt.id
            WHERE r.id = %s
        """
        params = (resource_id,)
        return self.execute(query, params)

    def update_resource(self, resource_id, name, current_speed, resource_type_id):
        query = "UPDATE resources_schema.resources SET name = %s, current_speed = %s, resource_type_id = %s WHERE id = %s"
        params = (name, current_speed, resource_type_id, resource_id)
        return self.execute(query, params, "update")

    def delete_resource(self, resource_id):
        query = "DELETE FROM resources_schema.resources WHERE id = %s"
        params = (resource_id,)
        return self.execute(query, params, "delete")
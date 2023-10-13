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

    def execute_query(self, query, params=None):
        cursor = self.connection.cursor()
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            self.connection.commit()
            return cursor.fetchall()
        except psycopg2.Error as error:
            print("Error executing query:", error)
            self.connection.rollback()
        finally:
            cursor.close()


    def get_all_resource_types(self):
        query = "select * from resources_schema.resource_types"
        return self.execute_query(query)

    def create_resource_type(self, name, max_speed):
        query = "INSERT INTO resources_schema.resource_types (name, max_speed) VALUES (%s, %s) RETURNING id"
        params = (name, max_speed)
        return self.execute_query(query, params)[0]

    def get_resource_type(self, resource_type_id):
        query = "SELECT * FROM resources_schema.resource_types WHERE id = %s"
        params = (resource_type_id,)
        result =  self.execute_query(query, params)
        return json.dumps(result)

    def update_resource_type(self, resource_type_id, name, max_speed):
        query = "UPDATE resources_schema.resource_types SET name = %s, max_speed = %s WHERE id = %s"
        params = (name, max_speed, resource_type_id)
        self.execute_query(query, params)

    def delete_resource_type(self, resource_type_id):
        query = "DELETE FROM resources_schema.resource_types WHERE id = %s"
        params = (resource_type_id,)
        self.execute_query(query, params)


    def get_all_resources(self):
        query = "SELECT * FROM resources_schema.resources"
        result = self.execute_query(query)
        return json.dumps(result)


    def create_resource(self, name, current_speed, resource_type_id):
        query = "INSERT INTO resources_schema.resources (name, current_speed, resource_type_id) VALUES (%s, %s, %s) RETURNING id"
        params = (name, current_speed, resource_type_id)
        return self.execute_query(query, params)[0]

    def get_resource(self, resource_id):
        query = "SELECT * FROM resources_schema.resources WHERE id = %s"
        params = (resource_id,)
        return self.execute_query(query, params)

    def update_resource(self, resource_id, name, current_speed, resource_type_id):
        query = "UPDATE resources_schema.resources SET name = %s, current_speed = %s, resource_type_id = %s WHERE id = %s"
        params = (name, current_speed, resource_type_id, resource_id)
        self.execute_query(query, params)

    def delete_resource(self, resource_id):
        query = "DELETE FROM resources_schema.resources WHERE id = %s"
        params = (resource_id,)
        self.execute_query(query, params)
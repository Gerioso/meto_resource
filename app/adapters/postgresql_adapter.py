import psycopg2
from ports.database_manader_port import DatabasePort

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
            return cursor.fetchone()
        except psycopg2.Error as error:
            print("Error executing query:", error)
            self.connection.rollback()
        finally:
            cursor.close()
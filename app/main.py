from adapters.postgresql_adapter import DatabaseAdapter
from adapters.resourse_type_adapter import ResourceTypeAdapter
from adapters.resource_adapter import ResourceAdapter

import psycopg2
import time



def main():
    # set up connection to database
    database_adapter = DatabaseAdapter(
        database="metoResource",
        user="Paul",
        password="123qwe",
        host="127.0.0.1",
        port="5432"  
    )
    database_adapter.connect()
    print("Connected")
    resource_type_adapter = ResourceTypeAdapter(database_adapter)
    resurce_adapter = ResourceAdapter(database_adapter)

    #example of usecase 
    resource_type_id = resource_type_adapter.create_resource_type("Type_1", 80)
    print(resource_type_id)
    print(resource_type_adapter.get_resource_type(resource_type_id))
    resource_type_adapter.update_resource_type(resource_type_id, 'type_2', 90)
    print(resource_type_adapter.get_resource_type(resource_type_id))
    resource_id = resurce_adapter.create_resource('car', 60, resource_type_id)
    print(resurce_adapter.get_resource(resource_id))
    resurce_adapter.delete_resource(resource_id)
    resource_type_adapter.delete_resource_type(resource_type_id)

    



    database_adapter.close()
    print("close")

if __name__ == "__main__":
    main()
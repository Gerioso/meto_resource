class DatabasePort:
    def connect(self):
        pass

    def close(self):
        pass


    def execute(self, query, params=None):
        pass


    def get_resource_type(self, type_id):
        pass
    
    def get_all_resource_types(self):
        pass

    def create_resource_type(self, type_data):
        pass

    def update_resource_type(self, id, name, max_speed):
        pass

    def delete_resource_type(self, type_id):
        pass

    def get_resource(self, resource_id):
        pass

    def create_resource(self, resource_data):
        pass

    def update_resource(self, resource_id, resource_data):
        pass

    def delete_resource(self, resource_id):
        pass
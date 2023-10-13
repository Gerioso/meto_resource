class DatabasePort:
    def connect(self):
        pass

    def close(self):
        pass


    def execute_query(self, query, params=None):
        pass


    def get_type(self, type_id):
        pass

    def create_type(self, type_data):
        pass

    def update_type(self, type_id, type_data):
        pass

    def delete_type(self, type_id):
        pass

    def get_resource(self, resource_id):
        pass

    def create_resource(self, resource_data):
        pass

    def update_resource(self, resource_id, resource_data):
        pass

    def delete_resource(self, resource_id):
        pass
from ..ports.database_manader_port import DatabasePort
import json

class ResourceAPI:
    def __init__(self, db:DatabasePort ):
        self.db = db

    def create_resource_type(self, data):
        name = data.get('name', None)
        max_speed = data.get('max_speed', None)
        if name is None or max_speed is None:
            return {'error': 'Wrong data'}, 400
        result, success = self.db.create_resource_type(name, int(max_speed))
        if success:
            return result, 200
        else:
            result, 500
    
    def get_all_resource_types(self):
        result, success = self.db.get_all_resource_types()
        if success:
            result = types_to_json(result)
            return result, 200
        else:
            result, 500
    
    def get_resource_type(self, resource_type_id):
        result, success = self.db.get_resource_type(resource_type_id)
        if success:
            result = types_to_json(result)
            return result, 200
        else:
            result, 500
    
    def update_resource_type(self, id, data):
        name = data.get('name', None)
        max_speed = data.get('max_speed', None)
        if name is None or max_speed is None:
            return {'error': 'Wrong data'}, 400
        result, success = self.db.update_resource_type(id, name, max_speed)
        if success:
            return result, 200
        else:
            result, 500
    
    def delete_resource_types(self, ids) :
        result, success = self.db.delete_resource_type(ids)
        if success:
            return result, 200
        else:
            result, 500

    def create_resource(self, data):
        name = data.get('name', None)
        current_speed = data.get('current_speed', None)
        resource_type_id = data.get('resource_type_id', None)
        if name is None or current_speed is None or resource_type_id is None:
            return {'error': 'Wrong data'}, 400
        result, success = self.db.create_resource(name, int(current_speed), int(resource_type_id))
        if success:
            return result, 200
        else:
            result, 500
    
    def get_all_resources(self):
        result, success = self.db.get_all_resources()
        if success:
            result = resources_to_json(result)
            return result, 200
        else:
            result, 500
    
    def get_resource(self, resource_id):
        result, success = self.db.get_resource(resource_id)
        if success:
            result = resources_to_json(result)
            return result, 200
        else:
            result, 500
    
    def update_resource(self, id, data):
        name = data.get('name', None)
        current_speed = data.get('current_speed', None)
        resource_type_id = data.get('resource_type_id', None)
        if name is None or current_speed is None or resource_type_id is None:
            return {'error': 'Wrong data'}, 400
        result, success = self.db.update_resource(id, name, current_speed, resource_type_id)
        if success:
            return result, 200
        else:
            result, 500
    
    def delete_resource(self, id) :
        result, success = self.db.delete_resource(id)
        if success:
            return result, 200
        else:
            result, 500       



    # def handle_request(self, request):
    #     print("I'm here")
    #     if request.method == 'GET':            
    #         print(self.resource_adapter)  # Проверка инициализации объекта resource_adapter
    #         result = self.resource_adapter.get_all_resources()
    #         print(result)  # Проверка возвращаемых данных из метода get_all_resources
    #         return result
        
def types_to_json(types):
    json_data = []
    for type in types:
        json_data.append({
            'id': type[0],
            'name': type[1],
            'max_speed': type[2]
        })
    return json.dumps(json_data)

def resources_to_json(resources):
    json_data = []
    for resource in resources:
        json_data.append({
            'id': resource[0],
            'name': resource[1],
            'current_speed': resource[2],
            'resource_type_id': resource[3]

        })
    return json.dumps(json_data)


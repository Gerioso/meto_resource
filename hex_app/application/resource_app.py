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
        self.db.create_resource_type(name, int(max_speed))
        return {'message': 'Resource type created successfully'}, 200
    
    def get_all_resource_types(self):
        types = self.db.get_all_resource_types()
        result = types_to_json(types)
        return result, 200
    
    def get_resource_type(self,resource_type_id):
        type = self.db.get_resource_type(resource_type_id)
        return types_to_json(type), 200


        



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

def resource_to_json(resources):
    json_data = []
    for resource in resources:
        json_data.append({
            'id': resource[0],
            'name': resource[1],
            'current_speed': resource[2],
            'resource_type_id': resource[3]

        })
    return json.dumps(json_data)


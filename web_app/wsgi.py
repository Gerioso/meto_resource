from hex_app.application.resource_app import ResourceAPI
from hex_app.adapters.postgresql_adapter import DatabaseAdapter
from flask import Flask, request, jsonify


app = Flask(__name__)
db = DatabaseAdapter(
        database="metoResource",
        user="Paul",
        password="123qwe",
        host="127.0.0.1",
        port="5432"  
    )
db.connect()
hexagonal_app = ResourceAPI(db)


@app.route('/resource_types', methods=['POST'])
def create_resource_type():
    data = request.get_json()
    result, status = hexagonal_app.create_resource_type(data)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resource_types', methods=['GET'])
def get_all_resource_types():
    result, status = hexagonal_app.get_all_resource_types()
    response = jsonify(result)
    response.status_code = status
    return response


@app.route('/resource_types/<int:resource_type_id>', methods=['GET'])
def get_resource_type(resource_type_id):
    result, status = hexagonal_app.get_resource_type(resource_type_id)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resource_types/<int:resource_type_id>', methods=['PUT'])
def update_resource_type(resource_type_id):
    data = request.get_json()
    # Здесь вы вызываете метод для обновления типа ресурса по ID в hexagonal-приложении
    # Пример: hexagonal_app.handle_request({'action': 'update_resource_type', 'resource_type_id': resource_type_id, 'data': data})
    return jsonify({'message': f'Resource type with ID {resource_type_id} updated'})

@app.route('/resource_types/<int:resource_type_id>', methods=['DELETE'])
def delete_resource_type(resource_type_id):
    # Здесь вы вызываете метод для удаления типа ресурса по ID в hexagonal-приложении
    # Пример: hexagonal_app.handle_request({'action': 'delete_resource_type', 'resource_type_id': resource_type_id})
    return jsonify({'message': f'Resource type with ID {resource_type_id} deleted'})






@app.route('/resources', methods=['GET'])
def get_resources():
    print(request)
    result = hexagonal_app.handle_request(request)
    print(result)
    return jsonify(result)

if __name__ == "__main__":
    app.run()
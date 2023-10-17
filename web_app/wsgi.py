from hex_app.application.resource_app import ResourceAPI
from hex_app.adapters.postgresql_adapter import DatabaseAdapter
from flask import Flask, request, jsonify, abort


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
    result, status = hexagonal_app.get_resource_type(int(resource_type_id))
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resource_types/<int:resource_type_id>', methods=['PUT'])
def update_resource_type(resource_type_id):
    data = request.get_json()
    result, status = hexagonal_app.update_resource_type(resource_type_id, data)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resource_types/<int:resource_type_id>', methods=['DELETE'])
def delete_resource_type(resource_type_id):
    result, status = hexagonal_app.delete_resource_types([resource_type_id])
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resource_types', methods=['DELETE'])
def delete_resource_types():
    ids = request.args.get('ids')  
    if ids:
        id_list = [int(x) for x in ids.split(',')]  
        result, status = hexagonal_app.delete_resource_types(id_list)
        response = jsonify(result)
        response.status_code = status
        return response
    else:
        return abort(400, "Parameter ids not found for Delete request")



@app.route('/resources', methods=['POST'])
def create_resource():
    data = request.get_json()
    result, status = hexagonal_app.create_resource(data)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resources', methods=['GET'])
def get_all_resources():
    result, status = hexagonal_app.get_all_resources()
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resources/<int:resource_id>', methods=['GET'])
def get_resource(resource_id):
    result, status = hexagonal_app.get_resource(resource_id)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resources/<int:resource_id>', methods=['PUT'])
def update_resource(resource_id):
    data = request.get_json()
    result, status = hexagonal_app.update_resource(resource_id, data)
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resources/<int:resource_id>', methods=['DELETE'])
def delete_resource(resource_id):
    result, status = hexagonal_app.delete_resources([resource_id])
    response = jsonify(result)
    response.status_code = status
    return response

@app.route('/resources', methods=['DELETE'])
def delete_resources():
    ids = request.args.get('ids')  
    if ids:
        id_list = [int(x) for x in ids.split(',')]  
        result, status = hexagonal_app.delete_resources(id_list)
        response = jsonify(result)
        response.status_code = status
        return response
    else:
        return abort(400, "Parameter ids not found for Delete request")

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000') 
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

if __name__ == "__main__":
    app.run()
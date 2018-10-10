from flask import Blueprint, request, make_response, jsonify

def response_ok(data, status_code=200):

    return make_response(jsonify(data)), status_code
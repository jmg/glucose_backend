from flask import Blueprint, request, make_response, jsonify

def response_ok(data, status_code=200):

    data["status"] = "success"
    return make_response(jsonify(data)), status_code


def response_fail(data, status_code=400):

    data["status"] = "failure"
    return make_response(jsonify(data)), status_code

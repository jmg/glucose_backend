from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.server.models import GlucoseMeasurement
from project.server.auth.views import login_required
from project.server.helpers import response_ok
from project.server import config
import sqlalchemy

import json
import feedparser
import random
from datetime import datetime
from dateutil import parser

glucose_blueprint = Blueprint('glucose', __name__)


class TipsAPI(MethodView):

    @login_required
    def post(self):

        entries = feedparser.parse(config.tips_feed_url)
        entry = random.choice(entries["entries"])

        return response_ok({"tip": entry.title})


class MeasureAPI(MethodView):

    @login_required
    def post(self):

        data = json.loads(request.data)
        value = data["value"]

        GlucoseMeasurement(date=datetime.utcnow(), value=value, user=request.user).save()
        if value > 140 or value < 80:
            status = "not ok"
        else:
            status = "ok"

        return response_ok({"status": status})


class AverageAPI(MethodView):

    @login_required
    def post(self):

        data = json.loads(request.data)
        date = parser.parse(data["date"])

        measurements = GlucoseMeasurement.q().filter(
            sqlalchemy.func.extract('year', GlucoseMeasurement.date)==date.year,
            sqlalchemy.func.extract('month', GlucoseMeasurement.date)==date.month,
            sqlalchemy.func.extract('day', GlucoseMeasurement.date)==date.day,
        ).all()

        avg = 0
        if measurements:
            for measurement in measurements:
                avg += measurement.value

            avg = avg / len(measurements)

        return response_ok({"avg": float(avg)})


tips_view = TipsAPI.as_view('tips_api')
measure_view = MeasureAPI.as_view('measure_api')
average_view = AverageAPI.as_view('average_api')

glucose_blueprint.add_url_rule('/glucose/tips', view_func=tips_view, methods=['POST'])
glucose_blueprint.add_url_rule('/glucose/measure', view_func=measure_view, methods=['POST'])
glucose_blueprint.add_url_rule('/glucose/average', view_func=average_view, methods=['POST'])
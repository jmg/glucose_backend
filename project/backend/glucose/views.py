from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView

from project.backend.models import GlucoseMeasurement
from project.backend.auth.views import login_required
from project.backend.helpers import response_ok, response_fail
from project.backend import config
import sqlalchemy

import json
import feedparser
import random
from datetime import datetime
from dateutil import parser

glucose_blueprint = Blueprint('glucose', __name__)


class TipsAPI(MethodView):

    @login_required
    def get(self):

        entries = feedparser.parse(config.tips_feed_url)
        entry = random.choice(entries["entries"])

        return response_ok({"tip": entry.title})


class AllTipsAPI(MethodView):

    @login_required
    def get(self):

        entries = feedparser.parse(config.tips_feed_url)

        all_entries = []
        for entry in entries["entries"]:
            all_entries.append({"title": entry["title"], "link": entry["link"], "content": entry["content"][0]["value"]})

        return response_ok({"tips": all_entries})


class MeasureAPI(MethodView):

    @login_required
    def post(self):

        data = json.loads(request.data)
        value = data["value"]

        if "date" in data:
            try:
                date = parser.parse(data["date"])
            except:
                return response_fail({"error": "Please enter a valid date"})
        else:
            date = datetime.utcnow()

        glucose = GlucoseMeasurement(date=date, value=value, user=request.user).save()
        if value > 140 or value < 80:
            status = "not ok"
        else:
            status = "ok"

        return response_ok({"glucose_status": status, "glucose": {"date": glucose.date, "value": float(glucose.value) }})


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
all_tips_api = AllTipsAPI.as_view('all_tips_api')
measure_view = MeasureAPI.as_view('measure_api')
average_view = AverageAPI.as_view('average_api')

glucose_blueprint.add_url_rule('/glucose/tips', view_func=tips_view, methods=['GET'])
glucose_blueprint.add_url_rule('/glucose/tips/all', view_func=all_tips_api, methods=['GET'])
glucose_blueprint.add_url_rule('/glucose/measure', view_func=measure_view, methods=['POST'])
glucose_blueprint.add_url_rule('/glucose/average', view_func=average_view, methods=['POST'])
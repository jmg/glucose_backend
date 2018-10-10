import time
import json
import unittest
from datetime import datetime

from project.server import db
from project.server.models import User, GlucoseMeasurement
from project.tests.base import BaseTestCase
from project.tests.test_auth import register_user, login_user, register_and_login_test_user


class TestGlucoseBlueprint(BaseTestCase):

    def setUp(self):

        BaseTestCase.setUp(self)
        with self.client:
            self.token = register_and_login_test_user(self)

    def test_tips(self):

        with self.client:

            response = self.client.post(
                '/glucose/tips',
                headers=dict(
                    Authorization=self.token
                )
            )
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode())
            self.assertTrue("tip" in data)

    def test_tips_without_login(self):

        with self.client:

            response = self.client.post(
                '/glucose/tips',
                headers=dict()
            )
            self.assertEqual(response.status_code, 401)

    def test_measure(self):

        with self.client:

            response = self.client.post(
                '/glucose/measure',
                headers=dict(
                    Authorization=self.token
                ),
                data=json.dumps({"value": 100}),
            )
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode())

            self.assertEqual(data["status"], "ok")
            self.assertEqual(GlucoseMeasurement.q().count(), 1)
            self.assertEqual(GlucoseMeasurement.q().first().value, 100)

    def test_avg(self):

        with self.client:

            response = self.client.post(
                '/glucose/measure',
                headers=dict(
                    Authorization=self.token
                ),
                data=json.dumps({"value": 100}),
            )

            response = self.client.post(
                '/glucose/measure',
                headers=dict(
                    Authorization=self.token
                ),
                data=json.dumps({"value": 80}),
            )

            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode())

            self.assertEqual(data["status"], "ok")
            self.assertEqual(GlucoseMeasurement.q().count(), 2)

            today = datetime.now().date().isoformat()

            response = self.client.post(
                '/glucose/average',
                headers=dict(
                    Authorization=self.token
                ),
                data=json.dumps({"date": today}),
            )

            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data.decode())

            self.assertEqual(data["avg"], 90)

if __name__ == '__main__':
    unittest.main()

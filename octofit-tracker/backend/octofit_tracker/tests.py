from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_user_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(username='testuser', email='test@example.com', team=team)
        self.assertEqual(user.email, 'test@example.com')

    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(username='testuser', email='test@example.com', team=team)
        activity = Activity.objects.create(user=user, type='run', duration=30)
        self.assertEqual(activity.type, 'run')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Workout', description='desc')
        self.assertEqual(workout.name, 'Workout')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(username='testuser', email='test@example.com', team=team)
        leaderboard = Leaderboard.objects.create(user=user, score=100)
        self.assertEqual(leaderboard.score, 100)

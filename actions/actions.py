from rasa_sdk import Action
from rasa_sdk.executor import CollectingDispatcher
import random


class ActionMotivationQuote(Action):

    def name(self):
        return "action_motivation_quote"

    def run(self, dispatcher, tracker, domain):

        quotes = [
            "Push yourself because no one else will do it for you.",
            "Dream big and dare to fail.",
            "Your only limit is your mind.",
            "Success starts with self-belief.",
            "Small progress is still progress."
        ]

        dispatcher.utter_message(text=random.choice(quotes))
        return []


class ActionInspirationQuote(Action):

    def name(self):
        return "action_inspiration_quote"

    def run(self, dispatcher, tracker, domain):

        quotes = [
            "The best way to get started is to quit talking and begin doing.",
            "Don't watch the clock; do what it does. Keep going.",
            "Act as if what you do makes a difference. It does.",
            "Turn your wounds into wisdom.",
            "Believe you can and you're halfway there."
        ]

        dispatcher.utter_message(text=random.choice(quotes))
        return []


class ActionHumorQuote(Action):

    def name(self):
        return "action_humor_quote"

    def run(self, dispatcher, tracker, domain):

        quotes = [
            "I'm not lazy, I'm just on energy-saving mode.",
            "Why don’t scientists trust atoms? Because they make up everything.",
            "I used to think I was indecisive, but now I'm not so sure.",
            "I told my computer I needed a break, and it said no problem—it froze.",
            "My brain has too many tabs open."
        ]

        dispatcher.utter_message(text=random.choice(quotes))
        return []


class ActionLoveQuote(Action):

    def name(self):
        return "action_love_quote"

    def run(self, dispatcher, tracker, domain):

        quotes = [
            "Love is composed of a single soul inhabiting two bodies.",
            "Where there is love there is life.",
            "The best thing to hold onto in life is each other.",
            "Love recognizes no barriers.",
            "To love and be loved is to feel the sun from both sides."
        ]

        dispatcher.utter_message(text=random.choice(quotes))
        return []


class ActionSuccessQuote(Action):

    def name(self):
        return "action_success_quote"

    def run(self, dispatcher, tracker, domain):

        quotes = [
            "Success usually comes to those who are too busy to be looking for it.",
            "Success is not final; failure is not fatal.",
            "Opportunities don't happen. You create them.",
            "Don't be afraid to give up the good to go for the great.",
            "Success is the sum of small efforts repeated daily."
        ]

        dispatcher.utter_message(text=random.choice(quotes))
        return []
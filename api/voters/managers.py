from django.db import models


class ApprovedEmailManager(models.Manager):

    def filter_approved_emails(self):
        return self.filter(email_confirmed=True, email_subscribed=True)

    def confirm_email(self, user):
        return self.filter(user=user).update(email_confirmed=True)

    def unsubscribe_email(self, user):
        return self.filter(user=user).update(email_subscribed=False)

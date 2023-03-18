from django.db import models


class ApprovedEmailManager(models.Manager):

    def filter_email(self, email: str):
        return self.filter(user__email=email).first()

    def filter_approved_emails(self):
        return self.filter(email_confirmed=True, email_subscribed=True)

    def confirm_email(self, user):
        if self.filter(user=user).update(email_confirmed=True):
            user.voter.provision()

    def unsubscribe_email(self, user):
        return self.filter(user=user).update(email_subscribed=False)

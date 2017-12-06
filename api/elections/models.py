from django.db import models
from django.core.exceptions import ValidationError


class County(models.Model):

    class Meta:
        verbose_name_plural = "Counties"

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class City(models.Model):

    class Meta:
        verbose_name_plural = "Cities"

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Ward(models.Model):

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Region(models.Model):

    class Meta:
        unique_together = ('county', 'city', 'ward')

    county = models.ForeignKey(County, blank=True, null=True,
                               on_delete=models.PROTECT)
    city = models.ForeignKey(City, blank=True, null=True,
                             on_delete=models.PROTECT)
    ward = models.ForeignKey(Ward, blank=True, null=True,
                             on_delete=models.PROTECT)

    # geo = models.JSONField()

    def __str__(self):
        return self.name

    @property
    def name(self):
        if self.county:
            return f"{self.county} County"
        if self.city and self.ward:
            return f"City of {self.city} - Ward {self.ward}"
        return f"City of {self.city}"

    def clean(self):
        super().clean()
        msg = "Set one of the following: County, City, City + Ward"
        if self.county and (self.city or self.ward):
            raise ValidationError(msg)
        if self.city and self.county:
            raise ValidationError(msg)
        if self.ward and not self.city:
            raise ValidationError(msg)


class Election(models.Model):

    name = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return self.name

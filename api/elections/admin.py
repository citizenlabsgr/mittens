from django.contrib import admin

from . import models


@admin.register(models.Election)
class ElectionAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
        'date',
    ]

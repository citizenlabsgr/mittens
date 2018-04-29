from urllib.parse import urlparse

from django.contrib import admin
from django.utils.html import format_html

from . import models


@admin.register(models.Kind)
class KindAdmin(admin.ModelAdmin):

    list_display = [
        'name',
    ]

    ordering = [
        'name',
    ]


@admin.register(models.Region)
class RegionAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
        'kind',
        'verified',
    ]

    list_filter = [
        'kind',
        'verified',
    ]

    ordering = [
        'name',
    ]


@admin.register(models.Election)
class ElectionAdmin(admin.ModelAdmin):

    search_fields = ['name']

    list_display = [
        'name',
        'date',
        'Reference',
    ]

    @staticmethod
    def Reference(election):
        if election.reference_url:
            url = election.reference_url
            label = urlparse(url).netloc
            return format_html(f'<a href="{url}" target="_blank">{label}</a>')
        return None

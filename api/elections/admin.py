from django.contrib import admin

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

    list_display = ['name', 'date']

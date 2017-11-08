from django.contrib import admin

from . import models


class RegionPartAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
    ]


admin.site.register(models.County)
admin.site.register(models.City)
admin.site.register(models.Ward)


@admin.register(models.Region)
class RegionAdmin(admin.ModelAdmin):

    search_fields = [
        'county__name',
        'city__name',
        'ward__name',
    ]

    list_display = [
        'name',
        'county',
        'city',
        'ward',
    ]


@admin.register(models.Election)
class ElectionAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
        'date',
    ]

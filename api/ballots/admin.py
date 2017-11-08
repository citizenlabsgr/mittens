from django.contrib import admin

from . import models


@admin.register(models.Proposal)
class ProposalAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
        'description',
    ]

    list_display = [
        'name',
        'description',
        'election',
        'Regions',
    ]

    list_filter = [
        'election',
    ]

    @staticmethod
    def Regions(proposal):
        return ", ".join(str(r) for r in proposal.regions.all())

    filter_horizontal = [
        'regions',
    ]


@admin.register(models.Party)
class PartyAdmin(admin.ModelAdmin):

    search_fields = ['name']

    list_display = ['name']


@admin.register(models.Candidate)
class CandidateAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
        'party',
        'website',
    ]


@admin.register(models.Position)
class PositionAdmin(admin.ModelAdmin):

    search_fields = [
        'name',
    ]

    list_display = [
        'name',
        'seats',
        'election',
        'region',
    ]

    list_filter = [
        'election',
        'region',
        'seats',
    ]

    filter_horizontal = [
        'candidates',
    ]

# Generated by Django 2.0.6 on 2018-07-05 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0002_auto_20180103_0825'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='election',
            options={'ordering': ['-date']},
        ),
    ]

# Generated by Django 5.0.4 on 2025-03-12 11:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tableA', '0009_formdata_allowed_users'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='formdata',
            name='allowed_users',
            field=models.ManyToManyField(related_name='forms', to=settings.AUTH_USER_MODEL),
        ),
    ]

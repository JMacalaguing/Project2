# Generated by Django 5.0.4 on 2025-03-12 00:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tableA', '0005_remove_form_agency_remove_form_appropriation_source_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='formdata',
            old_name='form',
            new_name='form_name',
        ),
        migrations.AlterField(
            model_name='department',
            name='form',
            field=models.OneToOneField(default='Form Name', on_delete=django.db.models.deletion.CASCADE, related_name='departments', to='tableA.form'),
        ),
    ]

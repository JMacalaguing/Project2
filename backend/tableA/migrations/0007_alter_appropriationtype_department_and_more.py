# Generated by Django 5.0.4 on 2025-03-12 00:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tableA', '0006_rename_form_formdata_form_name_alter_department_form'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appropriationtype',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approriation_unit', to='tableA.department'),
        ),
        migrations.AlterField(
            model_name='budgetyear',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='year', to='tableA.department'),
        ),
        migrations.AlterField(
            model_name='department',
            name='form',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='departments', to='tableA.form'),
        ),
    ]

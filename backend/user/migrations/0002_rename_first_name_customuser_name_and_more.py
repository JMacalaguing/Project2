# Generated by Django 5.1.6 on 2025-03-03 01:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='first_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='last_name',
        ),
    ]

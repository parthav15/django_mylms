# Generated by Django 5.0.2 on 2024-03-23 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_studentcourseenrollment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentcourseenrollment',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 5.0.2 on 2024-03-16 05:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_chapter_course_alter_course_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_chapters', to='main.course'),
        ),
        migrations.AlterField(
            model_name='course',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.coursecategory'),
        ),
    ]
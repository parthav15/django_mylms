# Generated by Django 5.0.2 on 2024-03-18 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_teacher_description_alter_course_teacher'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='qualification',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='student',
            name='address',
        ),
        migrations.RemoveField(
            model_name='student',
            name='mobile_no',
        ),
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]

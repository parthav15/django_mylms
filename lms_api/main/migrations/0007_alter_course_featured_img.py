# Generated by Django 5.0.2 on 2024-03-01 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_coursecategory_featured_img_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='featured_img',
            field=models.ImageField(null=True, upload_to='media/course_imgs/'),
        ),
    ]

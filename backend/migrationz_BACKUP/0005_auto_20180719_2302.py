# Generated by Django 2.0 on 2018-07-19 23:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20180710_1704'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useranswer',
            old_name='encoded_answer',
            new_name='answer',
        ),
        migrations.RemoveField(
            model_name='useranswer',
            name='encoder_string',
        ),
    ]

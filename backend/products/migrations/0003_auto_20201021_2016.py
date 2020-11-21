# Generated by Django 3.1.2 on 2020-10-21 18:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20201020_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='productType',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.producttype'),
        ),
        migrations.AlterField(
            model_name='producttype',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.producttype'),
        ),
    ]
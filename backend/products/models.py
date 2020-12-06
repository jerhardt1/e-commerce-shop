from django.db import models


class Product (models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    size = models.ManyToManyField('Size', blank=True)
    color = models.ManyToManyField('Color', blank=True)
    stock = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)  # 99999,99
    created_at = models.DateTimeField(auto_now_add=True)
    productType = models.ForeignKey('ProductType', null=True, default=None,
                                    blank=True, on_delete=models.CASCADE, related_name='products')
    tags = models.ManyToManyField('Tag',  blank=True)
    image = models.ImageField(null=True, default=None)

    def __str__(self):
        return self.title


class ProductType (models.Model):
    productType = models.CharField(max_length=30)
    parent = models.ForeignKey(
        "self", blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.productType


class Image(models.Model):
    image = models.ImageField()
    # product = models.ForeignKey(
    #     'Product', null=True, blank=True, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return str(self.image)


class Color (models.Model):
    color = models.CharField(max_length=50, blank=True)
    value = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.color


class Size (models.Model):
    size = models.CharField(max_length=5, null=True)

    def __str__(self):
        return self.size


class Tag (models.Model):
    name = models.CharField(max_length=30, null=True)

    def __str__(self):
        return self.name


class Promotion (models.Model):
    tag = models.ForeignKey("Tag", on_delete=models.CASCADE)
    image = models.ImageField()

    def __str__(self):
        return self.tag.name

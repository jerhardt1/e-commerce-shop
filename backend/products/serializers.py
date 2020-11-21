from rest_framework import serializers
from .models import Product, ProductType, Tag, Promotion


class ProductSerializer(serializers.ModelSerializer):
    subCategory = serializers.CharField(source='productType.productType', read_only=True)
    category = serializers.CharField(source='productType.parent.productType', read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'category', 'subCategory', 'description', 'size',
                  'color', 'stock', 'price', 'image',  )

class ProductTypeSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='parent.productType', read_only=True)


    class Meta:
        model = ProductType
        fields = ('id','productType', 'category',)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model= Tag
        fields = ('id','name',)

class PromotionSerializer(serializers.ModelSerializer):
    tag = serializers.CharField(source='tag.name', read_only=True)

    class Meta:
        model= Promotion
        fields = ('id', 'image', 'tag')

from rest_framework import serializers
from .models import Product, ProductType, Tag, Promotion, Image, Size, Color


# class ImageField(serializers.RelatedField):
#     def to_representation(self, value):
#         if settings.DEBUG:
#             link = 'http://%s%s%s' % (Site.object.get_current().domain,
#                                       settings.MEDIA_URL, obj.img.url)
#         print(link)
#         return


# class ImageSerializer(serializers.ModelSerializer):
#     img_url = serializers.SerializerMethodField()

#     class Meta:
#         model = Image
#         fields = '__all__'

#     def get_img_url(self, obj):
#         if settings.DEBUG:
#             return 'http://%s%s%s' % (Site.object.get_current().domain, settings.MEDIA_URL, obj.img.url)

class SizeSerializer(serializers.ModelSerializer):
    def to_representation(self, value):
        return value.size

    class Meta:
        model = Size
        fields = ('size',)


class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = ('color', 'value',)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name',)


class ProductSerializer(serializers.ModelSerializer):
    subCategory = serializers.CharField(
        source='productType.productType', read_only=True)
    category = serializers.CharField(
        source='productType.parent.productType', read_only=True)
    sizes = SizeSerializer(source='size', many=True, read_only=True)
    colors = ColorSerializer(source='color', many=True, read_only=True)
    tags = TagSerializer(source='tag', many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'tags', 'category', 'subCategory', 'description', 'sizes',
                  'colors', 'stock', 'price', 'image',)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ProductTypeSerializer(serializers.ModelSerializer):
    category = serializers.CharField(
        source='parent.productType', read_only=True)

    class Meta:
        model = ProductType
        fields = ('id', 'productType', 'category',)


class PromotionSerializer(serializers.ModelSerializer):
    tag = serializers.CharField(source='tag.name', read_only=True)

    class Meta:
        model = Promotion
        fields = ('id', 'image', 'tag')

from django.contrib import admin
from .models import Product, ProductType, Tag, Promotion, Image, Color, Size


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    pass


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    pass


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    pass

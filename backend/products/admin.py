from django.contrib import admin
from .models import Product, ProductType, Tag, Promotion


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

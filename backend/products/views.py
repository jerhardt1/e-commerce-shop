from django.shortcuts import render
from .models import Product, ProductType, Tag, Promotion
from .serializers import ProductSerializer, ProductTypeSerializer, TagSerializer, PromotionSerializer
from rest_framework import viewsets


class ProdcutView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductTypeView(viewsets.ModelViewSet):
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()

class PromotionView(viewsets.ModelViewSet):
    serializer_class = PromotionSerializer
    queryset = Promotion.objects.all()

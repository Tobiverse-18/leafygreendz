from rest_framework import serializers


class PaymentInitializeSerializer(serializers.Serializer):

    order_number = serializers.CharField()


class PaymentVerifySerializer(serializers.Serializer):

    reference = serializers.CharField()
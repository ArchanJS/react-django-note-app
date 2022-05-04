from re import L
from django.shortcuts import render
from .serializers import UserSerializer,NoteSerializer
from .models import CustomUser,Note
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView,UpdateAPIView,DestroyAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView
from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from .userpermission import UserPermission,IsOwnerPermission
import io
from rest_framework.filters import SearchFilter

# Create your views here.

# Create user
class CreateUser(CreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer

# Get own details
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def own_details(request):
    try:
        user=request.user
        serialized_user=UserSerializer(user)
        return JsonResponse(serialized_user.data,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse({'error':'Something went wrong!'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Update user
class UpdateUser(UpdateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated,UserPermission]

    # Alternante
    # def get_object(self):
        # return CustomUser.objects.get(id=self.request.user.id)

# Delete user
class DeleteUser(DestroyAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated,UserPermission]

# Create Note
class CreateOrGetNote(ListCreateAPIView):
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

    # Adding foreign key
    def perform_create(self, serializer):
        serializer.save(postedby=self.request.user)
    
    # Getting notes of a user
    def get_queryset(self):
        return super().get_queryset().filter(postedby=self.request.user.id).order_by('-id')

# Create note (function view)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_note(request):
    try:
        io_data=io.BytesIO(request.body)
        parsed_data=JSONParser().parse(io_data)
        serialized_data=NoteSerializer(data=parsed_data)
        if serialized_data.is_valid(raise_exception=True):
            serialized_data.save(postedby=request.user)
        return JsonResponse({'message':'Note created!'},status=status.HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return JsonResponse({'error':'Something went wrong!'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Update note
class UpdateRetrieveDestroyNote(RetrieveUpdateDestroyAPIView):
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsOwnerPermission]

# Search note
class SearchNote(ListAPIView):
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    
    filter_backends=[SearchFilter]
    search_fields=['title','content']

    
    # Getting notes of a user
    def get_queryset(self):
        return super().get_queryset().filter(postedby=self.request.user.id).order_by('-id')
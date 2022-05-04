from rest_framework.permissions import BasePermission
from .models import Note

# Extended base permission for user

class UserPermission(BasePermission):
    # If the id doesn't match, the user won't be able to modify data
    def has_permission(self, request, view):
        if (request.method=='PATCH' or request.method=='PUT' or request.method=='DELETE') and view.kwargs['pk']!=request.user.id:
            return False
        return True

class IsOwnerPermission(BasePermission):
    def has_permission(self, request, view):
        if Note.objects.get(id=view.kwargs['pk']).postedby.id!=request.user.id:
            return False
        return True
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )

class IsAdminOrPostOnly(BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in ('POST', 'HEAD', 'OPTIONS') or
            request.user and
            request.user.is_staff
        )

class UserAnswerPermissions(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.method == 'GET':
            return (
                (request.query_params.get('userid', None) and
                str(request.user.id) == request.query_params.get('userid', None)) or
                (request.user and
                request.user.is_staff)
            )
        else:
            return (
                request.user and
                request.user.is_staff
            )


class UserProfilePermissions(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return (
                (request.query_params.get('userid', None) and
                str(request.user.id) == request.query_params.get('userid', None)) or
                (request.user and
                request.user.is_staff)
            )
        if request.method == 'GET':
            return (
                (request.query_params.get('userid', None) and
                str(request.user.id) == request.query_params.get('userid', None)) or
                (request.user and
                request.user.is_staff)
            )
        else:
            return (
                request.user and
                request.user.is_staff
            )

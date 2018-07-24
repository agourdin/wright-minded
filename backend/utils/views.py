def get_queryset(self):
    queryset = ClientProfile.objects.all()
    # TUTOR PARAM
    tutorid = self.request.query_params.get('tutorid_m', None)
    if tutorid is not None:
        tutorid = tutorid.split(',')
        queryset = queryset.filter(tutor__in=tutorid)
    # ENROLLMENT_STATUS PARAM
    status = self.request.query_params.get('status', None)
    if status is not None:
        queryset = queryset.filter(enrollment_status=status)
    return queryset


def filter_queryset(field, queryset, request, param, is_multi):
    if (is_multi):
        param_m = request.query_params.get(str(param) + '_m', None)
        if param_m is not None:
            param_m = param_m.split(',')
            return queryset.filter(field__in=param_m)
    else:
        param_a = request.query_params.get(str(param), None)
        if param_a is not None:
            return queryset.filter(field=param_a)

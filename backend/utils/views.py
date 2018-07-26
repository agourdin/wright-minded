def filter_queryset(queryset, query_params):
    '''
    Takes a `Model.objects.all()` queryset and a `self.request.query_params`
    QueryDict and returns a filtered queryset for use in `def get_queryset()`
    method within a ModelViewSet class.
    '''
    for param in query_params:
            print(param)
            if param[-2:] == '_m':
                print(param[:-2])
                param_m = query_params.get(param, None)
                if param_m is not None:
                    param_m = param_m.split(',')
                    filter_kwargs = {
                        "{}__in".format(param[:-2]): param_m
                    }
                    queryset = queryset.filter(**filter_kwargs)
            elif param[-3:] == '_ic':
                param_ic = query_params.get(param, None)
                if param_ic is not None:
                    filter_kwargs = {
                        "{}__icontains".format(param[:-3]): param_ic
                    }
                    queryset = queryset.filter(**filter_kwargs)
            else:
                param_a = query_params.get(param, None)
                if param_a is not None:
                    filter_kwargs = {
                        "{}".format(param): param_a
                    }
                    queryset = queryset.filter(**filter_kwargs)
    return queryset

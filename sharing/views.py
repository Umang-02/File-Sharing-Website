from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.serializers import *
from sharing.serializers import *
# Create your views here.

# def home(request):
#     return render(request,'home.html')

def index(request):
    return render(request,'index.html')

class HandleFileUpload(APIView):
    def post(self,request):
        try:
            data=request.data
            serializer=FileListSerializer(data=data)
            if(serializer.is_valid()):
                serializer.save()
                return Response({
                    'status':200,
                    'message':"files uploaded successfully",
                    'data':serializer.data
                })
            return Response({
                'status':400,
                'message':"Something went wrong",
                'data':serializer.errors
            })
        except Exception as e:
            print(e)
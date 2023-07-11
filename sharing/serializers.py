
   
import shutil
from numpy import require
from rest_framework import serializers
from .models import *


class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Files
        fields = '__all__'

#We are creating a serializer class named file list, and in that files is a listfield, as we have list of files that can be uploaded, as in the list we will be having multiple files, hence our child is equated to FileField where empty file is not permitted to be uploaded, and also no downloading from a url, hence allow empty file and use url fields are set to false.

class FileListSerializer(serializers.Serializer):
    files = serializers.ListField(
        child = serializers.FileField(max_length = 100000 , allow_empty_file = False , use_url = False)
    )
    folder = serializers.CharField(required = False)
    
    def zip_files(self,folder):
        shutil.make_archive(f'file_sharing_frontend/build/static/zip/{folder}' , 'zip' ,f'file_sharing_frontend/build/static/{folder}' )

    def create(self , validated_data):
        folder = Folder.objects.create()
        files = validated_data.pop('files')
        files_objs = []
        for file in files:
            files_obj = Files.objects.create(folder = folder , file = file)
            files_objs.append(files_obj)
        self.zip_files(folder.id)
        return {'files' : {} , 'folder' : str(folder.id)}
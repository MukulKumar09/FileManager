package com.tabber;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import java.util.ArrayList;
import java.util.List;



public class TabberModule extends ReactContextBaseJavaModule {

    public TabberModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TabberModule";
    }

    @ReactMethod
    public void getMountingPoints(String path,Callback successCallback, Callback errorCallback) {
        try{
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            Uri mediaStoreUri = MediaStore.Files.getContentUri("external");
            String filter = MediaStore.MediaColumns.DATA + " = '"+path+"'";
            Cursor cursor = contentResolver.query(mediaStoreUri, null,filter, null,null);
            cursor.moveToFirst();
            int idColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns._ID);
            long id = cursor.getLong(idColumn);
            cursor.close();
            successCallback.invoke(String.valueOf(id));
        }catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getThumbnailPath(String path,Callback successCallback, Callback errorCallback) {
        try{
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            
            Uri mediaStoreUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            String mediaFilter = "_data = '"+path+"'";
            Cursor mediaCursor = contentResolver.query(mediaStoreUri, null,mediaFilter, null,null);
            mediaCursor.moveToFirst();
            int mediaIdColumn = mediaCursor.getColumnIndex("_id");
            int mediaId = mediaCursor.getInt(mediaIdColumn);

            // String thumbFilter = "image_id = "+mediaId;
            String thumbFilter = null;
            Cursor thumbCursor = contentResolver.query(MediaStore.Images.Thumbnails.EXTERNAL_CONTENT_URI, null,null, null,null);

            if (thumbCursor != null && thumbCursor.moveToFirst()) {
                int thumbIdColumn = thumbCursor.getColumnIndex("_data");
                String thumbPath = thumbCursor.getString(thumbIdColumn);
                successCallback.invoke(thumbPath);
                mediaCursor.close();
                thumbCursor.close();
            } else {
                successCallback.invoke(String.valueOf(thumbCursor.getCount()));
                mediaCursor.close();
                thumbCursor.close();
            }
            
            
        }catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

     public static String getExtension(String name){
        String[] extension = name.split("\\."); 
        String ext = extension[extension.length - 1];
        String result = extension.length > 1 ? ext : name;
        return result;
    };

    @ReactMethod
    public void getAllFiles(int folderId,String mediaType,Callback successCallback, Callback errorCallback){
        try {
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();

            Uri mediaStoreUri=null;
            String filter=null;

            if(mediaType==null){
                mediaStoreUri=MediaStore.Files.getContentUri("external");
                filter = MediaStore.Files.FileColumns.PARENT + " = '"+folderId+"'";
            }else if(mediaType.equals("Photos")){
                mediaStoreUri=MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            }else if(mediaType.equals("Videos")){
                mediaStoreUri=MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            }else if(mediaType.equals("Audio")){
                mediaStoreUri=MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
            }else if(mediaType.equals("Downloads")){
                mediaStoreUri=MediaStore.Downloads.EXTERNAL_CONTENT_URI;
            }

            Cursor cursor = contentResolver.query(mediaStoreUri, null,filter, null,null);
            
            List<WritableMap> mediaList = new ArrayList<>();
            if (cursor != null) {
                int idColumn = cursor.getColumnIndex("_id");
                int titleColumn = cursor.getColumnIndex("title");
                int nameColumn = cursor.getColumnIndex("_display_name");
                int pathColumn = cursor.getColumnIndex("_data");
                int ctimeColumn = cursor.getColumnIndex("date_added");
                int mtimeColumn = cursor.getColumnIndex("date_modified");
                int sizeColumn = cursor.getColumnIndex("_size");
                int mimeTypeColumn = cursor.getColumnIndex("mime_type");

                while (cursor.moveToNext()) {
                    WritableMap mediaMap = Arguments.createMap();

                    long id = cursor.getLong(idColumn);
                    mediaMap.putString("id", String.valueOf(id));

                    String title = cursor.getString(titleColumn);
                    mediaMap.putString("title", title);

                    String nameVal = cursor.getString(nameColumn);
                    String name =(nameVal != null ? nameVal : (title != null ? title : "<Unknown Item>"));
                    mediaMap.putString("name", name);

                    String mimeType=cursor.getString(mimeTypeColumn);
                    mediaMap.putString("mimeType", mimeType);

                    String ext=mimeType==null ? "/" : getExtension(name);
                    mediaMap.putString("ext", ext);

                    String path = cursor.getString(pathColumn);
                    mediaMap.putString("path", path);

                    String ctime = cursor.getString(ctimeColumn);
                    mediaMap.putString("ctime", ctime);

                    String mtime = cursor.getString(mtimeColumn);
                    mediaMap.putString("mtime", mtime);

                    String size = cursor.getString(sizeColumn);
                    mediaMap.putString("size", size);

                    int lastSlashIndex = path.lastIndexOf("/");
                    String parent = path.substring(0, lastSlashIndex);
                    mediaMap.putString("parent", parent);
                    
                    mediaList.add(mediaMap);
                }
            }
            cursor.close();

            // Return the list of images to React Native
            WritableArray finalArray = Arguments.createArray();
            for (WritableMap media : mediaList) {
                finalArray.pushMap(media);
            }
            successCallback.invoke(finalArray);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
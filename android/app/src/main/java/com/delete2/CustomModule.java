package com.tabber;
import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.provider.MediaStore.Images.Thumbnails;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import java.util.ArrayList;
import java.util.List;



public class CustomModule extends ReactContextBaseJavaModule {

    public CustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void getAllFiles(int folderId,Callback successCallback, Callback errorCallback) {
        try {
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            // Uri imageUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            Uri imageUri = MediaStore.Files.getContentUri("external");
            List<WritableMap> imagesList = new ArrayList<>();

            // Query the MediaStore for images
            String selection = MediaStore.Files.FileColumns.PARENT + " = '"+folderId+"'";
            // String[] selectionArgs = new String[]{folderId }; 
            Cursor cursor = contentResolver.query(imageUri, null,selection, null,null);

            if (cursor != null) {
                int idColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns._ID);
                int titleColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.TITLE);
                int nameColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.DISPLAY_NAME);
                int pathColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.DATA);
                int mimeTypeColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.MIME_TYPE);
                int parentColumn = cursor.getColumnIndex(MediaStore.Files.FileColumns.PARENT);

                while (cursor.moveToNext()) {
                    WritableMap image = Arguments.createMap();
                    long id = cursor.getLong(idColumn);
                    String title = cursor.getString(titleColumn);
                    String name = cursor.getString(nameColumn);
                    String path = cursor.getString(pathColumn);
                    String mimeType = cursor.getString(mimeTypeColumn);
                    String parent = cursor.getString(parentColumn);
                    image.putString("id", String.valueOf(id));
                    image.putString("title", title);
                    image.putString("name", name);
                    image.putString("path", path);
                    image.putString("mimeType", mimeType);
                    image.putString("parent", parent);

                    imagesList.add(image);
                }
                cursor.close();
            }

            // Return the list of images to React Native
            WritableArray imagesArray = Arguments.createArray();
            for (WritableMap image : imagesList) {
                imagesArray.pushMap(image);
            }
            successCallback.invoke(imagesArray);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getImages(Callback successCallback, Callback errorCallback) {
        try {
            ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
            Uri imageUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            List<WritableMap> imagesList = new ArrayList<>();

            // Query the MediaStore for images
            Cursor cursor = contentResolver.query(imageUri, null, null, null, null);

            if (cursor != null) {
                int idColumn = cursor.getColumnIndex(MediaStore.Images.Media._ID);
                int titleColumn = cursor.getColumnIndex(MediaStore.Images.Media.TITLE);
                int nameColumn = cursor.getColumnIndex(MediaStore.Images.Media.DISPLAY_NAME);
                int pathColumn = cursor.getColumnIndex(MediaStore.Images.Media.DATA);

                while (cursor.moveToNext()) {
                    WritableMap image = Arguments.createMap();
                    long id = cursor.getLong(idColumn);
                    String title = cursor.getString(titleColumn);
                    String name = cursor.getString(nameColumn);
                    String path = cursor.getString(pathColumn);
                    image.putString("id", String.valueOf(id));
                    image.putString("title", title);
                    image.putString("name", name);
                    image.putString("path", path);

                    imagesList.add(image);
                }
                cursor.close();
            }

            // Return the list of images to React Native
            WritableArray imagesArray = Arguments.createArray();
            for (WritableMap image : imagesList) {
                imagesArray.pushMap(image);
            }
            successCallback.invoke(imagesArray);
        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }
}
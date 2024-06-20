package com.example.explorentt

import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File

fun File.toMultipart(): MultipartBody.Part {
    val requestFile = RequestBody.create("image/jpeg".toMediaTypeOrNull(), this)
    return MultipartBody.Part.createFormData("file", this.name, requestFile)
}

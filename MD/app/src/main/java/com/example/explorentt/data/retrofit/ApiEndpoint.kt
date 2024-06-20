package com.example.explorentt.data.retrofit

import com.example.explorentt.data.model.MainModel
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiEndpoint {

    @POST("predict")
    /// Dipake ketika butuh ngirim image/file
    @Multipart
    fun getPredict(
        @Part photo: MultipartBody.Part,
        ): Call<MainModel>

    @GET("getdata")
    fun getArticle(): Call<MainModel>


}
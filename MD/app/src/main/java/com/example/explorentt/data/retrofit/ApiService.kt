package com.example.explorentt.data.retrofit

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create

object ApiService {

    private const val BASE_URL: String = "https://capstoneproject-explorentt-khctgvtbua-et.a.run.app/"

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val endpoint: ApiEndpoint by lazy {
        retrofit.create(ApiEndpoint::class.java)
    }


}
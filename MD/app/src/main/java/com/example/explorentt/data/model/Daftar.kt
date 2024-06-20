package com.example.explorentt.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize

data class Daftar(
    val imgWisata: Int? = null,
    val nameWisata: String,
    val descWisata: String? = null,
    val locWisata: String? = null,
    val rateWisata: Float? = null,
) : Parcelable

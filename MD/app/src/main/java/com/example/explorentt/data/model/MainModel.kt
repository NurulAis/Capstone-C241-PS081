package com.example.explorentt.data.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class MainModel(
	val predictedClass: String? = null,
	val artikel: String? = null,
	val image: String? = null,
	val rating: Float? = null,
	val lokasi: String? = null
) : Parcelable
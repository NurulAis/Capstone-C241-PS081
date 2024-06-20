package com.example.explorentt

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.explorentt.databinding.ActivityResultBinding
import com.example.explorentt.data.model.MainModel

class ResultActivity : AppCompatActivity() {
    private lateinit var binding: ActivityResultBinding
    private lateinit var mainModel: MainModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityResultBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Mengambil data MainModel dari intent
        mainModel = intent.getParcelableExtra("EXTRA_MAIN_MODEL") ?: MainModel()

        // Menampilkan hasil prediksi
        showPredictionResult()
    }

    private fun showPredictionResult() {
        binding.namaTempat.text = mainModel.predictedClass
        binding.deskripsiTempat.text = mainModel.artikel

        Glide.with(this)
            .load(mainModel.image)
            .into(binding.imageView)
    }
}


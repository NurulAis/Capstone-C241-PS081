package com.example.explorentt.recycler

import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.explorentt.R
import com.example.explorentt.data.model.Daftar

class ListDetail : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_detail)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val daftar = intent.getParcelableExtra<Daftar>(MainActivity.INTENT_PARCELABLE)

        val imgWisata = findViewById<ImageView>(R.id.image)
        val nameWisata = findViewById<TextView>(R.id.tittle)
        val descWisata = findViewById<TextView>(R.id.deskripsi)
        val locWisata = findViewById<TextView>(R.id.location)
        val rateWisata = findViewById<TextView>(R.id.rating)

        daftar?.let {
            it.imgWisata?.let { img -> imgWisata.setImageResource(img) } // Placeholder image resource
            nameWisata.text = it.nameWisata
            descWisata.text = it.descWisata
            locWisata.text = it.locWisata
            rateWisata.text = it.rateWisata.toString()
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
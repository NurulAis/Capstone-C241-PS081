package com.example.explorentt.firebase

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.explorentt.R
import com.google.firebase.auth.FirebaseAuth

class LogoutActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_logout)

        auth = FirebaseAuth.getInstance()

        progressBar = findViewById(R.id.progressBar2)

        // Panggil metode logout() ketika tombol logout diklik
        findViewById<Button>(R.id.btnLogout).setOnClickListener {
            logout()
        }
    }

    private fun logout() {
        progressBar.visibility = View.VISIBLE // Tampilkan ProgressBar

        auth.signOut()

        progressBar.visibility = View.GONE
        Toast.makeText(this, "Logout successful", Toast.LENGTH_SHORT).show()
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}
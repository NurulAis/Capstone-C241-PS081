package com.example.explorentt

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.example.explorentt.data.model.MainModel
import com.example.explorentt.data.retrofit.ApiService
import com.example.explorentt.databinding.ActivityCameraBinding
import okhttp3.OkHttpClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File


class CameraActivity : AppCompatActivity() {
    private lateinit var binding: ActivityCameraBinding

    private var currentImageUri: Uri? = null
    private lateinit var call: Call<MainModel>


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCameraBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.galleryButton.setOnClickListener { startGallery() }
        binding.analyzeButton.setOnClickListener {
            currentImageUri?.let {
                analyzeImage()
            } ?: run {
                showToast(getString(R.string.blank_image))
            }
        }
    }

    private fun predictImage(){
        currentImageUri?.let { uri ->
            try {
                // Create a temporary file
                val inputStream = contentResolver.openInputStream(uri)
                val tempFile = createTempFile("image", ".jpg", cacheDir)
                tempFile.outputStream().use { outputStream ->
                    inputStream?.copyTo(outputStream)
                }
                inputStream?.close()

                // Use the temporary file for the prediction
                call = ApiService.endpoint.getPredict(tempFile.toMultipart())
                call.enqueue(object : Callback<MainModel> {
                    @SuppressLint("NotifyDataSetChanged")
                    override fun onResponse(call: Call<MainModel>, response: Response<MainModel>) {
                        if (response.isSuccessful) {
                            response.body()?.let { mainModel ->
                                Log.d(TAG, "onResponse: ${mainModel.predictedClass}")
                                Log.d(TAG, "onResponse: ${mainModel.artikel}")
                                Log.d(TAG, "onResponse: ${mainModel.image}")
                                Log.d(TAG, "onResponse: ${mainModel.rating}")
                                Log.d(TAG, "onResponse: ${mainModel.lokasi}")

                                // Create an intent to start ResultActivity
                                val intent = Intent(this@CameraActivity, ResultActivity::class.java).apply {
                                    putExtra("EXTRA_MAIN_MODEL", mainModel)
                                }
                                startActivity(intent)
                            }
                        }
                    }

                    override fun onFailure(call: Call<MainModel>, t: Throwable) {
                        Toast.makeText(applicationContext, t.localizedMessage, Toast.LENGTH_SHORT).show()
                    }
                })
            } catch (e: Exception) {
                e.printStackTrace()
                showToast(getString(R.string.blank_image))
            }
        } ?: run {
            showToast(getString(R.string.blank_image))
        }
    }


    private fun startGallery() {

        launcherGallery.launch(PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly))

    }

    private val launcherGallery = registerForActivityResult(
        ActivityResultContracts.PickVisualMedia()
    ) { uri: Uri? ->
        if (uri != null) {
            currentImageUri = uri
            showImage()
        } else {
            Log.d(TAG, "No Media Selected")
            showToast(getString(R.string.remove_image))
        }
    }

    private fun showImage() {

        currentImageUri?.let {
            Log.d(TAG, "showImage: $it")
            binding.previewImageView.setImageURI(it)
        }
    }

    private fun analyzeImage() {
        currentImageUri?.let {
            predictImage()
        } ?: run {
            showToast(getString(R.string.blank_image))
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    companion object {
        const val TAG = "ImagePicker"
    }
}
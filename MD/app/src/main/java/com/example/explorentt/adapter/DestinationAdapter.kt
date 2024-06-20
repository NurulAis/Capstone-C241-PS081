package com.example.explorentt.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.explorentt.R
import com.example.explorentt.data.model.MainModel

class DestinationAdapter(private val onClick: (MainModel) -> Unit) :
    ListAdapter<MainModel, DestinationAdapter.DestinationViewHolder>(DestinationCallBack) {

    class DestinationViewHolder(itemView: View, val onClick: (MainModel) -> Unit) :
        RecyclerView.ViewHolder(itemView) {

        private val image: ImageView = itemView.findViewById(R.id.image)
        private val tittle: TextView = itemView.findViewById(R.id.tittle)
        private val deskripsi: TextView = itemView.findViewById(R.id.deskripsi)
        private val location: TextView = itemView.findViewById(R.id.location)
        private val rating: TextView = itemView.findViewById(R.id.rating)

        private var currentProduct: MainModel? = null

        init {
            itemView.setOnClickListener {
                currentProduct?.let {
                    onClick(it)
                }
            }
        }

        fun bind(mainModel: MainModel) {
            currentProduct = mainModel

            tittle.text = mainModel.predictedClass
            deskripsi.text = mainModel.artikel
            location.text = mainModel.lokasi // Corrected to use lokasi
            rating.text = mainModel.rating?.toString() ?: "N/A"

            Glide.with(itemView).load(mainModel.image).centerCrop().into(image)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DestinationViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_daftar, parent, false)
        return DestinationViewHolder(view, onClick)
    }

    override fun onBindViewHolder(holder: DestinationViewHolder, position: Int) {
        val destination = getItem(position)
        holder.bind(destination)
    }
}

object DestinationCallBack : DiffUtil.ItemCallback<MainModel>() {
    override fun areItemsTheSame(oldItem: MainModel, newItem: MainModel): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: MainModel, newItem: MainModel): Boolean {
        return oldItem.artikel == newItem.artikel // Corrected to compare oldItem and newItem
    }
}
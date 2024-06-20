import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.explorentt.R
import com.example.explorentt.data.model.Daftar

class AdapterList(
    private val context: Context,
    private val daftarList: List<Daftar>,
    private val listener: (Daftar) -> Unit
) : RecyclerView.Adapter<AdapterList.DaftarViewHolder>() {

    inner class DaftarViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imageView: ImageView = view.findViewById(R.id.image)
        val titleView: TextView = view.findViewById(R.id.tittle)
        val descView: TextView = view.findViewById(R.id.deskripsi)
        val locationView: TextView = view.findViewById(R.id.location)
        val ratingView: TextView = view.findViewById(R.id.rating)

        fun bind(daftar: Daftar, listener: (Daftar) -> Unit) {
            imageView.setImageResource(daftar.imgWisata ?: R.drawable.tanggedu)
            titleView.text = daftar.nameWisata
            descView.text = daftar.descWisata
            locationView.text = daftar.locWisata
            ratingView.text = daftar.rateWisata.toString()
            itemView.setOnClickListener { listener(daftar) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DaftarViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_daftar, parent, false)
        return DaftarViewHolder(view)
    }

    override fun onBindViewHolder(holder: DaftarViewHolder, position: Int) {
        holder.bind(daftarList[position], listener)
    }

    override fun getItemCount(): Int = daftarList.size
}

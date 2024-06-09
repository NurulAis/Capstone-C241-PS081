const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Wae Rebo Village', 'Padar Island', 'Pink Beach', 'Danau Kelimutu', 'Nihiwatu Beach', 'Waikuri Lagoon', 'Waikuri Lagoon', 'Lasiana Beach', 'Bukit Wairinding',
    'Komodo National Park', 'Alor Island', 'Pantai Oetune', 'Air Terjun Oenesu', 'Pantai Manikin', 'Pantai Pasir Panjang', 'Kelimutu National Park', 'Air Terjun Tesbatan',
    'Pantai Tablolong', 'Savana Puru Kambera', 'Lingko Spider Wen Rice Field', 'Batu Nona Beach', 'Ketapang Satu Beach', 'Nemberala Beach', 'Pantai Oesapa', 'Nostalgia park',
    'Pantai Walakiri', 'Lawa Darat Gili', 'Air Terjun Tanggedu', 'Rangko Cave', 'Pulau Kanawa', 'Rumah Budaya Sumba', 'Pantai Watu Parunu', 'Pantai Kolbano', 'Pantai Mandorak',
    'Pantai Waecicu', 'Pantai Kalong', 'Dermaga Baru Waikelo', 'Koka Beach', 'Taman Rekreasi Gua Monyet', 'Wisata Adat Kampung Todo', 'Kera', 'Solor', 'Pulau kelor'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let artikel, lokasi, rating;

    if (label === 'Wae Rebo Village') {
      artikel = "Wae Rebo adalah desa adat kecil yang terletak di pegunungan terpencil, Kampung Satar Lenda, Kecamatan Satar Mese Barat, Kabupaten Manggarai, Nusa Tenggara Timur. Desa ini dikenal dengan 7 rumah adatnya dan pemandangan khas pegunungan.";
      lokasi = "https://maps.app.goo.gl/oYo4uGq4E3ApMavy5";
      rating = 4.7;
    }
    else if (label === 'Padar Island') {
      artikel = "Padar Island adalah salah satu pulau yang terletak di Taman Nasional Komodo, Nusa Tenggara Timur, Indonesia. Pulau ini terkenal dengan pemandangan alamnya yang spektakuler, terutama panorama dari puncak bukitnya yang menawarkan pemandangan pantai dengan air berwarna biru dan pasir putih.";
      lokasi = "https://maps.app.goo.gl/p9H8cM37AEEW1B4m9";
      rating = 4.8;
    }
    else if (label === 'Pink Beach') {
      artikel = "Pink Beach adalah salah satu pantai eksotis yang memiliki pemandangan indah dengan pasir pantai berwarna merah muda atau pink. Pantai ini juga dikenal dengan nama Pantai Merah di Pulau Komodo. Melansir dari Labuanbajotour, Pink Beach mempunyai warna pasir yang unik dan kerap menjadi destinasi wisata favorit turis lokal dan mancanegara. Diketahui, warna pink pada pasirnya berasal dari hewan berukuran mikroskopis bernama “Foraminifera” yang memberikan pigmen warna merah pada koral. Sehingga, koral-koral tersebut terbawa oleh gelombang dan berakhir di pesisir pantai dan hancur menjadi serpihan serta butiran yang menjadi pasir pantai. Sehingga, pantai ini pun disebut Pantai Pink yang memesona.";
      lokasi = "https://maps.app.goo.gl/JQCSuboXnnrAcS8p8";
      rating = 4.8;
    }
    else if (label === 'Danau Kelimutu') {
      artikel = "Gunung Kelimutu adalah gunung berapi yang terletak di Pulau Flores, Provinsi Nusa Tenggara Timur. Lokasi gunung ini tepatnya di Desa Pemo, Kecamatan Kelimutu, Kabupaten Ende. Gunung ini memiliki tiga buah danau kawah di puncaknya. Danau ini dikenal dengan nama Danau Tiga Warna karena memiliki tiga warna yang berbeda, yaitu merah, biru, dan putih. Walaupun begitu, warna-warna tersebut selalu berubah-ubah seiring dengan perjalanan waktu. Kelimutu merupakan gabungan kata dari 'keli' yang berarti gunung dan kata 'mutu' yang berarti mendidih. Menurut kepercayaan penduduk setempat, warna-warna pada danau Kelimutu memiliki arti masing-masing dan memiliki kekuatan alam yang sangat dahsyat. Luas ketiga danau itu sekitar 1.051.000 meter persegi dengan volume air 1.292 juta meter kubik. Batas antar danau adalah dinding batu sempit yang mudah longsor. Dinding ini sangat terjal dengan sudut kemiringan 70 derajat. Ketinggian dinding danau berkisar antara 50 sampai 150 meter.";
      lokasi = "https://maps.app.goo.gl/BLUBGdrdRpC5oR2r5";
      rating = 4.7;
    }
    else if (label === 'Nihiwatu Beach') {
      artikel = "Pantai Nihiwatu di kabupaten Sumba Barat (SB), Provinsi Nusa Tenggara Timur (NTT), telah mencapai peringkat ke-17 dari 100 kategori pantai terbaik di dunia. Pantai ini merupakan salah satu destinasi wisata yang unggulan di Indonesia yang juga terpilih sebagai pantai terbaik di Asia. Untuk mencapai pantai ini, kamu perlu melakukan perjalanan sekitar 30 km dari Kota Waikabubak, Kabupaten Sumba Barat, NTT, menggunakan berbagai jenis kendaraan. Jika Kamu berangkat dari Pulau Bali, Kamu dapat terbang ke Bandara Tambolaka dan kemudian menyewa mobil untuk mencapai Pantai Nihiwatu. Ombak di Pantai Nihiwatu merupakan yang terbaik di Indonesia dan termasuk yang tercepat di dunia. Pantai ini bahkan mengalahkan panorama indah di Hanalei Bay, Hawaii. Resort Nihiwatu, yang mengelola Pantai Nihiwatu, telah memenangkan penghargaan sebagai hotel terbaik kedua di Indonesia pada tahun 2012.";
      lokasi = "https://maps.app.goo.gl/kKhijpNs74ssTJKv7";
      rating = 4.6;
    }
    else if (label === 'Waikuri Lagoon') {
      artikel = "Waikuri Lagoon hadir dengan air yang sangat jernih dan berwarna biru kehijauan dengan kandungan air asin dan payau. Ya, tidak seperti danau lainnya, air danau ini asin karena terbentuk dari air lautan lepas yang ada di sekitar danau dan masuk dari celah bebatuan di gugusan karang sekitarnya. Laguna ini dipagari batu karang alami di mana tumbuh pepohonan rimbun dan semak belukar yang seolah menyembunyikan keindahannya dari kejauhan. Selain bermain di laguna, para pengunjung juga bisa menyusuri jalan setapak ke arah barat dan mendaki bukit karang yang menjorok ke lautan lepas dengan hati-hati. Dari atas bukit karang ini, pengunjung dapat menikmati pesona Danau Weekuri dari ketinggian dan ombak lautan biru di sekitarnya yang menghantam gugusan karang di sekitar danau.";
      lokasi = "https://maps.app.goo.gl/8MGi7iAQLrChGYen9";
      rating = 4.7;
    }
    else if (label === 'Lasiana Beach') {
      artikel = "Pantai Lasiana yang berlokasi di Kelurahan Lasiana, Kecamatan Kupang Tengah, Kupang, NTT ini berjarak sekitar 12 km ke arah timur dari pusat Kota Kupang. Di pantai yang menjadi alternatif wisata andalan masyarakat Kupang ini, pengunjung dapat melakukan beragam aktivitas, seperti berenang, memancing, bermain sepak bola, karaoke atau sekedar bermain air di pantainya. Makin ke sini, semakin banyak wisatawan baik dari dalam maupun luar kota Kupang yang mengunjungi pantai ini. Berjarak hanya sekitar 12 km dari Kupang, akses menuju lokasi pantai ini sangatlah mudah dan bervariatif. Waktu tempuh dari Kupang ke Pantai Lasiana memakan waktu sekitar 15 menit dengan kondisi jalan yang sudah beraspal halus. Pengunjung dapat menggunakan angkutan umum atau kendaraan pribadi. Dengan letaknya yang berada di jalur transportasi utama Pulau Timor, menjadikan lokasinya senantiasa dilewati oleh angkutan umum dan ojek.";
      lokasi = "https://maps.app.goo.gl/91dcGFtov1FzcVLK9";
      rating = 4.3;
    }
    else if (label === 'Bukit Wairinding') {
      artikel = "Bukit Wairinding terletak di Desa Pambota Jara, Kecamatan Pandawai Sumba Timur, Nusa Tenggara Timur (NTT). Daya tarik utama dari Bukit Wairinding tak lain adalah lanskap padang savana yang memanjakan mata. Sejauh mata memandang, lekuk-lekuk bukit yang eksotis dan masih asri menjadikan lokasi ini begitu istimewa. Terlebih jika waktu mendekati senja, garis cakrawala akan memunculkan warna yang memesona. Selain itu, udara juga tidak terlalu panas sehingga wisatawan bisa lebih leluasa berjalan-jalan dan berfoto. Tak jarang wisatawan akan bertemu dengan anak-anak Sumba yang tengah menggembalakan hewan ternaknya. Anak-anak Sumba ini juga kerap membantu menunjukkan jalan bagi wisatawan. Tak jarang wisatawan mengajak mereka berfoto bersama, atau berfoto dengan kuda yang mereka bawa. Suasana ini tentunya tidak bisa didapatkan di kota besar, sehingga akan menjadi pengalaman menarik dan berkesan yang bisa diingat ketika pulang.";
      lokasi = "https://maps.app.goo.gl/8HYdtcx2wvz85M8XA";
      rating = 4.8;
    }
    else if (label === 'Komodo National Park') {
      artikel = "Karena keunikan dan kelangkaannya, Taman Nasional Komodo dinyatakan sebagai World Heritage Site dan Man and Biosphere Reserve oleh UNESCO tahun 1986. Pertama kali diteliti secara ilmiah pada tahun 1911 oleh JKH Van Steyn dan sejak saat itu tujuan konservasi semakin luas untuk melindungi seluruh keanekaragaman hayati, baik laut dan darat. Taman Nasional Komodo mencakup 3 pulau utama yaitu Pulau Komodo, Rinca, dan Padar, banyak juga pulau-pulau kecil lainnya yang jika dijumlahkan memiliki luas tanah 603 km². Total luas Taman Nasional Komodo saat ini adalah 1.817 km². Diperluas hingga 25 km² (Pulau Banta) dan 479 km² perairan laut akan menghasilkan total luas hingga 2.321 km². Di kawasan Taman Nasional Komodo, Anda juga dapat menemukan kuda, banteng liar, rusa, babi hutan jantan, ular, kera, dan berbagai jenis burung. Selain itu Taman Nasional Komodo memiliki biota bawah laut yang menakjubkan. Para penyelam mengatakan bahwa perairan Komodo adalah salah satu tempat menyelam terbaik di dunia.";
      lokasi = "https://maps.app.goo.gl/55wfWdftk1DpPX8VA";
      rating = 4.7;
    }
    else if (label === 'Alor Island') {
      artikel = "Alor adalah sebuah pulau yang terletak di ujung timur Kepulauan Nusa Tenggara. Luas wilayahnya 2.119 km², dan titik tertingginya 1.839 m. Pulau ini dibatasi oleh Laut Flores dan Laut Banda di sebelah utara, Selat Ombai di selatan (memisahkan dengan Pulau Timor), serta Selat Pantar di barat (memisahkan dengan Pulau Pantar. Pulau Alor adalah satu dari 92 pulau terluar Indonesia karena berbatasan langsung dengan Timor Leste di sebelah selatan. Pulau Alor merupakan salah satu dari dua pulau utama di Kabupaten Alor, Provinsi Nusa Tenggara Timur, Indonesia. Di pulau ini terdapat Kota Kalabahi, ibu kota Kabupaten Alor. Pulau Alor selain memiliki keindahan alam yang dapat dilihat secara langsung di daratan dan di pantai, juga memiliki keindahan alam dibawah laut berupa ikan-ikan langka nan indah serta karang dan tumbuhan-tumbuhan laut yang begitu mempesona.";
      lokasi = "https://maps.app.goo.gl/sd9su3qrP4JjpAtc9";
      rating = 4.5;
    }
    else if (label === 'Pantai Oetune') {
      artikel = "Pantai Oetune merupakan pantai yang sangat unik dan indah di Nusa Tenggara Timur (NTT). Pasalnya Pantai Oetune memiliki pasir yang halus seperti pasir gurun. Tak hanya pasirnya yang halus pantai ini pun memiliki dentuman ombak yang sangat kencang dan pecah di setiap gulungannya. Di tepi pantai ini pun dikelilingi banyaknya Pohon Kasuari yang berusia puluhan tahun. Pantai Oetune ini berlokasi di Tuafanu, Kecamatan Kualin, Kabupaten Timor Tengah Selatan, NTT. Akses menuju Pantai Oetune kurang lebih 115 kilometer dari pusat Kota Kupang dan jarak tempuh sekitar 2-3 jam di perjalanan. Air laut yang ada di Pantai Oetune ini sangat biru dan bersih hingga Anda dapat bercermin. Pantai Oetune memiliki pasir putih yang sangat halus dan menggunung membuat seolah-olah sedang berada di gurun pasir.";
      lokasi = "https://maps.app.goo.gl/AxuQUF5Nd7BPkTXd9";
      rating = 4.6;
    }
    else if (label === 'Air Terjun Oenesu') {
      artikel = "Air Terjun Oenesu adalah salah satu tempat wisata yang ada di Kabupaten Kupang, Nusa Tenggara Timur yang terkenal akan keindahan alamnya. Air terjun ini adalah air terjun bertingkat dengan aliran air yang jernih dan kolam natural yang disokong oleh hutan hijau yang rimbun. Akses jalan menuju air terjun ini sangat mudah. Harga tiket yang ditawarkan hanya 5.000 per orang. Oenesu sangat digemari oleh para pengendara jalan untuk berenang dan bersantai karena suasana yang sangat tenang dan asri.";
      lokasi = "https://maps.app.goo.gl/hvtjpgSFLFtAQCAF7";
      rating = 4.5;
    }
    else if (label === 'Pantai Manikin') {
      artikel = "Pantai Manikin adalah destinasi wisata yang terletak di Kupang, Nusa Tenggara Timur. Pantai ini dikenal dengan pasir putihnya yang halus dan air laut yang jernih, menjadikannya tempat yang ideal untuk bersantai, berenang, dan menikmati pemandangan matahari terbenam. Selain itu, ombaknya yang tenang membuat Pantai Manikin cocok untuk aktivitas keluarga. Keindahan alam sekitar pantai yang masih alami menambah daya tarik bagi wisatawan yang mencari ketenangan dan keindahan alam.";
      lokasi = "https://maps.app.goo.gl/SPBu8AbiixjthRde8";
      rating = 4.3;
    }
    else if (label === 'Pantai Pasir Panjang') {
      artikel = "Pantai Pasir Panjang di Kupang, Nusa Tenggara Timur, adalah destinasi wisata populer yang terkenal dengan hamparan pasir putihnya yang luas dan panjang. Air lautnya yang jernih berwarna biru kehijauan sangat menarik bagi wisatawan yang ingin berenang, berjemur, atau sekadar berjalan-jalan di tepi pantai. Pantai ini juga menawarkan pemandangan matahari terbenam yang spektakuler, menjadikannya tempat yang ideal untuk bersantai dan menikmati keindahan alam. Fasilitas di sekitar pantai cukup lengkap, dengan berbagai pilihan penginapan dan restoran yang menyajikan kuliner lokal. Pantai Pasir Panjang menjadi salah satu ikon pariwisata di Kupang, menarik banyak pengunjung baik dari dalam maupun luar negeri.";
      lokasi = "https://maps.app.goo.gl/4gSbjUYdraPe2BWM8";
      rating = 4.3;
    }
    else if (label === 'Kelimutu National Park') {
      artikel = "Taman Nasional Kelimutu di Pulau Flores, Nusa Tenggara Timur, terkenal dengan tiga danau kawah berwarna yang berubah-ubah: Tiwu Ata Bupu, Tiwu Ko'o Fai Nuwa Muri, dan Tiwu Ata Polo. Selain keajaiban alam ini, taman nasional ini juga menjadi habitat berbagai flora dan fauna endemik serta menawarkan jalur trekking yang indah. Desa-desa tradisional di sekitar taman memberikan wawasan budaya lokal, menjadikan Kelimutu destinasi yang memadukan keindahan alam dan kekayaan budaya.";
      lokasi = "https://maps.app.goo.gl/87RTCVnHhUnPMz39A";
      rating = 4.7;
    }
    else if (label === 'Air Terjun Tesbatan') {
      artikel = "Air Terjun Tesbatan menawarkan pengalaman unik dengan tiga tingkatan yang berbeda. Kolam di bawah air terjun memungkinkan pengunjung bermain air sambil menikmati keindahan alam. Fasilitasnya meliputi lopo-lopo, area parkir, dan ruang ganti pakaian. Buka setiap hari dari pukul 08.00 hingga 18.00, dengan harga karcis masuk yang terjangkau. Dengan segala fasilitasnya, Tesbatan adalah tempat yang sempurna untuk bersantai dan menikmati alam.";
      lokasi = "https://maps.app.goo.gl/PnKwLQjRYZ4RVu9r9";
      rating = 4.2;
    }
    else if (label === 'Pantai Tablolong') {
      artikel = "Pantai Tablolong adalah surga pasir putih yang mempesona dengan langit biru yang indah. Selain berenang atau bermain air, pengunjung dapat bersantai di lopo sambil menikmati angin pantai. Di sekitar pantai, terdapat rawa yang dibudidayakan sebagai kolam pembibitan ikan oleh masyarakat setempat. Pantai ini juga ditandai dengan kehadiran Pohon Centigi yang tumbuh di sekitar bebatuan karang, menambah keunikan alamnya.";
      lokasi = "https://maps.app.goo.gl/qHrNnCPnthAeGEf17";
      rating = 4.4;
    }
    else if (label === 'Savana Puru Kambera') {
      artikel = "Savana Puru Kambera di Sumba Timur, Nusa Tenggara Timur, adalah rumah bagi kuda liar Sumba dan menawarkan padang rumput yang luas dengan panorama indah. Terletak dekat dengan Pantai Puru Kambera, sabana ini menjadi destinasi utama bagi pengunjung yang ingin melihat gerombolan kuda liar. Dengan pemandangan ala Afrika dan latar belakang biru laut, Sabana Puru Kambera adalah tempat yang menakjubkan untuk dinikmati.";
      lokasi = "https://maps.app.goo.gl/4ehKM9xiFN2rRMiP7";
      rating = 4.6;
    }
    else if (label === 'Lingko Spider Wen Rice Field') {
      artikel = "Lingko Spider Web Rice Field adalah istilah yang mengacu pada pola ladang padi tradisional yang terdapat di Sumba, Nusa Tenggara Timur, Indonesia. Ladang-ladang ini terkenal karena polanya yang menyerupai jaring laba-laba atau spider web ketika dilihat dari udara. Mereka adalah contoh unik dari sistem penanaman terasering tradisional yang masih dipraktikkan oleh masyarakat Sumba. Pola ini tidak hanya memiliki nilai fungsional dalam pengelolaan air dan tanah, tetapi juga memiliki makna simbolis dan budaya yang dalam bagi masyarakat lokal. Lingko Spider Web Rice Field adalah contoh menakjubkan dari keterampilan tradisional dalam pertanian yang telah bertahan selama berabad-abad di Pulau Sumba.";
      lokasi = "https://maps.app.goo.gl/dpkiwxWwtcEJJnRH9";
      rating = 4.3;
    }
    else if (label === 'Batu Nona Beach') {
      artikel = "Pantai Batu Nona di Kupang, Nusa Tenggara Timur, menawarkan keindahan alam yang memukau dengan hamparan pasir putih dan air laut yang jernih. Terletak di dekat Kota Kupang, pantai ini menarik pengunjung dengan pesonanya yang tenang dan sejuk. Dikelilingi oleh deretan pohon lontar yang menjulang, pantai ini menawarkan panorama yang memikat untuk dinikmati. Pantai Batu Nona adalah tempat yang sempurna untuk bersantai, menikmati keindahan alam, dan mengabadikan momen indah bersama keluarga dan teman-teman.";
      lokasi = "https://maps.app.goo.gl/ggMQHg3XJxKAgejn6";
      rating = 4.3;
    }
    else if (label === 'Ketapang Satu Beach') {
      artikel = "Pantai Ketapang Satu adalah sebuah pantai yang terletak di Kupang, Nusa Tenggara Timur, Indonesia. Pantai ini menawarkan hamparan pasir putih yang lembut dan air laut yang jernih. Keindahan alamnya sangat menawan, dengan pohon kelapa yang menjulang di sepanjang pantai dan ombak yang tenang. Pengunjung dapat menikmati berbagai aktivitas seperti berenang, berjemur, atau sekadar bersantai menikmati keindahan laut dan panorama pantai yang memesona. Pantai Ketapang Satu adalah destinasi yang cocok untuk menghabiskan waktu santai bersama keluarga dan teman-teman.";
      lokasi = "https://maps.app.goo.gl/egbVciLg6uuPH8zY9";
      rating = 4.3;
    }
    else if (label === 'Nemberala Beach') {
      artikel = "Pantai Nemberala adalah pantai yang terletak di Pulau Rote, Nusa Tenggara Timur, Indonesia. Terkenal sebagai surga bagi para peselancar, pantai ini menawarkan ombak yang tinggi dan konsisten sepanjang tahun. Selain itu, pasir putih yang halus dan air laut yang jernih menjadikan Nemberala Beach sebagai tempat yang ideal untuk bersantai, berjemur, atau berenang. Pemandangan matahari terbenam di pantai ini juga sangat memukau. Di sekitar pantai, terdapat berbagai akomodasi wisata yang menyediakan fasilitas untuk para pengunjung yang ingin menikmati liburan mereka di Pulau Rote. Pantai Nemberala adalah destinasi yang sempurna bagi pecinta alam dan penggemar olahraga air.";
      lokasi = "https://maps.app.goo.gl/pQUqDjCp7RxHMER38";
      rating = 4.7;
    }
    else if (label === 'Pantai Oesapa') {
      artikel = "Pantai Warna-Warni, yang terletak di Kelurahan Oesapa, Kecamatan Kelapa Lima, terkenal dengan fasilitasnya yang berwarna-warni, bukan karena pasir atau batuannya. Pada malam hari, pantai ini menjadi indah dengan lampu-lampu yang berkelap-kelip dari kafe di sepanjang tepi pantai. Keindahan pantai ini diperkuat oleh latar belakang pohon lontar yang kokoh berdiri di sepanjang pantai. Mudah diakses dan menawarkan panorama yang menakjubkan, Pantai Warna-Warni Oesapa sering menjadi destinasi yang ramai dikunjungi. Di sekitar Pantai Oesapa, terdapat dua pantai lainnya, yaitu Pantai Batu Nona dan Pantai Lasiana.";
      lokasi = "https://maps.app.goo.gl/Z7Nti94rYQHjNb237";
      rating = 4.3;
    }
    else if (label === 'Nostalgia park') {
      artikel = "Taman Nostalgia di Kupang adalah sebuah tempat yang unik dan bersejarah. Taman ini dikenal karena menjadi rumah bagi Gong Perdamaian, sebuah gong raksasa yang menjadi simbol perdamaian dan persatuan. Gong ini merupakan hadiah dari Pemerintah Tiongkok kepada Provinsi Nusa Tenggara Timur. Selain Gong Perdamaian, taman ini juga memiliki replika bangunan-bangunan khas Nusa Tenggara Timur dan area hijau yang luas. Pengunjung dapat menikmati suasana yang tenang dan berfoto di sekitar taman. Taman Nostalgia Gong Perdamaian menjadi destinasi yang menarik bagi wisatawan yang ingin menikmati keindahan alam dan belajar tentang budaya lokal.";
      lokasi = "https://maps.app.goo.gl/2HFMWe9NRaBPAJR39";
      rating = 4.4;
    }
    else if (label === 'Pantai Walakiri') {
      artikel = "Pantai Walakiri adalah surga pasir putih yang tersembunyi di Pulau Sumba, Nusa Tenggara Timur, Indonesia. Terletak di Desa Walakiri, Kecamatan Kodi, pantai ini menawarkan pemandangan yang menakjubkan dengan pasir putihnya yang halus, air laut yang biru jernih, dan batu-batu karang yang menjulang di sekitarnya. Salah satu daya tarik utama Pantai Walakiri adalah pohon lontar yang ikonik yang tumbuh di sepanjang pantai dan menjadi spot foto yang populer bagi para pengunjung. Selain menikmati keindahan alam, pengunjung juga dapat bersantai, berenang, atau berjemur di Pantai Walakiri. Dengan suasana yang tenang dan keindahan alam yang memukau, Pantai Walakiri adalah destinasi yang sempurna untuk melarikan diri dari keramaian dan menikmati pesona alam Sumba yang masih alami.";
      lokasi = "https://maps.app.goo.gl/WSkR9tjEgAyRjbuj8";
      rating = 4.6;
    }
    else if (label === 'Lawa Darat Gili') {
      artikel = "Gili Lawa Darat adalah salah satu pulau kecil yang terletak di Taman Nasional Komodo, di Provinsi Nusa Tenggara Timur, Indonesia. Pulau ini terkenal karena pemandangan alamnya yang menakjubkan, termasuk bukit-bukit kecil, hamparan padang rumput, dan tebing-tebing batu yang menjulang di sepanjang pantainya. Gili Lawa Darat juga merupakan tempat yang populer untuk aktivitas snorkeling dan diving karena terumbu karangnya yang indah dan keanekaragaman hayati bawah laut yang kaya. Pemandangan matahari terbenam dari pulau ini juga sangat terkenal, memberikan pengalaman yang luar biasa bagi para pengunjung. Keindahan alamnya yang menakjubkan menjadikan Gili Lawa Darat sebagai salah satu tujuan wisata yang sangat dicari di wilayah tersebut.";
      lokasi = "https://maps.app.goo.gl/zEZCTyYzyE1eEPWq6";
      rating = 4.9;
    }
    else if (label === 'Air Terjun Tanggedu') {
      artikel = "Air Terjun Tanggedu di Pulau Sumba, Nusa Tenggara Timur, Indonesia, menawarkan pemandangan alam spektakuler dengan airnya yang jatuh dari tebing curam setinggi sekitar 100 meter. Terletak di Kabupaten Waikabubak, air terjun ini dikelilingi oleh hutan tropis yang hijau. Perjalanan menuju air terjun melibatkan pendakian dan trekking yang menantang namun sebanding dengan pemandangan alam yang luar biasa. Bagi penggemar petualangan alam, Air Terjun Tanggedu adalah destinasi yang sempurna untuk mengunjungi di Pulau Sumba.";
      lokasi = "https://maps.app.goo.gl/tukyxZEE1rTBHnLm9";
      rating = 4.8;
    }
    else if (label === 'Rangko Cave') {
      artikel = "Gua Rangko adalah tempat wisata yang terletak di Pulau Gusung, Desa Rangko, Kecamatan Boleng, Kabupaten Manggarai Barat, Nusa Tenggara Timur (NTT). Tempat ini menawarkan keindahan gua alami dengan stalaktit khas gua. Di dalamnya, pengunjung akan melihat kolam alam yang sangat jernih sehingga batuan stalakmit di dasar kolam terlihat jelas. Jika terkena sinar matahari, kolam dengan kedalaman empat meter itu akan terlihat semakin indah. Pengunjung juga dapat berenang di kolam ini untuk menikmati kesegaran air alam, namun mereka diminta untuk berhati-hati agar anggota badan tidak terkena stalakmit yang terdapat di sekitar kolam.";
      lokasi = "https://maps.app.goo.gl/zKNTzGf3r9wgNf5f9";
      rating = 4.5;
    }
    else if (label === 'Pulau Kanawa') {
      artikel = "Pulau Kanawa adalah sebuah pulau kecil yang terletak di perairan Flores, Nusa Tenggara Timur (NTT). Pulau ini sangat terkenal karena keindahan bawah lautnya yang memukau. Ada banyak sekali terumbu karang yang tumbuh di pulau ini dan itu menjadi daya tarik bagi wisatawan yang suka menyelam sekaligus melihat kecantikan bawah laut Pulau Kanawa. Pulau ini memiliki luas sekitar 32 ha dan jaraknya kurang lebih sekitar 15 km dari Labuan Bajo. Banyak yang bilang Pulau Kanawa Labuan Bajo adalah gerbang dari Pulau Komodo. Pulau ini sangat cocok untuk kamu yang tidak suka dengan tempat ramai.";
      lokasi = "https://maps.app.goo.gl/XphhXGxR5aqTDbRf9";
      rating = 4;
    }
    else if (label === 'Rumah Budaya Sumba') {
      artikel = "Rumah Budaya Sumba adalah museum khusus yang digunakan untuk memperkenalkan sejarah dan budaya Sumba. Fungsi Rumah Budaya Sumba adalah sebagai museum sekaligus tempat wisata, penelitian, dan pertemuan, serta pusat pembelajaran kebudayaan Sumba. Rumah Budaya Sumba mengoleksi berbagai macam peninggalan kelompok etnik daerah Sumba yang berasal dari masa prasejarah hingga masa kini. Koleksi-koleksi ini merupakan sumbangan koleksi pribadi Pater Robert Ramone dan sumbangan dari setiap rumah adat Sumba. Rumah Budaya Sumba terletak di Jalan Rumah Budaya Nomor 212, Kalembu Nga’banga Waitabula, Kabupaten Sumba Barat Daya, Provinsi Nusa Tenggara Timur.";
      lokasi = "https://maps.app.goo.gl/oKVbDfiYY7QPHAtP6";
      rating = 3.5;
    }
    else if (label === 'Pantai Watu Parunu') {
      artikel = "Pantai Watu Parunu adalah destinasi wisata yang menawarkan pantai, perbukitan, dan tebing. Pantai ini memiliki garis pantai yang sangat panjang dan berhubungan langsung dengan Samudra Indonesia, sehingga ombaknya lumayan besar. Pengunjung yang datang ke Pantai Watu Parunu akan disambut hamparan pasir putih, tebing batu, dan desir ombak yang datang silih berganti. Tebing batu di Pantai Watu Parunu berwarna putih dan berada di ujung timur, menjadi salah satu ikon dari Pantai Watu Parunu yang selalu menjadi spot untuk berfoto. Nama Watu Parunu sendiri berkaitan dengan fenomena alam batu berlubang yang menjadi ciri khas lain dari pantai ini. Untuk bisa berjalan melewati batu berlubang ini, pengunjung harus merunduk.";
      lokasi = "https://maps.app.goo.gl/zaRNyMpVksxwfPJDA";
      rating = 4.5;
    }
    else if (label === 'Pantai Kolbano') {
      artikel = "Pantai Kolbano adalah sebuah destinasi wisata yang terletak di Desa Kolbano, Kecamatan Kolbano, Kabupaten Timor Tengah Selatan, Nusa Tenggara Timur. Pantai ini dikenal dengan keunikannya, yaitu tidak memiliki hamparan pasir seperti pantai pada umumnya, melainkan batuan. Pantai ini menghadap ke Samudera Hindia dan memiliki bibir pantai dengan hamparan batu licin berwarna-warni. Salah satu ciri khas dari pantai ini adalah adanya batu raksasa yang disebut ‘Fatu Un’, yang jika dilihat dari samping, batu ini mirip kepala singa.";
      lokasi = "https://maps.app.goo.gl/Jvru1Qp3sDQALoL18";
      rating = 4.5;
    }
    else if (label === 'Pantai Mandorak') {
      artikel = "Pantai Mandorak adalah sebuah destinasi wisata yang terletak di Desa Kalena Rongo, Kecamatan Kodi Utara, Kabupaten Sumba Barat Daya, Nusa Tenggara Timur. Pantai ini dikenal dengan pasir putihnya dan batu karang. Suasana pantai makin terasa alami dengan deburan ombak yang keras. Batu karang Pantai Mandorak saling berhimpit membuat pandangan ke pantai cukup sempit karena tertutup tebing. Pantai ini memiliki pesona alam yang memikat dengan pasir putih serta air laut yang jernih berwarna hijau toska. Pantai Mandorak juga dikelilingi oleh perbukitan yang menambah keindahan alamnya. Pantai Mandorak dikenal dengan gelombang lautnya yang tinggi, sehingga lebih cocok untuk bermain-main di air daripada berenang.";
      lokasi = "https://maps.app.goo.gl/2ZazDuVvtrfgUkHW";
      rating = 4.5;
    }
    else if (label === 'Pantai Waecicu') {
      artikel = "Pantai Waecicu adalah sebuah destinasi wisata yang terletak di Labuan Bajo, Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur. Pantai ini dikenal dengan pasir putihnya yang membentang sepanjang 1 km dan banyak bukit hijau kecil di sekitarnya. Pantai ini memiliki tipe perairan yang dangkal dan berbagai pemandangan biota laut yang cantik. Selain itu, Pantai Waecicu juga merupakan spot terbaik untuk menikmati matahari terbenam (sunset) sambil duduk santai di jembatan yang digunakan oleh nelayan bersandar perahu.";
      lokasi = "https://maps.app.goo.gl/tdp3Ac6wTDxEFHjZA";
      rating = 3.5;
    }
    else if (label === 'Pantai Kalong') {
      artikel = "Pulau Kalong, juga dikenal sebagai Kalong Padar atau Flying Fox Island, adalah sebuah pulau kecil yang tidak berpenghuni dan terletak di Taman Nasional Komodo, dekat Labuan Bajo di provinsi Nusa Tenggara Timur, Indonesia. Pulau ini dinamai setelah ribuan kelelawar yang menghuninya. Pulau ini menjadi salah satu destinasi yang dikenal memiliki koloni kelelawar dengan jumlah besar yang mendiami pohon bakau di pulau Kalong. Pulau ini adalah rumah bagi ribuan satwa liar yang masih eksis dan menggantungkan hidupnya di sana, termasuk monyet, burung, hingga reptil. Selain itu, Pulau Kalong juga memiliki berbagai jenis terumbu karang yang indah.";
      lokasi = "https://maps.app.goo.gl/zn1URtEZLpCAo1Ay9";
      rating = 5;
    }
    else if (label === 'Dermaga Baru Waikelo') {
      artikel = "Dermaga Baru Waikelo, juga dikenal sebagai Pelabuhan Waikelo, adalah sebuah pelabuhan yang terletak di Jalan Laut Sulawesi, Kota Tambolaka, Kabupaten Sumba Barat Daya, Provinsi Nusa Tenggara Timur. Pelabuhan ini sudah ada sejak tahun 2003. Sebelumnya, pelabuhan ini menjadi tempat untuk bongkar muat barang. Pada tahun 2015, Kementerian Perhubungan memperbaiki Pelabuhan Waikelo agar dapat digunakan untuk pelabuhan penyeberangan sekaligus bongkar muat barang. Saat berada di Pelabuhan Waikelo, pengunjung akan menemukan pemandangan yang menakjubkan dari Pantai Waikelo, yang terletak persis di dekat pelabuhan.";
      lokasi = "https://maps.app.goo.gl/BveE2REZJ1Xzxidw6";
      rating = 4.2;
    }
    else if (label === 'Koka Beach') {
      artikel = "Koka Beach, juga dikenal sebagai Paga Beach, adalah salah satu tempat paling indah di Flores. Pantai ini memiliki pemandangan yang memukau dengan pasir putih yang dikelilingi oleh tebing karang yang ditumbuhi flora tropis. Pantai ini adalah pilihan sempurna untuk liburan pantai klasik, menawarkan suasana yang sempurna untuk piknik, pertemuan romantis, dan jalan-jalan santai di malam hari di sepanjang pantai. Hembusan angin laut yang segar memberikan sensasi yang menyenangkan sepanjang hari, sementara air biru yang jernih, dengan pendekatan yang lembut dan dasar laut berpasir, menjamin kondisi yang ideal untuk berenang.";
      lokasi = "https://maps.app.goo.gl/P7XJdCq6bHj7twwx9";
      rating = 4.4;
    }
    else if (label === 'Taman Rekreasi Gua Monyet') {
      artikel = "Taman Rekreasi Gua Monyet adalah sebuah taman yang terletak di Jalan Doktor Samratulangi Raya, Kelapa Lima, Kecamatan Kelapa Lima, Kota Kupang, Nusa Tenggara Timur (NTT). Taman ini dikelola oleh Pemerintah Provinsi Nusa Tenggara Timur dan sudah dikelola secara baik sejak tahun 19881. Di taman ini terdapat 327 ekor monyet yang terbagi dalam 4 kelompok. Kelompok terbanyak sekitar 180 ekor, dan kelompok terkecil sekitar 40 ekor. Setiap hari, penjaga di sini menyediakan 8 kg jagung untuk dimakan oleh para monyet. Meskipun jumlah monyet di taman ini terus berkurang, Taman Rekreasi Gua Monyet ini tetap ramai dikunjungi.";
      lokasi = "https://maps.app.goo.gl/ijo2hneFpajQoPst8";
      rating = 3.5;
    }
    else if (label === 'Wisata Adat Kampung Todo') {
      artikel = "Kampung Adat Todo adalah sebuah kampung adat yang terletak di Desa Todo, Kecamatan Satar Mese, Kabupaten Manggarai, Pulau Flores, Provinsi Nusa Tenggara Timur. Kampung ini dikenal sebagai kampung adat tertua di Manggarai Raya dan memiliki bentuk bangunan rumah adat yang khas serta lingkungan perkampungan adat yang indah. Kampung Adat Todo juga dikenal sebagai pusat peradaban Minangkabau. Selain itu, kampung ini juga merupakan pusat kerajaan Manggarai di zaman dulu. Di sini, wisatawan dapat melakukan berbagai aktivitas seperti merasakan bagaimana tamu disambut dengan cara adat orang Manggarai, mengenakan pakaian adat keseharian masyarakat Todo, belajar bertenun dengan ibu-ibu yang menenun di depan rumah serta belajar sejarah mengenai kampung Todo dan kerajaan Todo.";
      lokasi = "https://maps.app.goo.gl/GXqcJSFkqFC9q9Xd8";
      rating = 3.5;
    }
    else if (label === 'Kera') {
      artikel = "Pulau Kera adalah sebuah pulau yang terletak di sebelah barat Kota Kupang. Secara administratif, pulau ini termasuk wilayah Desa Uiasa, Kecamatan Semau, Kabupaten Kupang, Provinsi Nusa Tenggara Timur, Indonesia. Pulau ini memiliki luas sekitar 43 hektar dan masih alami. Pulau Kera menawarkan pengalaman snorkeling yang tak terlupakan di perairannya yang memikat. Anda akan merasa seperti berada di pulau pribadi karena memang tidak terlalu ramai. Kebersihan tempat yang selalu terjamin membuat para tamu nyaman berada di Pulau Kera. Apalagi suasana di sekeliling Pulau terasa sejuk karena banyak tumbuhan seperti bakau, kelapa, hingga bukit.";
      lokasi = "https://maps.app.goo.gl/9BSx47zM3j91hG266";
      rating = 4.6;
    }
    else if (label === 'Solor') {
      artikel = "Pulau Solor adalah sebuah pulau yang terletak di Kepulauan Nusa Tenggara. Pulau ini terletak di sebelah timur dari Pulau Flores. Pulau ini dibatasi oleh Selat Lowotobi di barat, Selat Solor di utara, Selat Lamakera di timur, serta Laut Sawu di selatan. Secara administratif, Pulau Solor termasuk wilayah Kabupaten Flores Timur, Provinsi Nusa Tenggara Timur, Indonesia. Pulau ini merupakan satu di antara dua pulau utama pada kepulauan di wilayah Kabupaten Flores Timur. Pulau Solor sendiri terdiri dari tiga kecamatan: Solor Barat, Solor Timur dan Solor Selatan. Para penduduk pribumi adalah suku Lamaholot berbahasa Lamaholot dan Adonara.";
      lokasi = "https://maps.app.goo.gl/u1TEgeMY6MTXpTzx6";
      rating = 3.7;
    }
    else if (label === 'Pulau kelor') {
      artikel = "Pulau Kelor adalah sebuah pulau kecil yang terletak di Kabupaten Manggarai, Flores. Pulau ini menawarkan keindahan alam yang masih asri dan alami. Pulau ini berwarna hijau dari pepohonan dan rerumputan yang tumbuh di bukit dan dikelilingi warna biru lautan. Pulau ini juga dikenal dengan lanskapnya yang menarik dan terbentuk melalui proses geologis yang panjang. Pulau ini terdiri dari batuan karang yang mencolok, dengan pantai berpasir putih yang mempesona. Pulau Kelor juga dikelilingi oleh perairan jernih dan karang yang indah, menjadikannya tempat yang populer bagi penggemar snorkeling dan menyelam.";
      lokasi = "https://maps.app.goo.gl/jMKDiurJuV9WeFSK8";
      rating = 4.5;
    }

    return { confidenceScore, artikel, rating, lokasi };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
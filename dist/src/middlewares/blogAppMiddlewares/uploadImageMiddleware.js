import multer from 'multer';
// Multer File arayüzü
// interface MulterFile {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   path: string;
//   buffer: Buffer;
// }
// // Express Request arayüzünü genişletiyoruz
// interface CustomRequest extends Request {
//   file?: MulterFile; // Dosya yüklenmemişse undefined olabilir.
// }
// Dosya Filtre Callback arayüzü
// type MulterFileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     callback: FileFilterCallback
// ) => void;
// // Dosya saklama ayarları
// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//     cb(null, 'uploads/'); // Dosyalar 'uploads/' klasörüne kaydedilecek
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Benzersiz dosya adı oluşturuyoruz.
//   },
// });
// // Dosya türü filtresi (sadece resimlere izin veriyoruz)
// const fileFilter: MulterFileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Sadece resim dosyaları yüklenebilir!') as any, false);
//   }
// };
// // Multer middleware oluşturma
// const uploadImageMiddleware = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 15 * 1024 * 1024, // Maksimum 5MB boyutunda dosya kabul ediyoruz.
//   },
// });
// export default uploadImageMiddleware;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // klasör ismini belirt
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const uploadImageMiddleware = multer({ storage });
export default uploadImageMiddleware;
